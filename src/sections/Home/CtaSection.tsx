import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';

export const CtaSection: React.FC = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(sectionRef, { once: false, amount: 0.3 });

    // Variants d'animation
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.7,
                ease: [0.6, 0.05, -0.01, 0.9]
            }
        }
    };

    return (
        <section
            className="py-20 px-4 sm:px-6 lg:px-8 bg-fox-dark relative overflow-hidden"
            ref={sectionRef}
        >
            {/* Gradient background */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute inset-0 fox-gradient-bg opacity-30"></div>
                <div className="fox-noise"></div>
            </div>

            <div className="container mx-auto relative z-10">
                <motion.div
                    className="max-w-4xl mx-auto text-center"
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                >
                    <motion.h2
                        className="text-3xl md:text-4xl font-bold text-white mb-6"
                        variants={itemVariants}
                    >
                        Prêt à transformer votre vision en réalité ?
                    </motion.h2>

                    <motion.p
                        className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto"
                        variants={itemVariants}
                    >
                        Votre projet mérite un développement d'exception. Discutons de vos
                        idées et créons ensemble une solution sur mesure qui dépasse vos attentes.
                    </motion.p>

                    <motion.div
                        className="flex flex-col sm:flex-row justify-center gap-4"
                        variants={itemVariants}
                    >
                        <Link
                            to="/contact"
                            className="btn btn-primary px-8 py-4 text-lg font-medium"
                        >
                            Commencer un projet
                        </Link>

                        <Link
                            to="/about"
                            className="btn btn-outline px-8 py-4 text-lg font-medium"
                        >
                            En savoir plus sur Fox
                        </Link>
                    </motion.div>

                    <motion.div
                        className="mt-12 text-gray-400 flex items-center justify-center"
                        variants={itemVariants}
                    >
                        <svg className="w-5 h-5 mr-2 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                        <span>Réponse rapide garantie sous 24h</span>
                    </motion.div>
                </motion.div>
            </div>

            {/* Decorative elements */}
            <motion.div
                className="absolute -bottom-16 -right-16 w-64 h-64 bg-primary/10 rounded-full filter blur-3xl"
                animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.1, 0.2, 0.1],
                    transition: {
                        duration: 5,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }
                }}
            />

            <motion.div
                className="absolute -top-16 -left-16 w-64 h-64 bg-primary/10 rounded-full filter blur-3xl"
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.1, 0.15, 0.1],
                    transition: {
                        duration: 6,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 1
                    }
                }}
            />
        </section>
    );
};