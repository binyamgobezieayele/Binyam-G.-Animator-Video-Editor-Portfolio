import type { Project } from '../types';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PortfolioModal from './PortfolioModal';
import { AnimatedText } from './AnimatedText';

const portfolioData: Project[] = [
  {
    id: 1,
    title: 'YouTube Channel Intros',
    description: 'Immersive 3D intros, product visualizations, and motion design.',
    category: 'YouTube Channel Intros',
    thumbnailUrl: 'https://drive.google.com/uc?id=1X9k9dE-r0-sP_gI_h-U_yT_r_E_w_Q-lKj',
    tools: ['Blender', 'After Effects', 'Cinema 4D'],
    playlist: [
      {
        id: '3d-1',
        type: 'standard',
        title: 'Tech Channel Intro',
        description: 'Dynamic 3D intro animation for a popular tech channel.',
        thumbnailUrl: 'https://drive.google.com/uc?id=1X9k9dE-r0-sP_gI_h-U_yT_r_E_w_Q-lKj',
        videoUrl: 'https://www.youtube.com/embed/qeMPYrA2YN4',
        tools: ['Blender', 'After Effects']
      },
      {
        id: '3d-2',
        type: 'standard',
        title: 'Gaming Intro',
        description: 'High-energy 3D reveal for a gaming content creator.',
        videoUrl: 'https://www.youtube.com/embed/qeMPYrA2YN4',
        tools: ['Blender', 'After Effects']
      },
      {
        id: '3d-3',
        type: 'standard',
        title: 'Vlog Intro',
        description: 'Clean and modern 3D motion graphics intro.',
        videoUrl: 'https://www.youtube.com/embed/dzxYOy1XJms',
        tools: ['Blender']
      }
    ]
  },
  {
    id: 2,
    title: 'Short Form Videos',
    description: 'Engaging content for TikTok, Reels, and Shorts designed to go viral.',
    category: 'Short Form',
    thumbnailUrl: 'https://drive.google.com/uc?id=1P0b1A_s-D_c_V-fG_h_J-k_L-m_N-o_Pq',
    tools: ['After Effects', 'Premiere Pro', 'CapCut'],
    playlist: [
      {
        id: 'sf-1',
        type: 'standard',
        title: 'TikTok Dance VFX',
        description: 'Viral dance video enhanced with scroll-stopping visual effects.',
        thumbnailUrl: 'https://drive.google.com/uc?id=1P0b1A_s-D_c_V-fG_h_J-k_L-m_N-o_Pq',
        videoUrl: 'https://www.youtube.com/embed/dzxYOy1XJms',
        tools: ['After Effects', 'Premiere Pro']
      },
      {
        id: 'sf-2',
        type: 'standard',
        title: 'Social Media Ad Campaign',
        description: 'A series of short, punchy video ads for a new product launch.',
        thumbnailUrl: 'https://drive.google.com/uc?id=1-m_L-k_J-i_H_g_F-e_D_c-B_a_Z_y-Xw',
        videoUrl: 'https://www.youtube.com/embed/qeMPYrA2YN4',
        tools: ['Premiere Pro', 'After Effects']
      }
    ]
  },
  {
    id: 3,
    title: '2D Animation',
    description: 'Explainer videos and character animations that tell a compelling story.',
    category: '2D Animation',
    thumbnailUrl: 'https://drive.google.com/uc?id=1_R_e_W-q_T_y_U-i_O_p_A-s_D-f_G-hJ',
    tools: ['After Effects', 'Illustrator', 'Animate'],
    playlist: [
      {
        id: '2d-3',
        type: 'standard',
        title: '2D Animation Portfolio Showcase',
        description: 'A comprehensive showcase of my 2D animation work and motion graphics.',
        videoUrl: 'https://www.youtube.com/embed/7oGU6b6YW4A',
        tools: ['After Effects', 'Illustrator', 'Animate']
      },
      {
        id: '2d-4',
        type: 'standard',
        title: 'Photo Book Promo',
        description: 'Animated Promo Video for Photo Book Pre-Sales.',
        videoUrl: 'https://www.youtube.com/embed/t6cAV1_ipF8',
        tools: ['After Effects', 'Illustrator']
      },
      {
        id: '2d-1',
        type: 'standard',
        title: 'Corporate Explainer Video',
        description: 'Clean 2D motion graphics video explaining a complex service.',
        thumbnailUrl: 'https://drive.google.com/uc?id=1_R_e_W-q_T_y_U-i_O_p_A-s_D-f_G-hJ',
        videoUrl: 'https://www.youtube.com/embed/qeMPYrA2YN4',
        tools: ['After Effects'],
        caseStudy: {
          problem: "A B2B SaaS company struggled to explain their complex software's value proposition on their website. Potential customers were dropping off, confused by text-heavy pages.",
          solution: "I developed a 90-second 2D animated explainer video. Using clean visuals, branded characters, and kinetic typography, we distilled the core features into an engaging and easy-to-understand narrative. The story followed a relatable customer persona overcoming common pain points with the software.",
          result: "The video, placed prominently on the homepage, became a cornerstone of their marketing. It directly addressed user confusion and provided a clear, concise overview of the product's benefits, leading to better engagement and more qualified leads.",
          keyMetrics: [
            { label: 'Increase in Demo Sign-ups', value: '+35%' },
            { label: 'Reduction in Bounce Rate', value: '-20%' },
            { label: 'Average Time on Page', value: '+70%' },
          ]
        }
      },
      {
        id: '2d-2',
        type: 'standard',
        title: 'Character Animation Short',
        description: 'A short story brought to life with expressive 2D character animation.',
        thumbnailUrl: 'https://drive.google.com/uc?id=1-eD_c_B_a-Z_y_X-w_V_u-T_s_R_q-PoN',
        videoUrl: 'https://www.youtube.com/embed/dzxYOy1XJms',
        tools: ['After Effects', 'AI Tools']
      }
    ]
  },
  {
    id: 4,
    title: 'Motion Graphics',
    description: 'Cinematic editing, color grading, and dynamic text animation.',
    category: 'Motion Graphics',
    thumbnailUrl: 'https://drive.google.com/uc?id=1-u_T-s_R_q-P_o_N-m_L-k_J_i_H-gF',
    tools: ['Premiere Pro', 'DaVinci Resolve'],
    playlist: [
      {
        id: 'mg-1',
        type: 'before-after',
        title: 'Wedding Highlight Film',
        description: 'Cinematic editing and color grading to create a warm, emotional tone.',
        beforeImageUrl: 'https://drive.google.com/uc?id=1-kL_j_I-h_G_f-E_d_C-b_A-z_Y_x-Wv',
        afterImageUrl: 'https://drive.google.com/uc?id=1-u_T-s_R_q-P_o_N-m_L-k_J_i_H-gF',
        tools: ['Premiere Pro', 'DaVinci Resolve']
      },
      {
        id: 'mg-2',
        type: 'standard',
        title: 'Documentary Style Video',
        description: 'Editing and color grading for a mini-documentary about travel.',
        thumbnailUrl: 'https://drive.google.com/uc?id=1-m_L-k_J-i_H_g_F-e_D_c-B_a_Z_y-Xw',
        videoUrl: 'https://www.youtube.com/embed/qeMPYrA2YN4',
        tools: ['Premiere Pro', 'DaVinci Resolve']
      }
    ]
  }
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
    hidden: { opacity: 0, y: 20, scale: 0.98 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5 } }
};

