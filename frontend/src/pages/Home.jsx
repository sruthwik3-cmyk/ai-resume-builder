import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { CheckCircle2, ArrowRight, X, ChevronRight, HelpCircle, Shield, FileText, Mail } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Home = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [showHelp, setShowHelp] = useState(location.pathname === '/help');

  useEffect(() => {
    setShowHelp(location.pathname === '/help');
  }, [location.pathname]);

  const closeHelp = () => {
    setShowHelp(false);
    navigate('/');
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const mockHistory = [
    { id: 1, title: 'Software Engineer resume', date: '31/3/2026', score: 74 }
  ];

  return (
    <div className="w-full min-h-screen bg-black text-white selection:bg-cyan-500/30 font-sans overflow-x-hidden">
      
      {/* Background Peripheral Glows */}
      <div className="fixed inset-0 pointer-events-none -status-z-10">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_0%,rgba(34,211,238,0.05),transparent_50%)]" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-cyan-950/10 rounded-full blur-[150px]" />
      </div>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 pt-32 lg:pt-40 pb-20 relative z-10 flex flex-col items-center text-center">
        
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="w-full"
        >
          {/* Top Badge */}
          <motion.div variants={itemVariants} className="mb-8">
            <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-neutral-900 border border-neutral-800 text-[10px] font-black uppercase tracking-widest text-neutral-500">
              Built for every job seeker
            </span>
          </motion.div>

          {/* Hero Headline */}
          <motion.h1 
            variants={itemVariants}
            className="text-5xl md:text-7xl font-black tracking-tight mb-8 leading-[1.1]"
          >
            Get your dream job. <br />
            <span className="text-white">Start with the right resume.</span>
          </motion.h1>

          <motion.p 
            variants={itemVariants}
            className="text-lg md:text-xl text-neutral-400 mb-8 max-w-2xl mx-auto leading-relaxed"
          >
            Get a professional, ATS-optimised resume written for you in 60 seconds — no experience needed.
          </motion.p>

          <motion.div variants={itemVariants} className="mb-10 text-green-400 font-bold tracking-tight text-lg">
            2,848 resumes created today
          </motion.div>

          {/* Feature Badges */}
          <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-3 mb-12">
            {['ATS Optimised', 'India Format', 'Free to try', 'No signup'].map((text) => (
              <span key={text} className="px-4 py-2 rounded-full bg-neutral-900 border border-neutral-800 text-xs font-bold text-neutral-300">
                {text}
              </span>
            ))}
          </motion.div>

          {/* Primary CTA */}
          <motion.div variants={itemVariants} className="mb-20">
            <Link 
              to="/builder" 
              className="group inline-flex items-center justify-center px-12 py-6 text-xl font-black tracking-wide text-black bg-cyan-400 rounded-xl hover:bg-cyan-300 active:scale-95 transition-all shadow-[0_0_40px_-5px_rgba(34,211,238,0.4)]"
            >
              Build my resume free →
            </Link>
          </motion.div>

          {/* Resume Preview Header */}
          <motion.div variants={itemVariants} className="mb-8 text-neutral-500 font-medium text-sm tracking-wide">
            This is what your resume will look like:
          </motion.div>

          {/* The Resume Card Preview */}
          <motion.div 
            variants={itemVariants}
            className="w-full max-w-3xl mx-auto aspect-[1/1.4] bg-white rounded-lg shadow-2xl p-10 text-left relative overflow-hidden mb-12"
          >
            <div className="border-b-2 border-neutral-100 pb-6 mb-8 text-center">
              <h2 className="text-3xl font-black text-black mb-2">Aarav Sharma</h2>
              <p className="text-xs text-neutral-500 font-bold uppercase tracking-widest">aarav.sharma@email.com | +91 98765 43210 | Hyderabad</p>
            </div>
            
            <div className="space-y-8">
              <div>
                <h3 className="text-sm font-black text-black uppercase tracking-widest mb-3">Professional Summary</h3>
                <p className="text-xs text-neutral-600 leading-relaxed font-medium">Motivated Software Developer with strong foundation in React, Node.js, and cloud technologies. Completed 3 internships and built 5+ full-stack projects during B.Tech. Passionate about writing clean, scalable code.</p>
              </div>
              
              <div>
                <h3 className="text-sm font-black text-black uppercase tracking-widest mb-3">Key Skills</h3>
                <p className="text-xs text-neutral-600 bg-neutral-50 p-4 rounded-lg font-medium leading-loose">React.js, Node.js, JavaScript, Python, MongoDB, REST APIs, Git, AWS EC2, Tailwind CSS</p>
              </div>
            </div>

            <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-white via-white/80 to-transparent z-10" />
          </motion.div>

          <motion.div variants={itemVariants} className="text-cyan-400 font-bold mb-32 tracking-wide">
            Your personalised resume, generated in 60 seconds
          </motion.div>

          {/* History Section */}
          <motion.section variants={itemVariants} className="w-full max-w-3xl mx-auto text-left py-20 border-t border-neutral-900">
            <h3 className="text-lg font-bold text-neutral-400 mb-8">Your recent resumes</h3>
            
            <div className="space-y-4">
              {mockHistory.map((item) => (
                <div key={item.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-6 bg-neutral-900/50 border border-neutral-800 rounded-2xl hover:border-neutral-700 transition-colors group">
                  <div>
                    <h4 className="font-bold text-white mb-1">{item.title}</h4>
                    <p className="text-xs text-neutral-500 font-medium">
                      {item.date} • ATS score <span className={item.score > 70 ? 'text-green-500' : 'text-amber-500'}>{item.score}</span> • Not downloaded
                    </p>
                  </div>
                  <Link 
                    to={`/builder/${item.id}`} 
                    className="mt-4 sm:mt-0 px-6 py-2 bg-neutral-800 hover:bg-neutral-700 text-white text-sm font-bold rounded-xl transition-all border border-neutral-700"
                  >
                    View — ₹49
                  </Link>
                </div>
              ))}
            </div>
            
            <button className="mt-12 text-xs font-bold text-neutral-600 hover:text-white transition-colors uppercase tracking-[0.2em]">
              Clear history
            </button>
          </motion.section>

        </motion.div>
      </main>

      {/* Help Sidebar (Drawer) */}
      <AnimatePresence>
        {showHelp && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeHelp}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-neutral-950 border-l border-neutral-900 z-[70] shadow-2xl p-8 overflow-y-auto"
            >
              <div className="flex justify-between items-center mb-10">
                <h2 className="text-2xl font-black">Help Center</h2>
                <button onClick={closeHelp} className="p-2 hover:bg-neutral-900 rounded-lg transition-colors">
                  <X size={24} />
                </button>
              </div>

              <div className="space-y-8">
                <section>
                  <h3 className="text-xs font-black text-neutral-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                    <HelpCircle size={14} /> How it works
                  </h3>
                  <div className="space-y-4">
                    {[
                      { q: "How to create a resume?", a: "Simply click 'Build my resume free', answer a few questions about your experience, and our AI will generate a professional resume for you." },
                      { q: "Is it really free?", a: "Yes, it's free to create and preview your resume. We only charge a small one-time fee of ₹49 for the final high-quality download." },
                      { q: "Is my data safe?", a: "We don't require signup and your data is stored locally in your browser. We never share your personal information." }
                    ].map((faq, i) => (
                      <div key={i} className="p-4 bg-neutral-900 rounded-xl border border-neutral-800">
                        <p className="font-bold text-sm mb-2">{faq.q}</p>
                        <p className="text-xs text-neutral-400 leading-relaxed">{faq.a}</p>
                      </div>
                    ))}
                  </div>
                </section>

                <section>
                  <h3 className="text-xs font-black text-neutral-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                    <Shield size={14} /> Policies
                  </h3>
                  <div className="grid grid-cols-1 gap-2">
                    <button className="flex items-center justify-between p-4 bg-neutral-900/50 rounded-xl border border-neutral-800 hover:border-neutral-700 transition-all group">
                      <span className="text-sm font-bold">Terms of Use</span>
                      <ChevronRight size={16} className="text-neutral-600 group-hover:translate-x-1 transition-transform" />
                    </button>
                    <button className="flex items-center justify-between p-4 bg-neutral-900/50 rounded-xl border border-neutral-800 hover:border-neutral-700 transition-all group">
                      <span className="text-sm font-bold">Refund Policy</span>
                      <ChevronRight size={16} className="text-neutral-600 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </section>

                <section className="pt-8 border-t border-neutral-900">
                  <h3 className="text-xs font-black text-neutral-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                    <Mail size={14} /> Contact Support
                  </h3>
                  <p className="text-xs text-neutral-400 mb-4 font-medium">Need more help? Our team is live and ready to assist you.</p>
                  <button className="w-full py-4 bg-white text-black font-black rounded-xl hover:bg-neutral-200 transition-all">
                    Email Support
                  </button>
                </section>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

    </div>
  );
};

export default Home;
