import React from 'react';
import { Download, FileText, LayoutDashboard, Database } from 'lucide-react';
import { motion } from 'framer-motion';

const ExportButtons = ({ onExport, isLoading }) => {
  return (
    <div className="flex gap-4">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        disabled={isLoading}
        onClick={() => onExport('csv')}
        className="flex items-center gap-2 px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest bg-indigo-600 text-white shadow-lg shadow-indigo-600/20 hover:bg-indigo-700 transition-all disabled:opacity-50"
      >
        <Download size={16} />
        Export CSV
      </motion.button>
      
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        disabled={isLoading}
        onClick={() => onExport('json')}
        className="flex items-center gap-2 px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:border-indigo-500 transition-all shadow-sm disabled:opacity-50"
      >
        <Database size={16} />
        Download JSON
      </motion.button>
    </div>
  );
};

export default ExportButtons;
