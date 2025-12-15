import React from 'react';
import { motion, Variants } from 'framer-motion';

const GoogleLogo = () => (
    <svg className="w-full h-full" role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor"><title>Google</title><path d="M12.48 10.92v3.28h7.84c-.24 1.84-.85 3.18-1.73 4.1-1.02 1.02-2.3 1.63-4.38 1.63-3.32 0-5.75-2.52-5.75-5.67s2.43-5.67 5.75-5.67c1.83 0 3.1.72 3.82 1.42l2.44-2.77C18.04 4.08 15.65 3 12.48 3c-5.21 0-9.4 4.22-9.4 9.42s4.19 9.42 9.4 9.42c2.58 0 4.84-.86 6.54-2.58 1.77-1.73 2.65-4.13 2.65-7.1v-1.7H12.48z"/></svg>
);
const MicrosoftLogo = () => (
    <svg className="w-full h-full" role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor"><title>Microsoft</title><path d="M11.4 22.5h-10v-10h10v10zm0-11.5h-10v-10h10v10zm11.1 11.5h-10v-10h10v10zm0-11.5h-10v-10h10v10z"/></svg>
);
const NetflixLogo = () => (
    <svg className="w-full h-full" role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor"><title>Netflix</title><path d="M12.012 4.224v15.552l-.012.012-3.864-1.224V4.224H4.224v15.552L12 22.8l7.776-3.024V4.224h-3.912v11.304L12 16.752V4.224Z"/></svg>
);
const SpotifyLogo = () => (
    <svg className="w-full h-full" role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor"><title>Spotify</title><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.901 17.56c-.23.36-.69.47-1.05.24-2.82-1.74-6.36-2.1-10.58-1.15-.42.1-.84-.17-.94-.58-.1-.42.17-.84.58-.94 4.54-1.02 8.36-.63 11.43 1.25.36.23.47.69.24 1.05v-.11zm1.5-3.3c-.28.43-.84.56-1.27.28-3.24-1.98-7.85-2.58-11.53-1.42-.48.15-.99-.14-1.14-.62-.15-.48.14-.99.62-1.14C11.54 9.9 16.51 10.55 20.1 12.7c.43.28.56.84.28 1.27zM20.9 11c-.34.53-1.04.7-1.57.37-3.67-2.25-9.15-2.77-12.83-1.51-.57.19-1.17-.15-1.36-.72s.15-1.17.72-1.36c4.13-1.38 10.1- .81 14.28 1.7.53.33.7.99.36 1.52z"/></svg>
);
const BlenderLogo = () => (
    <svg className="w-full h-full" role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor"><title>Blender</title><path d="M21.56 8.58a2.53 2.53 0 00-.5-1.85 2.47 2.47 0 00-1.76-1l-6.23-1.8a.5.5 0 00-.41.09.52.52 0 00-.23.32l-1.3 5.48a.5.5 0 00.1.43.51.51 0 00.41.19h5.18a2.5 2.5 0 011.83.78 2.53 2.53 0 01.71 1.88 2.5 2.5 0 01-.73 1.83 2.45 2.45 0 01-1.83.74h-4.3l-1.33 5.5a.51.51 0 00.1.42.5.5 0 00.41.19l6.23 1.78a.5.5 0 00.4-.08.52.52 0 00.23-.33l4.08-10.1A2.52 2.52 0 0021.56 8.58zm-9.35 1.52a2.5 2.5 0 01-1.86-.76 2.53 2.53 0 01-.7-1.88 2.5 2.5 0 01.73-1.83 2.47 2.47 0 011.83-.74h3.18L13.88 9h-1.67z"/></svg>
);

const clients = [
    { name: 'Google', logo: <GoogleLogo /> },
    { name: 'Microsoft', logo: <MicrosoftLogo /> },
    { name: 'Netflix', logo: <NetflixLogo /> },
    { name: 'Spotify', logo: <SpotifyLogo /> },
    { name: 'Blender', logo: <BlenderLogo /> },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
};

const ClientLogos: React.FC = () => {
    return (
        <motion.section 
            className="bg-secondary dark:bg-[#11111F]"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={containerVariants}
        >
            <div className="max-w-5xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
                <motion.h2 variants={itemVariants} className="text-center text-sm font-bold uppercase text-text-secondary dark:text-[#94A3B8] tracking-widest mb-12">
                    Trusted by industry leaders
                </motion.h2>
                <motion.div 
                    variants={containerVariants}
                    className="flex flex-wrap items-center justify-center gap-x-10 gap-y-8 md:gap-x-16"
                >
                    {clients.map(client => (
                        <motion.div
                            key={client.name}
                            variants={itemVariants}
                            className="group"
                            aria-label={client.name}
                        >
                            <div className="h-8 md:h-9 text-gray-400/80 dark:text-gray-500/80 group-hover:text-text-primary dark:group-hover:text-white transition-all duration-300 transform group-hover:scale-110" data-cursor-variant="link">
                                {client.logo}
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </motion.section>
    );
}

export default ClientLogos;