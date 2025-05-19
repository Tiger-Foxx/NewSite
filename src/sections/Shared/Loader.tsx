import React from 'react';
import { motion } from 'framer-motion';
import Lottie from 'lottie-react';
// Plus tard nous remplacerons cette animation
import foxLoaderAnimation from '../../assets/lotties/fox-loader.json';

interface LoaderProps {
    fullScreen?: boolean;
    message?: string;
}

export const Loader: React.FC<LoaderProps> = ({
                                                  fullScreen = true,
                                                  message = 'Chargement...'
                                              }) => {
    // Animation variants
    const containerVariants = {
        initial: { opacity: 0 },
        animate: { opacity: 1, transition: { duration: 0.3 } },
        exit: { opacity: 0, transition: { duration: 0.3 } }
    };

    const childVariants = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0, transition: { delay: 0.2, duration: 0.5 } }
    };

    // Style conditionnel en fonction du prop fullScreen
    const containerClass = fullScreen
        ? 'fixed inset-0 flex items-center justify-center z-50 bg-fox-dark/90 backdrop-blur-sm'
        : 'flex flex-col items-center justify-center py-8';

    return (
        <motion.div
            className={containerClass}
            variants={containerVariants}
            initial="initial"
            animate="animate"
            exit="exit"
        >
            <div className="flex flex-col items-center">
                <div className="w-32 h-32">
                    <Lottie
                        animationData={foxLoaderAnimation}
                        loop={true}
                        style={{ width: '100%', height: '100%' }}
                    />
                </div>

                <motion.div
                    className="mt-4 text-center"
                    variants={childVariants}
                    initial="initial"
                    animate="animate"
                >
                    <p className="text-gray-300 text-lg font-medium">{message}</p>

                    <div className="mt-2 flex justify-center space-x-2">
                        <div className="w-3 h-3 rounded-full bg-primary animate-bounce" style={{ animationDelay: '0ms' }} />
                        <div className="w-3 h-3 rounded-full bg-primary animate-bounce" style={{ animationDelay: '150ms' }} />
                        <div className="w-3 h-3 rounded-full bg-primary animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
};