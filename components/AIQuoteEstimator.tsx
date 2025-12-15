import React, { useState } from 'react';
import { GoogleGenAI, Type } from "@google/genai";
import { motion, Variants } from 'framer-motion';
import type { Quote } from '../types';
import { SparklesIcon } from './icons/IconComponents';

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

const AIQuoteEstimator: React.FC = () => {
    const [description, setDescription] = useState('');
    const [quote, setQuote] = useState<Quote | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleGetQuote = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!description.trim()) {
            setError("Please describe your project.");
            return;
        }

        setIsLoading(true);
        setQuote(null);
        setError(null);

        try {
            // FIX: Use process.env.API_KEY
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

            const responseSchema = {
                type: Type.OBJECT,
                properties: {
                    estimatedCostRange: { type: Type.STRING },
                    timelineEstimate: { type: Type.STRING },
                    breakdown: {
                        type: Type.ARRAY,
                        items: {
                            type: Type.OBJECT,
                            properties: {
                                item: { type: Type.STRING },
                                cost: { type: Type.STRING },
                            },
                            required: ["item", "cost"]
                        }
                    },
                    assumptions: { type: Type.STRING }
                },
                required: ["estimatedCostRange", "timelineEstimate", "breakdown", "assumptions"]
            };

            const systemInstruction = `You are an expert project estimator for a freelance 2D/3D Animator and Video Editor named Binyam G. Your task is to provide a cost and timeline estimate based on a client's project description. Binyam is a top-rated freelancer with 8+ years of experience, specializing in motion graphics, VFX, and short-form content. His typical rates are around $50/hour. A simple 30-second motion graphic might take 10-15 hours, while a complex 1-minute 3D animation could take 40+ hours. Base your estimate on the complexity, length, and style mentioned in the description. Always provide a cost range, a timeline, a breakdown of services, and any assumptions you made. Be realistic and professional. Respond only in the requested JSON format.`;

            const response = await ai.models.generateContent({
                model: "gemini-2.5-flash",
                contents: `Generate a quote for this project: ${description}`,
                config: {
                    responseMimeType: "application/json",
                    responseSchema: responseSchema,
                    systemInstruction: systemInstruction,
                },
            });

            const jsonText = response.text.trim();
            const parsedQuote = JSON.parse(jsonText);
            setQuote(parsedQuote);

        } catch (err) {
            console.error("Error generating quote:", err);
            setError("Sorry, I couldn't generate a quote right now. Please try again later or contact me directly.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <motion.section 
            id="quote" 
            className="py-20 bg-secondary dark:bg-[#11111F]"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={sectionVariants}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <motion.h2 variants={itemVariants} className="text-4xl font-bold text-text-primary dark:text-white flex items-center justify-center gap-4">
                    <SparklesIcon className="w-10 h-10 text-accent-start" />
                    AI Project Estimator
                </motion.h2>
                <motion.p variants={itemVariants} className="mt-4 text-lg text-text-secondary dark:text-[#94A3B8] max-w-2xl mx-auto">
                    Describe your project idea, and our AI will provide a preliminary estimate of the cost and timeline.
                </motion.p>

                <motion.div variants={itemVariants} className="mt-12 max-w-2xl mx-auto bg-primary dark:bg-[#0A0A14] p-8 rounded-lg shadow-2xl border border-border-default dark:border-[#11111F] hover:border-accent-start/30 transition-colors">
                    <form onSubmit={handleGetQuote} className="space-y-6">
                        <div>
                            <textarea
                                name="description"
                                rows={4}
                                placeholder="e.g., A 30-second 2D animated explainer video for my tech startup, with upbeat music and professional voiceover."
                                required
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="w-full bg-secondary dark:bg-[#11111F] border border-border-default dark:border-[#0A0A14] rounded-md py-3 px-4 text-text-primary dark:text-[#F1F5F9] focus:outline-none focus:ring-2 focus:ring-accent-start disabled:opacity-50"
                                disabled={isLoading}
                                aria-label="Project Description"
                            ></textarea>
                        </div>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full relative inline-flex items-center justify-center p-0.5 rounded-md font-bold text-white group disabled:opacity-60 disabled:cursor-not-allowed"
                        >
                            <span className="absolute inset-0 bg-gradient-to-r from-accent-start to-accent-end rounded-md"></span>
                            <span className="relative w-full px-8 py-3 bg-primary dark:bg-[#0A0A14] rounded-[5px] transition-all ease-in duration-200 group-hover:bg-opacity-0 flex items-center justify-center gap-2">
                                {isLoading ? (
                                    <>
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" role="status" aria-hidden="true">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Generating Estimate...
                                    </>
                                ) : 'Get Instant Estimate'}
                            </span>
                        </button>
                    </form>
                </motion.div>
                
                {error && (
                    <div role="alert" className="mt-8 max-w-2xl mx-auto text-center text-red-400 font-semibold p-4 rounded-lg bg-red-900/50 animate-fade-in">
                        {error}
                    </div>
                )}

                {quote && !isLoading && (
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="mt-8 max-w-2xl mx-auto text-left bg-primary dark:bg-[#0A0A14] p-8 rounded-lg shadow-2xl border border-accent-start/50" role="region" aria-live="polite">
                        <h3 className="text-2xl font-bold text-text-primary dark:text-white mb-6">Your Project Estimate:</h3>
                        
                        <div className="space-y-6">
                            <div>
                                <h4 className="text-sm font-semibold text-text-secondary dark:text-[#94A3B8] uppercase tracking-wider">Estimated Cost</h4>
                                <p className="text-3xl font-bold bg-gradient-to-r from-accent-start to-accent-end bg-clip-text text-transparent">{quote.estimatedCostRange}</p>
                            </div>

                            <div>
                                <h4 className="text-sm font-semibold text-text-secondary dark:text-[#94A3B8] uppercase tracking-wider">Estimated Timeline</h4>
                                <p className="text-xl font-medium text-text-primary dark:text-[#F1F5F9]">{quote.timelineEstimate}</p>
                            </div>
                            
                            <div>
                                <h4 className="text-sm font-semibold text-text-secondary dark:text-[#94A3B8] uppercase tracking-wider">Service Breakdown</h4>
                                <ul className="mt-2 space-y-2">
                                    {quote.breakdown.map((item, index) => (
                                        <li key={index} className="flex justify-between items-center bg-secondary dark:bg-[#11111F] p-3 rounded-md">
                                            <span className="text-text-primary dark:text-[#F1F5F9]">{item.item}</span>
                                            <span className="font-semibold text-text-secondary dark:text-[#94A3B8]">{item.cost}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div>
                                <h4 className="text-sm font-semibold text-text-secondary dark:text-[#94A3B8] uppercase tracking-wider">Assumptions</h4>
                                <p className="text-text-secondary dark:text-[#94A3B8] mt-2 italic text-sm">{quote.assumptions}</p>
                            </div>
                        </div>

                         <p className="mt-8 text-xs text-text-secondary dark:text-[#94A3B8] text-center">
                            *This is an AI-generated estimate and is not a final quote. Prices may vary based on project details. For a precise quote, please use the contact form below.
                        </p>
                    </motion.div>
                )}
            </div>
        </motion.section>
    );
};

export default AIQuoteEstimator;