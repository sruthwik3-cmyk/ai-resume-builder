import React, { useState } from 'react';
import { Sparkles, Check, X, Loader2 } from 'lucide-react';
import api from '../services/api';
import toast from 'react-hot-toast';

const AIAssistant = ({ section, value, onApply, contextData }) => {
  const [loading, setLoading] = useState(false);
  const [suggestion, setSuggestion] = useState(null);
  const [skillsList, setSkillsList] = useState([]);
  
  const handleEnhanceSummary = async () => {
    if (!value || value.length < 10) {
      toast.error('Please write a brief summary first (at least 10 chars)');
      return;
    }
    
    setLoading(true);
    try {
      const { data } = await api.post('/ai/improve-summary', { summary: value });
      setSuggestion(data.improvedSummary);
    } catch (error) {
      toast.error('Failed to get AI suggestions');
    } finally {
      setLoading(false);
    }
  };

  const handleEnhanceProject = async () => {
    if (!value || value.length < 5) {
      toast.error('Please write a brief description first');
      return;
    }
    
    setLoading(true);
    try {
      const { data } = await api.post('/ai/improve-project', { description: value });
      setSuggestion(data.improvedDescription);
    } catch (error) {
      toast.error('Failed to get AI suggestions');
    } finally {
      setLoading(false);
    }
  };

  const handleSuggestSkills = async () => {
    if (!contextData?.jobTitle) {
      toast.error('Please fill in your Job Title first in Personal Info');
      return;
    }
    
    setLoading(true);
    try {
      const { data } = await api.post('/ai/suggest-skills', { role: contextData.jobTitle });
      setSkillsList(data.suggestions);
    } catch (error) {
      toast.error('Failed to get AI suggestions');
    } finally {
      setLoading(false);
    }
  };

  const applyText = () => {
    onApply(suggestion);
    setSuggestion(null);
  };

  const addSkill = (skill) => {
    onApply(skill); // Assuming onApply for skills handles appending
  };

  return (
    <div className="bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-800 rounded-lg p-4 mt-4">
      <div className="flex items-center text-indigo-700 dark:text-indigo-400 font-medium mb-3">
        <Sparkles size={18} className="mr-2" />
        AI Assistant
      </div>

      {section === 'summary' && !suggestion && (
        <button
          onClick={handleEnhanceSummary}
          disabled={loading}
          className="w-full flex justify-center items-center bg-white dark:bg-gray-800 border border-indigo-200 dark:border-indigo-700 hover:bg-indigo-50 dark:hover:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 py-2 rounded-md transition-colors font-medium text-sm"
        >
          {loading ? <Loader2 size={16} className="animate-spin mr-2" /> : 'Rewrite professionally'}
        </button>
      )}

      {section === 'project' && !suggestion && (
        <button
          onClick={handleEnhanceProject}
          disabled={loading}
          className="w-full flex justify-center items-center bg-white dark:bg-gray-800 border border-indigo-200 dark:border-indigo-700 hover:bg-indigo-50 dark:hover:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 py-2 rounded-md transition-colors font-medium text-sm"
        >
          {loading ? <Loader2 size={16} className="animate-spin mr-2" /> : 'Enhance description'}
        </button>
      )}

      {section === 'skills' && skillsList.length === 0 && (
        <button
          onClick={handleSuggestSkills}
          disabled={loading}
          className="w-full flex justify-center items-center bg-white dark:bg-gray-800 border border-indigo-200 dark:border-indigo-700 hover:bg-indigo-50 dark:hover:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 py-2 rounded-md transition-colors font-medium text-sm"
        >
          {loading ? <Loader2 size={16} className="animate-spin mr-2" /> : 'Suggest skills based on Job Title'}
        </button>
      )}

      {suggestion && (
        <div className="bg-white dark:bg-gray-800 border border-indigo-200 dark:border-indigo-700 p-3 rounded-md shadow-sm">
          <p className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap leading-relaxed">{suggestion}</p>
          <div className="flex space-x-2 mt-3 justify-end">
            <button
              onClick={() => setSuggestion(null)}
              className="p-1 text-gray-400 hover:text-red-500 transition-colors"
              title="Reject"
            >
              <X size={16} />
            </button>
            <button
              onClick={applyText}
              className="p-1 text-green-600 hover:text-green-700 transition-colors"
              title="Apply"
            >
              <Check size={16} />
            </button>
          </div>
        </div>
      )}

      {skillsList.length > 0 && (
        <div className="mt-2 text-sm">
          <p className="text-gray-600 dark:text-gray-400 mb-2">Suggested skills (click to add):</p>
          <div className="flex flex-wrap gap-2">
            {skillsList.map((skill, index) => (
              <button
                key={index}
                onClick={() => addSkill(skill)}
                className="bg-white dark:bg-gray-800 border-indigo-200 dark:border-indigo-700 px-2 py-1 rounded border text-indigo-700 dark:text-indigo-300 hover:bg-indigo-100 transition-colors"
              >
                + {skill}
              </button>
            ))}
          </div>
          <button 
            onClick={() => setSkillsList([])} 
            className="text-xs text-red-500 mt-2 hover:underline"
          >
            Clear Suggestions
          </button>
        </div>
      )}
    </div>
  );
};

export default AIAssistant;
