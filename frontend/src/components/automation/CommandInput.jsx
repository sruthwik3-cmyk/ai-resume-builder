import React from 'react';
import { Send, Terminal } from 'lucide-react';
import { motion } from 'framer-motion';

const CommandInput = ({ value, onChange, onSubmit, disabled }) => {
  return (
    <form onSubmit={onSubmit} className="relative">
      <div className="absolute top-4 left-4 text-slate-400 group-focus-within:text-indigo-600 transition-colors">
        <Terminal size={18} />
      </div>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        placeholder="e.g. Search Python developer jobs in Bangalore and save top 10 results"
        className="w-full bg-slate-50 dark:bg-slate-900/50 border-2 border-slate-100 dark:border-slate-800 rounded-3xl p-6 pl-12 text-sm font-bold focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/5 transition-all resize-none min-h-[120px] dark:text-white disabled:opacity-60"
        onKeyDown={(e) => {
          if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            onSubmit();
          }
        }}
      />
      <div className="absolute bottom-4 right-4">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          disabled={disabled || !value.trim()}
          className="p-3 bg-indigo-600 text-white rounded-2xl shadow-lg shadow-indigo-600/20 hover:bg-indigo-700 transition-all disabled:opacity-50"
        >
          <Send size={18} />
        </motion.button>
      </div>
    </form>
  );
};

export default CommandInput;
