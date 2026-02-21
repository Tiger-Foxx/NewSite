import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import bgImage from '../../assets/images/bg3.jpg';
import { Link } from 'react-router-dom';

export const HeroDesktop: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    return (
        <section ref={containerRef} className="relative w-full h-screen overflow-hidden bg-white dark:bg-[#050505] flex flex-col justify-center">
            
            <div className="container mx-auto px-8 lg:px-16 relative z-10 flex flex-col items-start justify-center h-full mt-10">
                <motion.div
                    initial={{ opacity: 0, y: 100 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                    className="w-full text-left"
                >
                    <h1 
                        className="text-[12vw] xl:text-[14vw] leading-[0.8] font-black uppercase tracking-tighter mb-10 w-full"
                        style={{
                            backgroundImage: `url(${bgImage})`,
                            backgroundSize: 'contain',
                            backgroundPosition: 'center',
                            backgroundAttachment: 'fixed', // MAGIC TRICK: Parallax effect on the mask itself
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                            color: 'transparent',
                        }}
                    >
                        Fox Is<br/>Different
                    </h1>
                </motion.div>

                <div className="flex flex-col md:flex-row items-end justify-between w-full max-w-7xl gap-8 relative z-20 mt-10">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.6, duration: 1, ease: "easeOut" }}
                        className="max-w-md"
                    >
                        <p className="text-xl md:text-2xl font-light text-gray-800 dark:text-gray-300 leading-relaxed border-l-[1px] border-black dark:border-white pl-6">
                            Nous ne faisons pas que du code. Nous sculptons des expériences numériques pures, intelligentes et intemporelles.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.8, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <Link 
                            to="/contact" 
                            className="group relative flex items-center px-10 py-6 border border-black dark:border-white hover:border-transparent transition-all duration-700 ease-out overflow-hidden bg-transparent cursor-pointer"
                        >
                            {/* Slide from left to right on hover */}
                            <div className="absolute inset-0 bg-black dark:bg-white -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-in-out" />
                            <span className="relative z-10 font-bold uppercase tracking-widest text-xs lg:text-sm group-hover:text-white dark:group-hover:text-black transition-colors duration-500 flex items-center gap-4">
                                Démarrons votre projet
                                <svg className="w-5 h-5 transform group-hover:translate-x-2 transition-transform duration-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </span>
                        </Link>
                    </motion.div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 1 }}
                className="absolute bottom-12 right-12 lg:right-16 flex flex-col items-center gap-4 z-20"
            >
                <div className="w-[1px] h-24 bg-gray-200 dark:bg-gray-800 overflow-hidden relative">
                    <motion.div 
                        className="absolute inset-0 bg-black dark:bg-white"
                        animate={{ y: ["-100%", "100%"] }}
                        transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                    />
                </div>
                {/* Removed the overlapping scroll text and replaced with minimal bounding arrow */}
                <svg className="w-4 h-4 text-black dark:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
            </motion.div>
        </section>
    );
};
