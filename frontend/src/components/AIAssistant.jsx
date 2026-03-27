import React, { useState } from 'react';
import { Sparkles, Check, X, Loader2, Wand2, Lightbulb, Zap, RefreshCcw, Plus } from 'lucide-react';
import api from '../services/api';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';

const AIAssistant = ({ section, value, onApply, contextData }) => {
  const [loading, setLoading] = useState(false);
  const [suggestion, setSuggestion] = useState(null);
  const [skillsList, setSkillsList] = useState([]);
  
  const handleEnhanceSummary = async () => {
    if (!value || value.length < 3) {
      toast.error('Write a draft first so I can enhance it!', { icon: '✍️' });
      return;
    }
    
    setLoading(true);
    try {
      const { data } = await api.post('/ai/improve-summary', { summary: value });
      setSuggestion(data.improvedSummary);
      toast.success('Professional summary generated!', { icon: '✨' });
    } catch (error) {
      toast.error('AI was unable to process this request.');
    } finally {
      setLoading(false);
    }
  };

  const handleEnhanceProject = async () => {
    if (!value || value.length < 3) {
      toast.error('Add some project details first!');
      return;
    }
    
    setLoading(true);
    try {
      const { data } = await api.post('/ai/improve-project', { description: value });
      setSuggestion(data.improvedDescription);
      toast.success('Optimized for impact!', { icon: '🚀' });
    } catch (error) {
      toast.error('Enhancement failed.');
    } finally {
      setLoading(false);
    }
  };

  const handleSuggestSkills = async () => {
    if (!contextData?.jobTitle) {
      toast.error('Job Title is missing from Personal Info!');
      return;
    }
    
    setLoading(true);
    try {
      const { data } = await api.post('/ai/suggest-skills', { role: contextData.jobTitle });
      setSkillsList(data.suggestions);
      toast.success('Market-relevant skills found!');
    } catch (error) {
      toast.error('Skill suggestions failed.');
    } finally {
      setLoading(false);
    }
  };

  const applyText = () => {
    onApply(suggestion);
    setSuggestion(null);
  };

  const addSkill = (skill) => {
    onApply(skill);
  };

  return (
    <div className="glass px-6 py-5 rounded-[2rem] border border-indigo-100/50 dark:border-indigo-900/30 shadow-xl mt-6 relative overflow-hidden group">
      {/* Background Glow */}
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-indigo-500/5 blur-[80px] rounded-full group-hover:bg-indigo-500/10 transition-all duration-700" />
      
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-indigo-600 rounded-xl text-white shadow-lg shadow-indigo-600/20">
            <Sparkles size={16} />
          </div>
          <span className="text-sm font-black text-slate-800 dark:text-white uppercase tracking-tighter">Gemini AI Assistant</span>
        </div>
        
        {loading && (
          <div className="flex items-center gap-2 px-3 py-1 bg-indigo-50 dark:bg-indigo-900/40 rounded-full">
            <Loader2 size={12} className="animate-spin text-indigo-600" />
            <span className="text-[10px] font-black text-indigo-600 uppercase">Processing...</span>
          </div>
        ) }
      </div>

      <AnimatePresence mode="wait">
        {!suggestion && skillsList.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            {section === 'summary' && (
              <button
                onClick={handleEnhanceSummary}
                disabled={loading}
                className="btn-premium w-full py-3.5 text-xs flex items-center justify-center gap-2 group/btn"
              >
                <Wand2 size={14} className="group-hover/btn:rotate-12 transition-transform" />
                <span>Rewrite with AI Professionalism</span>
              </button>
            )}

            {(section === 'project' || section === 'education') && (
              <button
                onClick={handleEnhanceProject}
                disabled={loading}
                className="btn-premium w-full py-3.5 text-xs flex items-center justify-center gap-2 group/btn"
              >
                <Zap size={14} className="group-hover/btn:scale-110 transition-transform" />
                <span>Optimize Impact with AI</span>
              </button>
            )}

            {section === 'skills' && (
              <button
                onClick={handleSuggestSkills}
                disabled={loading}
                className="btn-premium w-full py-3.5 text-xs flex items-center justify-center gap-2 group/btn text-purple-600"
              >
                <Lightbulb size={14} className="group-hover/btn:animate-pulse transition-transform" />
                <span>Discover High-Performing Skills</span>
              </button>
            )}
          </motion.div>
        ) : suggestion ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-5 bg-white/70 dark:bg-slate-900/70 border border-emerald-100 dark:border-emerald-900/30 rounded-2xl shadow-inner relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-1 bg-emerald-500 text-white rounded-bl-xl shadow-md">
              <Sparkles size={10} />
            </div>
            
            <p className="text-sm text-slate-700 dark:text-slate-300 whitespace-pre-wrap leading-relaxed font-medium italic">
              "{suggestion}"
            </p>
            
            <div className="flex gap-3 mt-5">
              <button
                onClick={applyText}
                className="flex-grow bg-emerald-600 hover:bg-emerald-700 text-white py-2.5 rounded-xl text-xs font-black uppercase tracking-widest flex items-center justify-center gap-2 transition-all shadow-lg shadow-emerald-600/20"
              >
                <Check size={14} />
                Apply changes
              </button>
              <button
                onClick={() => setSuggestion(null)}
                className="px-4 bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-red-500 rounded-xl transition-all"
                title="Discard"
              >
                <X size={16} />
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <div className="flex flex-wrap gap-2">
              {skillsList.map((skill, index) => (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  key={index}
                  onClick={() => addSkill(skill)}
                  className="px-3 py-1.5 bg-indigo-50 dark:bg-indigo-900/30 border border-indigo-100 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300 rounded-xl text-[10px] font-black uppercase tracking-wider flex items-center gap-1.5 hover:bg-indigo-600 hover:text-white transition-all"
                >
                  <Plus size={10} />
                  {skill}
                </motion.button>
              ))}
            </div>
            <div className="flex items-center justify-between border-t border-indigo-50 dark:border-indigo-900/20 pt-3 mt-2">
              <p className="text-[10px] font-black uppercase text-indigo-400">Click to add to your list</p>
              <button 
                onClick={() => setSkillsList([])} 
                className="text-[10px] font-black uppercase text-slate-400 hover:text-red-500 transition-colors flex items-center gap-1"
              >
                <RefreshCcw size={10} />
                Refresh
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AIAssistant;
