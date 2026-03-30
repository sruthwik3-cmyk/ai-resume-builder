import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

const AutomationStatusCard = ({ task, isRunning }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`p-6 rounded-[2rem] border-2 transition-all ${
        task.status === 'completed' ? 'bg-emerald-50 border-emerald-100 dark:bg-emerald-950/20 dark:border-emerald-900/30' :
        task.status === 'failed' ? 'bg-red-50 border-red-100 dark:bg-red-950/20 dark:border-red-900/30' :
        'bg-amber-50 border-amber-100 dark:bg-amber-950/20 dark:border-amber-900/30'
      }`}
    >
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-sm font-black uppercase tracking-widest text-slate-400">Current Task</h4>
        <div className="flex items-center gap-2">
          {isRunning ? (
            <Loader2 className="animate-spin text-amber-500" size={16} />
          ) : task.status === 'completed' ? (
            <CheckCircle2 className="text-emerald-500" size={16} />
          ) : (
            <AlertCircle className="text-red-500" size={16} />
          )}
        </div>
      </div>
      
      <p className="font-bold text-slate-800 dark:text-white text-sm italic mb-4">
        "{task.command}"
      </p>

      <div className="space-y-4 pt-4 border-t border-black/5 dark:border-white/5">
        <div className="flex justify-between items-center text-xs">
          <span className="font-bold text-slate-500 uppercase tracking-widest">Platform</span>
          <span className="font-black text-indigo-600 underline underline-offset-4">{task.parsedCommand?.platform || 'Detecting...'}</span>
        </div>
        <div className="flex justify-between items-center text-xs">
          <span className="font-bold text-slate-500 uppercase tracking-widest">Status</span>
          <span className={`font-black uppercase tracking-widest ${
            task.status === 'completed' ? 'text-emerald-600' :
            task.status === 'failed' ? 'text-red-600' : 'text-amber-600'
          }`}>{task.status}</span>
        </div>
      </div>
    </motion.div>
  );
};

export default AutomationStatusCard;
