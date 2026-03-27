import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useResumeContext } from '../context/ResumeContext';
import { FileText, Plus, Edit2, Trash2, Copy, Eye, Search } from 'lucide-react';

import { motion, AnimatePresence } from 'framer-motion';

const MyResumes = () => {
  const { resumes, fetchResumes, deleteResume, createResume, loading } = useResumeContext();
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchResumes();
  }, [fetchResumes]);

  const handleDelete = async (id) => {
    if (window.confirm('Delete this masterpiece? This action cannot be undone.')) {
      await deleteResume(id);
    }
  };

  const handleDuplicate = async (resume) => {
    const { _id, createdAt, updatedAt, ...rest } = resume;
    const newResume = { ...rest, title: `${resume.title} (Copy)` };
    const created = await createResume(newResume);
    if (created) {
      navigate(`/builder/${created._id}`);
    }
  };

  const filteredResumes = resumes.filter((r) =>
    r.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-12 gap-8"
      >
        <div>
          <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white mb-2" style={{ fontFamily: "'Outfit', sans-serif" }}>
            My Professional Library
          </h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium">Manage and optimize your career blueprints.</p>
        </div>
        
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 w-full lg:w-auto">
          <div className="relative flex-grow min-w-[300px]">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              placeholder="Search by title..."
              className="input-premium w-full pl-12"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Link
            to="/builder"
            className="btn-premium px-8 py-3.5 flex items-center justify-center space-x-3 group shadow-xl shadow-indigo-600/20"
          >
            <Plus size={20} className="group-hover:rotate-90 transition-transform duration-300" />
            <span className="font-bold">New Resume</span>
          </Link>
        </div>
      </motion.div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-32 space-y-4">
          <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin shadow-lg shadow-indigo-600/20"></div>
          <span className="text-slate-500 font-bold text-sm tracking-widest animate-pulse">SYNCING LIBRARY...</span>
        </div>
      ) : filteredResumes.length === 0 ? (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-card p-20 rounded-[3rem] text-center border-dashed border-2 border-slate-200 dark:border-slate-800"
        >
          <div className="w-24 h-24 bg-slate-50 dark:bg-slate-900 rounded-[2rem] flex items-center justify-center mx-auto mb-8 shadow-inner">
            <FileText size={40} className="text-slate-300 dark:text-slate-600" />
          </div>
          <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">No Resumes Found</h3>
          <p className="text-slate-500 dark:text-slate-400 mb-10 max-w-md mx-auto font-medium">
            {searchTerm ? `No results for "${searchTerm}". Try a different search term.` : "Your professional library is empty. Let's build something extraordinary today."}
          </p>
          {!searchTerm && (
            <Link
              to="/builder"
              className="btn-premium px-10 py-4 inline-flex items-center space-x-3 shadow-2xl shadow-indigo-600/20"
            >
              <Plus size={22} />
              <span>Create Your First Masterpiece</span>
            </Link>
          )}
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredResumes.map((resume, index) => (
              <motion.div 
                key={resume._id} 
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="glass-card group rounded-[2rem] overflow-hidden flex flex-col relative"
              >
                <div className="bg-slate-50 dark:bg-slate-900/50 h-56 flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-grid-slate-200/50 dark:bg-grid-slate-700/20 [mask-image:radial-gradient(ellipse_at_center,white,transparent)]" />
                  
                  <motion.div 
                    whileHover={{ scale: 1.1, rotate: -2 }}
                    className="relative z-10 w-28 h-36 bg-white dark:bg-slate-800 rounded-lg shadow-2xl border border-slate-100 dark:border-slate-700 flex items-center justify-center"
                  >
                    <FileText size={40} className="text-indigo-500/30" />
                  </motion.div>

                  <div className="absolute inset-0 bg-indigo-900/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center space-x-4 z-20">
                    <Link to={`/builder/${resume._id}`} className="w-12 h-12 bg-white text-indigo-900 rounded-2xl hover:scale-110 active:scale-95 transition-all flex items-center justify-center shadow-xl" title="Edit">
                      <Edit2 size={20} />
                    </Link>
                    <button onClick={() => handleDuplicate(resume)} className="w-12 h-12 bg-white text-indigo-900 rounded-2xl hover:scale-110 active:scale-95 transition-all flex items-center justify-center shadow-xl" title="Duplicate">
                      <Copy size={20} />
                    </button>
                    <button onClick={() => handleDelete(resume._id)} className="w-12 h-12 bg-red-500 text-white rounded-2xl hover:scale-110 active:scale-95 transition-all flex items-center justify-center shadow-xl" title="Delete">
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>

                <div className="p-8 flex-grow flex flex-col justify-between relative">
                  <div className="absolute top-0 right-8 -translate-y-1/2">
                    <span className="text-[10px] px-3 py-1 bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400 rounded-full font-black border border-slate-100 dark:border-slate-700 shadow-sm uppercase tracking-widest">
                      {resume.selectedTemplate}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-extrabold text-xl mb-2 truncate text-slate-900 dark:text-white" title={resume.title}>
                      {resume.title}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-bold mb-6 flex items-center lowercase tracking-tight">
                      <Eye size={12} className="mr-1.5" />
                      Last modified {new Date(resume.updatedAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                    </p>
                  </div>

                  <div className="flex justify-between items-center mt-auto pt-4 border-t border-slate-50 dark:border-slate-800/50">
                    <div className="flex -space-x-2">
                      {[1, 2].map(i => <div key={i} className="w-6 h-6 rounded-full border-2 border-white dark:border-slate-800 bg-slate-200" />)}
                    </div>
                    <Link
                      to={`/builder/${resume._id}`}
                      className="text-sm font-bold text-indigo-600 hover:text-indigo-500 flex items-center group/link"
                    >
                      Open Studio 
                      <Edit2 size={14} className="ml-1.5 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};

export default MyResumes;
