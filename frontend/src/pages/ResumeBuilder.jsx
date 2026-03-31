import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useForm, useFieldArray } from 'react-hook-form';
import { useResumeContext } from '../context/ResumeContext';
import { ArrowLeft, ArrowRight, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import html2pdf from 'html2pdf.js';

import ModernTemplate from '../templates/ModernTemplate';
import MinimalTemplate from '../templates/MinimalTemplate';
import CreativeTemplate from '../templates/CreativeTemplate';
import AtsTemplate from '../templates/AtsTemplate';
import ExecutiveTemplate from '../templates/ExecutiveTemplate';
import ClassicTemplate from '../templates/ClassicTemplate';
import ProfessionalTemplate from '../templates/ProfessionalTemplate';

import PersonalStep from '../components/builder/PersonalStep';
import ExperienceStep from '../components/builder/ExperienceStep';
import SkillsEducationStep from '../components/builder/SkillsEducationStep';
import ResultsDashboard from '../components/builder/ResultsDashboard';

const templatesMap = {
  modern: ModernTemplate,
  minimal: MinimalTemplate,
  creative: CreativeTemplate,
  ats: AtsTemplate,
  executive: ExecutiveTemplate,
  classic: ClassicTemplate,
  elite: ProfessionalTemplate,
};

const ResumeBuilder = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { fetchResumeById, updateResume, createResume, currentResume, setCurrentResume } = useResumeContext();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSaving, setIsSaving] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const resumeRef = useRef(null);

  const { register, control, handleSubmit, watch, reset, setValue, getValues } = useForm({
    defaultValues: {
      title: 'My New Resume',
      selectedTemplate: 'modern',
      personalInfo: { firstName: '', lastName: '', email: '', phone: '', address: '', jobTitle: '' },
      summary: '',
      education: [],
      skills: [],
      projects: [],
      experience: [],
      achievements: [],
      languages: [],
    }
  });

  const { fields: expFields, append: appendExp, remove: removeExp } = useFieldArray({ control, name: 'experience' });
  const { fields: eduFields, append: appendEdu, remove: removeEdu } = useFieldArray({ control, name: 'education' });
  const { fields: projFields, append: appendProj, remove: removeProj } = useFieldArray({ control, name: 'projects' });
  const { fields: achFields, append: appendAch, remove: removeAch } = useFieldArray({ control, name: 'achievements' });
  const { fields: langFields, append: appendLang, remove: removeLang } = useFieldArray({ control, name: 'languages' });

  const formData = watch();

  useEffect(() => {
    const loadData = async () => {
      if (id) {
        const data = await fetchResumeById(id);
        if (data) reset(data);
        else navigate('/');
      } else {
        setCurrentResume(null);
        reset({
          title: 'My New Resume',
          selectedTemplate: 'modern',
          personalInfo: { firstName: '', lastName: '', email: '', phone: '', address: '', jobTitle: '' },
          summary: '',
          education: [],
          skills: [],
          projects: [],
          experience: [],
        });
      }
    };
    loadData();
  }, [id, fetchResumeById, reset, navigate, setCurrentResume]);

  const onSave = async (data) => {
    setIsSaving(true);
    let res;
    try {
      if (id && currentResume?._id === id) {
        res = await updateResume(id, data);
      } else {
        res = await createResume(data);
      }
      if (!id && res) navigate(`/builder/${res._id}`, { replace: true });
    } catch (err) {
      toast.error("Failed to save progress");
    } finally {
      setIsSaving(false);
    }
    return res;
  };

  const handleNext = async () => {
    const data = getValues();
    await onSave(data);
    if (currentStep < 3) setCurrentStep(prev => prev + 1);
    else if (currentStep === 3) {
      setCurrentStep(4);
      setTimeout(() => setCurrentStep(5), 2500);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep(prev => prev - 1);
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        toast.error('Image too large. Max 2MB.');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setValue('personalInfo.photo', reader.result);
        toast.success('Photo uploaded!');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleExportPDF = () => {
    setIsExporting(true);
    const toastId = toast.loading('Generating PDF...');
    setTimeout(() => {
      const element = resumeRef.current;
      const opt = {
        margin: 0,
        filename: `${formData.personalInfo?.firstName || 'Resume'}_CareerCraftAI.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
      };
      html2pdf().set(opt).from(element).save().then(() => {
        setIsExporting(false);
        toast.success('Downloaded successfully!', { id: toastId });
      }).catch(() => {
        setIsExporting(false);
        toast.error('Export failed', { id: toastId });
      });
    }, 500);
  };

  const SelectedTemplateComponent = templatesMap[formData.selectedTemplate] || ModernTemplate;

  return (
    <div className="min-h-screen flex flex-col bg-black overflow-hidden font-sans">
      <header className="h-16 flex items-center justify-between px-6 bg-black border-b border-neutral-900 z-50">
        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center">
            <span className="font-bold text-lg tracking-tighter text-white">CareerCraft<span className="text-cyan-400">AI</span></span>
          </Link>
          <div className="h-4 w-[1px] bg-neutral-800" />
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${isSaving ? 'bg-amber-500 animate-pulse' : 'bg-emerald-500'}`} />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral-500">
              {isSaving ? 'Saving...' : 'Saved'}
            </span>
          </div>
        </div>
        <button onClick={() => navigate('/')} className="text-xs font-black text-neutral-500 hover:text-white uppercase tracking-widest transition-colors">Exit</button>
      </header>

      <main className="flex-grow flex flex-col overflow-y-auto">
        <AnimatePresence mode="wait">
          {currentStep <= 3 && (
            <motion.div key="wizard" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="max-w-3xl mx-auto w-full pt-12 pb-32 px-6">
              <div className="flex items-center justify-between mb-12 gap-4">
                {[1, 2, 3].map((s) => (
                  <div key={s} className="flex-1 flex flex-col gap-2">
                    <div className={`h-1 rounded-full transition-all duration-700 ${currentStep >= s ? 'bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.4)]' : 'bg-neutral-900'}`} />
                    <span className={`text-[10px] font-black uppercase tracking-widest h-4 ${currentStep === s ? 'text-white' : 'text-neutral-600'}`}>0{s}</span>
                  </div>
                ))}
              </div>

              <form>
                {currentStep === 1 && <PersonalStep register={register} formData={formData} setValue={setValue} handlePhotoUpload={handlePhotoUpload} />}
                {currentStep === 2 && (
                  <ExperienceStep 
                    register={register} control={control} formData={formData} setValue={setValue} 
                    appendExp={appendExp} removeExp={removeExp} appendProj={appendProj} removeProj={removeProj} 
                    expFields={expFields} projFields={projFields} 
                  />
                )}
                {currentStep === 3 && (
                  <SkillsEducationStep 
                    register={register} setValue={setValue} formData={formData} 
                    eduFields={eduFields} appendEdu={appendEdu} removeEdu={removeEdu} 
                    achFields={achFields} appendAch={appendAch} removeAch={removeAch} 
                    langFields={langFields} appendLang={appendLang} removeLang={removeLang} 
                  />
                )}
              </form>

              <div className="fixed bottom-0 left-0 right-0 p-6 bg-black/80 backdrop-blur-xl border-t border-neutral-900 flex justify-center z-50">
                <div className="w-full max-w-3xl flex items-center justify-between gap-4">
                  <button onClick={handleBack} disabled={currentStep === 1} className={`flex items-center gap-2 px-8 py-4 font-black text-xs uppercase tracking-widest transition-all ${currentStep === 1 ? 'opacity-0 pointer-events-none' : 'text-neutral-500 hover:text-white'}`}>
                    <ArrowLeft size={16} /> Back
                  </button>
                  <button onClick={handleNext} className="flex-1 sm:flex-none flex items-center justify-center gap-3 px-12 py-5 bg-cyan-400 text-black rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-cyan-300 hover:scale-[1.02] active:scale-95 transition-all shadow-[0_0_40px_-5px_rgba(34,211,238,0.4)]">
                    {currentStep === 3 ? 'Generate Resume' : 'Continue'} <ArrowRight size={18} />
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {currentStep === 4 && (
            <motion.div key="generating" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex-grow flex flex-col items-center justify-center p-6 text-center space-y-12">
              <div className="relative">
                <div className="w-24 h-24 rounded-full border-4 border-neutral-900 border-t-cyan-400 animate-spin" />
                <div className="absolute inset-0 flex items-center justify-center"><Sparkles size={32} className="text-cyan-400 animate-pulse" /></div>
              </div>
              <div className="space-y-4">
                <h2 className="text-4xl font-black text-white tracking-tight">Crafting your resume</h2>
                <p className="text-neutral-500 font-bold max-w-sm mx-auto uppercase tracking-widest text-xs">AI is building your professional edge...</p>
              </div>
            </motion.div>
          )}

          {currentStep === 5 && (
            <motion.div key="results" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex-grow overflow-y-auto">
              <ResultsDashboard resumeData={formData} onEdit={() => setCurrentStep(1)} onExport={handleExportPDF} templateComponent={SelectedTemplateComponent} />
              <div className="hidden"><div ref={resumeRef}><SelectedTemplateComponent data={formData} /></div></div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

export default ResumeBuilder;