const CategoryCard: React.FC<{ project: Project; onProjectClick: (project: Project) => void }> = ({ project, onProjectClick }) => (
    <motion.div 
        layout
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -20, scale: 0.95 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="group relative overflow-hidden rounded-lg bg-secondary dark:bg-[#11111F] shadow-lg cursor-pointer aspect-[3/2] border border-transparent hover:border-accent-start/50 transition-colors"
        onClick={() => onProjectClick(project)}
        data-cursor-variant="project"
    >
        <img 
            src={project.thumbnailUrl} 
            alt={project.title} 
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105 filter brightness-[0.8] group-hover:brightness-100"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent transition-opacity duration-500"></div>
        
        {/* Playlist Indicator */}
        <div className="absolute top-3 right-3 flex items-center gap-1 bg-black/60 backdrop-blur-sm text-white text-xs font-bold py-1.5 px-3 rounded-full z-10 border border-white/10">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3 h-3">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
            <span>{project.playlist.length} Videos</span>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                <h3 className="text-2xl font-bold mb-2">
                    {project.title}
                </h3>
                <p className="text-sm text-slate-300 line-clamp-2">{project.description}</p>
            </div>
            
            <div className="flex flex-wrap gap-2 mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-4 group-hover:translate-y-0 delay-100">
                {project.tools.slice(0, 3).map(tool => (
                    <span key={tool} className="text-xs bg-accent-start/80 text-white py-1 px-2 rounded-full backdrop-blur-sm">{tool}</span>
                ))}
            </div>
        </div>
    </motion.div>
);


const Portfolio: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
  };

  const handleCloseModal = () => {
    setSelectedProject(null);
  };

  return (
    <motion.section 
        id="portfolio" 
        className="py-20 bg-primary dark:bg-[#0A0A14]"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={containerVariants}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center mb-12">
            <AnimatedText 
                text="My Portfolio" 
                className="text-4xl font-bold text-center text-text-primary dark:text-white" 
            />
        </div>
        
        <p className="text-center text-text-secondary dark:text-[#94A3B8] mb-12 max-w-2xl mx-auto">
          Explore my work by category. Click on any card to view the video playlist.
        </p>

        <motion.div 
            layout
            className="grid md:grid-cols-2 gap-8"
        >
            <AnimatePresence>
              {portfolioData.map(project => (
                  <CategoryCard key={project.id} project={project} onProjectClick={handleProjectClick} />
              ))}
            </AnimatePresence>
        </motion.div>
      </div>
      {selectedProject && <PortfolioModal project={selectedProject} onClose={handleCloseModal} />}
    </motion.section>
  );
};

export default Portfolio;