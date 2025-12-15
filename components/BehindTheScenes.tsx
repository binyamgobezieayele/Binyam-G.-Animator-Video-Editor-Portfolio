import React from 'react';
import { motion } from 'framer-motion';
import { EyeIcon } from './icons/IconComponents';

const scenes = [
  {
    id: 1,
    title: 'Complex VFX Timeline',
    description: 'Dozens of layers, masks, and effects come together in After Effects to create a single, seamless shot.',
    imageUrl: 'https://i.imgur.com/6wzJzrP.jpeg',
  },
  {
    id: 2,
    title: '3D Modeling in Blender',
    description: 'Building a custom 3D asset from scratch. This is the wireframe view before textures and lighting are applied.',
    imageUrl: 'https://i.imgur.com/fO22Q9d.png',
  },
  {
    id: 3,
    title: 'The Editing Suite',
    description: 'My dual-monitor setup, optimized for a fluid workflow between editing, effects, and color grading panels.',
    imageUrl: 'https://i.imgur.com/GQSc7ou.png',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

const BehindTheScenes: React.FC = () => {
  return (
    <motion.section 
        id="behind-the-scenes" 
        className="py-20 bg-secondary dark:bg-[#11111F]"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={containerVariants}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div variants={itemVariants} className="text-center">
            <h2 className="text-4xl font-bold text-text-primary dark:text-white mb-4 flex items-center justify-center gap-4">
                <EyeIcon className="w-10 h-10 text-accent-start" />
                My Digital Workspace
            </h2>
            <p className="text-text-secondary dark:text-[#94A3B8] mb-12 max-w-2xl mx-auto">A look into the tools and techniques I use to bring ideas to life.</p>
        </motion.div>
        <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
        >
          {scenes.map(scene => (
            <motion.div 
                key={scene.id} 
                variants={itemVariants} 
                className="group relative overflow-hidden rounded-lg shadow-lg aspect-[3/2] border border-transparent hover:border-accent-start/50 transition-colors"
            >
                <img 
                    src={scene.imageUrl} 
                    alt={scene.title} 
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent transition-opacity duration-300"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-in-out">
                    <h3 className="text-lg font-bold">{scene.title}</h3>
                    <p className="text-sm text-slate-300 dark:text-[#94A3B8] mt-1">{scene.description}</p>
                </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
};

export default BehindTheScenes;