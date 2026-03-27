import React from 'react';
import { Mail, Phone, MapPin, Linkedin, Github } from 'lucide-react';

const ModernTemplate = ({ data, preview = false }) => {
  const fs = preview ? 'text-[9px]' : 'text-[12px]';
  const headingFs = preview ? 'text-[10px]' : 'text-xs';
  const nameFs = preview ? 'text-xl' : 'text-3xl';
  const subFs = preview ? 'text-[8px]' : 'text-[10px]';

  return (
    <div 
      className={`bg-white text-slate-800 ${preview ? 'p-6' : 'p-10 sm:p-14'} ${fs} font-sans max-w-[21cm] min-h-[29.7cm] mx-auto relative overflow-hidden`} 
      id="resume-preview"
      style={{ fontFamily: "'Inter', 'Segoe UI', sans-serif" }}
    >
      {/* Top Accent Bar */}
      <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-indigo-600 to-blue-500" />

      {/* ========= HEADER ========= */}
      <header className="text-center mb-6 pt-2">
        <h1 className={`${nameFs} font-bold text-slate-900 tracking-tight mb-1`}>
          {data.personalInfo?.firstName} {data.personalInfo?.lastName}
        </h1>
        {data.personalInfo?.jobTitle && (
          <p className={`${subFs} font-semibold text-indigo-600 uppercase tracking-[0.2em] mb-3`}>
            {data.personalInfo.jobTitle}
          </p>
        )}
        
        <div className={`flex flex-wrap justify-center items-center gap-x-4 gap-y-1 ${subFs} text-slate-500`}>
          {data.personalInfo?.email && (
            <span className="flex items-center gap-1">
              <Mail size={10} className="text-indigo-500" />
              {data.personalInfo.email}
            </span>
          )}
          {data.personalInfo?.phone && (
            <span className="flex items-center gap-1">
              <Phone size={10} className="text-indigo-500" />
              {data.personalInfo.phone}
            </span>
          )}
          {data.personalInfo?.address && (
            <span className="flex items-center gap-1">
              <MapPin size={10} className="text-indigo-500" />
              {data.personalInfo.address}
            </span>
          )}
          {data.socialLinks?.linkedin && (
            <span className="flex items-center gap-1">
              <Linkedin size={10} className="text-indigo-500" />
              {data.socialLinks.linkedin.replace('https://', '')}
            </span>
          )}
          {data.socialLinks?.github && (
            <span className="flex items-center gap-1">
              <Github size={10} className="text-indigo-500" />
              {data.socialLinks.github.replace('https://', '')}
            </span>
          )}
        </div>
      </header>

      <hr className="border-slate-200 mb-5" />

      {/* ========= SUMMARY ========= */}
      {data.summary && (
        <section className="mb-5">
          <h3 className={`${headingFs} font-bold text-indigo-600 uppercase tracking-wider mb-2 border-b border-indigo-100 pb-1`}>
            Summary
          </h3>
          <p className="text-slate-600 leading-relaxed">
            {data.summary}
          </p>
        </section>
      )}

      {/* ========= EXPERIENCE ========= */}
      {data.experience && data.experience.length > 0 && (
        <section className="mb-5">
          <h3 className={`${headingFs} font-bold text-indigo-600 uppercase tracking-wider mb-3 border-b border-indigo-100 pb-1`}>
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

      {/* ========= EDUCATION ========= */}
      {data.education && data.education.length > 0 && (
        <section className="mb-5">
          <h3 className={`${headingFs} font-bold text-indigo-600 uppercase tracking-wider mb-3 border-b border-indigo-100 pb-1`}>
            Education
          </h3>
          <div className="space-y-3">
            {data.education.map((edu, index) => (
              <div key={index}>
                <div className="flex justify-between items-baseline">
                  <h4 className="font-bold text-slate-900">
                    {edu.degree}{edu.fieldOfStudy ? ` in ${edu.fieldOfStudy}` : ''}
                  </h4>
                  <span className={`${subFs} text-slate-400 whitespace-nowrap`}>
                    {edu.startDate}{edu.endDate ? ` — ${edu.endDate}` : ''}
                  </span>
                </div>
                <p className={`${subFs} text-slate-500 font-medium`}>{edu.institution}</p>
                {edu.description && (
                  <p className="text-slate-600 mt-1 leading-relaxed">{edu.description}</p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ========= SKILLS ========= */}
      {data.skills && data.skills.length > 0 && (
        <section className="mb-5">
          <h3 className={`${headingFs} font-bold text-indigo-600 uppercase tracking-wider mb-2 border-b border-indigo-100 pb-1`}>
            Skills
          </h3>
          <div className="flex flex-wrap gap-1.5">
            {data.skills.map((skill, index) => (
              <span key={index} className={`${subFs} font-medium text-slate-700 bg-indigo-50 px-2 py-0.5 rounded`}>
                {skill}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* ========= PROJECTS ========= */}
      {data.projects && data.projects.length > 0 && (
        <section className="mb-5">
          <h3 className={`${headingFs} font-bold text-indigo-600 uppercase tracking-wider mb-3 border-b border-indigo-100 pb-1`}>
            Projects
          </h3>
          <div className="space-y-3">
            {data.projects.map((proj, index) => (
              <div key={index}>
                <div className="flex justify-between items-baseline mb-0.5">
                  <h4 className="font-bold text-slate-900">{proj.name}</h4>
                  {proj.link && (
                    <span className={`${subFs} text-indigo-500 truncate max-w-[200px]`}>
                      {proj.link.replace('https://', '')}
                    </span>
                  )}
                </div>
                {proj.description && (
                  <ul className="list-disc list-outside pl-4 text-slate-600 space-y-0.5 leading-relaxed">
                    {proj.description.split('\n').filter(Boolean).map((line, i) => (
                      <li key={i}>{line.replace(/^[-•]\s*/, '')}</li>
                    ))}
                  </ul>
                )}
                {proj.technologies && proj.technologies.length > 0 && (
                  <p className={`${subFs} text-slate-400 mt-1`}>
                    <span className="font-semibold">Tech:</span> {proj.technologies.join(', ')}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default ModernTemplate;
