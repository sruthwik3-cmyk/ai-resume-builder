import React from 'react';

const ClassicTemplate = ({ data, preview = false }) => {
  const fs = preview ? 'text-[9px]' : 'text-[12px]';
  const headingFs = preview ? 'text-[10px]' : 'text-sm';
  const nameFs = preview ? 'text-xl' : 'text-3xl';
  const subFs = preview ? 'text-[8px]' : 'text-[10px]';

  return (
    <div 
      className={`bg-white text-slate-900 ${preview ? 'p-6' : 'p-10 sm:p-14'} ${fs} font-serif max-w-[21cm] min-h-[29.7cm] mx-auto relative`} 
      id="resume-preview"
      style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
    >
      {/* ========= HEADER ========= */}
      <header className={`mb-5 flex items-center gap-8 ${data.personalInfo?.photo ? 'text-left' : 'text-center justify-center'}`}>
        {data.personalInfo?.photo && (
          <div className="shrink-0">
            <div className={`${preview ? 'w-24 h-24' : 'w-28 h-28'} border-2 border-slate-900 p-1 bg-white shadow-sm`}>
              <div className="w-full h-full overflow-hidden">
                <img src={data.personalInfo.photo} alt="Profile" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        )}
        <div className="flex-1">
          <h1 className={`${nameFs} font-normal text-slate-900 uppercase tracking-tight mb-1`}>
            {data.personalInfo?.firstName} {data.personalInfo?.lastName}
          </h1>
          <div className={`flex flex-wrap ${data.personalInfo?.photo ? 'justify-start' : 'justify-center'} items-center gap-x-3 gap-y-1 ${subFs} text-slate-600 italic font-sans`}>
            {data.personalInfo?.address && <span>{data.personalInfo.address}</span>}
            {data.personalInfo?.phone && <span>• {data.personalInfo.phone}</span>}
            {data.personalInfo?.email && <span>• {data.personalInfo.email}</span>}
            {data.socialLinks?.linkedin && <span>• {data.socialLinks.linkedin.replace('https://', '')}</span>}
            {data.socialLinks?.github && <span>• {data.socialLinks.github.replace('https://', '')}</span>}
          </div>
        </div>
      </header>

      <hr className="border-slate-900 mb-4" />

      {/* ========= SUMMARY ========= */}
      {data.summary && (
        <section className="mb-4">
          <h3 className={`${headingFs} font-bold text-slate-900 uppercase tracking-[0.15em] text-center mb-2 pb-1 border-b-2 border-slate-900 font-sans`}>
            Summary
          </h3>
          <p className="text-slate-700 leading-relaxed text-justify italic">
            {data.summary}
          </p>
        </section>
      )}

      {/* ========= EXPERIENCE ========= */}
      {data.experience && data.experience.length > 0 && (
        <section className="mb-4">
          <h3 className={`${headingFs} font-bold text-slate-900 uppercase tracking-[0.15em] text-center mb-3 pb-1 border-b-2 border-slate-900 font-sans`}>
            Experience
          </h3>
          <div className="space-y-4">
            {data.experience.map((exp, index) => (
              <div key={index}>
                <div className="flex justify-between items-baseline mb-0.5">
                  <span className="font-bold text-slate-900">{exp.company}</span>
                  <span className={`${subFs} text-slate-500 font-sans whitespace-nowrap`}>
                    {exp.startDate} — {exp.current ? 'Present' : exp.endDate}
                  </span>
                </div>
                <div className="flex justify-between items-baseline mb-1 italic text-slate-600">
                  <span className="font-semibold">{exp.title}</span>
                  {exp.location && <span className={`${subFs}`}>{exp.location}</span>}
                </div>
                {exp.description && (
                  <ul className="list-disc list-outside pl-5 text-slate-700 space-y-0.5 leading-relaxed">
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
        <section className="mb-4">
          <h3 className={`${headingFs} font-bold text-slate-900 uppercase tracking-[0.15em] text-center mb-3 pb-1 border-b-2 border-slate-900 font-sans`}>
            Education
          </h3>
          <div className="space-y-3">
            {data.education.map((edu, index) => (
              <div key={index}>
                <div className="flex justify-between items-baseline">
                  <span className="font-bold text-slate-900">{edu.institution}</span>
                  <span className={`${subFs} text-slate-500 font-sans whitespace-nowrap`}>
                    {edu.startDate}{edu.endDate ? ` — ${edu.endDate}` : ''}
                  </span>
                </div>
                <p className="italic text-slate-600">
                  {edu.degree}{edu.fieldOfStudy ? ` in ${edu.fieldOfStudy}` : ''}
                </p>
                {edu.description && <p className="text-slate-700 mt-1">{edu.description}</p>}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ========= SKILLS ========= */}
      {data.skills && data.skills.length > 0 && (
        <section className="mb-4">
          <h3 className={`${headingFs} font-bold text-slate-900 uppercase tracking-[0.15em] text-center mb-2 pb-1 border-b-2 border-slate-900 font-sans`}>
            Skills
          </h3>
          <p className="text-slate-700 text-center leading-relaxed">
            {data.skills.join('  •  ')}
          </p>
        </section>
      )}

      {/* ========= PROJECTS ========= */}
      {data.projects && data.projects.length > 0 && (
        <section className="mb-4">
          <h3 className={`${headingFs} font-bold text-slate-900 uppercase tracking-[0.15em] text-center mb-3 pb-1 border-b-2 border-slate-900 font-sans`}>
            Projects
          </h3>
          <div className="space-y-3">
            {data.projects.map((proj, index) => (
              <div key={index}>
                <h4 className="font-bold text-slate-900">{proj.name}</h4>
                {proj.description && (
                  <p className="text-slate-700 leading-relaxed">{proj.description}</p>
                )}
                {proj.technologies && proj.technologies.length > 0 && (
                  <p className={`${subFs} text-slate-500 mt-0.5 italic font-sans`}>
                    Technologies: {proj.technologies.join(', ')}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ========= CERTIFICATIONS & ACHIEVEMENTS ========= */}
      {data.certifications && data.certifications.length > 0 && (
        <section className="mb-4">
          <h3 className={`${headingFs} font-bold text-slate-900 uppercase tracking-[0.15em] text-center mb-3 pb-1 border-b-2 border-slate-900 font-sans`}>
            Certifications
          </h3>
          <div className="space-y-2 text-center">
            {data.certifications.map((cert, index) => (
              <div key={index}>
                <span className="font-bold text-slate-900 uppercase tracking-tight">{cert.name}</span>
                <span className="text-slate-600 italic"> — {cert.issuer} {cert.date ? `(${cert.date})` : ''}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {data.achievements && data.achievements.length > 0 && (
        <section className="mb-4">
          <h3 className={`${headingFs} font-bold text-slate-900 uppercase tracking-[0.15em] text-center mb-3 pb-1 border-b-2 border-slate-900 font-sans`}>
            Achievements
          </h3>
          <ul className="list-disc list-outside pl-8 text-slate-700 space-y-1 mx-auto max-w-2xl">
            {data.achievements.map((ach, index) => (
              <li key={index}><span className="font-semibold">{ach}</span></li>
            ))}
          </ul>
        </section>
      )}

      {/* ========= LANGUAGES & HOBBIES ========= */}
      <div className="grid grid-cols-2 gap-8 mt-6">
        {data.languages && data.languages.length > 0 && (
          <section className="mb-4">
            <h3 className={`${headingFs} font-bold text-slate-900 uppercase tracking-[0.15em] text-left mb-2 pb-1 border-b-2 border-slate-900 font-sans`}>
              Languages
            </h3>
            <div className="space-y-1">
              {data.languages.map((lang, index) => (
                <div key={index} className="flex justify-between items-baseline italic">
                  <span className="font-bold text-slate-900 not-italic uppercase tracking-tighter">{lang.language}</span>
                  <span className={`${subFs} text-slate-600 font-sans`}>{lang.proficiency}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {data.hobbies && data.hobbies.length > 0 && (
          <section className="mb-4">
            <h3 className={`${headingFs} font-bold text-slate-900 uppercase tracking-[0.15em] text-left mb-2 pb-1 border-b-2 border-slate-900 font-sans`}>
              Hobbies
            </h3>
            <p className="text-slate-700 italic">
              {data.hobbies.join(' • ')}
            </p>
          </section>
        )}
      </div>
    </div>
  );
};

export default ClassicTemplate;
