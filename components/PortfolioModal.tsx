import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import type { Project, PlaylistItem } from '../types';
import BeforeAfterSlider from './BeforeAfterSlider';
import { PuzzlePieceIcon, LightBulbIcon, TrophyIcon, TwitterIcon, FacebookIcon, ShareLinkedInIcon } from './icons/IconComponents';

interface PortfolioModalProps {
  project: Project;
  onClose: () => void;
}

// Improved helper to extract YouTube ID from standard or embed URLs
const getYouTubeId = (url: string) => {
  if (!url) return null;
  // Handle embed URLs like https://www.youtube.com/embed/VIDEO_ID?params...
  const embedMatch = url.match(/\/embed\/([^/?]+)/);
  if (embedMatch) return embedMatch[1];
  
  // Handle other YouTube URL formats
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
};

const PreviewContent: React.FC<{ item: PlaylistItem }> = ({ item }) => {
    // Extract ID to ensure we always use the embed endpoint, regardless of input format
    const videoId = item.videoUrl ? getYouTubeId(item.videoUrl) : null;

    // Construct valid embed URL. 
    // Adding origin is crucial for some embed restrictions.
    // Mute is required for autoplay in most browsers.
    // playsinline helps on mobile.
    const origin = typeof window !== 'undefined' ? window.location.origin : '';
    const videoUrlWithAutoplay = videoId
        ? `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&rel=0&modestbranding=1&playsinline=1&enablejsapi=1&origin=${origin}`
        : '';
    
    // Social Sharing URLs
    const pageUrl = 'https://binyamg.com'; 
    const shareText = `Check out this project "${item.title}" from Binyam G.'s portfolio!`;
    const twitterUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(pageUrl)}&text=${encodeURIComponent(shareText)}`;
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(pageUrl)}`;
    const linkedInUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(pageUrl)}&title=${encodeURIComponent(item.title)}&summary=${encodeURIComponent(item.description)}`;

    return (
        <motion.div 
          key={item.id}
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          exit={{ opacity: 0 }}
          className="h-full flex flex-col"
        >
            <div className="mb-6 bg-black rounded-md overflow-hidden aspect-video flex-shrink-0">
                {item.type === 'before-after' && item.beforeImageUrl && item.afterImageUrl ? (
                    <BeforeAfterSlider before={item.beforeImageUrl} after={item.afterImageUrl} />
                ) : videoUrlWithAutoplay ? (
                <div className="w-full h-full">
                    <iframe
                        src={videoUrlWithAutoplay}
                        title={item.title}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerPolicy="strict-origin-when-cross-origin"
                        allowFullScreen
                        className="w-full h-full"
                    ></iframe>
                </div>
                ) : (
                <img src={item.thumbnailUrl} alt={item.title} className="w-full h-full object-cover" />
                )}
            </div>

            <div className="flex-grow">
                <h3 className="text-2xl font-bold text-text-primary dark:text-white mb-2">{item.title}</h3>
                <p className="text-lg text-text-secondary dark:text-[#94A3B8] mb-4">{item.description}</p>
                <div className="flex flex-wrap gap-3 items-center mb-6">
                    <span className="font-semibold text-text-primary dark:text-[#F1F5F9] text-sm uppercase tracking-wider">Tools:</span>
                    {item.tools.map(tool => (
                        <span key={tool} className="bg-primary dark:bg-[#0A0A14] border border-border-default dark:border-gray-700 text-text-secondary dark:text-[#94A3B8] text-xs font-medium py-1 px-3 rounded-full">{tool}</span>
                    ))}
                </div>
                
                <div className="pt-6 border-t border-border-default dark:border-gray-700">
                  <h4 className="font-semibold text-text-primary dark:text-[#F1F5F9] mb-3 text-sm">Share this project</h4>
                  <div className="flex items-center gap-4">
                      <a href={twitterUrl} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#1DA1F2] transition-colors" data-cursor-variant="link" aria-label="Share on Twitter">
                          <TwitterIcon className="w-5 h-5" />
                      </a>
                      <a href={facebookUrl} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#1877F2] transition-colors" data-cursor-variant="link" aria-label="Share on Facebook">
                          <FacebookIcon className="w-5 h-5" />
                      </a>
                      <a href={linkedInUrl} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#0A66C2] transition-colors" data-cursor-variant="link" aria-label="Share on LinkedIn">
                          <ShareLinkedInIcon className="w-5 h-5" />
                      </a>
                  </div>
                </div>
            </div>
        </motion.div>
    );
}

const CaseStudyContent: React.FC<{ caseStudy: any }> = ({ caseStudy }) => {
    if (!caseStudy) return (
      <div className="flex items-center justify-center h-64 text-text-secondary dark:text-gray-500 italic">
        No case study available for this project.
      </div>
    );

    const sectionVariants: Variants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
    };
    
    const iconVariants: Variants = {
        hidden: { scale: 0.5, opacity: 0, rotate: -30 },
        visible: { scale: 1, opacity: 1, rotate: 0, transition: { duration: 0.4, ease: 'easeOut', delay: 0.2 } },
    };

    return (
        <motion.div 
            className="space-y-8 py-4"
            initial="hidden"
            animate="visible"
            variants={{ visible: { transition: { staggerChildren: 0.2 } } }}
        >
            <motion.div variants={sectionVariants}>
                <h3 className="text-xl font-bold text-text-primary dark:text-white mb-3 flex items-center gap-3">
                    <motion.span variants={iconVariants} className="bg-accent-start/10 p-2 rounded-md text-accent-start inline-block"><PuzzlePieceIcon /></motion.span>
                    The Problem
                </h3>
                <p className="text-text-secondary dark:text-[#94A3B8] leading-relaxed">{caseStudy.problem}</p>
            </motion.div>
            
            <motion.div variants={sectionVariants}>
                <h3 className="text-xl font-bold text-text-primary dark:text-white mb-3 flex items-center gap-3">
                    <motion.span variants={iconVariants} className="bg-accent-start/10 p-2 rounded-md text-accent-start inline-block"><LightBulbIcon /></motion.span>
                    The Solution
                </h3>
                <p className="text-text-secondary dark:text-[#94A3B8] leading-relaxed">{caseStudy.solution}</p>
            </motion.div>

            <motion.div variants={sectionVariants}>
                <h3 className="text-xl font-bold text-text-primary dark:text-white mb-3 flex items-center gap-3">
                    <motion.span variants={iconVariants} className="bg-accent-start/10 p-2 rounded-md text-accent-start inline-block"><TrophyIcon /></motion.span>
                    The Result
                </h3>
                <p className="text-text-secondary dark:text-[#94A3B8] leading-relaxed mb-4">{caseStudy.result}</p>
                {caseStudy.keyMetrics && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                        {caseStudy.keyMetrics.map((metric: any) => (
                            <motion.div 
                                key={metric.label} 
                                className="bg-primary dark:bg-[#0A0A14] p-4 rounded-lg border border-border-default dark:border-gray-700 transition-all duration-300 hover:border-accent-start/50 hover:shadow-lg"
                                whileHover={{ y: -5, scale: 1.03 }}
                            >
                                <p className="text-2xl font-bold bg-gradient-to-r from-accent-start to-accent-end bg-clip-text text-transparent">{metric.value}</p>
                                <p className="text-sm text-text-secondary dark:text-[#94A3B8]">{metric.label}</p>
                            </motion.div>
                        ))}
                    </div>
                )}
            </motion.div>
        </motion.div>
    );
};

const PlaylistItemCard: React.FC<{ 
  item: PlaylistItem; 
  isActive: boolean; 
  onClick: () => void 
}> = ({ item, isActive, onClick }) => {
  // Use improved ID extraction for thumbnails
  const videoId = item.videoUrl ? getYouTubeId(item.videoUrl) : null;
  const thumbnailUrl = item.thumbnailUrl || (videoId ? `https://img.youtube.com/vi/${videoId}/0.jpg` : '') || item.afterImageUrl;

  return (
    <div 
      onClick={onClick}
      className={`
        flex items-start gap-3 p-3 rounded-lg cursor-pointer transition-all duration-200
        ${isActive 
          ? 'bg-accent-start/10 border-l-4 border-accent-start' 
          : 'hover:bg-primary dark:hover:bg-[#0A0A14] border-l-4 border-transparent'
        }
      `}
    >
      <div className="relative w-24 aspect-video rounded-md overflow-hidden flex-shrink-0 bg-gray-800">
        <img src={thumbnailUrl} alt="" className="w-full h-full object-cover" />
        {isActive && (
          <div className="absolute inset-0 bg-black/40 grid place-items-center">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
          </div>
        )}
      </div>
      <div className="overflow-hidden">
        <h4 className={`text-sm font-semibold truncate ${isActive ? 'text-accent-start' : 'text-text-primary dark:text-gray-200'}`}>
          {item.title}
        </h4>
        <p className="text-xs text-text-secondary dark:text-gray-500 truncate mt-1">
          {item.description}
        </p>
      </div>
    </div>
  );
};

