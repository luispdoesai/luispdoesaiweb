'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Services', path: '/services' },
    { name: 'Process', path: '/process' },
    { name: 'Results', path: '/results' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav className={`fixed top-0 left-0 w-full px-5 md:px-[5%] py-6 flex justify-between items-center z-[100] transition-all duration-300 ${scrolled ? 'bg-brand-near-black/90 backdrop-blur-md border-b border-brand-white/10' : 'bg-transparent'}`}>
      <Link href="/" className="font-playfair text-2xl font-semibold tracking-tight text-brand-white no-underline">
        LuisPDoesAI
      </Link>
      
      <div className="hidden md:flex gap-10">
        {navLinks.map((link) => (
          <Link key={link.name} href={link.path} className="text-sm uppercase tracking-wider relative group text-brand-white no-underline">
            {link.name}
            <span className="absolute -bottom-1 left-0 w-full h-px bg-brand-white scale-x-0 origin-right transition-transform duration-300 group-hover:scale-x-100 group-hover:origin-left" />
          </Link>
        ))}
      </div>
      
      <button 
        className="md:hidden text-2xl text-brand-white" 
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
      >
        {mobileMenuOpen ? '✕' : '☰'}
      </button>
      
      {/* Mobile Menu */}
      <div className={`absolute top-full left-0 w-full bg-brand-near-black border-b border-brand-white/10 flex flex-col p-5 gap-5 md:hidden transition-all duration-300 origin-top ${mobileMenuOpen ? 'scale-y-100 opacity-100' : 'scale-y-0 opacity-0 pointer-events-none'}`}>
        {navLinks.map((link) => (
          <Link 
            key={link.name} 
            href={link.path} 
            onClick={() => setMobileMenuOpen(false)} 
            className="text-sm uppercase tracking-wider text-brand-white no-underline py-2 border-b border-brand-white/5"
          >
            {link.name}
          </Link>
        ))}
      </div>
    </nav>
  );
}
