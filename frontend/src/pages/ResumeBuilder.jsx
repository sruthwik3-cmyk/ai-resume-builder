import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm, useFieldArray } from 'react-hook-form';
import { useResumeContext } from '../context/ResumeContext';
import { Download, Save, ArrowLeft, Plus, Trash2, LayoutTemplate } from 'lucide-react';
import toast from 'react-hot-toast';
import html2pdf from 'html2pdf.js';

import ModernTemplate from '../templates/ModernTemplate';
import MinimalTemplate from '../templates/MinimalTemplate';
import CreativeTemplate from '../templates/CreativeTemplate';
import AtsTemplate from '../templates/AtsTemplate';
import AIAssistant from '../components/AIAssistant';

const templatesMap = {
  modern: ModernTemplate,
  minimal: MinimalTemplate,
  creative: CreativeTemplate,
  ats: AtsTemplate,
};

const ResumeBuilder = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { fetchResumeById, updateResume, createResume, currentResume, setCurrentResume } = useResumeContext();
  const [activeTab, setActiveTab] = useState('personal');
  const [isSaving, setIsSaving] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
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
    }
  });

  const { fields: expFields, append: appendExp, remove: removeExp } = useFieldArray({ control, name: 'experience' });
  const { fields: eduFields, append: appendEdu, remove: removeEdu } = useFieldArray({ control, name: 'education' });
  const { fields: projFields, append: appendProj, remove: removeProj } = useFieldArray({ control, name: 'projects' });

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
      toast.success('Resume saved');
    } else {
      res = await createResume(data);
    }
    setIsSaving(false);
    if (!id && res) {
      navigate(`/builder/${res._id}`);
    }
  };

  const handleExportPDF = () => {
    setIsExporting(true);
    toast('Generating PDF...', { icon: '⏳' });
    
    setTimeout(() => {
      const element = resumeRef.current;
      const opt = {
        margin: 0,
        filename: `${formData.personalInfo?.firstName || 'Resume'}_${formData.personalInfo?.lastName || ''}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
      };

      html2pdf().set(opt).from(element).save().then(() => {
        setIsExporting(false);
        toast.success('PDF Downloaded successfully');
      }).catch(err => {
        console.error(err);
        toast.error('Failed to generate PDF');
        setIsExporting(false);
      });
    }, 500);
  };

  const SelectedTemplateComponent = templatesMap[formData.selectedTemplate] || ModernTemplate;

  const tabs = [
    { id: 'personal', label: 'Personal Info' },
    { id: 'summary', label: 'Summary' },
    { id: 'experience', label: 'Experience' },
    { id: 'education', label: 'Education' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'design', label: 'Design' },
  ];

  return (
    <div className="h-[calc(100vh-64px)] overflow-hidden flex flex-col md:flex-row bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      
      {/* Left Panel: Form */}
      <div className="w-full md:w-1/2 lg:w-2/5 h-full flex flex-col border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950">
        
        {/* Header Actions */}
        <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-800 shadow-sm z-10">
          <button onClick={() => navigate('/resumes')} className="text-gray-500 hover:text-indigo-600 transition-colors p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800">
            <ArrowLeft size={20} />
          </button>
          <input
            {...register('title')}
            className="flex-grow mx-4 px-3 py-1.5 font-bold text-center bg-transparent border border-transparent hover:border-gray-200 dark:hover:border-gray-700 focus:border-indigo-500 rounded outline-none transition-colors"
            placeholder="Resume Title"
          />
          <button 
            onClick={handleSubmit(onSave)}
            disabled={isSaving}
            className="flex items-center space-x-1 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm"
          >
            {isSaving ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-1" /> : <Save size={16} />}
            <span className="hidden sm:inline">Save</span>
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex overflow-x-auto border-b border-gray-200 dark:border-gray-800 scrollbar-hide shrink-0">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`whitespace-nowrap px-5 py-3 text-sm font-medium border-b-2 transition-colors flex-shrink-0 ${
                activeTab === tab.id
                  ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Form Content Area */}
        <div className="flex-grow overflow-y-auto p-6 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-700">
          <form className="space-y-6">
            
            {/* PERSONAL INFO TAB */}
            {activeTab === 'personal' && (
              <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">First Name</label>
                    <input {...register('personalInfo.firstName')} className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50 outline-none focus:ring-2 focus:ring-indigo-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Last Name</label>
                    <input {...register('personalInfo.lastName')} className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50 outline-none focus:ring-2 focus:ring-indigo-500" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Job Title</label>
                  <input {...register('personalInfo.jobTitle')} className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50 outline-none focus:ring-2 focus:ring-indigo-500" placeholder="e.g. Frontend Developer" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Email</label>
                    <input {...register('personalInfo.email')} className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50 outline-none focus:ring-2 focus:ring-indigo-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Phone</label>
                    <input {...register('personalInfo.phone')} className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50 outline-none focus:ring-2 focus:ring-indigo-500" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Address / Location</label>
                  <input {...register('personalInfo.address')} className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50 outline-none focus:ring-2 focus:ring-indigo-500" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">LinkedIn URL</label>
                    <input {...register('socialLinks.linkedin')} className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50 outline-none focus:ring-2 focus:ring-indigo-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">GitHub URL</label>
                    <input {...register('socialLinks.github')} className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50 outline-none focus:ring-2 focus:ring-indigo-500" />
                  </div>
                </div>
              </div>
            )}

            {/* SUMMARY TAB */}
            {activeTab === 'summary' && (
              <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
                <label className="block text-sm font-medium mb-1">Professional Summary</label>
                <textarea
                  {...register('summary')}
                  rows={6}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50 outline-none focus:ring-2 focus:ring-indigo-500 resize-none leading-relaxed"
                  placeholder="Briefly describe your professional background and key strengths..."
                />
                
                <AIAssistant 
                  section="summary" 
                  value={formData.summary} 
                  onApply={(text) => setValue('summary', text)} 
                />
              </div>
            )}

            {/* EXPERIENCE TAB */}
            {activeTab === 'experience' && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                {expFields.map((field, index) => (
                  <div key={field.id} className="relative p-5 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50/50 dark:bg-gray-800/20 group">
                    <button type="button" onClick={() => removeExp(index)} className="absolute top-4 right-4 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Trash2 size={18} />
                    </button>
                    <h4 className="font-bold mb-4 text-indigo-700 dark:text-indigo-400">Experience #{index + 1}</h4>
                    
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-xs font-medium mb-1">Job Title</label>
                        <input {...register(`experience.${index}.title`)} className="w-full px-3 py-2 rounded border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 focus:ring-1 focus:ring-indigo-500 outline-none text-sm" />
                      </div>
                      <div>
                        <label className="block text-xs font-medium mb-1">Company</label>
                        <input {...register(`experience.${index}.company`)} className="w-full px-3 py-2 rounded border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 focus:ring-1 focus:ring-indigo-500 outline-none text-sm" />
                      </div>
                      <div>
                        <label className="block text-xs font-medium mb-1">Start Date</label>
                        <input {...register(`experience.${index}.startDate`)} placeholder="MM/YYYY" className="w-full px-3 py-2 rounded border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 focus:ring-1 focus:ring-indigo-500 outline-none text-sm" />
                      </div>
                      <div>
                        <label className="block text-xs font-medium mb-1">End Date</label>
                        <input {...register(`experience.${index}.endDate`)} placeholder="MM/YYYY or Present" className="w-full px-3 py-2 rounded border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 focus:ring-1 focus:ring-indigo-500 outline-none text-sm" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-medium mb-1">Description</label>
                      <textarea {...register(`experience.${index}.description`)} rows={4} className="w-full px-3 py-2 rounded border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 focus:ring-1 focus:ring-indigo-500 outline-none text-sm leading-relaxed" placeholder="• Led development of..." />
                      
                      <div className="mt-2">
                        <AIAssistant 
                          section="project" 
                          value={formData.experience[index]?.description} 
                          onApply={(text) => setValue(`experience.${index}.description`, text)} 
                        />
                      </div>
                    </div>
                  </div>
                ))}

                <button
                  type="button"
                  onClick={() => appendExp({ title: '', company: '', startDate: '', endDate: '', description: '', current: false })}
                  className="w-full py-3 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl text-gray-500 hover:text-indigo-600 hover:border-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-all font-medium flex items-center justify-center"
                >
                  <Plus size={18} className="mr-2" /> Add Experience
                </button>
              </div>
            )}

            {/* EDUCATION TAB */}
            {activeTab === 'education' && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                {eduFields.map((field, index) => (
                  <div key={field.id} className="relative p-5 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50/50 dark:bg-gray-800/20 group">
                    <button type="button" onClick={() => removeEdu(index)} className="absolute top-4 right-4 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Trash2 size={18} />
                    </button>
                    <h4 className="font-bold mb-4 text-indigo-700 dark:text-indigo-400">Education #{index + 1}</h4>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-xs font-medium mb-1">Institution</label>
                        <input {...register(`education.${index}.institution`)} className="w-full px-3 py-2 rounded border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 outline-none text-sm" />
                      </div>
                      <div>
                        <label className="block text-xs font-medium mb-1">Degree</label>
                        <input {...register(`education.${index}.degree`)} className="w-full px-3 py-2 rounded border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 outline-none text-sm" />
                      </div>
                      <div>
                        <label className="block text-xs font-medium mb-1">Field of Study</label>
                        <input {...register(`education.${index}.fieldOfStudy`)} className="w-full px-3 py-2 rounded border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 outline-none text-sm" />
                      </div>
                      <div className="flex gap-2">
                         <div className="w-1/2">
                           <label className="block text-xs font-medium mb-1">Start Year</label>
                           <input {...register(`education.${index}.startDate`)} className="w-full px-3 py-2 rounded border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 outline-none text-sm" />
                         </div>
                         <div className="w-1/2">
                           <label className="block text-xs font-medium mb-1">End Year</label>
                           <input {...register(`education.${index}.endDate`)} className="w-full px-3 py-2 rounded border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 outline-none text-sm" />
                         </div>
                      </div>
                    </div>
                  </div>
                ))}
                
                <button
                  type="button"
                  onClick={() => appendEdu({ institution: '', degree: '', fieldOfStudy: '', startDate: '', endDate: '' })}
                  className="w-full py-3 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl text-gray-500 hover:text-indigo-600 hover:border-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-all font-medium flex items-center justify-center"
                >
                  <Plus size={18} className="mr-2" /> Add Education
                </button>
              </div>
            )}

            {/* SKILLS TAB */}
            {activeTab === 'skills' && (
              <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
                <label className="block text-sm font-medium mb-1">Skills (comma separated)</label>
                <textarea
                  value={formData.skills?.join(', ') || ''}
                  onChange={(e) => {
                    const skillsArray = e.target.value.split(',').map(s => s.trim()).filter(Boolean);
                    setValue('skills', skillsArray);
                  }}
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50 outline-none focus:ring-2 focus:ring-indigo-500 resize-none font-mono text-sm leading-relaxed"
                  placeholder="React, Node.js, Project Management, Graphic Design..."
                />
                
                <AIAssistant 
                  section="skills" 
                  contextData={formData.personalInfo}
                  onApply={(newSkills) => {
                    // newSkills might be an array or string
                    let toAdd = Array.isArray(newSkills) ? newSkills : [newSkills];
                    const current = formData.skills || [];
                    const updated = [...new Set([...current, ...toAdd])];
                    setValue('skills', updated);
                  }} 
                />
              </div>
            )}

            {/* PROJECTS TAB */}
            {activeTab === 'projects' && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                {projFields.map((field, index) => (
                  <div key={field.id} className="relative p-5 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50/50 dark:bg-gray-800/20 group">
                    <button type="button" onClick={() => removeProj(index)} className="absolute top-4 right-4 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Trash2 size={18} />
                    </button>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-xs font-medium mb-1">Project Name</label>
                        <input {...register(`projects.${index}.name`)} className="w-full px-3 py-2 rounded border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 outline-none text-sm" />
                      </div>
                      <div>
                        <label className="block text-xs font-medium mb-1">Project Link / URL</label>
                        <input {...register(`projects.${index}.link`)} className="w-full px-3 py-2 rounded border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 outline-none text-sm" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-medium mb-1">Description</label>
                      <textarea {...register(`projects.${index}.description`)} rows={3} className="w-full px-3 py-2 rounded border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 outline-none text-sm leading-relaxed" />
                    </div>
                  </div>
                ))}
                
                <button
                  type="button"
                  onClick={() => appendProj({ name: '', description: '', link: '', technologies: [] })}
                  className="w-full py-3 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl text-gray-500 hover:text-indigo-600 hover:border-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-all font-medium flex items-center justify-center"
                >
                  <Plus size={18} className="mr-2" /> Add Project
                </button>
              </div>
            )}

            {/* DESIGN TAB */}
            {activeTab === 'design' && (
              <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
                <h3 className="font-medium text-lg mb-4">Select Template</h3>
                <div className="grid grid-cols-2 lg:grid-cols-2 gap-4">
                  {['modern', 'minimal', 'creative', 'ats'].map((tLabel) => (
                    <button
                      key={tLabel}
                      type="button"
                      onClick={() => setValue('selectedTemplate', tLabel)}
                      className={`p-4 rounded-xl border-2 capitalize font-bold transition-all flex flex-col items-center justify-center space-y-2 h-24 ${
                        formData.selectedTemplate === tLabel
                          ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400'
                          : 'border-gray-200 dark:border-gray-700 hover:border-indigo-300 text-gray-500'
                      }`}
                    >
                      <LayoutTemplate size={24} />
                      <span>{tLabel}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

          </form>
        </div>
      </div>

      {/* Right Panel: Live Preview */}
      <div className="hidden md:flex flex-col w-1/2 lg:w-3/5 h-full bg-gray-200 dark:bg-gray-800 relative shadow-inner">
        {/* Preview Header Actions */}
        <div className="absolute top-4 right-6 z-10 flex space-x-3">
          <button
            onClick={handleExportPDF}
            disabled={isExporting}
            className="flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-lg shadow-indigo-600/30"
          >
            {isExporting ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <Download size={16} />}
            <span>Download PDF</span>
          </button>
        </div>
        
        <div className="flex-grow overflow-auto p-8 flex justify-center items-start scrollbar-thin scrollbar-thumb-gray-400 dark:scrollbar-thumb-gray-600">
          {/* A4 Paper wrapper */}
          <div className="w-[210mm] min-h-[297mm] shadow-2xl bg-white origin-top shrink-0 mb-10 transition-all duration-300">
             <div ref={resumeRef} className="w-full h-full">
               <SelectedTemplateComponent data={formData} preview={false} />
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilder;
