import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useResumeContext } from '../context/ResumeContext';
import { FileText, Plus, Clock, Star, TrendingUp, Zap, ChevronRight, MoreVertical, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const Dashboard = () => {
  const { user } = useAuth();
  const { resumes, fetchResumes, loading } = useResumeContext();

  useEffect(() => {
    fetchResumes();
  }, [fetchResumes]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-2">
              Hello, <span className="text-indigo-600 dark:text-indigo-400">{user?.name?.split(' ')[0] || 'Pro'}</span>!
            </h1>
            <p className="text-slate-500 dark:text-slate-400 font-bold text-lg">
              Ready to land your next big role?
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <Link
              to="/builder"
              className="btn-premium flex items-center gap-2 px-8 py-4 group"
            >
              <Plus size={20} className="group-hover:rotate-90 transition-transform duration-300" />
              <span>Create New Resume</span>
            </Link>
          </motion.div>
        </div>

        {/* Stats Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
        >
          {[
            { 
              icon: <FileText size={24} />, 
              label: "Active Drafts", 
              value: resumes.length, 
              gradient: "from-blue-600 to-indigo-600", 
              trend: "Ready to export" 
            },
            { 
              icon: <TrendingUp size={24} />, 
              label: "Audit Score", 
              value: "92 / 100", 
              gradient: "from-emerald-600 to-teal-600", 
              trend: "Top 5% of users" 
            },
            { 
              icon: <Zap size={24} />, 
              label: "Automation Tasks", 
              value: "8", 
              gradient: "from-amber-500 to-orange-600", 
              trend: "Boosted visibility" 
            }
          ].map((stat, i) => (
            <motion.div 
              key={i}
              variants={itemVariants}
              whileHover={{ y: -8, scale: 1.02 }}
              className="glass-card p-8 rounded-[2.5rem] relative overflow-hidden group border-none shadow-[0_20px_50px_rgba(0,0,0,0.05)]"
            >
              <div className={`absolute top-0 left-0 w-2 h-full bg-gradient-to-b ${stat.gradient}`} />
              <div className="flex justify-between items-start mb-6">
                <div className={`p-4 rounded-2xl bg-gradient-to-br ${stat.gradient} text-white shadow-xl shadow-indigo-600/10`}>
                  {stat.icon}
                </div>
                <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest bg-slate-50 dark:bg-slate-900/50 px-3 py-1.5 rounded-xl border border-slate-100 dark:border-slate-800">
                  {stat.trend}
                </div>
              </div>
              <div>
                <p className="text-slate-500 dark:text-slate-400 font-bold mb-1 uppercase tracking-[0.15em] text-[10px]">{stat.label}</p>
                <h3 className="text-4xl font-black text-slate-900 dark:text-white" style={{ fontFamily: "'Outfit', sans-serif" }}>{stat.value}</h3>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Recent Resumes */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mb-10 flex items-center justify-between"
        >
          <div>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white flex items-center gap-3">
              Recent Studio Projects
              <span className="w-2 h-2 rounded-full bg-indigo-600 animate-pulse" />
            </h2>
          </div>
          <Link to="/resumes" className="btn-premium py-2 px-6 text-xs flex items-center gap-2 group">
            All Projects <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-24 space-y-4">
            <div className="w-10 h-10 border-4 border-indigo-600/20 border-t-indigo-600 rounded-full animate-spin"></div>
            <span className="text-[10px] font-black text-slate-400 tracking-widest animate-pulse uppercase">Syncing Dashboard</span>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {resumes.length > 0 ? (
              resumes.slice(0, 2).map((resume, idx) => (
                <motion.div 
                  key={resume._id} 
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: idx * 0.1 }}
                  whileHover={{ y: -10 }}
                  className="glass-card group rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all relative border-none"
                >
                  <div className="bg-slate-50 dark:bg-slate-900/80 h-52 flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-grid-slate-200/50 dark:bg-grid-slate-700/20 [mask-image:radial-gradient(ellipse_at_center,white,transparent)]" />
                    <FileText size={70} className="text-slate-200 dark:text-slate-800 transition-transform group-hover:scale-110 duration-700" />
                    
                    <div className="absolute inset-0 bg-indigo-900/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center z-20">
                      <Link to={`/builder/${resume._id}`} className="btn-premium px-6 py-2.5 text-xs">
                        Resume Studio
                      </Link>
                    </div>
                  </div>
                  <div className="p-8 pb-10">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="font-extrabold text-xl truncate text-slate-900 dark:text-white group-hover:text-indigo-600 transition-colors" style={{ fontFamily: "'Outfit', sans-serif" }}>
                        {resume.title || "Elite Professional"}
                      </h3>
                    </div>
                    <div className="flex items-center gap-3 text-slate-400 font-bold text-[10px] uppercase tracking-[0.2em] mb-8">
                      <Clock size={12} />
                      Modified {new Date(resume.updatedAt).toLocaleDateString()}
                    </div>
                    <div className="flex justify-between items-center bg-slate-50 dark:bg-slate-900/50 p-4 rounded-2xl border border-slate-100 dark:border-slate-800">
                      <div className="flex flex-col">
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">Layout</span>
                        <span className="text-xs font-bold text-slate-700 dark:text-slate-300">{resume.selectedTemplate || 'Modern'} PRO</span>
                      </div>
                      <Link
                        to={`/builder/${resume._id}`}
                        className="w-10 h-10 rounded-xl bg-white dark:bg-slate-800 flex items-center justify-center text-indigo-600 shadow-sm border border-slate-100 dark:border-slate-700 hover:scale-110 transition-transform"
                      >
                        <ArrowRight size={18} />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-card p-12 rounded-[3.5rem] text-center border-dashed border-2 border-slate-200 dark:border-slate-800 flex flex-col items-center col-span-1 md:col-span-2"
              >
                <div className="w-20 h-20 bg-slate-50 dark:bg-slate-900/50 rounded-[2.5rem] flex items-center justify-center mb-6 shadow-inner">
                  <Plus size={32} className="text-slate-300 dark:text-slate-600" />
                </div>
                <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-2">Build Your First Resume</h3>
                <p className="text-slate-500 dark:text-slate-400 mb-8 max-w-sm font-medium">Your creative studio is ready. Let's start building your next big career move.</p>
                <Link
                  to="/builder"
                  className="btn-premium px-10 py-4 text-sm shadow-2xl"
                >
                  Create Project
                </Link>
              </motion.div>
            )}

            {/* Automation Quick Access Card */}
            <motion.div 
              variants={itemVariants}
              initial="visible"
              whileHover={{ y: -10 }}
              className="glass-card group rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all relative border-none bg-indigo-600 text-white min-h-[350px]"
            >
              <div className="p-8 h-full flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center mb-6">
                    <Zap size={24} className="text-white" />
                  </div>
                  <h3 className="text-2xl font-black mb-4 tracking-tight leading-tight">Automation<br />Studio</h3>
                  <p className="text-white/70 font-bold text-sm mb-8 italic">Control the web with AI. Search jobs effortlessly across platforms.</p>
                </div>
                <Link 
                  to="/automation" 
                  className="w-full py-4 bg-white text-indigo-600 rounded-2xl font-black text-center text-sm shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all"
                >
                  Open Assistant
                </Link>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
