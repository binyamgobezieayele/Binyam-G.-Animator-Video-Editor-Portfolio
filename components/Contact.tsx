import React, { useState } from 'react';
import { motion, Variants } from 'framer-motion';
import { UpworkIcon, TikTokIcon, LinkedInIcon, EmailIcon } from './icons/IconComponents';

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

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Here you would typically send the data to a backend service
    setSubmitted(true);
    setFormData({ name: '', email: '', message: '' });
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <motion.section 
      id="contact" 
      className="py-20 bg-primary dark:bg-[#0A0A14]"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={sectionVariants}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.h2 variants={itemVariants} className="text-4xl font-bold text-text-primary dark:text-white">Let’s create something amazing</motion.h2>
        <motion.p variants={itemVariants} className="mt-4 text-lg bg-gradient-to-r from-accent-start to-accent-end bg-clip-text text-transparent font-semibold">Message me for a free sample!</motion.p>
        
        <motion.div variants={itemVariants} className="mt-12 max-w-2xl mx-auto bg-secondary dark:bg-[#11111F] p-8 rounded-lg shadow-2xl border border-primary dark:border-[#0A0A14] hover:border-accent-start/30 transition-colors">
          {submitted ? (
            <div className="text-center text-green-300 font-semibold p-4 rounded-lg bg-green-900/50">
                Thank you for your message! I'll get back to you soon.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <input 
                  type="text" 
                  name="name" 
                  placeholder="Your Name" 
                  required 
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-primary dark:bg-[#0A0A14] border border-border-default dark:border-[#334155] rounded-md py-3 px-4 text-text-primary dark:text-[#F1F5F9] focus:outline-none focus:ring-2 focus:ring-accent-start" 
                />
              </div>
              <div>
                <input 
                  type="email" 
                  name="email" 
                  placeholder="Your Email" 
                  required 
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-primary dark:bg-[#0A0A14] border border-border-default dark:border-[#334155] rounded-md py-3 px-4 text-text-primary dark:text-[#F1F5F9] focus:outline-none focus:ring-2 focus:ring-accent-start" 
                />
              </div>
              <div>
                <textarea 
                  name="message" 
                  rows={5} 
                  placeholder="Your Message" 
                  required 
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full bg-primary dark:bg-[#0A0A14] border border-border-default dark:border-[#334155] rounded-md py-3 px-4 text-text-primary dark:text-[#F1F5F9] focus:outline-none focus:ring-2 focus:ring-accent-start"
                ></textarea>
              </div>
              <button type="submit" className="w-full relative inline-flex items-center justify-center p-0.5 rounded-md font-bold text-white group" data-cursor-variant="link">
                 <span className="absolute inset-0 bg-gradient-to-r from-accent-start to-accent-end rounded-md"></span>
                 <span className="relative w-full px-8 py-3 bg-secondary dark:bg-[#11111F] rounded-[5px] transition-all ease-in duration-200 group-hover:bg-opacity-0">
                    Send Message
                 </span>
              </button>
            </form>
          )}
        </motion.div>

        <motion.div variants={itemVariants} className="mt-16">
          <p className="text-text-secondary dark:text-[#94A3B8] mb-6">Or find me on:</p>
          <div className="flex justify-center items-center gap-6">
            <a href="https://www.upwork.com/freelancers/~01edea4e134015fee8" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-accent-start transition-colors duration-300 transform hover:scale-110" data-cursor-variant="link"><UpworkIcon className="w-6 h-6" /></a>
            <a href="#" className="text-gray-400 hover:text-accent-start transition-colors duration-300 transform hover:scale-110" data-cursor-variant="link"><TikTokIcon className="w-6 h-6" /></a>
            <a href="#" className="text-gray-400 hover:text-accent-start transition-colors duration-300 transform hover:scale-110" data-cursor-variant="link"><LinkedInIcon /></a>
            <a href="mailto:example@email.com" className="text-gray-400 hover:text-accent-start transition-colors duration-300 transform hover:scale-110" data-cursor-variant="link"><EmailIcon /></a>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Contact;