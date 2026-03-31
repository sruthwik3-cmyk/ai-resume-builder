import React from 'react';
import { Plus, Trash2, Briefcase, Code } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import AIAssistant from '../AIAssistant';

const ExperienceStep = ({ register, control, formData, setValue, appendExp, removeExp, appendProj, removeProj, expFields, projFields }) => {
  return (
    <div className="space-y-12 animate-fade-in-up">
      {/* PROFESSIONAL EXPERIENCE */}
      <section>
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xl font-black text-white uppercase tracking-widest flex items-center gap-3">
            <Briefcase size={24} className="text-cyan-400" />
            Professional Experience
          </h2>
        </div>

        <div className="space-y-6">
          {expFields.map((field, index) => (
            <motion.div 
              key={field.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-neutral-900 border border-neutral-800 p-8 rounded-[2.5rem] relative group"
            >
              <button 
                type="button" 
                onClick={() => removeExp(index)} 
                className="absolute top-6 right-6 p-2 text-neutral-600 hover:text-red-500 hover:bg-red-500/10 rounded-xl transition-all"
              >
                <Trash2 size={20} />
              </button>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-black mb-2 text-neutral-500 uppercase tracking-widest">Job Title</label>
                  <input {...register(`experience.${index}.title`)} className="input-premium" placeholder="Senior Designer" />
                </div>
                <div>
                  <label className="block text-xs font-black mb-2 text-neutral-500 uppercase tracking-widest">Company</label>
                  <input {...register(`experience.${index}.company`)} className="input-premium" placeholder="Google Inc." />
                </div>
                <div>
                  <label className="block text-xs font-black mb-2 text-neutral-500 uppercase tracking-widest">Duration</label>
                  <input {...register(`experience.${index}.duration`)} className="input-premium" placeholder="Jan 2021 – Present" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs font-black mb-2 text-neutral-500 uppercase tracking-widest">Responsibilities</label>
                  <div className="relative group">
                    <textarea 
                      {...register(`experience.${index}.description`)} 
                      rows={5} 
                      className="input-premium text-sm min-h-[150px] resize-none" 
                      placeholder="• Led a team of 5 designers...\n• Increased user engagement by 40%..." 
                    />
                    <div className="absolute right-4 bottom-4">
                      <AIAssistant 
                        section="project" 
                        value={formData.experience[index]?.description} 
                        onApply={(text) => setValue(`experience.${index}.description`, text)} 
                      />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}

          <button
            type="button"
            onClick={() => appendExp({ title: '', company: '', duration: '', description: '' })}
            className="w-full py-6 border-2 border-dashed border-neutral-800 rounded-[2rem] text-neutral-500 font-black uppercase tracking-widest hover:text-cyan-400 hover:border-cyan-400/50 hover:bg-neutral-900/50 transition-all flex items-center justify-center gap-3"
          >
            <Plus size={20} />
            Add Experience
          </button>
        </div>
      </section>

      {/* PROJECTS SECTION */}
      <section className="pt-12 border-t border-neutral-900">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xl font-black text-white uppercase tracking-widest flex items-center gap-3">
            <Code size={24} className="text-cyan-400" />
            Key Projects
          </h2>
        </div>

        <div className="space-y-6">
          {projFields.map((field, index) => (
            <motion.div 
              key={field.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-neutral-900 border border-neutral-800 p-8 rounded-[2.5rem] relative group"
            >
              <button 
                type="button" 
                onClick={() => removeProj(index)} 
                className="absolute top-6 right-6 p-2 text-neutral-600 hover:text-red-500 hover:bg-red-500/10 rounded-xl transition-all"
              >
                <Trash2 size={20} />
              </button>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-black mb-2 text-neutral-500 uppercase tracking-widest">Project Name</label>
                  <input {...register(`projects.${index}.name`)} className="input-premium" placeholder="AI Resume Builder" />
                </div>
                <div>
                  <label className="block text-xs font-black mb-2 text-neutral-500 uppercase tracking-widest">Project Link (Optional)</label>
                  <input {...register(`projects.${index}.link`)} className="input-premium" placeholder="github.com/project" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs font-black mb-2 text-neutral-500 uppercase tracking-widest">Description</label>
                  <div className="relative group">
                    <textarea 
                      {...register(`projects.${index}.description`)} 
                      rows={4} 
                      className="input-premium text-sm min-h-[120px] resize-none" 
                      placeholder="• Architected the frontend...\n• Integrated Gemini Vision..." 
                    />
                    <div className="absolute right-4 bottom-4">
                      <AIAssistant 
                        section="project" 
                        value={formData.projects[index]?.description} 
                        onApply={(text) => setValue(`projects.${index}.description`, text)} 
                      />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}

          <button
            type="button"
            onClick={() => appendProj({ name: '', description: '', link: '' })}
            className="w-full py-6 border-2 border-dashed border-neutral-800 rounded-[2rem] text-neutral-500 font-black uppercase tracking-widest hover:text-cyan-400 hover:border-cyan-400/50 hover:bg-neutral-900/50 transition-all flex items-center justify-center gap-3"
          >
            <Plus size={20} />
            Add Project
          </button>
        </div>
      </section>
    </div>
  );
};

export default ExperienceStep;
