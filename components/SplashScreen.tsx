import React from 'react';
import { motion, Transition } from 'framer-motion';

const SplashScreen: React.FC = () => {

  const pathAnimation = {
    pathLength: 1,
    fill: [
      "rgba(0, 0, 0, 0)", // Start transparent
      "rgba(0, 0, 0, 0)", // Stay transparent while drawing
      "url(#logoGradient)"  // Fill after drawing
    ]
  };

  const bTransition: Transition = {
    pathLength: { duration: 1.5, ease: "easeInOut" },
    fill: { duration: 0.5, ease: "easeIn", delay: 1.2 }
  };

  const gTransition: Transition = {
    pathLength: { duration: 1.5, ease: "easeInOut", delay: 0.3 },
    fill: { duration: 0.5, ease: "easeIn", delay: 1.5 }
  };

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-primary dark:bg-[#0A0A14]"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      aria-hidden="true"
    >
      <div className="relative w-36 h-24">
        <svg width="150" height="100" viewBox="0 0 150 100" className="absolute inset-0">
          <defs>
            <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#7C3AED" />
              <stop offset="100%" stopColor="#DB2777" />
            </linearGradient>
          </defs>
          {/* B Path */}
          <motion.path
            d="M 20 15 L 20 85 L 45 85 C 65 85 65 65 45 65 L 20 65 L 45 65 C 70 65 70 40 45 40 L 20 40"
            stroke="url(#logoGradient)" 
            strokeWidth="6" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            initial={{ pathLength: 0, fill: "rgba(0, 0, 0, 0)" }}
            animate={pathAnimation}
            transition={bTransition}
          />
          {/* G Path */}
          <motion.path
            d="M 125 50 C 125 72 105 90 85 90 C 65 90 60 70 70 55 L 70 45 C 60 30 65 10 85 10 C 105 10 125 28 125 50 M 100 50 L 80 50"
            stroke="url(#logoGradient)" 
            strokeWidth="6" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            initial={{ pathLength: 0, fill: "rgba(0, 0, 0, 0)" }}
            animate={pathAnimation}
            transition={gTransition}
          />
        </svg>
      </div>
    </motion.div>
  );
};

export default SplashScreen;