import React from 'react';
import { Zap, Search, LayoutDashboard, Database } from 'lucide-react';
import { motion } from 'framer-motion';

const SuggestedCommands = ({ onSelect }) => {
  const suggestions = [
    { text: "Search Python developer jobs in Hyderabad and save top 10 results", icon: <Search size={14} /> },
    { text: "Find React internships in Bangalore on Internshala", icon: <Search size={14} /> },
    { text: "Search Java jobs on Naukri and export results to CSV", icon: <Search size={14} /> },
    { text: "Search data analyst jobs and list required skills", icon: <Search size={14} /> }
  ];

  return (
    <div className="mt-8 space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <Zap size={14} className="text-amber-500 fill-amber-500" />
        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Smart Templates</span>
      </div>
      <div className="space-y-3">
        {suggestions.map((s, i) => (
          <motion.button
            key={i}
            whileHover={{ x: 5 }}
            onClick={() => onSelect(s.text)}
            className="w-full text-left p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 text-[11px] font-bold text-slate-500 hover:text-indigo-600 hover:border-indigo-100 transition-all flex items-center gap-3"
          >
            <div className="p-1.5 bg-white dark:bg-slate-800 rounded-lg shadow-sm">
              {s.icon}
            </div>
            <span className="line-clamp-1 italic">"{s.text}"</span>
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default SuggestedCommands;
