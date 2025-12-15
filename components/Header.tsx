import React, { useState, useEffect } from 'react';
import { SunIcon, MoonIcon } from './icons/IconComponents';

const NavLink: React.FC<{ href: string; children: React.ReactNode; onClick?: () => void }> = ({ href, children, onClick }) => (
  <a 
    href={href} 
    onClick={onClick} 
    className="text-text-primary dark:text-[#F1F5F9] hover:bg-gradient-to-r hover:from-accent-start hover:to-accent-end hover:bg-clip-text hover:text-transparent transition-colors duration-300 px-3 py-2 rounded-md text-sm font-medium"
    data-cursor-variant="link"
  >
    {children}
  </a>
);

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined' && localStorage.getItem('theme')) {
      return localStorage.getItem('theme') as 'light' | 'dark';
    }
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    return 'light';
  });

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [theme]);

  const handleThemeSwitch = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const navLinks = [
    { href: '#about', label: 'About' },
    { href: '#skills', label: 'Skills' },
    { href: '#portfolio', label: 'Portfolio' },
    { href: '#testimonials', label: 'Testimonials' },
    { href: '#upwork', label: 'Upwork' },
    { href: '#quote', label: 'AI Quote' },
    { href: '#contact', label: 'Contact' },
  ];
  
  const closeMenu = () => setIsOpen(false);

  return (
    <header className="bg-primary/50 dark:bg-[#0A0A14]/50 backdrop-blur-lg fixed w-full z-50 top-0 border-b border-border-default dark:border-[#11111F]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <a href="#" className="text-2xl font-bold bg-gradient-to-r from-accent-start to-accent-end bg-clip-text text-transparent" data-cursor-variant="link">Binyam G.</a>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-2">
              {navLinks.map(link => (
                <NavLink key={link.href} href={link.href}>{link.label}</NavLink>
              ))}
              <button
                onClick={handleThemeSwitch}
                className="ml-4 p-2 rounded-full text-text-secondary dark:text-[#94A3B8] hover:bg-secondary dark:hover:bg-[#11111F] focus:outline-none focus:ring-2 focus:ring-accent-start transition-colors"
                aria-label="Toggle theme"
                data-cursor-variant="link"
              >
                {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
              </button>
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="bg-secondary dark:bg-[#11111F] inline-flex items-center justify-center p-2 rounded-md text-text-secondary dark:text-gray-400 hover:text-text-primary dark:hover:text-white focus:outline-none focus:ring-2 focus:ring-accent-start"
              aria-controls="mobile-menu"
              aria-expanded="false"
              data-cursor-variant="link"
            >
              <span className="sr-only">Open main menu</span>
              {!isOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-primary/80 dark:bg-[#0A0A14]/80 backdrop-blur-lg" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map(link => (
                <NavLink key={link.href} href={link.href} onClick={closeMenu}>{link.label}</NavLink>
            ))}
             <div className="pt-2 pl-3">
              <button
                onClick={handleThemeSwitch}
                className="p-2 rounded-full text-text-secondary dark:text-[#94A3B8] hover:bg-secondary dark:hover:bg-[#11111F] focus:outline-none focus:ring-2 focus:ring-accent-start transition-colors"
                aria-label="Toggle theme"
                data-cursor-variant="link"
              >
                {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;