import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-secondary dark:bg-[#11111F] border-t border-border-default dark:border-[#0A0A14]/50">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 text-center text-text-secondary dark:text-[#94A3B8]">
        <p>&copy; {new Date().getFullYear()} Binyam G. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
