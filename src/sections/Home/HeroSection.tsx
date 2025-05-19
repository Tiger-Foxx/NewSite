import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import Lottie from 'lottie-react';
import scrollIndicatorAnimation from '@/assets/lotties/scroll-indicator.json';
import foxAnimation from '@/assets/lotties/fox-zen.json';
import bgImage from '@/assets/images/bg.png';
import { safeAnimation } from '@/utils/fixEasing';

export const HeroSection: React.FC = () => {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"]
    });

    // Effets parallaxe
    const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

    // Animation variants sécurisés
    const containerVariants = safeAnimation({
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.3
            }
        }
    });

    const itemVariants = safeAnimation({
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                ease: "easeOut"
            }
        }
    });

    return (
        <div
            ref={ref}
            className="relative min-h-screen overflow-hidden flex items-center justify-center"
        >
            {/* Arrière-plan avec effet parallaxe */}
            <div className="absolute inset-0 overflow-hidden">
                <motion.div
                    className="absolute inset-0 w-full h-full bg-cover bg-center bg-fixed"
                    style={{
                        backgroundImage: `url(${bgImage})`,
                        y
                    }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-fox-dark/70 via-fox-dark/80 to-fox-dark/95"></div>

                {/* Éléments décoratifs */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-primary/20 filter blur-[80px] mix-blend-screen"></div>
                    <div className="absolute bottom-1/3 right-1/4 w-96 h-96 rounded-full bg-primary/10 filter blur-[100px] mix-blend-screen"></div>
                </div>
            </div>

            {/* Effet de bruit */}
            <div className="fox-noise absolute inset-0 opacity-[0.03]"></div>

            {/* Contenu principal */}
            <div className="container relative z-10 px-4 sm:px-6 lg:px-8 mx-auto">
                <motion.div
                    className="flex flex-col lg:flex-row items-center justify-between gap-16"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {/* Texte du Hero avec design amélioré */}
                    <motion.div
                        className="lg:w-1/2 text-center lg:text-left"
                        variants={itemVariants}
                    >
                        <motion.span
                            className="inline-block px-4 py-1.5 bg-primary/20 text-primary text-sm font-semibold rounded-full mb-8"
                            variants={itemVariants}
                        >
                            Fox Service d'Ingénierie
                        </motion.span>

                        <motion.h1
                            className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight tracking-tight"
                            variants={itemVariants}
                        >
                            <span className="gradient-text">Ingénierie</span><br/>
                            <span className="text-white">Logicielle</span><br/>
                            <span className="text-white text-opacity-80">à l'état pur</span>
                        </motion.h1>

                        <motion.p
                            className="text-xl text-gray-300 mb-10 max-w-xl leading-relaxed"
                            variants={itemVariants}
                        >
                            Fox combine expertise technique et innovation pour créer des
                            solutions logicielles sur mesure. Sécurité, performance et
                            élégance au service de votre vision.
                        </motion.p>

                        <motion.div
                            className="flex flex-col sm:flex-row justify-center lg:justify-start gap-5"
                            variants={itemVariants}
                        >
                            <Link
                                to="/contact"
                                className="btn btn-primary px-8 py-4 text-lg shadow-xl shadow-primary/20 hover:shadow-primary/30 hover:translate-y-[-2px] transition-all duration-300"
                            >
                                Lancer votre projet
                                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 5l7 7-7 7M5 12h15"></path>
                                </svg>
                            </Link>
                            <Link
                                to="/projects"
                                className="btn btn-outline px-8 py-4 text-lg hover:bg-fox-light/5 transition-all duration-300"
                            >
                                Voir les réalisations
                            </Link>
                        </motion.div>

                        <motion.div
                            className="flex gap-8 mt-12 justify-center lg:justify-start"
                            variants={itemVariants}
                        >
                            <div className="flex items-center">
                                <div className="w-14 h-14 rounded-full bg-fox-light/10 border border-fox-light/20 flex items-center justify-center shadow-lg">
                                    <svg className="w-7 h-7 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                                    </svg>
                                </div>
                                <div className="ml-4">
                                    <p className="text-base font-medium text-white">Sécurité maximale</p>
                                    <p className="text-sm text-gray-400">Audits & Protection</p>
                                </div>
                            </div>

                            <div className="flex items-center">
                                <div className="w-14 h-14 rounded-full bg-fox-light/10 border border-fox-light/20 flex items-center justify-center shadow-lg">
                                    <svg className="w-7 h-7 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                                    </svg>
                                </div>
                                <div className="ml-4">
                                    <p className="text-base font-medium text-white">Performance optimale</p>
                                    <p className="text-sm text-gray-400">Optimisation & Scaling</p>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Animation Lottie ou Image */}
                    <motion.div
                        className="lg:w-1/2 mt-12 lg:mt-0"
                        variants={itemVariants}
                    >
                        <div className="relative w-full max-w-xl mx-auto">
                            {/* Créer un conteneur visible pour Lottie */}
                            <div className="relative z-10 aspect-[4/3] bg-gradient-to-br from-fox-light/10 to-transparent backdrop-blur-sm rounded-2xl p-6 border border-fox-light/20 shadow-2xl overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-50"></div>
                                <Lottie
                                    animationData={foxAnimation} // Remplacer par votre animation Lottie
                                    loop={true}
                                    className="w-full h-full"
                                />

                                {/* Badges flottants */}
                                <motion.div
                                    className="absolute -top-6 -right-6 bg-fox-dark/80 backdrop-blur-sm p-3 rounded-xl border border-fox-light/20 shadow-lg"
                                    animate={safeAnimation({
                                        y: [0, -10, 0],
                                        rotate: [0, 5, 0],
                                        transition: {
                                            duration: 5,
                                            repeat: Infinity,
                                            ease: "easeInOut",
                                            delay: 1
                                        }
                                    })}
                                >
                                    <svg className="w-8 h-8 text-primary" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
                                    </svg>
                                </motion.div>
                            </div>

                            {/* Élément de décoration en arrière-plan */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full bg-primary/20 filter blur-[80px] mix-blend-screen"></div>
                        </div>
                    </motion.div>
                </motion.div>
            </div>

            {/* Indicateur de défilement */}
            <motion.div
                className="absolute bottom-12 left-1/2 transform -translate-x-1/2 z-10"
                style={{ opacity }}
            >
                <div className="w-12 h-20 flex justify-center">
                    <Lottie
                        animationData={scrollIndicatorAnimation}
                        loop={true}
                        style={{ width: '100%', height: '100%' }}
                    />
                </div>
            </motion.div>
        </div>
    );
};