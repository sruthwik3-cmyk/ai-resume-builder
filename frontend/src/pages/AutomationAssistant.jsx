import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Terminal, Search, Zap, History, Download, Play, 
  CheckCircle2, AlertCircle, Loader2, Sparkles, 
  ArrowRight, Filter, Database, Share2
} from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../services/api';

// Components
import CommandInput from '../components/automation/CommandInput';
import SuggestedCommands from '../components/automation/SuggestedCommands';
import JobResultsTable from '../components/automation/JobResultsTable';
import AutomationStatusCard from '../components/automation/AutomationStatusCard';
import ParsedCommandCard from '../components/automation/ParsedCommandCard';
import ExportButtons from '../components/automation/ExportButtons';
import { useNavigate } from 'react-router-dom';

const AutomationAssistant = () => {
  const navigate = useNavigate();
  const [command, setCommand] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);
  const [results, setResults] = useState([]);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    fetchHistory();
  }, []);

  // Polling for task status if running
  useEffect(() => {
    let interval;
    if (isRunning && currentTask?._id) {
      interval = setInterval(async () => {
        try {
          const res = await api.get(`/automation/${currentTask._id}`);
          if (res.data.task.status === 'completed' || res.data.task.status === 'failed') {
            setIsRunning(false);
            setCurrentTask(res.data.task);
            setResults(res.data.task.results || []);
            fetchHistory(); // Refresh history
            if (res.data.task.status === 'completed') {
              toast.success('Automation task completed successfully!');
            } else {
              toast.error('Automation task failed.');
            }
          }
        } catch (err) {
          console.error('Polling error:', err);
        }
      }, 3000);
    }
    return () => clearInterval(interval);
  }, [isRunning, currentTask]);

  const fetchHistory = async () => {
    try {
      const res = await api.get('/automation/history');
      setHistory(res.data.history);
    } catch (err) {
      console.error('Error fetching history:', err);
    }
  };

  const handleRunCommand = async (e) => {
    e?.preventDefault();
    if (!command.trim()) return;

    setIsRunning(true);
    setResults([]);
    setCurrentTask(null);

    try {
      const res = await api.post('/automation/run', { command });
      setCurrentTask(res.data.task);
      toast.loading('Analyzing command & initiating browser...', { id: 'auto-task' });
    } catch (err) {
      setIsRunning(false);
      toast.error('Failed to start automation', { id: 'auto-task' });
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

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 md:px-8 bg-slate-50 dark:bg-slate-950">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="p-2 bg-indigo-600 rounded-lg text-white">
                <Zap size={20} />
              </div>
              <span className="text-xs font-black uppercase tracking-[0.2em] text-indigo-600">CareerCraft Engine</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-slate-900 dark:text-white">
              Automation <span className="text-indigo-600">Assistant</span>
            </h1>
            <p className="text-slate-500 dark:text-slate-400 font-bold mt-4 max-w-2xl">
              Control the web with local intelligence. Use natural language to search jobs, extract data, and automate your career growth.
            </p>
          </div>
          <div className="flex gap-3">
            <button 
              onClick={() => navigate('/automation/history')}
              className="flex items-center gap-2 px-6 py-3 rounded-2xl font-bold text-sm bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:border-indigo-500 transition-all shadow-sm"
            >
              <History size={18} />
              View Archives
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Command Entry */}
          <div className="lg:col-span-4 space-y-8">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="glass-card p-8 rounded-[2.5rem] border-none shadow-xl"
            >
              <h3 className="text-lg font-black mb-6 flex items-center gap-2">
                <Terminal size={20} className="text-indigo-600" />
                Command Center
              </h3>
              
              <CommandInput 
                value={command}
                onChange={setCommand}
                onSubmit={handleRunCommand}
                disabled={isRunning}
              />

              {currentTask?.parsedCommand && (
                <div className="mt-8">
                  <ParsedCommandCard parsed={currentTask.parsedCommand} />
                </div>
              )}

              <SuggestedCommands onSelect={(cmd) => setCommand(cmd)} />
            </motion.div>

            {currentTask && (
              <AutomationStatusCard task={currentTask} isRunning={isRunning} />
            )}
          </div>

          {/* Right Column: Execution & Results */}
          <div className="lg:col-span-8 space-y-8">
            <AnimatePresence mode="wait">
              {results.length > 0 ? (
                <motion.div
                  key="results"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="glass-card p-8 rounded-[2.5rem] border-none shadow-xl min-h-[500px]"
                >
                  <div className="flex items-center justify-between mb-8">
                    <div>
                      <h3 className="text-2xl font-black tracking-tight italic">Extracted Listings</h3>
                      <p className="text-sm font-bold text-slate-500 mt-1">Found {results.length} relevant opportunities</p>
                    </div>
                    <ExportButtons 
                      onExport={(type) => type === 'csv' ? handleExport(currentTask?._id) : toast.success('JSON export ready')}
                      isLoading={isRunning}
                    />
                  </div>

                  <JobResultsTable results={results} />
                </motion.div>
              ) : isRunning ? (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="glass-card p-20 rounded-[2.5rem] border-none shadow-xl flex flex-col items-center justify-center text-center min-h-[500px]"
                >
                  <div className="relative mb-8">
                    <div className="w-24 h-24 border-4 border-indigo-600/20 rounded-full animate-pulse" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Loader2 className="animate-spin text-indigo-600" size={40} />
                    </div>
                    <Sparkles className="absolute -top-2 -right-2 text-amber-500 animate-bounce" size={24} />
                  </div>
                  <h3 className="text-2xl font-black mb-2 italic">Executing Platform Scans...</h3>
                  <p className="text-slate-500 font-bold max-w-xs mx-auto">
                    Interpretive engine is navigating through job portals and extracting structured data.
                  </p>
                  
                  {/* Progress Indicators */}
                  <div className="mt-12 w-full max-w-sm space-y-4">
                    {['Analyzing Intent', 'Launching Headless Browser', 'Extracting Page Content'].map((step, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <div className={`w-2 h-2 rounded-full ${i === 0 ? 'bg-indigo-600' : 'bg-slate-200 dark:bg-slate-800'}`} />
                        <span className={`text-xs font-black uppercase tracking-widest ${i === 0 ? 'text-indigo-600' : 'text-slate-400'}`}>
                          {step}
                        </span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="glass-card p-20 rounded-[2.5rem] border-none shadow-xl flex flex-col items-center justify-center text-center min-h-[500px]"
                >
                  <div className="w-20 h-20 bg-slate-100 dark:bg-slate-900 rounded-3xl flex items-center justify-center text-slate-300 dark:text-slate-700 mb-8 border border-slate-200 dark:border-slate-800">
                    <Database size={40} />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Ready for Extraction</h3>
                  <p className="text-slate-500 font-medium max-w-xs mx-auto italic">
                    Enter a command on the left to start your automated career journey.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* History Section */}
        <section id="history-section" className="mt-20">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-black tracking-tight">Automation <span className="text-indigo-600">History</span></h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {history.map((task) => (
              <motion.div
                key={task._id}
                whileHover={{ y: -5 }}
                className="glass-card p-6 rounded-3xl border-none shadow-lg group"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                    task.status === 'completed' ? 'bg-emerald-100 text-emerald-600' : 
                    task.status === 'failed' ? 'bg-red-100 text-red-600' : 'bg-amber-100 text-amber-600'
                  }`}>
                    {task.status}
                  </div>
                  <span className="text-[10px] font-bold text-slate-400">{new Date(task.createdAt).toLocaleDateString()}</span>
                </div>
                <h4 className="font-bold text-slate-800 dark:text-white mb-2 line-clamp-2 italic">"{task.command}"</h4>
                <div className="flex items-center gap-4 mt-6 pt-6 border-t border-slate-100 dark:border-slate-900">
                  <div className="text-center flex-1">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Results</p>
                    <p className="font-black text-indigo-600">{task.results?.length || 0}</p>
                  </div>
                  <div className="text-center flex-1">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Source</p>
                    <p className="font-black">{task.parsedCommand?.platform || 'Unknown'}</p>
                  </div>
                </div>
                <div className="flex gap-2 mt-6 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button 
                    onClick={() => {
                      setResults(task.results);
                      setCurrentTask(task);
                      setCommand(task.command);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="flex-1 py-2 bg-slate-100 dark:bg-slate-900 text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-indigo-600 hover:text-white transition-all"
                  >
                    Load Data
                  </button>
                  {task.status === 'completed' && (
                    <button 
                      onClick={() => handleExport(task._id)}
                      className="p-2 bg-slate-100 dark:bg-slate-900 rounded-xl hover:text-indigo-600 transition-all"
                    >
                      <Download size={16} />
                    </button>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default AutomationAssistant;
