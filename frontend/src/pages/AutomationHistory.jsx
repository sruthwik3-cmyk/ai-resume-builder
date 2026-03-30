import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  History, Calendar, Search, Download, Trash2, 
  ChevronRight, Filter, Database, AlertCircle, Clock
} from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../services/api';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const AutomationHistory = () => {
  const [history, setHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    setIsLoading(true);
    try {
      const res = await api.get('/automation/history');
      setHistory(res.data.history);
    } catch (err) {
      toast.error('Failed to load history');
    } finally {
      setIsLoading(false);
    }
  };

  const handleExport = async (taskId) => {
    try {
      const response = await api.get(`/automation/export/${taskId}`, { responseType: 'blob' });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `job_results_${taskId}.csv`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      toast.error('Export failed');
    }
  };

  const filteredHistory = filter === 'all' 
    ? history 
    : history.filter(h => h.status === filter);

  return (
    <div className="min-h-screen pt-28 pb-20 bg-slate-50 dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <History className="text-indigo-600" size={24} />
              <span className="text-xs font-black uppercase tracking-[0.2em] text-indigo-600">CareerCraft Records</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-slate-900 dark:text-white">
              Task <span className="text-indigo-600">Archives</span>
            </h1>
            <p className="text-slate-500 dark:text-slate-400 font-bold mt-4 italic">
              Manage and review your browser automation history.
            </p>
          </div>
          
          <div className="flex bg-white dark:bg-slate-900 p-1.5 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm">
            {['all', 'completed', 'failed'].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                  filter === f 
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20' 
                    : 'text-slate-500 hover:text-indigo-600'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-32 space-y-4">
            <div className="w-12 h-12 border-4 border-indigo-600/20 border-t-indigo-600 rounded-full animate-spin"></div>
            <span className="text-[10px] font-black text-slate-400 tracking-widest animate-pulse uppercase">Syncing Archives</span>
          </div>
        ) : filteredHistory.length === 0 ? (
          <div className="glass-card p-32 rounded-[3.5rem] border-dashed border-2 border-slate-200 dark:border-slate-800 flex flex-col items-center text-center">
            <div className="w-24 h-24 bg-slate-50 dark:bg-slate-900/50 rounded-[2.5rem] flex items-center justify-center mb-8 shadow-inner">
              <Database size={48} className="text-slate-300 dark:text-slate-600" />
            </div>
            <h3 className="text-3xl font-black text-slate-900 dark:text-white mb-4">Empty Archives</h3>
            <p className="text-slate-500 dark:text-slate-400 mb-10 max-w-sm font-medium">No automation records found matching your filter. Start your first task today.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            <AnimatePresence>
              {filteredHistory.map((task, idx) => (
                <motion.div
                  key={task._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="glass-card p-8 rounded-[2.5rem] group border-none shadow-lg hover:shadow-2xl transition-all"
                >
                  <div className="flex flex-col lg:flex-row justify-between gap-8">
                    <div className="flex-grow">
                      <div className="flex items-center gap-4 mb-4">
                        <div className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${
                          task.status === 'completed' ? 'bg-emerald-100/50 text-emerald-600 dark:bg-emerald-900/20' : 
                          task.status === 'failed' ? 'bg-red-100/50 text-red-600 dark:bg-red-900/20' : 'bg-amber-100/50 text-amber-600 dark:bg-amber-900/20'
                        }`}>
                          {task.status}
                        </div>
                        <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                          <Clock size={14} />
                          {new Date(task.createdAt).toLocaleString()}
                        </div>
                      </div>
                      <h3 className="text-xl md:text-2xl font-black text-slate-900 dark:text-white leading-tight italic">
                        "{task.command}"
                      </h3>
                    </div>

                    <div className="flex flex-wrap lg:flex-nowrap items-center gap-8 lg:border-l border-slate-100 dark:border-slate-800 lg:pl-8">
                      <div className="text-center min-w-[100px]">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 italic">Extracted</p>
                        <p className="text-2xl font-black text-indigo-600">{task.results?.length || 0}</p>
                      </div>
                      
                      <div className="text-center min-w-[100px]">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 italic">Platform</p>
                        <p className="text-2xl font-black text-slate-900 dark:text-white">{task.parsedCommand?.platform || 'Detect'}</p>
                      </div>

                      <div className="flex flex-col gap-2">
                        {task.status === 'completed' && (
                          <button 
                            onClick={() => handleExport(task._id)}
                            className="flex items-center gap-2 px-6 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest bg-indigo-600 text-white shadow-xl shadow-indigo-600/20 hover:bg-indigo-700 transition-all"
                          >
                            <Download size={14} />
                            CSV Export
                          </button>
                        )}
                        <button 
                          onClick={() => {/* Navigate to builder for these jobs */}}
                          className="flex items-center justify-center gap-2 px-6 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:border-indigo-500 transition-all"
                        >
                          Details
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
};

export default AutomationHistory;
