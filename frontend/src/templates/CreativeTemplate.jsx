import React from 'react';
import { Mail, Phone, MapPin, Linkedin, Github } from 'lucide-react';

const CreativeTemplate = ({ data, preview = false }) => {
  const fs = preview ? 'text-[9px]' : 'text-[12px]';
  const headingFs = preview ? 'text-[10px]' : 'text-xs';
  const nameFs = preview ? 'text-xl' : 'text-3xl';
  const subFs = preview ? 'text-[8px]' : 'text-[10px]';

  return (
    <div 
      className={`bg-white text-slate-800 ${fs} font-sans max-w-[21cm] min-h-[29.7cm] mx-auto overflow-hidden flex`} 
      id="resume-preview"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      {/* ========= LEFT SIDEBAR ========= */}
      <div className={`w-[35%] bg-slate-900 text-white ${preview ? 'p-5' : 'p-8'} flex flex-col shrink-0`}>
        
        {/* Name & Title */}
        <div className="mb-6">
          <h1 className={`${nameFs} font-bold text-white leading-tight mb-1`}>
            {data.personalInfo?.firstName}<br/>
            <span className="text-indigo-400">{data.personalInfo?.lastName}</span>
          </h1>
          {data.personalInfo?.jobTitle && (
            <p className={`${subFs} text-slate-400 uppercase tracking-[0.2em] mt-2 font-semibold`}>
              {data.personalInfo.jobTitle}
            </p>
          )}
        </div>

        {/* Contact */}
        <div className="mb-6">
          <h3 className={`${subFs} font-bold text-indigo-400 uppercase tracking-wider mb-2 border-b border-white/10 pb-1`}>Contact</h3>
          <div className="space-y-2">
            {data.personalInfo?.email && (
              <div className="flex items-center gap-2"><Mail size={10} className="text-indigo-400 shrink-0" /><span className={`${subFs} text-slate-300 break-all`}>{data.personalInfo.email}</span></div>
            )}
            {data.personalInfo?.phone && (
              <div className="flex items-center gap-2"><Phone size={10} className="text-indigo-400 shrink-0" /><span className={`${subFs} text-slate-300`}>{data.personalInfo.phone}</span></div>
            )}
            {data.personalInfo?.address && (
              <div className="flex items-center gap-2"><MapPin size={10} className="text-indigo-400 shrink-0" /><span className={`${subFs} text-slate-300`}>{data.personalInfo.address}</span></div>
            )}
            {data.socialLinks?.linkedin && (
              <div className="flex items-center gap-2"><Linkedin size={10} className="text-indigo-400 shrink-0" /><span className={`${subFs} text-slate-300 break-all`}>{data.socialLinks.linkedin.replace('https://', '')}</span></div>
            )}
            {data.socialLinks?.github && (
              <div className="flex items-center gap-2"><Github size={10} className="text-indigo-400 shrink-0" /><span className={`${subFs} text-slate-300 break-all`}>{data.socialLinks.github.replace('https://', '')}</span></div>
            )}
          </div>
        </div>

        {/* Skills */}
        {data.skills && data.skills.length > 0 && (
          <div className="mb-6">
            <h3 className={`${subFs} font-bold text-indigo-400 uppercase tracking-wider mb-2 border-b border-white/10 pb-1`}>Skills</h3>
            <div className="flex flex-wrap gap-1.5">
              {data.skills.map((skill, index) => (
                <span key={index} className={`${subFs} text-slate-300 bg-white/10 px-2 py-0.5 rounded`}>
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Education */}
        {data.education && data.education.length > 0 && (
          <div className="mt-auto">
            <h3 className={`${subFs} font-bold text-indigo-400 uppercase tracking-wider mb-2 border-b border-white/10 pb-1`}>Education</h3>
            <div className="space-y-3">
              {data.education.map((edu, index) => (
                <div key={index}>
                  <p className={`font-bold text-white ${subFs}`}>
                    {edu.degree}{edu.fieldOfStudy ? ` in ${edu.fieldOfStudy}` : ''}
                  </p>
                  <p className={`${subFs} text-slate-400`}>{edu.institution}</p>
                  <p className={`${subFs} text-slate-500`}>
                    {edu.startDate}{edu.endDate ? ` — ${edu.endDate}` : ''}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ========= MAIN CONTENT ========= */}
      <div className={`w-[65%] ${preview ? 'p-5' : 'p-8'} flex flex-col`}>
        
        {/* Summary */}
        {data.summary && (
          <section className="mb-5">
            <h3 className={`${headingFs} font-bold text-slate-900 uppercase tracking-wider mb-2 border-b border-slate-200 pb-1`}>
              Summary
            </h3>
            <p className="text-slate-600 leading-relaxed">{data.summary}</p>
          </section>
        )}

        {/* Experience */}
        {data.experience && data.experience.length > 0 && (
          <section className="mb-5">
            <h3 className={`${headingFs} font-bold text-slate-900 uppercase tracking-wider mb-3 border-b border-slate-200 pb-1`}>
              Experience
            </h3>
            <div className="space-y-4">
              {data.experience.map((exp, index) => (
                <div key={index}>
                  <div className="flex justify-between items-baseline mb-0.5">
                    <h4 className="font-bold text-slate-900">{exp.title}</h4>
                    <span className={`${subFs} text-slate-400 whitespace-nowrap`}>
                      {exp.startDate} — {exp.current ? 'Present' : exp.endDate}
                    </span>
                  </div>
                  <p className={`${subFs} text-indigo-600 font-semibold mb-1`}>
                    {exp.company}{exp.location ? `, ${exp.location}` : ''}
                  </p>
                  {exp.description && (
                    <ul className="list-disc list-outside pl-4 text-slate-600 space-y-0.5 leading-relaxed">
                      {exp.description.split('\n').filter(Boolean).map((line, i) => (
                        <li key={i}>{line.replace(/^[-•]\s*/, '')}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Projects */}
        {data.projects && data.projects.length > 0 && (
          <section className="mb-5">
            <h3 className={`${headingFs} font-bold text-slate-900 uppercase tracking-wider mb-3 border-b border-slate-200 pb-1`}>
              Projects
            </h3>
            <div className="space-y-3">
              {data.projects.map((proj, index) => (
                <div key={index}>
                  <h4 className="font-bold text-slate-900">{proj.name}</h4>
                  {proj.description && (
                    <ul className="list-disc list-outside pl-4 text-slate-600 space-y-0.5 leading-relaxed">
                      {proj.description.split('\n').filter(Boolean).map((line, i) => (
                        <li key={i}>{line.replace(/^[-•]\s*/, '')}</li>
                      ))}
                    </ul>
                  )}
                  {proj.technologies && proj.technologies.length > 0 && (
                    <p className={`${subFs} text-slate-400 mt-0.5`}>
                      <span className="font-semibold">Tech:</span> {proj.technologies.join(', ')}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default CreativeTemplate;
