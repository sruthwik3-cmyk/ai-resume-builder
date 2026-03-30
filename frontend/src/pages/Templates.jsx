import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useResumeContext } from '../context/ResumeContext';
import ModernTemplate from '../templates/ModernTemplate';
import MinimalTemplate from '../templates/MinimalTemplate';
import CreativeTemplate from '../templates/CreativeTemplate';
import AtsTemplate from '../templates/AtsTemplate';
import ExecutiveTemplate from '../templates/ExecutiveTemplate';
import ClassicTemplate from '../templates/ClassicTemplate';
import { Check, Edit3, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const mockData = {
  personalInfo: { firstName: 'Jane', lastName: 'Doe', jobTitle: 'Senior Software Architect', email: 'jane.doe@careercraftai.io', phone: '+1 234 567 8900', address: 'San Francisco, CA', photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200&h=200' },
  summary: 'Architecting high-performance distributed systems with 10+ years of expertise. Proven track record in scaling cloud infrastructures and leading cross-functional engineering teams to deliver world-class SaaS solutions.',
  education: [{ institution: 'Stanford University', degree: 'M.S.', fieldOfStudy: 'Computer Science', startDate: '2015', endDate: '2017' }],
  experience: [{ title: 'Principal Engineer', company: 'CloudScale AI', location: 'San Francisco', startDate: '2020', endDate: 'Present', current: true, description: 'Designed core microservices architecture handling 1M+ req/sec.\nOptimized database performance by 65% using advanced caching strategies.' }],
  skills: ['System Design', 'React / Next.js', 'Node.js', 'Kubernetes', 'AWS', 'GraphQL'],
  projects: [{ name: 'Enterprise AI Core', description: 'Internal AI platform for automating complex workflow orchestration.', technologies: ['Python', 'TensorFlow', 'Go'] }],
  certifications: [{ name: 'AWS Certified Solutions Architect - Professional', issuer: 'Amazon Web Services', date: '2023' }, { name: 'Google Cloud Professional Cloud Architect', issuer: 'Google', date: '2022' }],
  achievements: ['Won Top Engineer of the Year at CloudScale (2022)', 'Increased system availability from 99.9% to 99.99%', 'Mentored 15+ junior developers to senior positions'],
  languages: [{ language: 'English', proficiency: 'Native' }, { language: 'German', proficiency: 'Professional Working' }, { language: 'French', proficiency: 'Conversational' }],
  hobbies: ['Competitive Chess', 'Amateur Astronomy', 'Hiking', 'Playing Jazz Piano'],
};

const templates = [
  { id: 'modern', name: 'Modern Pro', Component: ModernTemplate, tag: 'Popular' },
  { id: 'minimal', name: 'Minimalist Clean', Component: MinimalTemplate, tag: 'Elegant' },
  { id: 'creative', name: 'Nexus Creative', Component: CreativeTemplate, tag: 'Bold' },
  { id: 'ats', name: 'ATS Optimized', Component: AtsTemplate, tag: 'Reliable' },
  { id: 'executive', name: 'Executive Suite', Component: ExecutiveTemplate, tag: 'High-End' },
  { id: 'classic', name: 'Classic Traditional', Component: ClassicTemplate, tag: 'Academic' },
];

const Templates = () => {
  const navigate = useNavigate();
  const { createResume } = useResumeContext();
  const [selectedTemplate, setSelectedTemplate] = useState('modern');
  const [loading, setLoading] = useState(false);

  const handleUseTemplate = async () => {
    setLoading(true);
    const resume = await createResume({
      title: `My ${templates.find(t => t.id === selectedTemplate)?.name} Resume`,
      selectedTemplate,
    });
    setLoading(false);
    if (resume) {
      navigate(`/builder/${resume._id}`);
    }
  };

  return (
    <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <div className="inline-flex items-center px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 text-xs font-bold mb-4 border border-indigo-100 dark:border-indigo-800/50">
          <Sparkles size={12} className="mr-2" />
          Designer Documentation
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-6" style={{ fontFamily: "'Outfit', sans-serif" }}>
          Choose Your Canvas
        </h1>
        <p className="text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto font-medium">
          Select a designer-grade template. Every pixel is optimized for impact and ATS compatibility.
        </p>
      </motion.div>

      <div className="flex flex-col xl:flex-row gap-12 items-start">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="w-full xl:w-[380px] space-y-4 shrink-0"
        >
          <h2 className="text-xs font-black mb-6 uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">
            Professional Library
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-1 gap-3">
            {templates.map((t) => (
              <button
                key={t.id}
                onClick={() => setSelectedTemplate(t.id)}
                className={`group relative w-full text-left p-5 rounded-2xl transition-all border-2 overflow-hidden ${
                  selectedTemplate === t.id
                    ? 'border-indigo-600 bg-white dark:bg-slate-900 shadow-xl shadow-indigo-600/10'
                    : 'border-transparent bg-slate-50 dark:bg-slate-800/40 hover:bg-white dark:hover:bg-slate-800'
                }`}
              >
                <div className="flex justify-between items-center relative z-10">
                  <div className="flex flex-col">
                    <span className={`text-sm font-bold ${selectedTemplate === t.id ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-600 dark:text-slate-400'}`}>
                      {t.name}
                    </span>
                    <span className="text-[10px] uppercase tracking-widest font-black opacity-40 mt-1">{t.tag}</span>
                  </div>
                  {selectedTemplate === t.id && (
                    <motion.div layoutId="check" className="bg-indigo-600 text-white p-1 rounded-lg">
                      <Check size={14} />
                    </motion.div>
                  )}
                </div>
              </button>
            ))}
          </div>
          
          <div className="pt-8">
            <button
              onClick={handleUseTemplate}
              disabled={loading}
              className="btn-premium w-full py-5 text-lg shadow-2xl shadow-indigo-600/30 flex justify-center items-center group overflow-hidden"
            >
              <AnimatePresence mode="wait">
                {loading ? (
                  <motion.div 
                    key="loader"
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin" 
                  />
                ) : (
                  <motion.div 
                    key="text"
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    className="flex items-center"
                  >
                    <Edit3 size={22} className="mr-3 group-hover:rotate-12 transition-transform" /> 
                    <span>Create with this Template</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="w-full flex-grow relative group"
        >
          <div className="bg-slate-100 dark:bg-slate-900/80 p-6 md:p-12 rounded-[2rem] overflow-hidden shadow-inner border border-slate-200 dark:border-slate-800 flex items-center justify-center min-h-[850px] relative">
            <div className="absolute inset-0 bg-grid-slate-200/50 dark:bg-grid-slate-700/20 [mask-image:radial-gradient(ellipse_at_center,white,transparent)]" />
            
            <motion.div 
              key={selectedTemplate}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", damping: 20 }}
              className="w-full max-w-[210mm] bg-white text-black shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] scale-[0.45] sm:scale-[0.65] lg:scale-[0.8] xl:scale-[0.75] 2xl:scale-[0.9] origin-center h-auto min-h-[297mm] rounded-sm sticky top-0"
            >
              {templates.map((t) => (
                <div key={t.id} className={selectedTemplate === t.id ? 'block' : 'hidden'}>
                  <t.Component data={mockData} preview={true} />
                </div>
              ))}
            </motion.div>
          </div>
          
          <div className="absolute -bottom-4 right-8 bg-white dark:bg-slate-800 px-6 py-3 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-800 flex items-center space-x-3 pointer-events-none">
            <div className="flex -space-x-2">
              {[1,2,3].map(i => <div key={i} className="w-8 h-8 rounded-full border-2 border-white dark:border-slate-800 bg-slate-200" />)}
            </div>
            <span className="text-xs font-bold text-slate-500">12k+ people used this design</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Templates;
