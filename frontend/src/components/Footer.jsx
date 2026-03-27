import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, Github, Twitter, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-slate-950 border-t border-slate-100 dark:border-slate-900 pt-32 pb-16 relative overflow-hidden mt-auto">
      <div className="absolute inset-0 bg-grid-slate-200/40 dark:bg-grid-slate-800/20 [mask-image:radial-gradient(ellipse_at_center,white,transparent)] -z-10" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 mb-24">
          <div className="col-span-1 md:col-span-4">
            <div className="flex items-center space-x-3 mb-8">
              <div className="bg-indigo-600 p-2.5 rounded-2xl text-white shadow-xl shadow-indigo-600/20">
                <FileText size={24} />
              </div>
              <span className="font-black text-2xl tracking-tighter" style={{ fontFamily: "'Outfit', sans-serif" }}>
                AI Resume <span className="text-indigo-600">Pro</span>
              </span>
            </div>
            <p className="text-slate-500 dark:text-slate-400 font-bold text-sm leading-relaxed mb-10 italic">
              Empowering the next generation of global talent with intelligent, designer-grade career tools. Land your dream role at the world's most innovative companies.
            </p>
            <div className="flex space-x-5">
              {[
                { icon: <Twitter size={20} />, href: "#", color: "hover:text-sky-500" },
                { icon: <Github size={20} />, href: "#", color: "hover:text-slate-900 dark:hover:text-white" },
                { icon: <Linkedin size={20} />, href: "#", color: "hover:text-blue-700" }
              ].map((social, i) => (
                <a 
                  key={i} 
                  href={social.href} 
                  className={`w-12 h-12 rounded-2xl bg-slate-50 dark:bg-slate-900/50 flex items-center justify-center text-slate-400 ${social.color} transition-all duration-300 border border-slate-100 dark:border-slate-800 hover:scale-110 active:scale-95`}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
          
          <div className="col-span-1 md:col-span-2">
            <h4 className="font-black text-slate-900 dark:text-white mb-8 uppercase tracking-[0.2em] text-[10px]">Product</h4>
            <ul className="space-y-5 text-sm font-bold text-slate-500 dark:text-slate-400">
              <li><Link to="/builder" className="hover:text-indigo-600 transition-colors">Resume Studio</Link></li>
              <li><Link to="/dashboard" className="hover:text-indigo-600 transition-colors">Letter Studio</Link></li>
              <li><Link to="/templates" className="hover:text-indigo-600 transition-colors">Asset Library</Link></li>
              <li><Link to="/dashboard" className="hover:text-indigo-600 transition-colors">AI Audit</Link></li>
            </ul>
          </div>
          
          <div className="col-span-1 md:col-span-2">
            <h4 className="font-black text-slate-900 dark:text-white mb-8 uppercase tracking-[0.2em] text-[10px]">Resources</h4>
            <ul className="space-y-5 text-sm font-bold text-slate-500 dark:text-slate-400">
              <li><a href="#" className="hover:text-indigo-600 transition-colors">Career Blog</a></li>
              <li><a href="#" className="hover:text-indigo-600 transition-colors">ATS Guide</a></li>
              <li><a href="#" className="hover:text-indigo-600 transition-colors">Job Boards</a></li>
              <li><a href="#" className="hover:text-indigo-600 transition-colors">Interview Prep</a></li>
            </ul>
          </div>
          
          <div className="col-span-1 md:col-span-4">
            <h4 className="font-black text-slate-900 dark:text-white mb-8 uppercase tracking-[0.2em] text-[10px]">Global Success</h4>
            <p className="text-slate-500 dark:text-slate-400 font-bold text-xs mb-8">Join 5,000+ professionals receiving our monthly career drops.</p>
            <div className="flex gap-2 p-1.5 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-100 dark:border-slate-800">
              <input type="email" placeholder="Email" className="flex-1 bg-transparent border-none outline-none px-4 text-xs font-bold dark:text-white" />
              <button className="bg-indigo-600 text-white px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-indigo-600/20 hover:bg-indigo-700 transition-colors">
                Sign Up
              </button>
            </div>
          </div>
        </div>
        
        <div className="border-t border-slate-100 dark:border-slate-900 pt-16 flex flex-col md:flex-row justify-between items-center text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
          <p>&copy; {new Date().getFullYear()} AI Resume Pro Studio. Engineered for the future.</p>
          <div className="flex items-center gap-8 mt-6 md:mt-0">
            <a href="#" className="hover:text-indigo-600 transition-colors">Privacy</a>
            <a href="#" className="hover:text-indigo-600 transition-colors">Terms</a>
            <span className="flex items-center">
              Made with <span className="text-indigo-600 dark:text-indigo-400 mx-2 text-sm animate-pulse">◈</span> Globally
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
