import React from 'react';

const MinimalTemplate = ({ data, preview = false }) => {
  const fs = preview ? 'text-[9px]' : 'text-[12px]';
  const headingFs = preview ? 'text-[10px]' : 'text-xs';
  const nameFs = preview ? 'text-xl' : 'text-3xl';
  const subFs = preview ? 'text-[8px]' : 'text-[10px]';

  return (
    <div 
      className={`bg-white text-slate-800 ${preview ? 'p-6' : 'p-12 sm:p-16'} ${fs} font-serif max-w-[21cm] min-h-[29.7cm] mx-auto relative`} 
      id="resume-preview"
      style={{ fontFamily: "'Georgia', 'Cambria', serif" }}
    >
      {/* ========= HEADER ========= */}
      <header className="text-center mb-6 relative">
        {data.personalInfo?.photo && (
          <div className="absolute top-0 right-0">
            <div className={`${preview ? 'w-16 h-16' : 'w-24 h-24'} rounded-full border border-slate-200 overflow-hidden bg-slate-50 shadow-sm`}>
              <img src={data.personalInfo.photo} alt="Profile" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500" />
            </div>
          </div>
        )}
        <h1 className={`${nameFs} font-normal text-slate-900 tracking-wide uppercase mb-1`}>
          {data.personalInfo?.firstName} {data.personalInfo?.lastName}
        </h1>
        {data.personalInfo?.jobTitle && (
          <p className={`${subFs} font-bold text-slate-400 uppercase tracking-[0.3em] mb-3`}>
            {data.personalInfo.jobTitle}
          </p>
        )}
        <div className={`flex flex-wrap justify-center items-center gap-x-4 gap-y-1 ${subFs} text-slate-500`}>
          {data.personalInfo?.email && <span>{data.personalInfo.email}</span>}
          {data.personalInfo?.phone && <span>• {data.personalInfo.phone}</span>}
          {data.personalInfo?.address && <span>• {data.personalInfo.address}</span>}
          {data.socialLinks?.linkedin && <span>• {data.socialLinks.linkedin.replace('https://', '')}</span>}
          {data.socialLinks?.github && <span>• {data.socialLinks.github.replace('https://', '')}</span>}
        </div>
      </header>

      <hr className="border-slate-200 mb-5" />

      {/* ========= SUMMARY ========= */}
      {data.summary && (
        <section className="mb-5 text-center">
          <p className="text-slate-600 leading-relaxed italic max-w-2xl mx-auto">
            {data.summary}
          </p>
        </section>
      )}

      {/* ========= EXPERIENCE ========= */}
      {data.experience && data.experience.length > 0 && (
        <section className="mb-5">
          <h3 className={`${headingFs} font-bold text-slate-900 uppercase tracking-[0.2em] text-center mb-3 pb-1 border-b border-slate-200`}>
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
                <p className={`${subFs} text-slate-500 italic mb-1`}>
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
          <h3 className={`${headingFs} font-bold text-slate-900 uppercase tracking-[0.2em] text-center mb-3 pb-1 border-b border-slate-200`}>
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
                <p className={`${subFs} text-slate-500 italic`}>{edu.institution}</p>
                {edu.description && <p className="text-slate-600 mt-1">{edu.description}</p>}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ========= SKILLS ========= */}
      {data.skills && data.skills.length > 0 && (
        <section className="mb-5">
          <h3 className={`${headingFs} font-bold text-slate-900 uppercase tracking-[0.2em] text-center mb-3 pb-1 border-b border-slate-200`}>
            Skills
          </h3>
          <p className="text-slate-600 text-center leading-relaxed">
            {data.skills.join('  •  ')}
          </p>
        </section>
      )}

      {/* ========= PROJECTS ========= */}
      {data.projects && data.projects.length > 0 && (
        <section className="mb-5">
          <h3 className={`${headingFs} font-bold text-slate-900 uppercase tracking-[0.2em] text-center mb-3 pb-1 border-b border-slate-200`}>
            Projects
          </h3>
          <div className="space-y-3">
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
                  <p className="text-slate-600 leading-relaxed">{proj.description}</p>
                )}
                {proj.technologies && proj.technologies.length > 0 && (
                  <p className={`${subFs} text-slate-400 mt-0.5 italic`}>
                    {proj.technologies.join(', ')}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ========= CERTIFICATIONS & ACHIEVEMENTS ========= */}
      {data.certifications && data.certifications.length > 0 && (
        <section className="mb-5">
          <h3 className={`${headingFs} font-bold text-slate-900 uppercase tracking-[0.2em] text-center mb-3 pb-1 border-b border-slate-200`}>
            Certifications
          </h3>
          <div className="space-y-2 text-center">
            {data.certifications.map((cert, index) => (
              <div key={index}>
                <span className="font-bold text-slate-900">{cert.name}</span>
                <span className="text-slate-500 italic ml-2">— {cert.issuer} {cert.date ? `(${cert.date})` : ''}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {data.achievements && data.achievements.length > 0 && (
        <section className="mb-5 text-center">
          <h3 className={`${headingFs} font-bold text-slate-900 uppercase tracking-[0.2em] text-center mb-3 pb-1 border-b border-slate-200`}>
            Achievements
          </h3>
          <div className="max-w-xl mx-auto space-y-1">
            {data.achievements.map((ach, index) => (
              <p key={index} className="text-slate-600">• {ach}</p>
            ))}
          </div>
        </section>
      )}

      {/* ========= LANGUAGES & HOBBIES ========= */}
      {data.languages && data.languages.length > 0 && (
        <section className="mb-5 text-center">
          <h3 className={`${headingFs} font-bold text-slate-900 uppercase tracking-[0.2em] mb-3 pb-1 border-b border-slate-200`}>
            Languages
          </h3>
          <p className="text-slate-600">
            {data.languages.map((lang, index) => (
              <span key={index}>
                {index > 0 && '  •  '}
                {lang.language} ({lang.proficiency})
              </span>
            ))}
          </p>
        </section>
      )}

      {data.hobbies && data.hobbies.length > 0 && (
        <section className="mb-5 text-center">
          <h3 className={`${headingFs} font-bold text-slate-900 uppercase tracking-[0.2em] mb-3 pb-1 border-b border-slate-200`}>
            Hobbies
          </h3>
          <p className="text-slate-500 italic">
            {data.hobbies.join('  •  ')}
          </p>
        </section>
      )}
    </div>
  );
};

export default MinimalTemplate;
