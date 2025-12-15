import React, { useState } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { PlusIcon } from './icons/IconComponents';

const faqData = [
  {
    question: "What's your revision policy?",
    answer: "I offer up to two rounds of major revisions and unlimited minor tweaks. My goal is to ensure you're 100% happy with the final product. We'll establish clear milestones for feedback to keep the project on track."
  },
  {
    question: "What are your typical delivery times?",
    answer: "Delivery time depends on the project's complexity. A short social media animation might take 3-5 days, while a 60-second explainer video could take 2-3 weeks. I'll provide a detailed timeline estimate with your formal quote."
  },
  {
    question: "How do you handle pricing?",
    answer: "I offer both hourly rates (~$50/hr) and fixed-price project quotes. For larger projects, a fixed price is often best. Use the AI Estimator for a preliminary idea, then contact me for a detailed, formal quote tailored to your specific needs."
  },
  {
    question: "In what format will I receive the final files?",
    answer: "You'll typically receive the final video in a high-quality MP4 format, optimized for web and social media. I can also provide other formats (MOV, GIF, etc.) upon request. Project source files can be included for an additional fee."
  }
];

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

const FAQItem: React.FC<{
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
}> = ({ question, answer, isOpen, onClick }) => {
  return (
    <motion.div variants={itemVariants} className="border-b border-border-default dark:border-[#11111F]">
      <button
        onClick={onClick}
        className="w-full flex justify-between items-center py-6 text-left"
        aria-expanded={isOpen}
        data-cursor-variant="link"
      >
        <span className="text-lg font-semibold text-text-primary dark:text-white pr-4">{question}</span>
        <motion.div
          className={`flex-shrink-0 transition-colors duration-300 ${isOpen ? 'text-accent-start' : 'text-text-secondary dark:text-[#94A3B8]'}`}
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        >
          <PlusIcon />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={{
              open: { opacity: 1, height: "auto" },
              collapsed: { opacity: 0, height: 0 }
            }}
            transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
            className="overflow-hidden"
          >
            <p className="pb-6 pr-8 text-text-secondary dark:text-[#94A3B8] leading-relaxed">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const FAQ: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <motion.section
      id="faq"
      className="py-20 bg-secondary dark:bg-[#11111F]"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={sectionVariants}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2 variants={itemVariants} className="text-4xl font-bold text-center text-text-primary dark:text-white mb-4">
          Frequently Asked Questions
        </motion.h2>
        <motion.p variants={itemVariants} className="text-center text-text-secondary dark:text-[#94A3B8] mb-12 max-w-2xl mx-auto">
          Quick answers to common questions. If you don't find what you're looking for, feel free to contact me.
        </motion.p>
        <div className="bg-primary dark:bg-[#0A0A14] p-4 sm:p-8 rounded-lg border border-border-default dark:border-[#11111F]">
          {faqData.map((faq, index) => (
            <FAQItem
              key={index}
              question={faq.question}
              answer={faq.answer}
              isOpen={activeIndex === index}
              onClick={() => toggleFAQ(index)}
            />
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default FAQ;