import React from 'react';
import { Plus, Trash2, GraduationCap, Award, Trophy, Globe, Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import AIAssistant from '../AIAssistant';

const SkillsEducationStep = ({ register, setValue, formData, eduFields, appendEdu, removeEdu, achFields, appendAch, removeAch, langFields, appendLang, removeLang }) => {
  return (
    <div className="space-y-12 animate-fade-in-up pb-20">
      {/* SKILLS SECTION */}
      <section>
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xl font-black text-white uppercase tracking-widest flex items-center gap-3">
            <Award size={24} className="text-cyan-400" />
            Skills & Expertise
          </h2>
        </div>

        <div className="bg-neutral-900 border border-neutral-800 p-8 rounded-[2.5rem] relative group">
          <label className="block text-xs font-black mb-4 text-neutral-500 uppercase tracking-widest leading-loose">
            Separate skills with commas (e.g. React, UI/UX, Node.js). Typing enter will also help.
          </label>
          <textarea
            value={formData.skills?.join(', ') || ''}
            onChange={(e) => {
              const skillsArray = e.target.value.split(',').map(s => s.trim()).filter(Boolean);
              setValue('skills', skillsArray);
            }}
            rows={5}
            className="input-premium text-base resize-none"
            placeholder="JavaScript, Figma, Strategy, Python..."
          />
          
          <div className="mt-6">
            <AIAssistant 
              section="skills" 
              contextData={formData.personalInfo}
              onApply={(newSkills) => {
                let toAdd = Array.isArray(newSkills) ? newSkills : [newSkills];
                const current = formData.skills || [];
                const updated = [...new Set([...current, ...toAdd])];
                setValue('skills', updated);
              }} 
            />
          </div>

          {formData.skills && formData.skills.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-8">
              {formData.skills.map((skill, i) => (
                <motion.span 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  key={i} 
                  className="px-4 py-2 bg-neutral-950 border border-neutral-800 text-cyan-400 rounded-xl font-black text-[10px] uppercase tracking-widest flex items-center gap-3 transition-colors hover:border-cyan-500/50"
                >
                  {skill}
                  <button 
                    type="button" 
                    onClick={() => setValue('skills', formData.skills.filter((_, idx) => idx !== i))}
                    className="text-neutral-600 hover:text-red-500 transition-colors"
                  >
                    <Plus size={14} className="rotate-45" />
                  </button>
                </motion.span>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* EDUCATION SECTION */}
      <section className="pt-12 border-t border-neutral-900">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xl font-black text-white uppercase tracking-widest flex items-center gap-3">
            <GraduationCap size={24} className="text-cyan-400" />
            Education
          </h2>
        </div>

        <div className="space-y-6">
          {eduFields.map((field, index) => (
            <motion.div 
              key={field.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-neutral-900 border border-neutral-800 p-8 rounded-[2.5rem] relative group"
            >
              <button type="button" onClick={() => removeEdu(index)} className="absolute top-6 right-6 p-2 text-neutral-600 hover:text-red-500 hover:bg-neutral-950 rounded-xl transition-all">
                <Trash2 size={20} />
              </button>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-xs font-black mb-2 text-neutral-500 uppercase tracking-widest">Institution / University</label>
                  <input {...register(`education.${index}.institution`)} className="input-premium" placeholder="Stanford University" />
                </div>
                <div>
                  <label className="block text-xs font-black mb-2 text-neutral-500 uppercase tracking-widest">Degree & Field of Study</label>
                  <input {...register(`education.${index}.degree`)} className="input-premium" placeholder="B.Tech in Computer Science" />
                </div>
                <div>
                  <label className="block text-xs font-black mb-2 text-neutral-500 uppercase tracking-widest">Year of Completion</label>
                  <input {...register(`education.${index}.duration`)} className="input-premium" placeholder="2020" />
                </div>
              </div>
            </motion.div>
          ))}
          
          <button
            type="button"
            onClick={() => appendEdu({ institution: '', degree: '', duration: '', description: '' })}
            className="w-full py-6 border-2 border-dashed border-neutral-800 rounded-[2rem] text-neutral-500 font-black uppercase tracking-widest hover:text-cyan-400 hover:border-cyan-400/50 hover:bg-neutral-900/50 transition-all flex items-center justify-center gap-3"
          >
            <Plus size={20} />
            Add Education
          </button>
        </div>
      </section>

      {/* ADDITIONAL SECTIONS (Achievements, Languages) */}
      <section className="pt-12 border-t border-neutral-900 grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Achievements */}
        <div>
          <h3 className="text-sm font-black text-white uppercase tracking-[0.2em] mb-6 flex items-center gap-3">
             <Trophy size={18} className="text-cyan-400" />
             Achievements
          </h3>
          <div className="space-y-3">
            {achFields.map((field, index) => (
              <div key={field.id} className="flex gap-2 items-center">
                <input {...register(`achievements.${index}`)} className="input-premium text-xs" placeholder="Winner of Hackathon 2024" />
                <button type="button" onClick={() => removeAch(index)} className="p-2 text-neutral-600 hover:text-red-500"><Trash2 size={16} /></button>
              </div>
            ))}
            <button onClick={() => appendAch('')} className="w-full py-3 border border-dashed border-neutral-800 rounded-xl text-[10px] font-black text-neutral-600 uppercase tracking-widest hover:text-cyan-400 hover:border-cyan-400/30 transition-all">
               + Add Achievement
            </button>
          </div>
        </div>

        {/* Languages */}
        <div>
          <h3 className="text-sm font-black text-white uppercase tracking-[0.2em] mb-6 flex items-center gap-3">
             <Globe size={18} className="text-cyan-400" />
             Languages
          </h3>
          <div className="space-y-3">
            {langFields.map((field, index) => (
              <div key={field.id} className="flex gap-2 items-center">
                <input {...register(`languages.${index}.language`)} className="input-premium text-xs" placeholder="English (Native)" />
                <button type="button" onClick={() => removeLang(index)} className="p-2 text-neutral-600 hover:text-red-500"><Trash2 size={16} /></button>
              </div>
            ))}
            <button onClick={() => appendLang({ language: '' })} className="w-full py-3 border border-dashed border-neutral-800 rounded-xl text-[10px] font-black text-neutral-600 uppercase tracking-widest hover:text-cyan-400 hover:border-cyan-400/30 transition-all">
               + Add Language
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SkillsEducationStep;
