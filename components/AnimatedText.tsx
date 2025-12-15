import React from 'react';
import { motion, Variants } from 'framer-motion';

interface AnimatedTextProps {
  text: string;
  el?: React.ElementType;
  className?: string;
  wordClassName?: string;
  charClassName?: string;
  delay?: number;
}

export const AnimatedText: React.FC<AnimatedTextProps> = ({
  text,
  el: Wrapper = 'h2',
  className,
  wordClassName = 'mr-[0.25em]',
  charClassName,
  delay = 0,
}) => {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: delay,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { 
        y: '120%', 
        opacity: 0,
        filter: 'blur(10px)',
        scale: 1.2
    },
    visible: {
      y: 0,
      opacity: 1,
      filter: 'blur(0px)',
      scale: 1,
      transition: {
        type: 'spring',
        damping: 12,
        stiffness: 100,
      },
    },
  };

  return (
    <Wrapper className={className}>
      <span className="sr-only">{text}</span>
      <motion.span
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-10%" }}
        variants={containerVariants}
        className="inline-block"
      >
        {text.split(" ").map((word, i) => (
          <span key={i} className={`inline-block whitespace-nowrap overflow-hidden align-bottom pb-1 ${wordClassName}`}>
            {word.split("").map((char, j) => (
              <motion.span
                key={j}
                variants={itemVariants}
                className={`inline-block ${charClassName}`}
              >
                {char}
              </motion.span>
            ))}
          </span>
        ))}
      </motion.span>
    </Wrapper>
  );
};