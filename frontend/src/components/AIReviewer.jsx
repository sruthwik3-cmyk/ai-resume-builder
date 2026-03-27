import React, { useState } from 'react';
import api from '../services/api';
import { Sparkles, AlertCircle, CheckCircle2, AlertTriangle, PlayCircle, Loader2, ShieldCheck, Zap, Target, ArrowRight } from 'lucide-react';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';

const AIReviewer = ({ resumeData, onApplyFix }) => {
  const [loading, setLoading] = useState(false);
  const [review, setReview] = useState(null);

  const runReview = async () => {
    setLoading(true);
    setReview(null);
    try {
      const response = await api.post('/ai/review-resume', { resumeData });
      setReview(response.data.review);
      toast.success('Resume Audit Complete!', { icon: '🛡️' });
    } catch (error) {
      toast.error(error.response?.data?.message || 'The AI auditor is currently unavailable.');
    } finally {
      setLoading(false);
    }
  };

  const renderFindings = (jsonString) => {
    if (!jsonString) return null;
    
    let findings = [];
    try {
      findings = JSON.parse(jsonString);
    } catch (e) {
      console.error("Failed to parse AI review:", e);
      return <p className="text-rose-500 p-4">Error parsing the AI report. Please try again.</p>;
    }

    return findings.map((finding, idx) => {
      const { severity, message, category, suggestedContent } = finding;
      
      let icon = <CheckCircle2 className="w-5 h-5 text-emerald-500 mr-3 shrink-0" />;
      let cardStyle = "border-emerald-100/50 dark:border-emerald-900/30 bg-emerald-50/30 dark:bg-emerald-900/10";
      let badgeStyle = "bg-emerald-500";
      let badge = severity?.toUpperCase() || "SUCCESS";
      
      if (badge === 'CRITICAL') {
        icon = <AlertCircle className="w-5 h-5 text-rose-500 mr-3 shrink-0" />;
        cardStyle = "border-rose-100/50 dark:border-rose-900/30 bg-rose-50/30 dark:bg-rose-900/10";
        badgeStyle = "bg-rose-500";
      } else if (badge === 'IMPROVEMENT' || badge === 'WARNING') {
        icon = <AlertTriangle className="w-5 h-5 text-amber-500 mr-3 shrink-0" />;
        cardStyle = "border-amber-100/50 dark:border-amber-900/30 bg-amber-50/30 dark:bg-amber-900/10";
        badgeStyle = "bg-amber-500";
      } else {
        badge = "SUGGESTION";
        icon = <Sparkles className="w-5 h-5 text-indigo-500 mr-3 shrink-0" />;
        cardStyle = "border-indigo-100/50 dark:border-indigo-900/30 bg-indigo-50/30 dark:bg-indigo-900/10";
        badgeStyle = "bg-indigo-500";
      }

      return (
        <motion.li 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: idx * 0.1 }}
          key={idx} 
          className={`overflow-hidden rounded-2xl border ${cardStyle} mb-4 flex flex-col`}
        >
          <div className="flex items-start p-4">
            {icon}
            <div className="flex-grow">
              <div className="flex items-center gap-2 mb-1">
                <span className={`text-[8px] font-black uppercase px-2 py-0.5 rounded-full ${badgeStyle} text-white tracking-widest`}>
                  {badge}
                </span>
                {category && (
                  <span className="text-[8px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                    Area: {category}
                  </span>
                )}
              </div>
              <p className="text-sm tracking-tight leading-relaxed text-slate-700 dark:text-slate-200">
                {message}
              </p>
            </div>
          </div>

          {suggestedContent && (
            <div className="bg-white/50 dark:bg-slate-900/50 border-t border-inherit p-4">
              <div className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 mb-2 uppercase tracking-tight flex items-center gap-1.5">
                <Sparkles size={12} />
                Suggested Correction
              </div>
              <div className="text-sm dark:text-slate-300 italic mb-4 leading-relaxed font-medium bg-slate-50/50 dark:bg-slate-800/50 p-3 rounded-lg border border-slate-100 dark:border-slate-800">
                "{suggestedContent}"
              </div>
              <button
                onClick={() => {
                  onApplyFix({ category, suggestedContent });
                  toast.success('Applied to resume!', { icon: '✨' });
                }}
                className="w-full flex items-center justify-center gap-2 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-black uppercase tracking-widest transition-all shadow-lg shadow-indigo-600/20"
              >
                Apply Change
                <ArrowRight size={14} />
              </button>
            </div>
          )}
        </motion.li>
      );
    });
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header Section */}
      <div className="relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600/10 blur-[100px] rounded-full pointer-events-none" />
        
        <div className="glass p-8 rounded-[2.5rem] border border-slate-200/50 dark:border-slate-800/50 shadow-2xl relative">
          <div className="flex items-start justify-between mb-6">
            <div className="p-4 bg-indigo-600 rounded-3xl text-white shadow-xl shadow-indigo-600/30">
              <ShieldCheck size={28} />
            </div>
            <div className="flex gap-2">
              <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-xl text-slate-400">
                <Target size={18} />
              </div>
              <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-xl text-slate-400">
                <Zap size={18} />
              </div>
            </div>
          </div>
          
          <h3 className="text-3xl font-black text-slate-900 dark:text-white uppercase tracking-tighter leading-none mb-3">
            Resume <span className="text-indigo-600">Audit</span>
          </h3>
          <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed max-w-sm mb-8">
            Identify critical gaps, keyword misses, and structural flaws before you apply. 
          </p>
          
          <button
            onClick={runReview}
            disabled={loading}
            className="btn-premium w-full py-4 rounded-2xl flex items-center justify-center gap-3 group/btn shadow-xl shadow-indigo-500/10 hover:shadow-indigo-500/20"
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <PlayCircle className="w-5 h-5 group-hover/btn:scale-110 transition-transform" />
            )}
            <span className="font-black uppercase tracking-[0.2em] text-xs">
              {loading ? 'Performing deep scan...' : 'Initialize System Audit'}
            </span>
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {review && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mt-8 flex-grow"
          >
            <div className="flex items-center justify-between mb-6 px-4">
              <h4 className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-widest flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-indigo-600 rounded-full animate-pulse" />
                Audit Report & Findings
              </h4>
              <span className="text-[10px] font-black text-indigo-500 bg-indigo-50 dark:bg-indigo-900/30 px-2 py-1 rounded-lg uppercase tracking-wider">Gemini 1.5 Flash</span>
            </div>
            
            <ul className="space-y-3 pb-8">
              {renderFindings(review)}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AIReviewer;
