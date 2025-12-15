import type { Skill } from '../types';
import React from 'react';
import { motion } from 'framer-motion';
import { AnimationIcon, VideoEditingIcon, MotionGraphicsIcon, CharacterAnimationIcon, SocialMediaIcon, WeddingIcon } from './icons/IconComponents';
import { AnimatedText } from './AnimatedText';


const skillsData: Skill[] = [
  { name: '2D/3D Animation', icon: <AnimationIcon /> },
  { name: 'Video Editing', icon: <VideoEditingIcon /> },
  { name: 'Motion Graphics', icon: <MotionGraphicsIcon /> },
  { name: 'Character Animation', icon: <CharacterAnimationIcon /> },
  { name: 'Social Media & YouTube', icon: <SocialMediaIcon /> },
  { name: 'Wedding & Event Videos', icon: <WeddingIcon /> },
];

const tools = ['After Effects', 'Premiere Pro', 'Blender', 'AI Tools'];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};


const SkillCard: React.FC<{ skill: Skill }> = ({ skill }) => (
  <motion.div variants={itemVariants} className="group relative bg-secondary dark:bg-[#11111F] p-6 rounded-lg text-center transition-all duration-300 transform hover:scale-105">
    <div className="absolute -inset-px bg-gradient-to-r from-accent-start to-accent-end rounded-lg opacity-0 group-hover:opacity-75 transition-opacity duration-300"></div>
    <div className="relative">
      <div className="text-accent-start w-16 h-16 mx-auto mb-4 transition-transform duration-300 ease-in-out group-hover:-translate-y-2 group-hover:rotate-3 group-hover:scale-105">
        {skill.icon}
      </div>
      <h3 className="text-lg font-semibold text-text-primary dark:text-[#F1F5F9]">{skill.name}</h3>
    </div>
  </motion.div>
);

const Skills: React.FC = () => {
  return (
    <motion.section 
        id="skills" 
        className="py-20 bg-secondary dark:bg-[#11111F]"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center mb-4">
            <AnimatedText 
                text="My Skills" 
                className="text-4xl font-bold text-center text-text-primary dark:text-white" 
            />
        </div>
        <motion.p variants={itemVariants} className="text-center text-text-secondary dark:text-[#94A3B8] mb-12 max-w-2xl mx-auto">A versatile skill set to bring any creative vision to life.</motion.p>
        <motion.div 
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8"
            variants={containerVariants}
        >
          {skillsData.map((skill) => (
            <SkillCard key={skill.name} skill={skill} />
          ))}
        </motion.div>
        <motion.div variants={itemVariants} className="mt-16 text-center">
            <h3 className="text-2xl font-bold text-text-primary dark:text-white mb-6">Tools I Use</h3>
            <div className="flex flex-wrap justify-center items-center gap-4">
                {tools.map(tool => (
                    <span key={tool} className="bg-primary dark:bg-[#0A0A14] border border-border-default dark:border-[#11111F] text-text-secondary dark:text-[#94A3B8] font-medium py-2 px-5 rounded-full shadow-sm">{tool}</span>
                ))}
            </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Skills;