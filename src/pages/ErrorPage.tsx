import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { updateMetaTags } from '../utils';

export const ErrorPage: React.FC = () => {
    const navigate = useNavigate();

    // Mettre à jour les meta tags
    useEffect(() => {
        updateMetaTags({
            title: 'Page non trouvée (404)',
            description: 'La page que vous recherchez n\'existe pas ou a été déplacée.',
            type: 'website'
        });
    }, []);

    // Rediriger vers l'accueil après un certain temps
    useEffect(() => {
        const timeout = setTimeout(() => {
            navigate('/');
        }, 10000); // 10 secondes

        return () => clearTimeout(timeout);
    }, [navigate]);

    // Animation variants
    const containerVariants = {
        initial: { opacity: 0 },
        animate: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.1
            }
        }
    };

    const itemVariants = {
        initial: { opacity: 0, y: 30 },
        animate: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: [0.6, 0.05, -0.01, 0.9]
            }
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4 py-32">
            <div className="fox-noise absolute inset-0" />
            <div className="fox-gradient-bg absolute inset-0" />

            <motion.div
                className="text-center z-10 max-w-xl"
                variants={containerVariants}
                initial="initial"
                animate="animate"
            >
                <motion.div
                    className="relative mx-auto mb-6 w-32 h-32"
                    variants={itemVariants}
                >
                    <div className="w-full h-full rounded-full bg-fox-light/20 flex items-center justify-center">
                        <span className="text-6xl">🦊</span>
                    </div>
                    <div className="absolute top-0 -right-2 w-8 h-8 bg-fox-light/10 rounded-full flex items-center justify-center">
                        <span className="text-xl">❓</span>
                    </div>
                    <div className="absolute -bottom-2 left-4 w-10 h-10 bg-fox-light/10 rounded-full flex items-center justify-center">
                        <span className="text-xl">❓</span>
                    </div>
                </motion.div>

                <motion.h1
                    className="text-5xl sm:text-6xl font-bold mb-4 gradient-text"
                    variants={itemVariants}
                >
                    404
                </motion.h1>

                <motion.h2
                    className="text-2xl sm:text-3xl font-bold mb-6 text-white"
                    variants={itemVariants}
                >
                    Page Non Trouvée
                </motion.h2>

                <motion.p
                    className="text-gray-300 mb-8 text-lg"
                    variants={itemVariants}
                >
                    Oups ! Il semble que vous ayez pris un chemin inexistant.
                    Le renard est parti explorer d'autres territoires.
                </motion.p>

                <motion.div
                    variants={itemVariants}
                >
                    <Link
                        to="/"
                        className="btn btn-primary px-6 py-3"
                    >
                        Retour à l'accueil
                    </Link>
                </motion.div>

                <motion.p
                    className="mt-8 text-gray-400 text-sm"
                    variants={itemVariants}
                >
                    Redirection automatique dans quelques secondes...
                </motion.p>
            </motion.div>
        </div>
    );
};