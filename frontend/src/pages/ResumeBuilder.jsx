import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm, useFieldArray } from 'react-hook-form';
import { useResumeContext } from '../context/ResumeContext';
import { 
  Download, Save, ArrowLeft, Plus, Trash2, LayoutTemplate, 
  User, FileText, Briefcase, GraduationCap, Award, Settings, 
  Sparkles, Eye, Code, ChevronRight, CheckCircle2, Monitor, ArrowRight, Camera,
  Trophy, Globe, Heart
} from 'lucide-react';
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
import AIAssistant from '../components/AIAssistant';
import AIReviewer from '../components/AIReviewer';

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
  const [activeTab, setActiveTab] = useState('personal');
  const [isSaving, setIsSaving] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [showMobilePreview, setShowMobilePreview] = useState(false);
  const resumeRef = useRef(null);

  const { register, control, handleSubmit, watch, reset, setValue, getValues } = useForm({
    defaultValues: {
      title: 'Untitled Resume',
      selectedTemplate: 'modern',
      personalInfo: {},
      summary: '',
      education: [],
      skills: [],
      projects: [],
      experience: [],
      certifications: [],
      achievements: [],
      languages: [],
      hobbies: [],
    }
  });

  const { fields: expFields, append: appendExp, remove: removeExp } = useFieldArray({ control, name: 'experience' });
  const { fields: eduFields, append: appendEdu, remove: removeEdu } = useFieldArray({ control, name: 'education' });
  const { fields: projFields, append: appendProj, remove: removeProj } = useFieldArray({ control, name: 'projects' });
  const { fields: certFields, append: appendCert, remove: removeCert } = useFieldArray({ control, name: 'certifications' });
  const { fields: langFields, append: appendLang, remove: removeLang } = useFieldArray({ control, name: 'languages' });
  const { fields: achFields, append: appendAch, remove: removeAch } = useFieldArray({ control, name: 'achievements' });
  const { fields: hobFields, append: appendHob, remove: removeHob } = useFieldArray({ control, name: 'hobbies' });

  // Watch entire form for live preview
  const formData = watch();

  useEffect(() => {
    const loadData = async () => {
      if (id) {
        const data = await fetchResumeById(id);
        if (data) {
          reset(data);
        } else {
          navigate('/dashboard');
        }
      } else {
        // Clear current resume context for new resume
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
    if (id && currentResume?._id === id) {
      res = await updateResume(id, data);
      toast.success('Progress saved', {
        style: { borderRadius: '12px', background: '#333', color: '#fff' }
      });
    } else {
      res = await createResume(data);
    }
    setIsSaving(false);
    if (!id && res) {
      navigate(`/builder/${res._id}`);
    }
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        toast.error('Image too large. Please use an image under 2MB.');
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
    const toastId = toast.loading('Architecting your PDF...', {
      style: { borderRadius: '12px', background: '#333', color: '#fff' }
    });
    
    setTimeout(() => {
      const element = resumeRef.current;
      const opt = {
        margin: 0,
        filename: `${formData.personalInfo?.firstName || 'Resume'}_${formData.personalInfo?.lastName || ''}.pdf`,
        image: { type: 'jpeg', quality: 1 },
        html2canvas: { scale: 3, useCORS: true, letterRendering: true },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
      };

      html2pdf().set(opt).from(element).save().then(() => {
        setIsExporting(false);
        toast.success('Resume Exported!', { id: toastId });
      }).catch(err => {
        console.error(err);
        toast.error('Export failed', { id: toastId });
        setIsExporting(false);
      });
    }, 500);
  };

  const handleApplyAIFix = ({ category, suggestedContent }) => {
    if (!suggestedContent) return;

    if (category === 'summary') {
      setValue('summary', suggestedContent);
    } else if (category === 'skills') {
      const skillsArray = suggestedContent.split(',').map(s => s.trim()).filter(Boolean);
      setValue('skills', skillsArray);
    } else if (category === 'projects' || category === 'experience') {
      // For arrays, we'll update the first item's description if it exists
      const fieldName = category === 'projects' ? 'projects.0.description' : 'experience.0.description';
      const currentItems = getValues(category);
      if (currentItems && currentItems.length > 0) {
        setValue(fieldName, suggestedContent);
      } else if (category === 'projects') {
        appendProj({ name: 'New Project', description: suggestedContent, link: '', technologies: [] });
      } else if (category === 'experience') {
        appendExp({ title: 'New Position', company: '', startDate: '', endDate: '', description: '', current: false });
      }
    }
  };

  const SelectedTemplateComponent = templatesMap[formData.selectedTemplate] || ModernTemplate;

  const sidebarTabs = [
    { id: 'personal', label: 'Personal', icon: <User size={18} /> },
    { id: 'summary', label: 'Summary', icon: <FileText size={18} /> },
    { id: 'experience', label: 'Experience', icon: <Briefcase size={18} /> },
    { id: 'education', label: 'Education', icon: <GraduationCap size={18} /> },
    { id: 'skills', label: 'Skills', icon: <Award size={18} /> },
    { id: 'projects', label: 'Projects', icon: <Code size={18} /> },
    { id: 'certifications', label: 'Certifications', icon: <Award size={18} /> },
    { id: 'achievements', label: 'Achievements', icon: <Trophy size={18} /> },
    { id: 'languages', label: 'Languages', icon: <Globe size={18} /> },
    { id: 'hobbies', label: 'Hobbies', icon: <Heart size={18} /> },
    { id: 'design', label: 'Design', icon: <LayoutTemplate size={18} /> },
    { id: 'aireview', label: 'AI Auditor', icon: <Sparkles size={18} className="text-amber-500" /> },
  ];

  return (
    <div className="h-screen flex flex-col bg-slate-50 dark:bg-slate-950 overflow-hidden">
      
      {/* Top Navigation Bar */}
      <header className="h-16 flex items-center justify-between px-6 glass border-b border-slate-200 dark:border-slate-800 z-50 shrink-0">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate('/dashboard')} 
            className="p-2 hover:bg-slate-100 dark:hover:bg-slate-900 rounded-xl transition-colors text-slate-500"
          >
            <ArrowLeft size={18} />
          </button>
          <div className="h-6 w-[1px] bg-slate-200 dark:bg-slate-800" />
          <input
            {...register('title')}
            className="bg-transparent font-bold text-slate-800 dark:text-white focus:outline-none focus:ring-0 w-48 md:w-64"
            placeholder="Name your masterpiece..."
          />
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowMobilePreview(!showMobilePreview)}
            className="md:hidden p-2.5 rounded-xl bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400"
          >
            {showMobilePreview ? <Settings size={20} /> : <Eye size={20} />}
          </button>
          
          <button 
            onClick={handleSubmit(onSave)}
            disabled={isSaving}
            className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-indigo-500 transition-all shadow-sm"
          >
            {isSaving ? <div className="w-4 h-4 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin" /> : <Save size={16} className="text-indigo-600" />}
            <span>Save</span>
          </button>

          <button
            onClick={handleExportPDF}
            disabled={isExporting}
            className="btn-premium px-5 py-2 text-sm flex items-center gap-2 shadow-indigo-600/20"
          >
            {isExporting ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Download size={16} />}
            <span>Export PDF</span>
          </button>
        </div>
      </header>

      <main className="flex-grow flex overflow-hidden">
        {/* Left Sidebar Navigation */}
        <aside className="hidden md:flex flex-col w-20 lg:w-64 bg-white dark:bg-slate-950 border-r border-slate-200 dark:border-slate-800 py-6 overflow-y-auto shrink-0">
          <div className="px-4 mb-6">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest hidden lg:block mb-4 ml-2">Editor Sections</p>
          </div>
          <nav className="flex flex-col gap-2 px-3">
            {sidebarTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  if (showMobilePreview) setShowMobilePreview(false);
                }}
                className={`flex items-center gap-3 p-3 rounded-2xl transition-all duration-300 group ${
                  activeTab === tab.id
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20'
                    : 'text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-900 hover:text-indigo-600'
                }`}
              >
                <div className={`${activeTab === tab.id ? 'text-white' : 'text-slate-400 group-hover:text-indigo-600'}`}>
                  {tab.icon}
                </div>
                <span className="font-bold text-sm hidden lg:block">{tab.label}</span>
              </button>
            ))}
          </nav>
        </aside>

        {/* Form Content Area */}
        <div className={`flex-grow overflow-y-auto p-4 md:p-8 scrollbar-hide ${showMobilePreview ? 'hidden' : 'block'}`}>
          <div className="max-w-3xl mx-auto pb-20">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-8"
              >
                {/* Section Header */}
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white capitalize flex items-center gap-2">
                    {sidebarTabs.find(t => t.id === activeTab)?.icon}
                    {sidebarTabs.find(t => t.id === activeTab)?.label}
                  </h2>
                  <p className="text-slate-500 text-sm mt-1">Fill in your details below to see them reflected in the live preview.</p>
                </div>

                <div className="space-y-6">
                  {/* PERSONAL INFO */}
                  {activeTab === 'personal' && (
                    <div className="space-y-6">
                      {/* Photo Upload Section */}
                      <div className="flex flex-col items-center gap-4 mb-8 p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
                        <div className="relative group">
                          <div className="w-32 h-32 rounded-full border-4 border-indigo-100 dark:border-indigo-900/30 overflow-hidden bg-slate-100 dark:bg-slate-800 flex items-center justify-center transition-all group-hover:border-indigo-400">
                            {formData.personalInfo?.photo ? (
                              <img src={formData.personalInfo.photo} alt="Profile" className="w-full h-full object-cover" />
                            ) : (
                              <User size={48} className="text-slate-300 dark:text-slate-600" />
                            )}
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                              <Camera className="text-white" size={24} />
                            </div>
                          </div>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handlePhotoUpload}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                          />
                        </div>
                        <div className="text-center">
                          <h3 className="text-sm font-bold text-slate-800 dark:text-white">Profile Picture</h3>
                          <p className="text-[10px] text-slate-400 font-medium mt-1 uppercase tracking-widest">Recommended: Square, JPG/PNG, max 2MB</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-bold mb-1.5 text-slate-700 dark:text-slate-300">First Name</label>
                        <input {...register('personalInfo.firstName')} className="input-premium" placeholder="Jane" />
                      </div>
                      <div>
                        <label className="block text-sm font-bold mb-1.5 text-slate-700 dark:text-slate-300">Last Name</label>
                        <input {...register('personalInfo.lastName')} className="input-premium" placeholder="Doe" />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-bold mb-1.5 text-slate-700 dark:text-slate-300">Job Title</label>
                        <input {...register('personalInfo.jobTitle')} className="input-premium" placeholder="Senior Product Designer" />
                      </div>
                      <div>
                        <label className="block text-sm font-bold mb-1.5 text-slate-700 dark:text-slate-300">Email Address</label>
                        <input {...register('personalInfo.email')} className="input-premium" placeholder="jane.doe@example.com" />
                      </div>
                      <div>
                        <label className="block text-sm font-bold mb-1.5 text-slate-700 dark:text-slate-300">Phone Number</label>
                        <input {...register('personalInfo.phone')} className="input-premium" placeholder="+1 (555) 000-0000" />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-bold mb-1.5 text-slate-700 dark:text-slate-300">Address / Location</label>
                        <input {...register('personalInfo.address')} className="input-premium" placeholder="San Francisco, CA" />
                      </div>
                      <div>
                        <label className="block text-sm font-bold mb-1.5 text-slate-700 dark:text-slate-300">LinkedIn URL</label>
                        <input {...register('socialLinks.linkedin')} className="input-premium" placeholder="linkedin.com/in/janedoe" />
                      </div>
                      <div>
                        <label className="block text-sm font-bold mb-1.5 text-slate-700 dark:text-slate-300">Portfolio / GitHub</label>
                        <input {...register('socialLinks.github')} className="input-premium" placeholder="github.com/janedoe" />
                      </div>
                    </div>
                  </div>
                )}

                  {/* SUMMARY */}
                  {activeTab === 'summary' && (
                    <div className="space-y-4">
                      <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                        <label className="block text-sm font-bold mb-3 text-slate-600 dark:text-slate-400">
                          Write a brief professional summary about yourself
                        </label>
                        <textarea
                          {...register('summary')}
                          rows={6}
                          className="input-premium text-base min-h-[150px] resize-none"
                          placeholder="Experienced Product Designer with a passion for building human-centric products..."
                        />
                      </div>
                      <AIAssistant 
                        section="summary" 
                        value={formData.summary} 
                        onApply={(text) => setValue('summary', text)} 
                      />
                    </div>
                  )}

                  {/* EXPERIENCE */}
                  {activeTab === 'experience' && (
                    <div className="space-y-6">
                      {expFields.map((field, index) => (
                        <motion.div 
                          key={field.id}
                          initial={{ opacity: 0, scale: 0.98 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm relative"
                        >
                          <button 
                            type="button" 
                            onClick={() => removeExp(index)} 
                            className="absolute top-4 right-4 p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-lg transition-all"
                          >
                            <Trash2 size={16} />
                          </button>
                          
                          <h4 className="text-xs font-bold text-indigo-600 uppercase tracking-wider mb-4">Position #{index + 1}</h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-xs font-bold mb-1.5 text-slate-500 dark:text-slate-400">Job Title</label>
                              <input {...register(`experience.${index}.title`)} className="input-premium" placeholder="Senior Designer" />
                            </div>
                            <div>
                              <label className="block text-xs font-bold mb-1.5 text-slate-500 dark:text-slate-400">Company</label>
                              <input {...register(`experience.${index}.company`)} className="input-premium" placeholder="Apple Inc." />
                            </div>
                            <div>
                              <label className="block text-xs font-bold mb-1.5 text-slate-500 dark:text-slate-400">Start Date</label>
                              <input {...register(`experience.${index}.startDate`)} className="input-premium" placeholder="Jan 2021" />
                            </div>
                            <div>
                              <label className="block text-xs font-bold mb-1.5 text-slate-500 dark:text-slate-400">End Date</label>
                              <input {...register(`experience.${index}.endDate`)} className="input-premium" placeholder="Present" />
                            </div>
                            <div className="md:col-span-2">
                              <label className="block text-xs font-bold mb-1.5 text-slate-500 dark:text-slate-400">
                                Responsibilities & Key Achievements
                              </label>
                              <textarea 
                                {...register(`experience.${index}.description`)} 
                                rows={5} 
                                className="input-premium text-sm min-h-[120px] resize-none" 
                                placeholder={"• Led a team of 5 designers...\n• Increased user engagement by 40%..."} 
                              />
                              <div className="mt-3">
                                <AIAssistant 
                                  section="project" 
                                  value={formData.experience[index]?.description} 
                                  onApply={(text) => setValue(`experience.${index}.description`, text)} 
                                />
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))}

                      <button
                        type="button"
                        onClick={() => appendExp({ title: '', company: '', startDate: '', endDate: '', description: '', current: false })}
                        className="w-full py-4 border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-xl text-slate-400 font-bold hover:text-indigo-600 hover:border-indigo-400 hover:bg-white dark:hover:bg-slate-900 transition-all flex items-center justify-center gap-2"
                      >
                        <Plus size={18} />
                        Add Work Experience
                      </button>
                    </div>
                  )}

                  {/* EDUCATION */}
                  {activeTab === 'education' && (
                    <div className="space-y-6">
                      {eduFields.map((field, index) => (
                        <motion.div 
                          key={field.id}
                          initial={{ opacity: 0, scale: 0.98 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm relative"
                        >
                          <button type="button" onClick={() => removeEdu(index)} className="absolute top-4 right-4 p-2 text-slate-400 hover:text-red-500 rounded-lg transition-colors">
                            <Trash2 size={16} />
                          </button>
                          <h4 className="text-xs font-bold text-indigo-600 uppercase tracking-wider mb-4">Education #{index + 1}</h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="md:col-span-2">
                              <label className="block text-xs font-bold mb-1.5 text-slate-500 dark:text-slate-400">Institution</label>
                              <input {...register(`education.${index}.institution`)} className="input-premium" placeholder="Stanford University" />
                            </div>
                            <div>
                              <label className="block text-xs font-bold mb-1.5 text-slate-500 dark:text-slate-400">Degree</label>
                              <input {...register(`education.${index}.degree`)} className="input-premium" placeholder="Master of Science" />
                            </div>
                            <div>
                              <label className="block text-xs font-bold mb-1.5 text-slate-500 dark:text-slate-400">Field of Study</label>
                              <input {...register(`education.${index}.fieldOfStudy`)} className="input-premium" placeholder="Computer Science" />
                            </div>
                            <div>
                              <label className="block text-xs font-bold mb-1.5 text-slate-500 dark:text-slate-400">Start Year</label>
                              <input {...register(`education.${index}.startDate`)} className="input-premium" placeholder="2018" />
                            </div>
                            <div>
                              <label className="block text-xs font-bold mb-1.5 text-slate-500 dark:text-slate-400">End Year</label>
                              <input {...register(`education.${index}.endDate`)} className="input-premium" placeholder="2020" />
                            </div>
                            <div className="md:col-span-2">
                              <label className="block text-xs font-bold mb-1.5 text-slate-500 dark:text-slate-400">Achievements / Coursework</label>
                              <textarea {...register(`education.${index}.description`)} rows={3} className="input-premium text-sm resize-none" placeholder={"• Graduated Summa Cum Laude\n• Focused on Distributed Systems..."} />
                              <div className="mt-3">
                                <AIAssistant 
                                  section="education" 
                                  value={formData.education[index]?.description} 
                                  onApply={(text) => setValue(`education.${index}.description`, text)} 
                                />
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                      
                      <button
                        type="button"
                        onClick={() => appendEdu({ institution: '', degree: '', fieldOfStudy: '', startDate: '', endDate: '', description: '' })}
                        className="w-full py-4 border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-xl text-slate-400 font-bold hover:text-indigo-600 hover:border-indigo-400 hover:bg-white dark:hover:bg-slate-900 transition-all flex items-center justify-center gap-2"
                      >
                        <Plus size={18} />
                        Add Education
                      </button>
                    </div>
                  )}

                  {/* SKILLS */}
                  {activeTab === 'skills' && (
                    <div className="space-y-4">
                      <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                        <label className="block text-sm font-bold mb-3 text-slate-600 dark:text-slate-400">
                          Separate skills with commas (e.g. React, UI/UX, Node.js)
                        </label>
                        <textarea
                          value={formData.skills?.join(', ') || ''}
                          onChange={(e) => {
                            const skillsArray = e.target.value.split(',').map(s => s.trim()).filter(Boolean);
                            setValue('skills', skillsArray);
                          }}
                          rows={4}
                          className="input-premium text-sm resize-none"
                          placeholder="JavaScript, Figma, Strategy, Python..."
                        />
                        
                        {formData.skills && formData.skills.length > 0 && (
                          <div className="flex flex-wrap gap-2 mt-4">
                            {formData.skills.map((skill, i) => (
                              <motion.span 
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                key={i} 
                                className="px-3 py-1.5 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-lg font-bold text-xs flex items-center gap-2 group"
                              >
                                {skill}
                                <button 
                                  type="button" 
                                  onClick={() => setValue('skills', formData.skills.filter((_, idx) => idx !== i))}
                                  className="opacity-0 group-hover:opacity-100 transition-opacity text-slate-400 hover:text-red-500 outline-none"
                                >
                                  <Plus size={12} className="rotate-45" />
                                </button>
                              </motion.span>
                            ))}
                          </div>
                        )}
                      </div>
                      
                      <AIAssistant 
                        section="skills" 
                        contextData={formData.personalInfo}
                        onApply={(newSkills) => {
                          let toAdd = Array.isArray(newSkills) ? newSkills : [newSkills];
                          const current = formData.skills || [];
                          const updated = [...new Set([...current, ...toAdd])];
                          setValue('skills', updated);
                          toast.success('Skills synced with AI suggestions');
                        }} 
                      />
                    </div>
                  )}

                  {/* PROJECTS */}
                  {activeTab === 'projects' && (
                    <div className="space-y-6">
                      {projFields.map((field, index) => (
                        <motion.div 
                          key={field.id}
                          initial={{ opacity: 0, scale: 0.98 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm relative"
                        >
                          <button type="button" onClick={() => removeProj(index)} className="absolute top-4 right-4 p-2 text-slate-400 hover:text-red-500 rounded-lg transition-colors">
                            <Trash2 size={16} />
                          </button>
                          <h4 className="text-xs font-bold text-indigo-600 uppercase tracking-wider mb-4">Project #{index + 1}</h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-xs font-bold mb-1.5 text-slate-500 dark:text-slate-400">Project Name</label>
                              <input {...register(`projects.${index}.name`)} className="input-premium" placeholder="AI Resume Builder" />
                            </div>
                            <div>
                              <label className="block text-xs font-bold mb-1.5 text-slate-500 dark:text-slate-400">Project Link / URL</label>
                              <input {...register(`projects.${index}.link`)} className="input-premium" placeholder="github.com/project" />
                            </div>
                            <div className="md:col-span-2">
                              <label className="block text-xs font-bold mb-1.5 text-slate-500 dark:text-slate-400">Description</label>
                              <textarea {...register(`projects.${index}.description`)} rows={4} className="input-premium text-sm resize-none" placeholder={"• Architected the frontend...\n• Integrated Gemini Vision..."} />
                            </div>
                          </div>
                        </motion.div>
                      ))}
                      
                      <button
                        type="button"
                        onClick={() => appendProj({ name: '', description: '', link: '', technologies: [] })}
                        className="w-full py-4 border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-xl text-slate-400 font-bold hover:text-indigo-600 hover:border-indigo-400 hover:bg-white dark:hover:bg-slate-900 transition-all flex items-center justify-center gap-2"
                      >
                        <Plus size={18} />
                        Add a Project
                      </button>
                    </div>
                  )}

                  {/* CERTIFICATIONS */}
                  {activeTab === 'certifications' && (
                    <div className="space-y-6">
                      {certFields.map((field, index) => (
                        <motion.div 
                          key={field.id}
                          initial={{ opacity: 0, scale: 0.98 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm relative"
                        >
                          <button type="button" onClick={() => removeCert(index)} className="absolute top-4 right-4 p-2 text-slate-400 hover:text-red-500 rounded-lg transition-colors">
                            <Trash2 size={16} />
                          </button>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                            <div className="md:col-span-2">
                              <label className="block text-xs font-bold mb-1.5 text-slate-500 dark:text-slate-400">Certification Name</label>
                              <input {...register(`certifications.${index}.name`)} className="input-premium" placeholder="AWS Certified Solutions Architect" />
                            </div>
                            <div>
                              <label className="block text-xs font-bold mb-1.5 text-slate-500 dark:text-slate-400">Issuing Organization</label>
                              <input {...register(`certifications.${index}.issuer`)} className="input-premium" placeholder="Amazon Web Services" />
                            </div>
                            <div>
                              <label className="block text-xs font-bold mb-1.5 text-slate-500 dark:text-slate-400">Date Issued</label>
                              <input {...register(`certifications.${index}.date`)} className="input-premium" placeholder="Jan 2024" />
                            </div>
                          </div>
                        </motion.div>
                      ))}
                      <button
                        type="button"
                        onClick={() => appendCert({ name: '', issuer: '', date: '' })}
                        className="w-full py-4 border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-xl text-slate-400 font-bold hover:text-indigo-600 hover:border-indigo-400 transition-all flex items-center justify-center gap-2"
                      >
                        <Plus size={18} />
                        Add Certification
                      </button>
                    </div>
                  )}

                  {/* ACHIEVEMENTS */}
                  {activeTab === 'achievements' && (
                    <div className="space-y-4">
                      {achFields.map((field, index) => (
                        <div key={field.id} className="flex gap-2 items-start">
                          <div className="flex-grow">
                            <input 
                              {...register(`achievements.${index}`)} 
                              className="input-premium text-sm" 
                              placeholder="e.g. Reduced server latency by 45% through custom caching" 
                            />
                          </div>
                          <button 
                            type="button" 
                            onClick={() => removeAch(index)} 
                            className="p-3 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-xl transition-all"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={() => appendAch('')}
                        className="w-full py-4 border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-xl text-slate-400 font-bold hover:text-indigo-600 hover:border-indigo-400 transition-all flex items-center justify-center gap-2"
                      >
                        <Plus size={18} />
                        Add Achievement
                      </button>
                    </div>
                  )}

                  {/* LANGUAGES */}
                  {activeTab === 'languages' && (
                    <div className="space-y-4">
                      {langFields.map((field, index) => (
                        <div key={field.id} className="grid grid-cols-2 gap-3 bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 relative group">
                          <button 
                            type="button" 
                            onClick={() => removeLang(index)} 
                            className="absolute -top-2 -right-2 p-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-400 hover:text-red-500 rounded-lg shadow-sm opacity-0 group-hover:opacity-100 transition-all"
                          >
                            <Trash2 size={14} />
                          </button>
                          <div>
                            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-tighter mb-1 ml-1">Language</label>
                            <input {...register(`languages.${index}.language`)} className="input-premium text-sm" placeholder="English" />
                          </div>
                          <div>
                            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-tighter mb-1 ml-1">Proficiency</label>
                            <select {...register(`languages.${index}.proficiency`)} className="input-premium text-sm appearance-none">
                              <option value="Native">Native</option>
                              <option value="Fluent">Fluent</option>
                              <option value="Professional">Professional</option>
                              <option value="Conversational">Conversational</option>
                              <option value="Basic">Basic</option>
                            </select>
                          </div>
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={() => appendLang({ language: '', proficiency: 'Fluent' })}
                        className="w-full py-4 border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-xl text-slate-400 font-bold hover:text-indigo-600 hover:border-indigo-400 transition-all flex items-center justify-center gap-2"
                      >
                        <Plus size={18} />
                        Add Language
                      </button>
                    </div>
                  )}

                  {/* HOBBIES */}
                  {activeTab === 'hobbies' && (
                    <div className="space-y-4">
                      {hobFields.map((field, index) => (
                        <div key={field.id} className="flex gap-2 items-start">
                          <div className="flex-grow">
                            <input 
                              {...register(`hobbies.${index}`)} 
                              className="input-premium text-sm" 
                              placeholder="e.g. Photography, Mountain Biking..." 
                            />
                          </div>
                          <button 
                            type="button" 
                            onClick={() => removeHob(index)} 
                            className="p-3 text-slate-400 hover:text-red-500 rounded-xl transition-all"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={() => appendHob('')}
                        className="w-full py-4 border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-xl text-slate-400 font-bold hover:text-indigo-600 hover:border-indigo-400 transition-all flex items-center justify-center gap-2"
                      >
                        <Plus size={18} />
                        Add Hobby
                      </button>
                    </div>
                  )}

                  {/* DESIGN TAB */}
                  {activeTab === 'design' && (
                    <div className="space-y-8">
                      <div className="grid grid-cols-2 gap-6">
                        {Object.keys(templatesMap).map((tLabel) => (
                          <button
                            key={tLabel}
                            type="button"
                            onClick={() => {
                              setValue('selectedTemplate', tLabel);
                              toast(`Switched to ${tLabel} template`, { icon: '✨' });
                            }}
                            className={`p-1 rounded-[2rem] border-4 transition-all relative group overflow-hidden ${
                              formData.selectedTemplate === tLabel
                                ? 'border-indigo-600 shadow-2xl shadow-indigo-600/20'
                                : 'border-white dark:border-slate-800 hover:border-indigo-100'
                            }`}
                          >
                            <div className="bg-slate-100 dark:bg-slate-900 rounded-[1.8rem] aspect-[1/1.4] flex flex-col items-center justify-center relative overflow-hidden">
                              {/* Visual template mock up */}
                              <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity">
                                <LayoutTemplate className="w-full h-full p-10" />
                              </div>
                              <h4 className="text-xl font-black capitalize z-10">{tLabel}</h4>
                              <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 z-10 italic">Premium Design</p>
                              {formData.selectedTemplate === tLabel && (
                                <div className="absolute top-4 right-4 bg-indigo-600 text-white p-2 rounded-full shadow-lg">
                                  <CheckCircle2 size={16} />
                                </div>
                              )}
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* AI REVIEW */}
                  {activeTab === 'aireview' && (
                    <div className="space-y-8 max-w-2xl mx-auto">
                      <AIReviewer resumeData={formData} onApplyFix={handleApplyAIFix} />
                    </div>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Right Panel: Live Preview Section */}
        <section className={`fixed md:relative inset-0 z-40 md:z-0 md:flex flex-col md:w-1/2 lg:w-3/5 bg-slate-200 dark:bg-slate-900 overflow-hidden ${showMobilePreview ? 'flex' : 'hidden'}`}>
          <div className="h-full w-full overflow-y-auto overflow-x-hidden p-4 md:p-12 lg:p-16 scrollbar-hide bg-slate-200 dark:bg-slate-900">
            {/* Real-time sync indicator */}
            <div className="hidden lg:flex absolute top-6 left-6 items-center gap-2 px-3 py-1.5 glass rounded-full z-20">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-600 dark:text-slate-400">Live Preview Synced</span>
            </div>

            <div className="w-[210mm] md:w-full max-w-[210mm] mx-auto min-h-screen">
              <motion.div 
                layout
                className="w-[210mm] bg-white shadow-[0_20px_50px_rgba(0,0,0,0.15)] origin-top mb-40 relative min-h-[297mm] resume-preview-scale"
              >
                <div ref={resumeRef} className="w-full">
                  <SelectedTemplateComponent data={formData} preview={false} />
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      {/* Progress Bar (at the bottom) */}
      <div className="h-1 bg-slate-100 dark:bg-slate-900 w-full relative shrink-0">
        <motion.div 
          className="h-full bg-gradient-to-r from-indigo-600 to-purple-600 shadow-[0_0_10px_rgba(79,70,229,0.5)]"
          initial={{ width: 0 }}
          animate={{ 
            width: `${(sidebarTabs.findIndex(t => t.id === activeTab) + 1) / sidebarTabs.length * 100}%` 
          }}
          transition={{ type: "spring", stiffness: 50 }}
        />
      </div>
    </div>
  );
};

export default ResumeBuilder;
