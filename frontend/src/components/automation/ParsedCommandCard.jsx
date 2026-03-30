import React from 'react';
import { Eye, Settings, Search, Globe, MapPin, Hash } from 'lucide-react';
import { motion } from 'framer-motion';

const ParsedCommandCard = ({ parsed }) => {
  if (!parsed) return null;

  const items = [
    { label: 'Platform', value: parsed.platform, icon: <Globe size={14} /> },
    { label: 'Role', value: parsed.jobRole, icon: <Search size={14} /> },
    { label: 'Location', value: parsed.location, icon: <MapPin size={14} /> },
    { label: 'Limit', value: `${parsed.limit} Results`, icon: <Hash size={14} /> },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-100 dark:border-slate-800 shadow-sm"
    >
      <div className="flex items-center gap-2 mb-6">
        <div className="p-1.5 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 rounded-lg">
          <Settings size={16} />
        </div>
        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Interpretation Engine</span>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {items.map((item, i) => (
          <div key={i} className="flex flex-col gap-1">
            <div className="flex items-center gap-1.5 text-[9px] font-black text-slate-400 uppercase tracking-widest">
              {item.icon}
              {item.label}
            </div>
            <div className="font-bold text-slate-800 dark:text-slate-200 text-xs truncate">
              {item.value || 'Detecting...'}
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default ParsedCommandCard;
