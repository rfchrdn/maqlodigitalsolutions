import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'My Portfolio', href: '/#projects' },
    { name: 'Expertise', href: '/#services' },
    { name: 'About Me', href: '/#about' },
    { name: 'Contact Me', href: '/#contact' },
  ];

  const handleNavClick = (e: React.MouseEvent, href: string) => {
    setIsMobileMenuOpen(false);
    if (href.includes('#')) {
      const [path, id] = href.split('#');
      if (location.pathname === path || (path === '/' && location.pathname === '')) {
        e.preventDefault();
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
          window.history.pushState(null, '', href);
        }
      }
    }
  };

  return (
    <nav 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 border-b ${
        isScrolled ? 'py-4 glass border-white/10' : 'py-6 border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-12 flex justify-between items-center text-white">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-3"
        >
          <Link to="/" className="flex items-center gap-2 md:gap-3 group">
            <div className="w-6 h-6 md:w-8 md:h-8 bg-accent flex items-center justify-center rotate-45 group-hover:rotate-0 transition-transform duration-500">
              <div className="w-2.5 h-2.5 md:w-3 md:h-3 bg-white"></div>
            </div>
            <span className="text-xl md:text-2xl font-bold tracking-tight uppercase">
              Maqlo<span className="text-accent-light font-light">Digital</span>
            </span>
          </Link>
        </motion.div>

        {/* Desktop Menu */}
        <div className="hidden lg:flex gap-10 items-center">
          {navLinks.map((link, i) => (
            <motion.div
              key={link.name}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Link 
                to={link.href} 
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/50 hover:text-accent transition-colors"
              >
                {link.name}
              </Link>
            </motion.div>
          ))}
          <Link
            to="/#contact"
            onClick={(e) => handleNavClick(e, '/#contact')}
            className="px-6 py-2 border border-white/20 text-[10px] font-bold uppercase tracking-widest hover:border-accent hover:text-accent transition-all duration-300 ml-4"
          >
            Start Project
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="lg:hidden p-2 text-white/60 hover:text-white relative z-50"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          className="fixed inset-0 w-full h-screen bg-brand-primary z-40 p-12 flex flex-col justify-center items-center gap-8"
        >
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="text-4xl md:text-5xl font-bold uppercase tracking-tighter hover:text-accent transition-colors"
            >
              {link.name}
            </Link>
          ))}
          <Link
            to="/#contact"
            onClick={(e) => handleNavClick(e, '/#contact')}
            className="mt-8 px-10 py-5 bg-accent text-white text-center font-bold uppercase tracking-widest text-sm shadow-[0_0_30px_rgba(37,99,235,0.3)]"
          >
            Start Project
          </Link>
        </motion.div>
      )}
    </nav>
  );
}
