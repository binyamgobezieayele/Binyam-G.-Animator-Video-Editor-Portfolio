import React from 'react';
import { motion, Variants } from 'framer-motion';
import { MegaphoneIcon } from './icons/IconComponents';

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

const ReferralBanner: React.FC = () => {
  return (
    <motion.section
      className="py-16 bg-primary dark:bg-[#0A0A14]"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={sectionVariants}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={itemVariants}
          className="relative overflow-hidden bg-gradient-to-r from-accent-start to-accent-end rounded-lg p-8 md:p-12 text-center text-white shadow-glow-lg"
        >
          <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.05%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-50"></div>
          <div className="relative z-10">
            <MegaphoneIcon className="w-12 h-12 mx-auto mb-4" />
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
              Get 10% Off Your Next Project!
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-slate-200">
              Refer a new client, and you'll both receive a discount on our next collaboration. It's my way of saying thank you!
            </p>
            <div className="mt-8">
              <a
                href="#contact"
                className="inline-block bg-white text-accent-end font-bold py-3 px-8 rounded-full transition-transform duration-300 transform hover:scale-105 shadow-lg"
                data-cursor-variant="link"
              >
                Get in Touch
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default ReferralBanner;