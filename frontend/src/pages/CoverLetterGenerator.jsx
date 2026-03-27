import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { useResumeContext } from '../context/ResumeContext';
import { Sparkles, Download, ArrowLeft, Loader2, FileText, CheckCircle2, Wand2, Copy, Trash2, Send } from 'lucide-react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import toast from 'react-hot-toast';
import html2pdf from 'html2pdf.js';
import { motion, AnimatePresence } from 'framer-motion';

const CoverLetterGenerator = () => {
  const { resumes, fetchResumes } = useResumeContext();
  const [selectedResumeId, setSelectedResumeId] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [coverLetter, setCoverLetter] = useState('');
  const [isExporting, setIsExporting] = useState(false);
  
  const letterRef = useRef(null);

  useEffect(() => {
    fetchResumes();
  }, [fetchResumes]);

  const handleGenerate = async () => {
    if (!selectedResumeId) {
      toast.error('Select a resume to guide the AI');
      return;
    }
    if (!jobDescription || jobDescription.length < 20) {
      toast.error('The job description is too short for a quality letter.');
      return;
    }

    const selectedResume = resumes.find(r => r._id === selectedResumeId);
    if (!selectedResume) return;

    setLoading(true);
    try {
      const { data } = await api.post('/ai/generate-cover-letter', {
        resumeData: selectedResume,
        jobDescription
      });
      setCoverLetter(data.coverLetter);
      toast.success('Your tailored letter is ready!', { icon: '✍️' });
    } catch (error) {
      toast.error('Generation failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleExportPDF = () => {
    if (!coverLetter) return;
    setIsExporting(true);
    const id = toast.loading('Exporting High-Quality PDF...');
    
    setTimeout(() => {
      const element = letterRef.current;
      const opt = {
        margin: [20, 20, 20, 20],
        filename: `Cover_Letter_${new Date().getTime()}.pdf`,
        image: { type: 'jpeg', quality: 1 },
        html2canvas: { scale: 3, useCORS: true, letterRendering: true },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
      };

      html2pdf().set(opt).from(element).save().then(() => {
        setIsExporting(false);
        toast.success('Downloaded!', { id });
      }).catch((err) => {
        setIsExporting(false);
        toast.error('Export failed.', { id });
      });
    }, 500);
  };

  return (
    <div className="min-h-screen bg-[#fafafa] dark:bg-slate-950 px-4 sm:px-6 lg:px-8 py-10">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8 h-full min-h-[85vh]">
        
        {/* Left Sidebar: Controls */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-full lg:w-[400px] flex flex-col space-y-6"
        >
          <div className="px-2">
            <Link to="/dashboard" className="group flex items-center text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-indigo-600 transition-colors mb-6">
              <ArrowLeft size={14} className="mr-2 group-hover:-translate-x-1 transition-transform" /> 
              Terminal / Dashboard
            </Link>
            
            <h1 className="text-4xl font-black text-slate-900 dark:text-white uppercase tracking-tighter leading-[0.85] mb-4">
              AI Letter <span className="text-indigo-600">Studio</span>
            </h1>
            <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed max-w-xs">
              Powered by Gemini 2.5 Flash. Fully tailored to your resume and the job requirements.
            </p>
          </div>

          <div className="glass p-8 rounded-[2.5rem] border border-slate-200/60 dark:border-slate-800/60 shadow-2xl flex flex-col flex-grow relative overflow-hidden group">
            {/* Background Glow */}
            <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-indigo-500/5 blur-[80px] rounded-full group-hover:bg-indigo-500/10 transition-all duration-700" />
            
            <div className="space-y-8 relative z-10 flex flex-col h-full">
              <div>
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 px-1">Source Model (Resume)</label>
                <select 
                  className="input-premium w-full !rounded-2xl py-4 appearance-none"
                  value={selectedResumeId}
                  onChange={(e) => setSelectedResumeId(e.target.value)}
                >
                  <option value="" disabled>Select a source resume</option>
                  {resumes.map(r => (
                    <option key={r._id} value={r._id}>{r.title}</option>
                  ))}
                </select>
              </div>

              <div className="flex-grow flex flex-col">
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 px-1">Job Context / Description</label>
                <div className="relative flex-grow flex flex-col">
                  <textarea 
                    className="input-premium w-full flex-grow !rounded-3xl p-5 text-sm resize-none focus:ring-4 ring-indigo-500/5"
                    placeholder="Paste the target role responsibilities and requirements..."
                    value={jobDescription}
                    onChange={(e) => setJobDescription(e.target.value)}
                  />
                  {!jobDescription && (
                    <div className="absolute bottom-5 left-5 pointer-events-none opacity-20">
                      <Send size={14} />
                    </div>
                  )}
                </div>
              </div>

              <button 
                onClick={handleGenerate}
                disabled={loading}
                className="btn-premium w-full py-5 rounded-2xl flex items-center justify-center gap-3 overflow-hidden"
              >
                <AnimatePresence mode="wait">
                  {loading ? (
                    <motion.div
                      key="loader"
                      initial={{ rotate: 0 }}
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    >
                      <Loader2 size={18} />
                    </motion.div>
                  ) : (
                    <motion.div key="icon" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
                      <Sparkles size={18} className="text-white" />
                    </motion.div>
                  )}
                </AnimatePresence>
                <span className="font-black uppercase tracking-widest text-xs">
                  {loading ? 'Synthesizing...' : 'Write Letter'}
                </span>
              </button>
            </div>
          </div>
        </motion.div>

        {/* Right Area: Preview */}
        <div className="flex-grow flex flex-col">
          <div className="flex items-center justify-between mb-6 px-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center shadow-sm">
                <FileText size={18} className="text-indigo-600" />
              </div>
              <div>
                <h2 className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-widest">Document Workspace</h2>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tight">Format: A4 Standard</p>
              </div>
            </div>
            
            <AnimatePresence>
              {coverLetter && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex gap-2"
                >
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(coverLetter);
                      toast.success('Copied to clipboard');
                    }}
                    className="p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl text-slate-400 hover:text-indigo-600 transition-all shadow-sm"
                    title="Copy Text"
                  >
                    <Copy size={16} />
                  </button>
                  <button
                    onClick={handleExportPDF}
                    disabled={isExporting}
                    className="flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl text-xs font-black uppercase tracking-widest transition-all shadow-xl shadow-indigo-600/30 disabled:opacity-50"
                  >
                    <Download size={16} />
                    <span>Export PDF</span>
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="flex-grow glass-dark rounded-[3rem] p-8 lg:p-12 border border-slate-200/50 dark:border-slate-800/10 shadow-inner flex flex-col items-center justify-start overflow-y-auto scroll-premium">
            {!coverLetter && !loading && (
              <div className="flex flex-col items-center justify-center h-full text-center py-20 max-w-sm mx-auto">
                <div className="w-24 h-24 rounded-full bg-slate-100 dark:bg-slate-900 border-4 border-dashed border-slate-200 dark:border-slate-800 flex items-center justify-center mb-8">
                  <Wand2 size={32} className="text-slate-300 dark:text-slate-700" />
                </div>
                <h3 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tighter mb-3">Ready to Create?</h3>
                <p className="text-sm text-slate-500 leading-relaxed italic">
                  "Fill in the details on the left and I'll generate a high-impact cover letter tailored just for you."
                </p>
              </div>
            )}
            
            {loading && (
               <div className="flex flex-col items-center justify-center h-full py-20 text-center">
                 <div className="relative">
                   <div className="w-20 h-20 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin"></div>
                   <div className="absolute inset-0 flex items-center justify-center">
                     <Sparkles size={24} className="text-indigo-600 animate-pulse" />
                   </div>
                 </div>
                 <p className="text-lg font-black text-slate-900 dark:text-white uppercase tracking-widest mt-8 mb-2">Analyzing Data</p>
                 <p className="text-xs text-slate-400 font-bold uppercase tracking-tight">Syncing Resume context with Gemini API...</p>
               </div>
            )}

            {coverLetter && !loading && (
              <motion.div 
                initial={{ opacity: 0, y: 40, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                className="w-full max-w-[800px] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] bg-white dark:bg-white origin-top shrink-0 transition-all duration-500 rounded-lg overflow-hidden border border-slate-100"
              >
                <div 
                  ref={letterRef} 
                  className="w-full p-16 md:p-24 text-slate-900 font-serif text-[17px] leading-[1.8] whitespace-pre-wrap outline-none selection:bg-indigo-100"
                  contentEditable
                  suppressContentEditableWarning
                  onBlur={(e) => setCoverLetter(e.target.innerText)}
                >
                  {coverLetter}
                </div>
              </motion.div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default CoverLetterGenerator;
