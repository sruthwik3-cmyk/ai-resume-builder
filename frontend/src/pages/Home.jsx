import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, FileText, Download, LayoutTemplate } from 'lucide-react';
import { motion } from 'framer-motion';

const Home = () => {
  return (
    <div className="w-full">
      <section className="min-h-[85vh] flex flex-col items-center justify-center text-center px-4 pt-20 pb-32 relative overflow-hidden">
        {/* Background glow elements */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl mix-blend-multiply dark:mix-blend-screen pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl mix-blend-multiply dark:mix-blend-screen pointer-events-none" />
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="z-10"
        >
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 text-sm font-semibold mb-6 border border-indigo-100 dark:border-indigo-800">
            <Sparkles size={16} className="mr-2" />
            AI-Powered Career Assistant
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8">
            Create a <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-cyan-500">winning resume</span>
            <br />in minutes.
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed">
            Our AI continuously optimizes your resume for ATS systems and highlights your true potential. Land your dream job faster.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link
              to="/signup"
              className="w-full sm:w-auto px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold text-lg shadow-xl shadow-indigo-600/20 transition-all hover:scale-105"
            >
              Build My Resume Free
            </Link>
            <Link
              to="/templates"
              className="w-full sm:w-auto px-8 py-4 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-900 dark:text-white rounded-xl font-bold text-lg shadow-md transition-all hover:scale-105 border border-gray-200 dark:border-gray-700"
            >
              View Templates
            </Link>
          </div>
        </motion.div>
      </section>

      <section className="py-24 bg-gray-50 dark:bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">How it works</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">Three simple steps to generate a professional resume that gets you hired.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: FileText, title: 'Input your details', desc: 'Fill in your experience, education, and skills. Or import from LinkedIn.' },
              { icon: Sparkles, title: 'AI Optimization', desc: 'Our AI rewrites your summaries and project descriptions to include high-impact keywords.' },
              { icon: Download, title: 'Export & Apply', desc: 'Download your polished, ATS-friendly PDF instantly and start applying.' }
            ].map((f, i) => (
              <div key={i} className="glass p-8 rounded-2xl flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-indigo-100 dark:bg-indigo-900/50 rounded-2xl flex items-center justify-center text-indigo-600 dark:text-indigo-400 mb-6">
                  <f.icon size={32} />
                </div>
                <h3 className="text-xl font-bold mb-3">{f.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
