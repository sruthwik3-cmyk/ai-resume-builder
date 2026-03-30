import React from 'react';
import { ExternalLink, Building2, MapPin, Calendar, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const JobResultsTable = ({ results }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-slate-100 dark:border-slate-800">
            <th className="py-4 px-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Position</th>
            <th className="py-4 px-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Company</th>
            <th className="py-4 px-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Location</th>
            <th className="py-4 px-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-50 dark:divide-slate-900">
          <AnimatePresence>
            {results.map((job, i) => (
              <motion.tr 
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="group hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-all"
              >
                <td className="py-5 px-4 font-bold text-slate-900 dark:text-white">
                  <div className="flex flex-col">
                    <span>{job.title}</span>
                    <span className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.05em] mt-1">{job.type || 'Full-Time'}</span>
                  </div>
                </td>
                <td className="py-5 px-4">
                  <div className="flex items-center gap-2 font-bold text-slate-500 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
                    <Building2 size={16} className="text-slate-300" />
                    <span>{job.company}</span>
                  </div>
                </td>
                <td className="py-5 px-4">
                  <div className="flex items-center gap-2 font-bold text-slate-500">
                    <MapPin size={16} className="text-slate-300" />
                    <span>{job.location}</span>
                  </div>
                </td>
                <td className="py-5 px-4">
                  <a 
                    href={job.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-3 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-800 rounded-xl text-slate-400 hover:text-indigo-600 hover:border-indigo-400 transition-all shadow-sm"
                  >
                    <ExternalLink size={16} />
                  </a>
                </td>
              </motion.tr>
            ))}
          </AnimatePresence>
        </tbody>
      </table>
    </div>
  );
};

export default JobResultsTable;
