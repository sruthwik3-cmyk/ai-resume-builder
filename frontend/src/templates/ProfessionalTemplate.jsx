import React from 'react';
import { Mail, Phone, MapPin, Linkedin, Github, Globe } from 'lucide-react';

const ProfessionalTemplate = ({ data, preview = false }) => {
  const fs = preview ? 'text-[9px]' : 'text-[12px]';
  const headingFs = preview ? 'text-[11px]' : 'text-sm';
  const nameFs = preview ? 'text-xl' : 'text-3xl';
  const subFs = preview ? 'text-[8px]' : 'text-[10px]';
  const iconSize = preview ? 10 : 14;

  const SectionHeader = ({ title }) => (
    <div className="mb-4">
      <h3 className={`${headingFs} font-black text-slate-800 uppercase tracking-widest flex items-center gap-2`}>
        {title}
      </h3>
      <div className="h-[2px] bg-slate-800 w-full mt-1.5" />
    </div>
  );

  const SidebarHeader = ({ title }) => (
    <div className="mb-4">
      <h3 className={`${headingFs} font-black text-slate-800 uppercase tracking-widest`}>
        {title}
      </h3>
    </div>
  );

  return (
    <div 
      className={`bg-white text-slate-800 ${fs} font-sans max-w-[21cm] min-h-[29.7cm] mx-auto relative overflow-hidden`} 
      id="resume-preview"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      {/* ========= HEADER (DARK) ========= */}
      <header className="bg-[#33363b] text-white p-8 md:p-12 flex items-center gap-8 relative overflow-hidden">
        {/* Profile Image */}
        <div className="relative z-10">
          <div className={`rounded-full border-4 border-white/20 overflow-hidden ${preview ? 'w-20 h-20' : 'w-32 h-32'} bg-slate-700 flex items-center justify-center shadow-2xl`}>
            {data.personalInfo?.photo ? (
              <img src={data.personalInfo.photo} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <div className="text-white/20 font-black text-4xl">
                {data.personalInfo?.firstName?.[0]}{data.personalInfo?.lastName?.[0]}
              </div>
            )}
          </div>
        </div>

        {/* Name & Title */}
        <div className="relative z-10">
          <h1 className={`${nameFs} font-black tracking-tight mb-2 leading-none uppercase`}>
            {data.personalInfo?.firstName} <span className="opacity-80">{data.personalInfo?.lastName}</span>
          </h1>
          {data.personalInfo?.jobTitle && (
            <p className={`${headingFs} font-bold text-slate-400 tracking-[0.2em] uppercase`}>
              {data.personalInfo.jobTitle}
            </p>
          )}
        </div>

        {/* Abstract Background Element */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-20 -mt-20 blur-3xl" />
      </header>

      {/* Main Container with Sidebar */}
      <div className="flex min-h-[calc(29.7cm-160px)]">
        
        {/* ========= SIDEBAR (LEFT) ========= */}
        <aside className={`w-[35%] bg-[#f4f1ea] ${preview ? 'p-6' : 'p-10'} relative`}>
          {/* Slanted Separator Element (The Kurt Davis vibe) */}
          <div className="absolute top-0 right-0 w-full h-12 bg-[#33363b] clip-slanted -mt-1" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 0)' }} />

          <div className="space-y-10 mt-6 relative z-10">
            {/* Contact Details */}
            <section>
              <SidebarHeader title="Contact Details" />
              <div className="space-y-4 text-slate-600">
                {data.personalInfo?.email && (
                  <div className="flex items-center gap-3">
                    <Mail size={iconSize} className="text-slate-800" />
                    <span className="break-all">{data.personalInfo.email}</span>
                  </div>
                )}
                {data.personalInfo?.phone && (
                  <div className="flex items-center gap-3">
                    <Phone size={iconSize} className="text-slate-800" />
                    <span>{data.personalInfo.phone}</span>
                  </div>
                )}
                {data.personalInfo?.address && (
                  <div className="flex items-start gap-3">
                    <MapPin size={iconSize} className="text-slate-800 mt-0.5 shrink-0" />
                    <span>{data.personalInfo.address}</span>
                  </div>
                )}
                {data.socialLinks?.github && (
                  <div className="flex items-center gap-3">
                    <Github size={iconSize} className="text-slate-800" />
                    <span>{data.socialLinks.github.replace('https://', '')}</span>
                  </div>
                )}
              </div>
            </section>

            {/* Education */}
            {data.education && data.education.length > 0 && (
              <section>
                <SidebarHeader title="Education" />
                <div className="space-y-6">
                  {data.education.map((edu, index) => (
                    <div key={index}>
                      <div className="flex items-center gap-2 mb-1">
                        <div className="w-1.5 h-1.5 bg-slate-800 rounded-full" />
                        <h4 className="font-black text-slate-800 text-[11px] leading-tight">
                          {edu.degree} in {edu.fieldOfStudy}
                        </h4>
                      </div>
                      <p className="text-slate-600 mb-1 ml-3.5 italic font-medium">{edu.institution}</p>
                      <p className={`${subFs} font-bold text-slate-400 ml-3.5 tracking-wider uppercase`}>
                        {edu.startDate} - {edu.endDate}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Skills */}
            {data.skills && data.skills.length > 0 && (
              <section>
                <SidebarHeader title="Skills" />
                <div className="space-y-2.5">
                  {data.skills.map((skill, index) => (
                    <div key={index} className="flex justify-between items-center group">
                      <span className="text-slate-600 font-medium">{skill}</span>
                      <span className="text-slate-300 font-bold tracking-tighter text-[8px] uppercase">Expert</span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Languages */}
            {data.languages && data.languages.length > 0 && (
              <section>
                <SidebarHeader title="Languages" />
                <div className="space-y-2">
                  {data.languages.map((lang, index) => (
                    <div key={index} className="flex flex-col">
                      <span className="text-slate-800 font-bold text-[11px] uppercase tracking-wide">{lang.language}</span>
                      <span className="text-slate-500 font-medium italic text-[10px]">{lang.proficiency}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Hobbies */}
            {data.hobbies && data.hobbies.length > 0 && (
              <section>
                <SidebarHeader title="Hobbies" />
                <p className="text-slate-600 italic font-medium leading-relaxed">
                  {data.hobbies.join(' • ')}
                </p>
              </section>
            )}
          </div>
        </aside>

        {/* ========= MAIN CONTENT (RIGHT) ========= */}
        <main className={`w-[65%] ${preview ? 'p-8' : 'p-12'} bg-white`}>
          <div className="space-y-12">
            
            {/* Summary */}
            {data.summary && (
              <section>
                <SectionHeader title="Summary" />
                <p className="text-slate-600 leading-relaxed text-justify">
                  {data.summary}
                </p>
              </section>
            )}

            {/* Work Experience */}
            {data.experience && data.experience.length > 0 && (
              <section>
                <SectionHeader title="Work Experience" />
                <div className="space-y-8">
                  {data.experience.map((exp, index) => (
                    <div key={index} className="relative group">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-black text-slate-900 text-sm uppercase tracking-tight group-hover:text-indigo-600 transition-colors">
                            {exp.title}, {exp.company}
                          </h4>
                          <p className={`${subFs} font-bold text-slate-400 uppercase tracking-widest mt-1`}>
                            {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                          </p>
                        </div>
                      </div>
                      {exp.description && (
                        <div className="text-slate-600 leading-relaxed font-medium">
                          {exp.description.split('\n').filter(Boolean).map((line, i) => (
                            <div key={i} className="flex gap-3 mb-1.5">
                              <span className="text-slate-300 font-bold">•</span>
                              <p className="flex-1">{line.replace(/^[-•]\s*/, '')}</p>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Projects */}
            {data.projects && data.projects.length > 0 && (
              <section>
                <SectionHeader title="Key Projects" />
                <div className="space-y-6">
                  {data.projects.map((proj, index) => (
                    <div key={index}>
                      <div className="flex justify-between items-baseline mb-1">
                        <h4 className="font-black text-slate-900 text-[13px] uppercase tracking-tight">
                          {proj.name}
                        </h4>
                        {proj.link && (
                          <span className="text-slate-400 font-bold text-[10px] uppercase tracking-widest bg-slate-100 px-2 py-0.5 rounded">
                            {proj.link.replace('https://', '')}
                          </span>
                        )}
                      </div>
                      <p className="text-slate-600 leading-relaxed italic mb-1.5">{proj.description}</p>
                      {proj.technologies && proj.technologies.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {proj.technologies.map((tech, i) => (
                            <span key={i} className="text-[10px] font-black text-slate-500 uppercase tracking-tighter">#{tech}</span>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Certifications */}
            {data.certifications && data.certifications.length > 0 && (
              <section>
                <SectionHeader title="Certifications" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {data.certifications.map((cert, index) => (
                    <div key={index} className="border-l-4 border-slate-800 pl-4 py-1">
                      <p className="font-black text-slate-900 text-[12px] uppercase">{cert.name}</p>
                      <p className="text-slate-500 font-bold text-[10px] tracking-wide uppercase">{cert.issuer} {cert.date ? `| ${cert.date}` : ''}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Achievements */}
            {data.achievements && data.achievements.length > 0 && (
              <section>
                <SectionHeader title="Notable Achievements" />
                <div className="space-y-3">
                  {data.achievements.map((ach, index) => (
                    <div key={index} className="flex gap-4 items-start">
                      <div className="w-6 h-6 bg-slate-100 rounded flex items-center justify-center shrink-0">
                        <span className="text-slate-800 font-black text-[10px]">{index + 1}</span>
                      </div>
                      <p className="text-slate-600 font-medium leading-tight pt-1">{ach}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* References */}
            <section>
              <SectionHeader title="References" />
              <p className="text-slate-400 italic font-medium">References available upon request</p>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ProfessionalTemplate;
