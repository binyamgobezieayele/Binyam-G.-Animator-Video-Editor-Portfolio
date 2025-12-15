import React, { useEffect, useRef } from 'react';
import { motion, useInView, animate, Variants } from 'framer-motion';
import { BriefcaseIcon, CheckCircleIcon, ClockIcon, LocationMarkerIcon, TikTokIcon } from './icons/IconComponents';
import { AnimatedText } from './AnimatedText';

const sectionVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1
    }
  }
};

// More dynamic image reveal
const imageVariants: Variants = {
    hidden: { opacity: 0, scale: 0.8, rotate: -5 },
    visible: { 
        opacity: 1, 
        scale: 1, 
        rotate: 0, 
        transition: { 
            type: "spring",
            duration: 1,
            bounce: 0.4
        } 
    }
};

const textVariants: Variants = {
    hidden: { opacity: 0, x: 20 },
    visible: { 
        opacity: 1, 
        x: 0,
        transition: { duration: 0.6, ease: "easeOut" }
    }
};

const statContainerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15,
            delayChildren: 0.4
        }
    }
};

const statItemVariants: Variants = {
    hidden: { opacity: 0, y: 20, scale: 0.8 },
    visible: { 
        opacity: 1, 
        y: 0, 
        scale: 1,
        transition: { type: "spring", stiffness: 100, damping: 10 }
    }
};

interface AnimatedCounterProps {
  from?: number;
  to: number;
  duration?: number;
}

const AnimatedCounter: React.FC<AnimatedCounterProps> = ({ from = 0, to, duration = 2 }) => {
    const nodeRef = useRef<HTMLSpanElement>(null);
    const isInView = useInView(nodeRef, { once: true, margin: "-10%" });

    useEffect(() => {
        if (isInView && nodeRef.current) {
            const node = nodeRef.current;
            const controls = animate(from, to, {
                duration,
                ease: "easeOut",
                onUpdate(value) {
                    node.textContent = Math.round(value).toLocaleString();
                }
            });
            return () => controls.stop();
        }
    }, [from, to, duration, isInView]);

    return <span ref={nodeRef} />;
}

const StatCounter: React.FC<{ icon: React.ReactNode; value: number; label: string; suffix?: string; iconContainerClassName?: string; }> = ({ icon, value, label, suffix, iconContainerClassName }) => (
    <motion.div 
        variants={statItemVariants} 
        className="text-center group p-4 rounded-xl transition-colors hover:bg-secondary/50 dark:hover:bg-[#11111F]/50"
    >
        <motion.div 
            className={`text-accent-start mx-auto mb-3 transform transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3 ${iconContainerClassName || 'w-12 h-12'}`}
        >
            {icon}
        </motion.div>
        <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-accent-start to-accent-end bg-clip-text text-transparent">
            <AnimatedCounter to={value} />{suffix}
        </div>
        <p className="text-sm text-text-secondary dark:text-[#94A3B8] mt-1 font-medium">{label}</p>
    </motion.div>
);


const About: React.FC = () => {
    const stats = [
        { icon: <ClockIcon />, value: 8, suffix: "+", label: "Years of Experience" },
        { icon: <BriefcaseIcon />, value: 50, suffix: "+", label: "Projects Completed" },
        { icon: <TikTokIcon />, value: 560, suffix: "K+", label: "TikTok Followers" },
        { icon: <CheckCircleIcon />, value: 100, suffix: "%", label: "Job Success" },
    ];

  return (
    <motion.section 
        id="about" 
        className="py-20 bg-primary dark:bg-[#0A0A14] overflow-hidden"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionVariants}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center mb-16">
            <AnimatedText 
                text="About Me" 
                className="text-4xl font-bold text-center text-text-primary dark:text-white" 
            />
        </div>
        <div className="grid lg:grid-cols-5 gap-16 items-center">
          <motion.div variants={imageVariants} className="lg:col-span-2 relative z-10">
            <div className="relative w-full max-w-xs mx-auto group">
              <div className="absolute -inset-2.5 bg-gradient-to-r from-accent-start to-accent-end rounded-full blur-xl opacity-60 animate-pulse-slow group-hover:opacity-80 transition-opacity duration-500"></div>
              <motion.img 
                  src="https://i.imgur.com/B7qAtkF.jpeg" 
                  alt="Binyam G." 
                  className="relative w-full h-full object-cover rounded-full border-4 border-secondary dark:border-[#11111F] shadow-2xl"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
              />
              {/* Floating elements decoration */}
              <motion.div 
                  className="absolute -top-4 -right-4 w-8 h-8 bg-accent-end rounded-full blur-md opacity-60"
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div 
                  className="absolute -bottom-4 -left-4 w-12 h-12 bg-accent-start rounded-full blur-md opacity-60"
                  animate={{ y: [0, 15, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              />
            </div>
          </motion.div>
          
          <motion.div variants={textVariants} className="lg:col-span-3">
            <div className="space-y-6">
              <p className="text-lg text-text-secondary dark:text-[#94A3B8] leading-relaxed">
                I’m a passionate 2D/3D Animator & Video Editor with over 8 years of experience in motion graphics, VFX, and short-form content.
              </p>
              <p className="text-lg text-text-secondary dark:text-[#94A3B8] leading-relaxed">
                I’ve grown my TikTok page to over 560K+ followers, so I know how to make content pop online.
              </p>
              <motion.div 
                  className="flex items-center gap-3 text-text-primary dark:text-[#F1F5F9] mt-6"
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="text-accent-start"><LocationMarkerIcon /></div> Addis Ababa, Ethiopia
              </motion.div>
            </div>
          </motion.div>
        </div>

        <motion.div 
            variants={statContainerVariants} 
            className="grid grid-cols-2 md:grid-cols-4 gap-y-10 gap-x-6 mt-20 pt-16 border-t border-border-default dark:border-[#11111F]/50 items-end"
        >
            {stats.map(stat => (
                <StatCounter 
                    key={stat.label} 
                    {...stat} 
                    iconContainerClassName={stat.label === "Job Success" ? "w-36 h-36" : "w-12 h-12"}
                />
            ))}
        </motion.div>
      </div>
      <style>{`
        @keyframes pulse-slow {
          50% { opacity: 0.8; transform: scale(1.05); }
        }
        .animate-pulse-slow { animation: pulse-slow 6s cubic-bezier(0.4, 0, 0.6, 1) infinite; }
      `}</style>
    </motion.section>
  );
};

export default About;