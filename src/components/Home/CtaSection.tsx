import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export const CtaSection: React.FC = () => {
    return (
        <section className="min-h-[80vh] flex items-center justify-center bg-white dark:bg-[#050505] text-black dark:text-white relative border-t border-gray-100 dark:border-white/5 py-32 z-20">
            {/* Minimalist background element instead of standard noise */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[1px] bg-gradient-to-r from-transparent via-black/20 dark:via-white/20 to-transparent" />

            <div className="container mx-auto px-8 lg:px-16 relative z-10 flex flex-col items-center text-center">
                
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                    className="mb-16"
                >
                    <span className="text-xs font-bold uppercase tracking-[0.3em] text-gray-400 mb-8 block">
                        La Prochaine Étape
                    </span>
                    <h2 className="text-[8vw] md:text-[6vw] font-black uppercase tracking-tighter leading-[0.9] text-black dark:text-white">
                        Prêt à Créer<br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-500 dark:from-white dark:to-gray-500">
                            L'Extraordinaire ?
                        </span>
                    </h2>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ delay: 0.2, duration: 1, ease: "easeOut" }}
                >
                    <Link
                        to="/contact"
                        className="group relative inline-flex items-center justify-center px-12 py-6 border border-black dark:border-white overflow-hidden transition-all duration-700 ease-out bg-transparent"
                    >
                        {/* Slide from bottom on hover */}
                        <div className="absolute inset-0 bg-black dark:bg-white translate-y-[101%] group-hover:translate-y-0 transition-transform duration-500 ease-in-out" />
                        
                        <span className="relative z-10 font-bold uppercase tracking-[0.2em] text-sm group-hover:text-white dark:group-hover:text-black transition-colors duration-500">
                            Lancer une collaboration
                        </span>
                    </Link>
                </motion.div>

             
                
            </div>
        </section>
    );
};