const PortfolioModal: React.FC<PortfolioModalProps> = ({ project, onClose }) => {
  const [activeTab, setActiveTab] = useState<'preview' | 'caseStudy'>('preview');
  const [activeItem, setActiveItem] = useState<PlaylistItem>(project.playlist[0]);

  // Reset active item when project changes (though modal remounts usually handle this)
  useEffect(() => {
    setActiveItem(project.playlist[0]);
    setActiveTab('preview');
  }, [project]);

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'auto';
    };
  }, [onClose]);

  const TabButton: React.FC<{
    label: string;
    isActive: boolean;
    onClick: () => void;
  }> = ({ label, isActive, onClick }) => (
    <button
      onClick={onClick}
      className={`relative px-4 py-2 font-semibold transition-colors duration-300 ${
        isActive ? 'text-accent-start' : 'text-text-secondary dark:text-gray-400 hover:text-text-primary dark:hover:text-white'
      }`}
    >
      {label}
      {isActive && <motion.div layoutId="active-tab-indicator" className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent-start rounded-t-full" />}
    </button>
  );

  return (
    <div 
      className="fixed inset-0 bg-black/90 backdrop-blur-md flex items-center justify-center z-[100] p-4 sm:p-6 animate-fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-category-title"
    >
      <div 
        className="bg-secondary dark:bg-[#11111F] rounded-xl shadow-2xl w-full max-w-7xl max-h-[90vh] flex flex-col overflow-hidden animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <header className="flex items-center justify-between p-4 px-6 border-b border-border-default dark:border-gray-700 bg-secondary dark:bg-[#11111F] z-10">
          <div>
            <span className="text-xs uppercase tracking-widest text-accent-start font-bold block mb-1">{project.title}</span>
            <h2 id="project-category-title" className="text-lg font-semibold text-text-primary dark:text-gray-300">
                Category Collection
            </h2>
          </div>
          <button 
            onClick={onClose} 
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 text-gray-500 hover:text-text-primary dark:hover:text-white transition-colors"
            aria-label="Close modal"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </header>

        {/* Main Layout: Grid on Desktop, Stack on Mobile */}
        <div className="flex-grow overflow-hidden flex flex-col lg:flex-row">
            
            {/* Left/Top Column: Content Area (Video/Case Study) */}
            <div className="flex-grow lg:w-2/3 overflow-y-auto p-6 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
               
               {/* Tabs if Case Study Exists */}
               {activeItem.caseStudy && (
                 <div className="flex border-b border-border-default dark:border-gray-700 mb-6">
                     <TabButton label="Preview" isActive={activeTab === 'preview'} onClick={() => setActiveTab('preview')} />
                     <TabButton label="Case Study" isActive={activeTab === 'caseStudy'} onClick={() => setActiveTab('caseStudy')} />
                 </div>
               )}

               <AnimatePresence mode="wait">
                   {activeTab === 'preview' ? (
                       <PreviewContent key={`preview-${activeItem.id}`} item={activeItem} />
                   ) : (
                       <CaseStudyContent key={`casestudy-${activeItem.id}`} caseStudy={activeItem.caseStudy} />
                   )}
               </AnimatePresence>
            </div>

            {/* Right/Bottom Column: Playlist Sidebar */}
            <div className="lg:w-1/3 bg-gray-50 dark:bg-[#0d0d16] border-t lg:border-t-0 lg:border-l border-border-default dark:border-gray-700 flex flex-col h-64 lg:h-auto min-h-0">
                <div className="p-4 border-b border-border-default dark:border-gray-800 bg-gray-100 dark:bg-[#0A0A14]">
                    <h3 className="text-sm font-bold text-text-primary dark:text-gray-300 uppercase tracking-wider">
                        In this Collection ({project.playlist.length})
                    </h3>
                </div>
                <div className="overflow-y-auto flex-grow p-2 space-y-1 scrollbar-thin scrollbar-thumb-gray-700">
                    {project.playlist.map((item) => (
                        <PlaylistItemCard 
                            key={item.id} 
                            item={item} 
                            isActive={activeItem.id === item.id} 
                            onClick={() => {
                                setActiveItem(item);
                                setActiveTab('preview');
                            }}
                        />
                    ))}
                </div>
            </div>

        </div>
      </div>
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fade-in { animation: fade-in 0.3s ease-out forwards; }
        
        @keyframes slide-up {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .animate-slide-up { animation: slide-up 0.4s ease-out forwards; }

        /* Custom Scrollbar for inner content */
        .scrollbar-thin::-webkit-scrollbar {
          width: 6px;
        }
        .scrollbar-thin::-webkit-scrollbar-track {
          background: transparent;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb {
          background-color: rgba(156, 163, 175, 0.5);
          border-radius: 20px;
        }
      `}</style>
    </div>
  );
};

export default PortfolioModal;