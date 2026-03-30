import React from 'react';
import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';

import { motion } from 'framer-motion';

const NotFound = () => {
  return (
    <div className="relative min-h-[85vh] flex flex-col items-center justify-center px-4 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[120px] -z-10" />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="glass-card max-w-lg w-full p-12 text-center relative"
      >
        <motion.h1 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8, type: "spring" }}
          className="text-[120px] font-extrabold leading-none tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-indigo-500 to-purple-600 opacity-20 mb-4 select-none"
          style={{ fontFamily: "'Outfit', sans-serif" }}
        >
          404
        </motion.h1>
        
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Lost in Space?</h2>
        <p className="text-slate-500 dark:text-slate-400 mb-10 text-lg">
          The page you're looking for has vanished into the digital void. Let's get you back to building your career.
        </p>
        
        <Link
          to="/"
          className="btn-premium inline-flex items-center space-x-2 group"
        >
          <Home size={20} className="group-hover:-translate-y-0.5 transition-transform" />
          <span>Return to Dashboard</span>
        </Link>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="mt-12 text-slate-400 text-sm font-medium"
      >
        Need help? <a href="mailto:support@careercraftai.io" className="text-indigo-500 hover:underline">Contact Support</a>
      </motion.div>
    </div>
  );
};

export default NotFound;
