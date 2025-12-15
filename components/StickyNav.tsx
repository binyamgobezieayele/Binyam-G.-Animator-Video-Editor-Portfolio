import React, { useState, useEffect, useRef } from 'react';
import { HomeIcon, BriefcaseIcon, EmailIcon } from './icons/IconComponents';

const NAV_ITEMS = [
  { id: 'home', icon: <HomeIcon className="w-6 h-6" />, label: 'Home' },
  { id: 'portfolio', icon: <BriefcaseIcon className="w-6 h-6" />, label: 'Portfolio' },
  { id: 'contact', icon: <EmailIcon className="w-6 h-6" />, label: 'Contact' },
];

const StickyNav: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  useEffect(() => {
    NAV_ITEMS.forEach(item => {
      sectionRefs.current[item.id] = document.getElementById(item.id);
    });
  }, []);

  const handleScroll = () => {
    // Handle visibility
    if (window.scrollY > window.innerHeight * 0.8) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
    
    // Handle active section
    let currentSection = '';
    const scrollPosition = window.scrollY + window.innerHeight / 2;

    NAV_ITEMS.forEach(item => {
      const element = sectionRefs.current[item.id];
      if (element) {
        if (element.offsetTop <= scrollPosition && element.offsetTop + element.offsetHeight > scrollPosition) {
          currentSection = item.id;
        }
      }
    });

    if (currentSection) {
      setActiveSection(currentSection);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav 
        className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        aria-label="Quick navigation"
    >
      <div className="bg-secondary/70 dark:bg-[#11111F]/70 backdrop-blur-md rounded-full shadow-lg border border-border-default/50 dark:border-[#11111F]/50 p-2 flex items-center space-x-2">
        {NAV_ITEMS.map(item => (
          <a
            key={item.id}
            href={`#${item.id}`}
            data-cursor-variant="link"
            className={`
              w-12 h-12 flex items-center justify-center rounded-full transition-all duration-300
              ${activeSection === item.id 
                ? 'bg-gradient-to-r from-accent-start to-accent-end text-white shadow-md' 
                : 'text-text-secondary dark:text-[#94A3B8] hover:bg-primary/50 dark:hover:bg-[#0A0A14]/50'
              }
            `}
            aria-label={`Go to ${item.label} section`}
            aria-current={activeSection === item.id ? 'page' : undefined}
          >
            {item.icon}
          </a>
        ))}
      </div>
    </nav>
  );
};

export default StickyNav;