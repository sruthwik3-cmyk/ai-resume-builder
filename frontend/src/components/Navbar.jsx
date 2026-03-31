import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

const Navbar = () => {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'py-4 bg-black/80 backdrop-blur-md border-b border-neutral-900' : 'py-6 bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <Link to="/" className="flex items-center group">
          <span 
            className="font-bold text-xl tracking-tight text-white"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            CareerCraft<span className="text-cyan-400">AI</span>
          </span>
        </Link>

        <div className="flex items-center gap-8">
          <Link 
            to="/help" 
            className="text-sm font-medium text-neutral-400 hover:text-white transition-colors"
          >
            Help
          </Link>
          {location.pathname === '/' && (
            <Link 
              to="/builder" 
              className="text-sm font-bold text-cyan-400 hover:text-cyan-300 transition-colors hidden sm:block"
            >
              Start Building
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
