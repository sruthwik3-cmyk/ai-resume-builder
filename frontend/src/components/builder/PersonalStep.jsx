import React from 'react';
import { User, Camera } from 'lucide-react';
import AIAssistant from '../AIAssistant';

const PersonalStep = ({ register, formData, setValue, handlePhotoUpload }) => {
  return (
    <div className="space-y-8 animate-fade-in-up">
      {/* Photo Upload Section */}
      <div className="flex flex-col items-center gap-6 p-8 bg-neutral-900/50 rounded-[2.5rem] border border-neutral-800 shadow-sm">
        <div className="relative group">
          <div className="w-40 h-40 rounded-full border-4 border-neutral-800 overflow-hidden bg-neutral-950 flex items-center justify-center transition-all group-hover:border-cyan-500/50">
            {formData.personalInfo?.photo ? (
              <img src={formData.personalInfo.photo} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <User size={64} className="text-neutral-700" />
            )}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <Camera className="text-white" size={32} />
            </div>
          </div>
          <input
            type="file"
            accept="image/*"
            onChange={handlePhotoUpload}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
        </div>
        <div className="text-center">
          <h3 className="text-lg font-black text-white">Profile Picture</h3>
          <p className="text-[10px] text-neutral-500 font-black mt-2 uppercase tracking-widest">Recommended: Square, JPG/PNG, max 2MB</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="md:col-span-2">
          <label className="block text-xs font-black mb-2 text-neutral-500 uppercase tracking-widest">Full Name</label>
          <div className="flex gap-4">
            <input {...register('personalInfo.firstName')} className="input-premium flex-1" placeholder="Jane" />
            <input {...register('personalInfo.lastName')} className="input-premium flex-1" placeholder="Doe" />
          </div>
        </div>
        <div className="md:col-span-2">
          <label className="block text-xs font-black mb-2 text-neutral-500 uppercase tracking-widest">Target Job Role</label>
          <input {...register('personalInfo.jobTitle')} className="input-premium" placeholder="Senior Product Designer" />
        </div>
        <div>
          <label className="block text-xs font-black mb-2 text-neutral-500 uppercase tracking-widest">Email Address</label>
          <input {...register('personalInfo.email')} className="input-premium" placeholder="jane.doe@example.com" />
        </div>
        <div>
          <label className="block text-xs font-black mb-2 text-neutral-500 uppercase tracking-widest">Phone Number</label>
          <input {...register('personalInfo.phone')} className="input-premium" placeholder="+91 98765 43210" />
        </div>
        <div className="md:col-span-2">
          <label className="block text-xs font-black mb-2 text-neutral-500 uppercase tracking-widest">Address / Location</label>
          <input {...register('personalInfo.address')} className="input-premium" placeholder="Mumbai, India" />
        </div>
        
        {/* Professional Summary */}
        <div className="md:col-span-2 pt-8 border-t border-neutral-900">
          <label className="block text-xs font-black mb-4 text-neutral-500 uppercase tracking-widest">Professional Summary</label>
          <div className="relative group">
            <textarea
              {...register('summary')}
              rows={6}
              className="input-premium text-base min-h-[180px] resize-none pb-12"
              placeholder="Experienced Software Engineer with a passion for building human-centric products..."
            />
            <div className="absolute right-4 bottom-4">
               <AIAssistant 
                section="summary" 
                value={formData.summary} 
                onApply={(text) => setValue('summary', text)} 
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalStep;
