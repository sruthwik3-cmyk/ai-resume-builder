import React from 'react';

const AtsTemplate = ({ data, preview = false }) => {
  const fs = preview ? 'text-[9px]' : 'text-[12px]';
  const headingFs = preview ? 'text-[10px]' : 'text-sm';
  const nameFs = preview ? 'text-xl' : 'text-2xl';
  const subFs = preview ? 'text-[8px]' : 'text-[10px]';

  return (
    <div 
      className={`bg-white text-black ${preview ? 'p-6' : 'p-10 sm:p-14'} ${fs} font-sans max-w-[21cm] min-h-[29.7cm] mx-auto overflow-hidden`} 
      id="resume-preview"
      style={{ fontFamily: "'Arial', 'Helvetica', sans-serif" }}
    >
      {/* ========= HEADER ========= */}
      <header className={`mb-4 flex items-center gap-6 ${data.personalInfo?.photo ? 'text-left' : 'text-center justify-center'}`}>
        {data.personalInfo?.photo && (
          <div className="shrink-0">
            <div className={`${preview ? 'w-20 h-20' : 'w-24 h-24'} border-2 border-black overflow-hidden bg-white shadow-sm`}>
              <img src={data.personalInfo.photo} alt="Profile" className="w-full h-full object-cover" />
            </div>
          </div>
        )}
        <div className="flex-1">
          <h1 className={`${nameFs} font-bold uppercase tracking-tight text-black mb-1`}>
            {data.personalInfo?.firstName} {data.personalInfo?.lastName}
          </h1>
          <div className={`flex flex-wrap ${data.personalInfo?.photo ? 'justify-start' : 'justify-center'} gap-x-3 gap-y-1 ${subFs} text-black`}>
            {data.personalInfo?.email && <span>{data.personalInfo.email}</span>}
            {data.personalInfo?.phone && <span>| {data.personalInfo.phone}</span>}
            {data.personalInfo?.address && <span>| {data.personalInfo.address}</span>}
            {data.socialLinks?.linkedin && <span>| {data.socialLinks.linkedin.replace('https://', '')}</span>}
            {data.socialLinks?.github && <span>| {data.socialLinks.github.replace('https://', '')}</span>}
          </div>
        </div>
      </header>

      {/* ========= SUMMARY ========= */}
      {data.summary && (
        <section className="mb-4">
          <h3 className={`${headingFs} font-bold border-b-2 border-black pb-0.5 mb-2 uppercase`}>Summary</h3>
          <p className="text-justify leading-relaxed">{data.summary}</p>
        </section>
      )}

      {/* ========= SKILLS ========= */}
      {data.skills && data.skills.length > 0 && (
        <section className="mb-4">
          <h3 className={`${headingFs} font-bold border-b-2 border-black pb-0.5 mb-2 uppercase`}>Skills</h3>
          <p className="leading-relaxed">
            {data.skills.join(', ')}
          </p>
        </section>
      )}

      {/* ========= EXPERIENCE ========= */}
      {data.experience && data.experience.length > 0 && (
        <section className="mb-4">
          <h3 className={`${headingFs} font-bold border-b-2 border-black pb-0.5 mb-2 uppercase`}>Experience</h3>
          <div className="space-y-4">
            {data.experience.map((exp, index) => (
              <div key={index}>
                <div className="flex justify-between items-baseline mb-0.5">
                  <span className="font-bold">{exp.company}</span>
                  <span className={`${subFs} whitespace-nowrap`}>{exp.startDate} — {exp.current ? 'Present' : exp.endDate}</span>
                </div>
                <div className="flex justify-between items-baseline mb-1 italic">
                  <span>{exp.title}</span>
                  {exp.location && <span>{exp.location}</span>}
                </div>
                {exp.description && (
                  <ul className="list-disc list-outside pl-5 space-y-0.5">
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

      {/* ========= PROJECTS ========= */}
      {data.projects && data.projects.length > 0 && (
        <section className="mb-4">
          <h3 className={`${headingFs} font-bold border-b-2 border-black pb-0.5 mb-2 uppercase`}>Projects</h3>
          <div className="space-y-3">
            {data.projects.map((proj, index) => (
              <div key={index}>
                <div className="flex justify-between items-baseline mb-0.5">
                  <span className="font-bold">{proj.name}</span>
                  {proj.link && <span className={`${subFs}`}>{proj.link.replace('https://', '')}</span>}
                </div>
                {proj.technologies && proj.technologies.length > 0 && (
                  <p className="italic mb-0.5">
                    <span className="font-bold not-italic">Tech: </span>
                    {proj.technologies.join(', ')}
                  </p>
                )}
                {proj.description && (
                  <ul className="list-disc list-outside pl-5 space-y-0.5">
                    {proj.description.split('\n').filter(Boolean).map((line, i) => (
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
          <h3 className={`${headingFs} font-bold border-b-2 border-black pb-0.5 mb-2 uppercase`}>Education</h3>
          <div className="space-y-3">
            {data.education.map((edu, index) => (
              <div key={index}>
                <div className="flex justify-between items-baseline mb-0.5">
                  <span className="font-bold">{edu.institution}</span>
                  <span className={`${subFs} whitespace-nowrap`}>{edu.startDate}{edu.endDate ? ` — ${edu.endDate}` : ''}</span>
                </div>
                <p className="italic">
                  {edu.degree}{edu.fieldOfStudy ? ` in ${edu.fieldOfStudy}` : ''}
                </p>
                {edu.description && <p className="mt-0.5">{edu.description}</p>}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ========= CERTIFICATIONS ========= */}
      {data.certifications && data.certifications.length > 0 && (
        <section className="mb-4">
          <h3 className={`${headingFs} font-bold border-b-2 border-black pb-0.5 mb-2 uppercase`}>Certifications</h3>
          <ul className="list-disc list-outside pl-5 space-y-0.5">
            {data.certifications.map((cert, index) => (
              <li key={index}>
                <span className="font-bold">{cert.name}</span> — {cert.issuer} {cert.date ? `(${cert.date})` : ''}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* ========= ACHIEVEMENTS ========= */}
      {data.achievements && data.achievements.length > 0 && (
        <section className="mb-4">
          <h3 className={`${headingFs} font-bold border-b-2 border-black pb-0.5 mb-2 uppercase`}>Achievements</h3>
          <ul className="list-disc list-outside pl-5 space-y-0.5">
            {data.achievements.map((ach, index) => (
              <li key={index}>{ach}</li>
            ))}
          </ul>
        </section>
      )}

      {/* ========= LANGUAGES & HOBBIES ========= */}
      {data.languages && data.languages.length > 0 && (
        <section className="mb-2">
          <h3 className={`${headingFs} font-bold border-b-2 border-black pb-0.5 mb-2 uppercase`}>Languages</h3>
          <p>{data.languages.map(lang => `${lang.language} (${lang.proficiency})`).join(', ')}</p>
        </section>
      )}

      {data.hobbies && data.hobbies.length > 0 && (
        <section className="mb-2">
          <h3 className={`${headingFs} font-bold border-b-2 border-black pb-0.5 mb-2 uppercase`}>Hobbies</h3>
          <p>{data.hobbies.join(', ')}</p>
        </section>
      )}
    </div>
  );
};

export default AtsTemplate;
