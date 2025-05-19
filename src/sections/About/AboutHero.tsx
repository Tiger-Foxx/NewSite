import React from 'react';
import { motion } from 'framer-motion';
import { Profile } from '../../types';

interface AboutHeroProps {
    profile: Profile | null;
    loading: boolean;
}

export const AboutHero: React.FC<AboutHeroProps> = ({ profile, loading }) => {
    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.3
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

    // Affichage pendant le chargement
    if (loading) {
        return (
            <div className="py-20 px-4 sm:px-6 lg:px-8 bg-fox-dark animate-pulse">
                <div className="container mx-auto">
                    <div className="flex flex-col lg:flex-row gap-12 items-center">
                        <div className="lg:w-1/2">
                            <div className="w-64 h-64 rounded-full bg-fox-light/10 mx-auto"></div>
                        </div>
                        <div className="lg:w-1/2">
                            <div className="h-12 bg-fox-light/10 rounded-md mb-6 w-3/4"></div>
                            <div className="h-6 bg-fox-light/10 rounded-md mb-4 w-1/2"></div>
                            <div className="space-y-3">
                                <div className="h-4 bg-fox-light/10 rounded-md w-full"></div>
                                <div className="h-4 bg-fox-light/10 rounded-md w-full"></div>
                                <div className="h-4 bg-fox-light/10 rounded-md w-5/6"></div>
                                <div className="h-4 bg-fox-light/10 rounded-md w-3/4"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-fox-dark relative">
            <div className="fox-gradient-bg absolute inset-0 opacity-30"></div>
            <div className="fox-noise absolute inset-0"></div>

            <div className="container mx-auto relative z-10">
                <motion.div
                    className="flex flex-col lg:flex-row gap-12 items-center"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {/* Photo de profil */}
                    <motion.div
                        className="lg:w-1/2 flex justify-center"
                        variants={itemVariants}
                    >
                        <div className="relative">
                            <div className="absolute -inset-4 rounded-full bg-gradient-to-tr from-primary/30 to-transparent blur-xl opacity-70 animate-pulse"></div>

                            <div className="relative w-64 h-64 rounded-full border-2 border-primary/50 p-1 bg-fox-dark">
                                <img
                                    src={profile?.photo || 'https://avatars.githubusercontent.com/u/118616410?v=4'}
                                    alt={profile?.nom || 'Arthur Donfack'}
                                    className="w-full h-full object-cover rounded-full"
                                />
                            </div>

                            <motion.div
                                className="absolute -bottom-4 -right-4 p-3 bg-fox-dark rounded-lg shadow-lg border border-fox-light/20"
                                animate={{
                                    y: [0, -5, 0],
                                    rotate: [0, 3, 0],
                                    transition: {
                                        duration: 5,
                                        repeat: Infinity,
                                        ease: "easeInOut"
                                    }
                                }}
                            >
                                <svg className="w-8 h-8 text-primary" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd"></path>
                                </svg>
                            </motion.div>
                        </div>
                    </motion.div>

                    {/* Informations sur Fox */}
                    <motion.div
                        className="lg:w-1/2"
                        variants={itemVariants}
                    >
                        <motion.h2
                            className="text-3xl md:text-4xl font-bold text-white mb-4"
                            variants={itemVariants}
                        >
                            {profile?.nom || 'Arthur Donfack'}
                        </motion.h2>

                        <motion.p
                            className="text-xl text-primary mb-6"
                            variants={itemVariants}
                        >
                            {profile?.sousTitre || 'Développeur & Hacker Éthique'}
                        </motion.p>

                        <motion.div
                            className="text-gray-300 space-y-4"
                            variants={itemVariants}
                        >
                            <p>{profile?.descriptionP1 || 'Étudiant en génie informatique à l\'École Nationale Supérieure Polytechnique de Yaoundé (ENSPY), je combine des compétences en développement web, mobile et en cybersécurité.'}</p>

                            <p>{profile?.descriptionP2 || 'Passionné par les technologies innovantes et la sécurité des systèmes, je conçois des solutions logicielles robustes, performantes et sécurisées pour mes clients et partenaires.'}</p>
                        </motion.div>

                        {profile?.cv && (
                            <motion.div
                                className="mt-8"
                                variants={itemVariants}
                            >
                                <a
                                    href={profile.cv}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center px-6 py-3 bg-primary hover:bg-primary-light text-white rounded-md transition-colors"
                                >
                                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                                    </svg>
                                    Télécharger mon CV
                                </a>
                            </motion.div>
                        )}
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};