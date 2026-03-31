import React, { useState } from 'react';
import { CheckCircle2, Download, Edit3, FileText, Linkedin, Mail, Sparkles, Wand2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ATSScoreGauge from '../ATSScoreGauge';

const ResultsDashboard = ({ resumeData, onEdit, onExport, templateComponent: TemplateComponent }) => {
  const [activeTab, setActiveTab] = useState('resume');
  const score = 74; // Mock score for now

  const tabs = [
    { id: 'resume', label: 'Resume', icon: <FileText size={18} /> },
    { id: 'cover', label: 'Cover Letter', icon: <Mail size={18} />, premium: true },
    { id: 'linkedin', label: 'LinkedIn About', icon: <Linkedin size={18} />, premium: true },
  ];

  const checklist = [
    { label: 'Contact information', done: true },
    { label: 'Professional summary', done: true },
    { label: 'Experience section', done: true },
    { label: 'Skills section', done: true },
    { label: 'Education section', done: true },
    { label: 'Single column format', done: true },
    { label: 'Text-based PDF export', done: true },
    { label: 'Job description keywords', done: false, tip: 'Add job description for +20 ATS points' },
  ];

  return (
    <div className="w-full max-w-5xl mx-auto py-12 px-6 animate-fade-in-up">
      <div className="flex flex-col items-center text-center mb-16">
        <motion.div 
          initial={{ scale: 0 }} 
          animate={{ scale: 1 }} 
          className="w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-500 mb-6"
        >
          <CheckCircle2 size={32} />
        </motion.div>
        <h2 className="text-4xl font-black text-white mb-12 tracking-tight">Your documents are ready</h2>
        
        <div className="flex flex-col items-center gap-4 mb-16">
           <ATSScoreGauge score={score} />
           <p className="text-sm font-bold text-amber-500 tracking-wide mt-2">
             Good — add a job description to reach 94
           </p>
        </div>

        <div className="w-full max-w-lg space-y-4 mb-20 text-left">
          {checklist.map((item, i) => (
            <div key={i} className="flex items-start gap-4 p-4 rounded-2xl bg-neutral-900/30 border border-neutral-900/50">
              <div className={`mt-1 h-5 w-5 rounded-full flex items-center justify-center ${item.done ? 'bg-emerald-500/20 text-emerald-500' : 'bg-neutral-800 text-neutral-600'}`}>
                <CheckCircle2 size={14} />
              </div>
              <div>
                <p className={`text-sm font-black uppercase tracking-widest ${item.done ? 'text-white' : 'text-neutral-600'}`}>
                  {item.label}
                </p>
                {item.tip && (
                  <button className="text-[10px] font-black text-amber-500 uppercase tracking-widest mt-1 hover:text-amber-400 transition-colors">
                    {item.tip}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tabs & Preview */}
      <div className="w-full space-y-8">
        <div className="flex justify-center border-b border-neutral-900 mb-12">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative px-8 py-6 text-sm font-black uppercase tracking-widest transition-colors ${
                activeTab === tab.id ? 'text-cyan-400' : 'text-neutral-500 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                {tab.icon}
                {tab.label}
              </div>
              {activeTab === tab.id && (
                <motion.div 
                  layoutId="activeTab" 
                  className="absolute bottom-0 left-0 right-0 h-1 bg-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.5)]" 
                />
              )}
            </button>
          ))}
        </div>

        <div className="relative group">
          {/* Main Action Buttons */}
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 flex items-center gap-4 z-40 opacity-0 group-hover:opacity-100 transition-opacity translate-y-4 group-hover:translate-y-0 duration-300">
            <button 
              onClick={onEdit}
              className="flex items-center gap-2 px-6 py-3 bg-neutral-900 border border-neutral-800 text-white rounded-xl font-black text-xs uppercase tracking-widest hover:border-cyan-500/50 transition-all shadow-2xl"
            >
              <Edit3 size={14} /> Edit Content
            </button>
            <button 
              onClick={onExport}
              className="flex items-center gap-2 px-8 py-3 bg-cyan-400 text-black rounded-xl font-black text-xs uppercase tracking-widest hover:scale-105 transition-all shadow-2xl shadow-cyan-400/20"
            >
              <Download size={14} /> Download PDF — ₹49
            </button>
          </div>

          {/* Document Content Canvas */}
          <div className="p-10 md:p-20 bg-neutral-900/20 rounded-[3rem] border border-neutral-900">
            {activeTab === 'resume' ? (
              <div className="relative shadow-2xl rounded-lg overflow-hidden transform group-hover:scale-[1.01] transition-transform duration-500">
                <TemplateComponent data={resumeData} />
                <div className="absolute top-6 right-6">
                   <button onClick={onEdit} className="p-3 bg-white text-black rounded-full shadow-xl hover:scale-110 transition-all opacity-0 group-hover:opacity-100">
                     <Edit3 size={18} />
                   </button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-40 text-center space-y-6">
                <div className="w-20 h-20 rounded-full bg-cyan-400/10 flex items-center justify-center text-cyan-400">
                  <Sparkles size={32} />
                </div>
                <h3 className="text-2xl font-black text-white capitalize">Unlock your {activeTab.replace('-', ' ')}</h3>
                <p className="text-neutral-500 max-w-sm font-bold">
                  Get a high-impact cover letter and LinkedIn summary tailored perfectly to your resume.
                </p>
                <button className="px-10 py-5 bg-cyan-400 text-black rounded-xl font-black text-sm uppercase tracking-widest hover:scale-105 transition-all shadow-cyan-400/10">
                  Upgrade to Professional — ₹99
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultsDashboard;
