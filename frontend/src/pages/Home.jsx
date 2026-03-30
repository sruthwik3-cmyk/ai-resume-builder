import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, FileText, Download, LayoutTemplate, CheckCircle2, Zap, Shield, Globe } from 'lucide-react';
import { motion } from 'framer-motion';

const Home = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.3 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <div className="w-full bg-white dark:bg-slate-950 overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center pt-24 pb-16 px-4">
        {/* Animated Background Blobs */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
          <motion.div 
            animate={{ 
              scale: [1, 1.2, 1],
              x: [0, 50, 0],
              y: [0, 30, 0],
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[10%] left-[5%] w-[400px] h-[400px] bg-indigo-400/20 dark:bg-indigo-600/10 rounded-full blur-[100px]"
          />
          <motion.div 
            animate={{ 
              scale: [1, 1.3, 1],
              x: [0, -40, 0],
              y: [0, -50, 0],
            }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute bottom-[20%] right-[10%] w-[500px] h-[500px] bg-purple-400/20 dark:bg-purple-600/10 rounded-full blur-[120px]"
          />
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-5xl mx-auto text-center z-10"
        >
          <motion.div 
            variants={itemVariants}
            className="inline-flex items-center px-4 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 text-sm font-bold mb-8 border border-indigo-100 dark:border-indigo-800/50 shadow-sm"
          >
            <Sparkles size={16} className="mr-2 animate-pulse" />
            The Future of Resume Building is Here
          </motion.div>

          <motion.h1 
            variants={itemVariants}
            className="text-5xl md:text-8xl font-extrabold tracking-tight mb-8 leading-[1.1]"
          >
            CareerCraft<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 animate-gradient pb-2 block">
              AI Career Suite
            </span>
          </motion.h1>

          <motion.p 
            variants={itemVariants}
            className="text-xl md:text-2xl text-slate-600 dark:text-slate-400 mb-12 max-w-3xl mx-auto leading-relaxed"
          >
            The all-in-one platform for modern job seekers. Build ATS-optimized resumes and use our **AI Browser Automation** to find and apply for jobs in seconds.
          </motion.p>

          <motion.div 
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link to="/signup" className="btn-premium px-10 py-5 text-lg flex items-center group">
              Get Started for Free
              <motion.span 
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="ml-2"
              >
                →
              </motion.span>
            </Link>
            <Link to="/templates" className="px-10 py-5 text-lg font-bold text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors flex items-center">
              View Premium Templates
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Social Proof / Brands */}
      <section className="py-20 border-y border-slate-100 dark:border-slate-900 bg-white dark:bg-slate-950/50 relative z-10">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-12">Trusted by builders at worldwide leaders</p>
          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20 opacity-40 grayscale hover:grayscale-0 transition-all duration-1000 px-4">
            <div className="text-2xl md:text-3xl font-black tracking-tighter">google</div>
            <div className="text-2xl md:text-3xl font-black tracking-tighter italic">META</div>
            <div className="text-2xl md:text-3xl font-black tracking-tighter">amazon</div>
            <div className="text-2xl md:text-3xl font-black tracking-tighter uppercase">netflix</div>
            <div className="text-2xl md:text-3xl font-black tracking-tighter decoration-indigo-600 underline underline-offset-8">AirBnb</div>
          </div>
          
          <div className="mt-20 pt-10 border-t border-slate-100 dark:border-slate-800/50 flex flex-wrap justify-center gap-8 md:gap-16 opacity-50 grayscale hover:grayscale-0 transition-all duration-700">
            <div className="font-bold text-2xl tracking-tighter">TECHSTAR</div>
            <div className="font-bold text-2xl tracking-tighter italic text-indigo-500">CLOUDLY</div>
            <div className="font-bold text-2xl tracking-tighter">DATA<span className="text-purple-500">FLOW</span></div>
            <div className="font-bold text-2xl tracking-tighter lowercase underline decoration-indigo-500 underline-offset-4 font-mono">NexGen</div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[500px] bg-indigo-500/5 blur-[150px] rounded-full -z-10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 text-center">
            {[
              { label: "Active Professionals", value: "50k+", icon: <Globe size={20} /> },
              { label: "AI Enhancements", value: "1.2M", icon: <Zap size={20} /> },
              { label: "Success Rate", value: "98%", icon: <CheckCircle2 size={20} /> },
              { label: "Interview Rate", value: "x3", icon: <Sparkles size={20} /> }
            ].map((stat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative group"
              >
                <div className="text-5xl font-black text-slate-900 dark:text-white mb-4 tracking-tighter italic flex items-center justify-center gap-2">
                  <span className="text-indigo-600 dark:text-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity">{stat.icon}</span>
                  {stat.value}
                </div>
                <p className="text-slate-500 dark:text-slate-400 font-black uppercase tracking-widest text-[10px]">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-32 bg-slate-50 dark:bg-slate-900/40">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-24">
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-6">Built for Success</h2>
            <p className="text-slate-500 font-bold italic">Hear from professionals who landed their dream roles.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { 
                text: "The AI Reviewer found keywords I completely missed. I landed an interview at a Tier 1 tech company within a week of using this.",
                author: "Sarah Jenkins", 
                role: "Senior Product Manager",
                avatar: "https://ui-avatars.com/api/?name=SJ&background=6366f1&color=fff"
              },
              { 
                text: "I was struggling with my experience descriptions. The Gemini integration made them sound much more professional and data-driven.",
                author: "David Chen", 
                role: "Full Stack Engineer",
                avatar: "https://ui-avatars.com/api/?name=DC&background=a855f7&color=fff"
              },
              { 
                text: "The Cover Letter generator is a game changer. It matches my resume perfectly every time. Saved me hours of work.",
                author: "Emily Ross", 
                role: "Marketing Director",
                avatar: "https://ui-avatars.com/api/?name=ER&background=ec4899&color=fff"
              }
            ].map((t, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2 }}
                className="glass-card p-10 rounded-[2.5rem] border-none shadow-xl hover:shadow-indigo-500/10"
              >
                <div className="flex items-center gap-4 mb-8">
                  <img src={t.avatar} alt={t.author} className="w-14 h-14 rounded-2xl shadow-lg" />
                  <div>
                    <h4 className="font-black text-slate-900 dark:text-white leading-tight">{t.author}</h4>
                    <p className="text-[10px] font-black text-indigo-600 uppercase tracking-widest">{t.role}</p>
                  </div>
                </div>
                <p className="text-slate-600 dark:text-slate-400 font-semibold leading-relaxed italic opacity-80">"{t.text}"</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-32 px-4 relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-32">
            <h2 className="text-4xl md:text-7xl font-black tracking-tighter mb-6">Studio Features</h2>
            <p className="text-slate-500 dark:text-slate-400 font-bold max-w-2xl mx-auto uppercase tracking-widest text-xs">Professional tools for high-impact results</p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            {[
              { 
                icon: <Zap className="text-amber-500" size={32} />, 
                title: "Automation Assistant", 
                desc: "Natural language browser automation to search jobs on LinkedIn, Naukri, and more instantly." 
              },
              { 
                icon: <Sparkles className="text-indigo-600" size={32} />, 
                title: "AI Resume Hub", 
                desc: "Gemini-powered engine that crafts professional summaries and bullet points in seconds." 
              },
              { 
                icon: <LayoutTemplate className="text-purple-600" size={32} />, 
                title: "Designer Library", 
                desc: "6 battle-tested templates designed for high-end readability and visual impact." 
              },
              { 
                icon: <Globe className="text-blue-500" size={32} />, 
                title: "Sync Studio", 
                desc: "Real-time updates across all templates. One edit, infinite variations." 
              },
              { 
                icon: <Shield className="text-emerald-500" size={32} />, 
                title: "Elite Export", 
                desc: "Precision PDF rendering that preserves your design perfectly for print and screen." 
              },
              { 
                icon: <CheckCircle2 className="text-pink-500" size={32} />, 
                title: "Resume Audit", 
                desc: "Actionable AI scores and feedback to refine your narrative before you apply." 
              }
            ].map((feature, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -12 }}
                className="glass-card p-12 rounded-[3rem] group border-none"
              >
                <div className="mb-8 p-5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm inline-block group-hover:bg-indigo-600 group-hover:text-white group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                  {feature.icon}
                </div>
                <h3 className="text-3xl font-black mb-6 tracking-tighter">{feature.title}</h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-bold opacity-70 italic">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-32 px-4 relative">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-indigo-500/5 blur-[120px] rounded-full -z-10 animate-pulse" />
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="max-w-6xl mx-auto glass-card p-16 md:p-32 rounded-[4rem] text-center shadow-indigo-600/5 relative overflow-hidden group"
        >
          <div className="absolute inset-0 bg-grid-slate-200/50 dark:bg-grid-slate-700/20 [mask-image:radial-gradient(ellipse_at_center,white,transparent)] -z-10" />
          <h2 className="text-4xl md:text-7xl font-black tracking-tighter mb-8 leading-tight">Join the Elite.<br/><span className="text-indigo-600">Build Your Future.</span></h2>
          <p className="text-slate-500 dark:text-slate-400 font-bold mb-16 max-w-xl mx-auto italic uppercase tracking-[0.2em] text-xs">Receive weekly AI-powered career strategies and template drops.</p>
          
          <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto p-2 bg-slate-50 dark:bg-slate-900/50 rounded-3xl border border-slate-100 dark:border-slate-800 focus-within:ring-2 focus-within:ring-indigo-500 transition-all">
            <input 
              type="email" 
              placeholder="name@company.com" 
              className="flex-1 bg-transparent border-none outline-none px-6 py-4 font-bold dark:text-white"
            />
            <button className="btn-premium px-10 py-4 shadow-2xl">
              Subscribe
            </button>
          </div>
        </motion.div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-4">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-7xl mx-auto rounded-[4rem] premium-gradient p-16 md:p-32 text-center text-white relative overflow-hidden shadow-2xl shadow-indigo-600/20"
        >
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
          <div className="absolute -top-20 -right-20 w-80 h-80 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-indigo-900/40 rounded-full blur-3xl" />
          
          <h2 className="text-5xl md:text-8xl font-black mb-12 relative z-10 leading-none tracking-tighter">Land Your Next<br/>Big Role.</h2>
          <p className="text-xl md:text-3xl text-white/80 mb-16 max-w-2xl mx-auto relative z-10 font-bold italic">
            "The best career assistant I've ever used. Hands down."
          </p>
          <div className="relative z-10 flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link to="/signup" className="inline-block bg-white text-indigo-600 hover:bg-slate-50 transition-all px-16 py-6 rounded-[2rem] font-black text-2xl shadow-2xl hover:scale-105 active:scale-95">
              Get Started Free
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default Home;
