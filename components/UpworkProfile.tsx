import React from 'react';
import { motion, Variants } from 'framer-motion';
import { UpworkIcon, StarIcon, CheckCircleIcon, TrophyIcon, ArrowTopRightOnSquareIcon } from './icons/IconComponents';

const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
      staggerChildren: 0.2
    }
  }
};

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
};

const StatCard: React.FC<{ icon: React.ReactNode; label: string; value: string; }> = ({ icon, label, value }) => (
    <div className="bg-secondary dark:bg-[#11111F] p-6 rounded-lg text-center flex flex-col items-center border border-border-default dark:border-[#0A0A14] hover:border-accent-start/30 transition-colors h-full">
        <div className="text-accent-start w-40 h-40 mb-3">{icon}</div>
        <p className="text-2xl font-bold text-text-primary dark:text-white">{value}</p>
        <p className="text-sm text-text-secondary dark:text-[#94A3B8] mt-1">{label}</p>
    </div>
);

const UpworkProfile: React.FC = () => {
  return (
    <motion.section
      id="upwork"
      className="py-20 bg-primary dark:bg-[#0A0A14]"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={sectionVariants}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.h2 variants={itemVariants} className="text-4xl font-bold text-text-primary dark:text-white flex items-center justify-center gap-4">
          <UpworkIcon className="w-10 h-10" />
          Top Rated on Upwork
        </motion.h2>
        <motion.p variants={itemVariants} className="mt-4 text-lg text-text-secondary dark:text-[#94A3B8] max-w-2xl mx-auto">
          Consistently delivering high-quality work and maintaining excellent client relationships on the world's largest freelance marketplace.
        </motion.p>
        
        <motion.div 
            variants={sectionVariants} 
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 max-w-4xl mx-auto"
        >
            <motion.div variants={itemVariants}>
                <StatCard icon={<CheckCircleIcon />} value="100%" label="Job Success Score" />
            </motion.div>
            <motion.div variants={itemVariants}>
                <StatCard icon={<TrophyIcon />} value="Top Rated" label="Freelancer" />
            </motion.div>
            <motion.div variants={itemVariants}>
                <StatCard icon={<StarIcon />} value="5-Star" label="All Feedback" />
            </motion.div>
        </motion.div>

        <motion.div variants={itemVariants} className="mt-12">
            <a 
                href="https://www.upwork.com/freelancers/~01edea4e134015fee8" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="relative inline-flex items-center justify-center p-0.5 rounded-full font-bold text-white group" 
                data-cursor-variant="link"
            >
                <span className="absolute inset-0 bg-gradient-to-r from-accent-start to-accent-end rounded-full"></span>
                <span className="relative px-8 py-3 bg-primary/80 dark:bg-[#0A0A14]/80 backdrop-blur-sm rounded-full transition-all ease-in duration-200 group-hover:bg-opacity-0 flex items-center gap-2">
                    View My Profile on Upwork <ArrowTopRightOnSquareIcon className="w-5 h-5" />
                </span>
            </a>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default UpworkProfile;