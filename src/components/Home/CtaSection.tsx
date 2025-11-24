import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export const CtaSection: React.FC = () => {
    return (
        <section className="py-32 bg-black dark:bg-white text-white dark:text-black overflow-hidden relative">
            <div className="absolute inset-0 bg-[url('/noise.png')] opacity-10 mix-blend-overlay" />

            <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 text-center">
                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter mb-12"
                >
                    Prêt à créer <br /> l'extraordinaire ?
                </motion.h2>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                >
                    <Link
                        to="/contact"
                        className="inline-flex items-center justify-center px-10 py-5 text-lg font-medium bg-white dark:bg-black text-black dark:text-white rounded-full hover:scale-105 transition-transform duration-300"
                    >
                        Parlons de votre projet
                    </Link>
                </motion.div>
            </div>
        </section>
    );
};