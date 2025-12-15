import React from 'react';
import { motion } from 'framer-motion';
import { CodeBracketSquareIcon, CpuChipIcon, CameraIcon } from './icons/IconComponents';

const software = [
  'Adobe After Effects', 'Adobe Premiere Pro', 'Blender',
  'DaVinci Resolve', 'Adobe Illustrator', 'Adobe Photoshop'
];

const hardware = [
  { spec: 'CPU', value: 'AMD Ryzen 9 5950X' },
  { spec: 'GPU', value: 'NVIDIA GeForce RTX 3090' },
  { spec: 'RAM', value: '64GB DDR4 3600MHz' },
  { spec: 'Storage', value: '2TB NVMe SSD' },
];

const cameraKit = [
  { item: 'Main Camera', value: 'Sony A7S III' },
  { item: 'Lens', value: 'G Master 24-70mm f/2.8' },
  { item: 'Gimbal', value: 'DJI Ronin-S' },
  { item: 'Lighting', value: 'Aputure 120D II' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

const GearCategory: React.FC<{
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}> = ({ icon, title, children }) => (
  <motion.div 
    variants={itemVariants} 
    className="bg-primary dark:bg-[#0A0A14] p-8 rounded-lg border border-border-default dark:border-[#11111F] h-full shadow-lg hover:border-accent-start/30 transition-colors"
  >
    <div className="flex items-center gap-4 mb-6">
      <span className="text-accent-start">{icon}</span>
      <h3 className="text-2xl font-bold text-text-primary dark:text-white">{title}</h3>
    </div>
    {children}
  </motion.div>
);

const GearAndSetup: React.FC = () => {
  return (
    <motion.section 
        id="gear-setup" 
        className="py-20 bg-primary dark:bg-[#0A0A14]"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={containerVariants}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div variants={itemVariants} className="text-center">
            <h2 className="text-4xl font-bold text-text-primary dark:text-white mb-4">My Gear & Setup</h2>
            <p className="text-text-secondary dark:text-[#94A3B8] mb-12 max-w-2xl mx-auto">The tools and technology I use to deliver professional, high-quality results.</p>
        </motion.div>
        
        <motion.div 
            className="grid lg:grid-cols-3 gap-8"
            variants={containerVariants}
        >
          <GearCategory icon={<CodeBracketSquareIcon className="w-8 h-8"/>} title="Software Suite">
            <ul className="space-y-3">
              {software.map(tool => (
                <li key={tool} className="text-text-secondary dark:text-[#94A3B8] flex items-center gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent-end"></span>
                  {tool}
                </li>
              ))}
            </ul>
          </GearCategory>
          
          <GearCategory icon={<CpuChipIcon className="w-8 h-8"/>} title="Core Hardware">
            <ul className="space-y-4">
              {hardware.map(item => (
                <li key={item.spec}>
                  <p className="font-semibold text-text-primary dark:text-white">{item.spec}</p>
                  <p className="text-sm text-text-secondary dark:text-[#94A3B8]">{item.value}</p>
                </li>
              ))}
            </ul>
          </GearCategory>

          <GearCategory icon={<CameraIcon className="w-8 h-8"/>} title="Camera Kit">
            <ul className="space-y-4">
              {cameraKit.map(item => (
                <li key={item.item}>
                  <p className="font-semibold text-text-primary dark:text-white">{item.item}</p>
                  <p className="text-sm text-text-secondary dark:text-[#94A3B8]">{item.value}</p>
                </li>
              ))}
            </ul>
          </GearCategory>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default GearAndSetup;
