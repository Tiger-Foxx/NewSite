import React from 'react';
import Lottie from 'lottie-react';
import { motion } from 'framer-motion';
import foxZen from '../../assets/lotties/fox-zen.json';
import { Link } from 'react-router-dom';

export const HeroSection: React.FC = () => {
    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white dark:bg-black pt-20">
            <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                    {/* Text Content */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        className="order-2 lg:order-1 text-center lg:text-left"
                    >
                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-black dark:text-white mb-8 leading-[0.9]">
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-black dark:from-orange-400 dark:to-white">Fox</span> Is <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-500 to-black dark:from-gray-400 dark:to-white">
                                Different.
                            </span>
                        </h1>

                        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-10 max-w-lg mx-auto lg:mx-0 font-light leading-relaxed">
                            Nous ne faisons pas que du code. Nous sculptons des expériences numériques pures, intelligentes et intemporelles.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                            <Link
                                to="/contact"
                                className="group relative px-8 py-4 bg-black dark:bg-white text-white dark:text-black rounded-full text-sm font-medium overflow-hidden transition-transform hover:scale-105 active:scale-95"
                            >
                                <span className="relative z-10">Commencer un projet</span>
                                <div className="absolute inset-0 bg-gray-800 dark:bg-gray-200 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
                            </Link>

                            <Link
                                to="/projects"
                                className="px-8 py-4 border border-gray-200 dark:border-gray-800 text-black dark:text-white rounded-full text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
                            >
                                Voir nos créations
                            </Link>
                        </div>
                    </motion.div>

                    {/* Lottie Animation */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                        className="order-1 lg:order-2 flex justify-center items-center"
                    >
                        <div className="w-full max-w-md lg:max-w-xl relative">
                            <div className="absolute inset-0 bg-gradient-to-tr from-gray-100 to-transparent dark:from-gray-900 rounded-full blur-3xl opacity-30" />
                            <Lottie
                                animationData={foxZen}
                                loop={true}
                                className="relative z-10 drop-shadow-2xl"
                            />
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
                className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
            >
                <div className="w-[1px] h-16 bg-gradient-to-b from-transparent via-gray-400 to-transparent dark:via-gray-600" />
            </motion.div>
        </section>
    );
};