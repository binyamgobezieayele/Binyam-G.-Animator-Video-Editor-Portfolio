import type { Testimonial } from '../types';
import React from 'react';
import { motion, Variants } from 'framer-motion';

const testimonialsData: Testimonial[] = [
    { id: 1, quote: "Fast delivery, clean animation, scroll-stopping edits! Binyam is a true professional and a pleasure to work with.", author: 'Jane Doe', company: 'Tech Startup CEO' },
    { id: 2, quote: "The quality of the motion graphics exceeded our expectations. Our engagement rates have skyrocketed since we started using his videos.", author: 'John Smith', company: 'Marketing Director' },
    { id: 3, quote: "Incredibly creative and attentive to feedback. He took our rough concept and turned it into a masterpiece. Highly recommend!", author: 'Emily White', company: 'Content Creator' },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
};

const TestimonialCard: React.FC<{ testimonial: Testimonial }> = ({ testimonial }) => (
    <motion.div variants={itemVariants} className="relative p-px rounded-lg bg-gradient-to-br from-accent-start/50 to-secondary dark:to-[#0A0A14]">
        <div className="bg-secondary dark:bg-[#11111F] p-8 rounded-[7px] h-full relative overflow-hidden">
            <svg className="absolute -top-4 -right-4 w-32 h-32 text-primary dark:text-[#0A0A14]/50" fill="currentColor" viewBox="0 0 32 32" aria-hidden="true">
                <path d="M9.333 8h-2.667v-2.667h2.667v2.667zM12 5.333h-5.333v5.333h5.333v-5.333zM9.333 24h-2.667v-2.667h2.667v2.667zM12 21.333h-5.333v5.333h5.333v-5.333zM25.333 8h-2.667v-2.667h2.667v2.667zM28 5.333h-5.333v5.333h5.333v-5.333zM25.333 24h-2.667v-2.667h2.667v2.667zM28 21.333h-5.333v5.333h5.333v-5.333z" />
                <path d="M21.333 8h-2.667v-2.667h2.667v2.667zM24 5.333h-5.333v5.333h5.333v-5.333zM21.333 24h-2.667v-2.667h2.667v2.667zM24 21.333h-5.333v5.333h5.333v-5.333z" />
            </svg>
            <p className="text-text-secondary dark:text-[#94A3B8] italic relative z-10">"{testimonial.quote}"</p>
            <div className="mt-6 relative z-10">
                <p className="font-bold text-text-primary dark:text-[#F1F5F9]">{testimonial.author}</p>
                <p className="text-sm bg-gradient-to-r from-accent-start to-accent-end bg-clip-text text-transparent font-semibold">{testimonial.company}</p>
            </div>
        </div>
    </motion.div>
);

const Testimonials: React.FC = () => {
    return (
        <motion.section 
            id="testimonials" 
            className="py-20 bg-secondary dark:bg-[#11111F]"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={containerVariants}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.h2 variants={itemVariants} className="text-4xl font-bold text-center text-text-primary dark:text-white mb-12">Client Feedback</motion.h2>
                <motion.div 
                    className="grid md:grid-cols-1 lg:grid-cols-3 gap-8"
                    variants={containerVariants}
                >
                    {testimonialsData.map(testimonial => (
                        <TestimonialCard key={testimonial.id} testimonial={testimonial} />
                    ))}
                </motion.div>
            </div>
        </motion.section>
    );
}

export default Testimonials;