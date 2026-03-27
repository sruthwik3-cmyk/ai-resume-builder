import React from 'react';
import { Mail, Phone, MapPin, Linkedin, Github } from 'lucide-react';

const ExecutiveTemplate = ({ data, preview = false }) => {
  const fs = preview ? 'text-[9px]' : 'text-[12px]';
  const headingFs = preview ? 'text-[10px]' : 'text-xs';
  const nameFs = preview ? 'text-xl' : 'text-3xl';
  const subFs = preview ? 'text-[8px]' : 'text-[10px]';

  return (
    <div 
      className={`bg-white text-slate-800 ${preview ? 'p-6' : 'p-10 sm:p-14'} ${fs} font-serif max-w-[21cm] min-h-[29.7cm] mx-auto relative overflow-hidden`} 
      id="resume-preview"
      style={{ fontFamily: "'Georgia', 'Playfair Display', serif" }}
    >
      {/* ========= HEADER ========= */}
      <header className="text-center mb-6 border-b-2 border-slate-800 pb-5">
        <h1 className={`${nameFs} font-bold text-slate-900 uppercase tracking-wide mb-1`}>
          {data.personalInfo?.firstName} {data.personalInfo?.lastName}
        </h1>
        {data.personalInfo?.jobTitle && (
          <p className={`${subFs} font-semibold text-slate-500 uppercase tracking-[0.3em] mb-3 font-sans`}>
            {data.personalInfo.jobTitle}
          </p>
        )}
        <div className={`flex flex-wrap justify-center items-center gap-x-4 gap-y-1 ${subFs} text-slate-500 font-sans`}>
          {data.personalInfo?.email && <span>{data.personalInfo.email}</span>}
          {data.personalInfo?.phone && <span>|</span>}
          {data.personalInfo?.phone && <span>{data.personalInfo.phone}</span>}
          {data.personalInfo?.address && <span>|</span>}
          {data.personalInfo?.address && <span>{data.personalInfo.address}</span>}
          {data.socialLinks?.linkedin && <span>|</span>}
          {data.socialLinks?.linkedin && <span>{data.socialLinks.linkedin.replace('https://', '')}</span>}
          {data.socialLinks?.github && <span>|</span>}
          {data.socialLinks?.github && <span>{data.socialLinks.github.replace('https://', '')}</span>}
        </div>
      </header>

      {/* ========= SUMMARY ========= */}
      {data.summary && (
        <section className="mb-5">
          <h3 className={`${headingFs} font-bold text-slate-800 uppercase tracking-[0.2em] mb-2 border-b border-slate-200 pb-1 font-sans`}>
            Summary
          </h3>
          <p className="text-slate-600 leading-relaxed text-justify">{data.summary}</p>
        </section>
      )}

      {/* ========= EXPERIENCE ========= */}
      {data.experience && data.experience.length > 0 && (
        <section className="mb-5">
          <h3 className={`${headingFs} font-bold text-slate-800 uppercase tracking-[0.2em] mb-3 border-b border-slate-200 pb-1 font-sans`}>
            Experience
          </h3>
          <div className="space-y-4">
            {data.experience.map((exp, index) => (
              <div key={index}>
                <div className="flex justify-between items-baseline mb-0.5 font-sans">
                  <h4 className="font-bold text-slate-900">{exp.title}</h4>
                  <span className={`${subFs} text-slate-400 whitespace-nowrap`}>
                    {exp.startDate} — {exp.current ? 'Present' : exp.endDate}
                  </span>
                </div>
                <p className={`${subFs} text-slate-500 font-semibold mb-1 uppercase tracking-wider font-sans`}>
                  {exp.company}{exp.location ? ` — ${exp.location}` : ''}
                </p>
                {exp.description && (
                  <ul className="list-disc list-outside pl-4 text-slate-600 space-y-0.5 leading-relaxed font-sans">
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
          <h3 className={`${headingFs} font-bold text-slate-800 uppercase tracking-[0.2em] mb-3 border-b border-slate-200 pb-1 font-sans`}>
            Education
          </h3>
          <div className="space-y-3">
            {data.education.map((edu, index) => (
              <div key={index} className="font-sans">
                <div className="flex justify-between items-baseline">
                  <h4 className="font-bold text-slate-900">
                    {edu.degree}{edu.fieldOfStudy ? ` in ${edu.fieldOfStudy}` : ''}
                  </h4>
                  <span className={`${subFs} text-slate-400 whitespace-nowrap`}>
                    {edu.startDate}{edu.endDate ? ` — ${edu.endDate}` : ''}
                  </span>
                </div>
                <p className={`${subFs} text-slate-500`}>{edu.institution}</p>
                {edu.description && <p className="text-slate-600 mt-1">{edu.description}</p>}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ========= SKILLS ========= */}
      {data.skills && data.skills.length > 0 && (
        <section className="mb-5">
          <h3 className={`${headingFs} font-bold text-slate-800 uppercase tracking-[0.2em] mb-2 border-b border-slate-200 pb-1 font-sans`}>
            Skills
          </h3>
          <p className="text-slate-600 leading-relaxed font-sans">
            {data.skills.join('  |  ')}
          </p>
        </section>
      )}

      {/* ========= PROJECTS ========= */}
      {data.projects && data.projects.length > 0 && (
        <section className="mb-5">
          <h3 className={`${headingFs} font-bold text-slate-800 uppercase tracking-[0.2em] mb-3 border-b border-slate-200 pb-1 font-sans`}>
            Projects
          </h3>
          <div className="space-y-3 font-sans">
            {data.projects.map((proj, index) => (
              <div key={index}>
                <div className="flex justify-between items-baseline mb-0.5">
                  <h4 className="font-bold text-slate-900">{proj.name}</h4>
                  {proj.link && (
                    <span className={`${subFs} text-slate-400 truncate max-w-[200px]`}>
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
                  <p className={`${subFs} text-slate-400 mt-0.5`}>
                    <span className="font-semibold">Technologies:</span> {proj.technologies.join(', ')}
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

export default ExecutiveTemplate;
