import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Project } from '../../types';

interface ProjectGalleryProps {
    project: Project;
}

export const ProjectGallery: React.FC<ProjectGalleryProps> = ({ project }) => {
    // État pour l'image actuellement affichée en plein écran
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

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
        hidden: { opacity: 0, scale: 0.9 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                duration: 0.5
            }
        }
    };

    // Récupérer toutes les images du projet
    const images = [
        project.photo1_800_x_550,
        project.photo2_800_x_550,
        project.photo3_800_x_550
    ].filter(Boolean) as string[];

    // Ouvrir la galerie en plein écran
    const openLightbox = (index: number) => {
        setCurrentImageIndex(index);
        setLightboxOpen(true);
        // Empêcher le défilement de la page quand la galerie est ouverte
        document.body.style.overflow = 'hidden';
    };

    // Fermer la galerie en plein écran
    const closeLightbox = () => {
        setLightboxOpen(false);
        // Réactiver le défilement de la page
        document.body.style.overflow = 'auto';
    };

    // Naviguer vers l'image précédente
    const goToPrevious = (e: React.MouseEvent) => {
        e.stopPropagation();
        setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
    };

    // Naviguer vers l'image suivante
    const goToNext = (e: React.MouseEvent) => {
        e.stopPropagation();
        setCurrentImageIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
    };

    return (
        <section className="pt-8 pb-16 px-4 sm:px-6 lg:px-8 bg-fox-light/5">
            <div className="container mx-auto">
                <div className="max-w-4xl mx-auto">
                    <motion.h2
                        className="text-2xl font-bold text-white mb-8"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        Galerie du projet
                    </motion.h2>

                    {images.length > 0 ? (
                        <motion.div
                            className="grid grid-cols-1 md:grid-cols-2 gap-6"
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                        >
                            {images.map((src, index) => (
                                <motion.div
                                    key={index}
                                    className="relative overflow-hidden rounded-xl cursor-pointer"
                                    variants={itemVariants}
                                    onClick={() => openLightbox(index)}
                                    whileHover={{ scale: 1.03, transition: { duration: 0.3 } }}
                                >
                                    <img
                                        src={src}
                                        alt={`${project.nom} - Image ${index + 1}`}
                                        className="w-full h-auto object-cover"
                                    />
                                    <div className="absolute inset-0 bg-fox-dark/20 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                                        <div className="bg-fox-dark/70 px-4 py-2 rounded-full text-white text-sm">
                                            <svg className="w-5 h-5 inline-block mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"></path>
                                            </svg>
                                            Agrandir
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    ) : (
                        <p className="text-center text-gray-400">Aucune image disponible pour ce projet.</p>
                    )}

                    {/* Galerie en plein écran */}
                    <AnimatePresence>
                        {lightboxOpen && (
                            <motion.div
                                className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={closeLightbox}
                            >
                                <motion.div
                                    className="relative max-w-5xl max-h-screen p-4"
                                    initial={{ scale: 0.9, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    exit={{ scale: 0.9, opacity: 0 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <img
                                        src={images[currentImageIndex]}
                                        alt={`${project.nom} - Image ${currentImageIndex + 1}`}
                                        className="max-w-full max-h-[80vh] object-contain mx-auto"
                                        onClick={(e) => e.stopPropagation()}
                                    />

                                    {/* Boutons de navigation */}
                                    {images.length > 1 && (
                                        <>
                                            <button
                                                className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 bg-fox-dark/80 rounded-full text-white hover:bg-fox-dark transition-colors"
                                                onClick={goToPrevious}
                                                aria-label="Image précédente"
                                            >
                                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
                                                </svg>
                                            </button>

                                            <button
                                                className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 bg-fox-dark/80 rounded-full text-white hover:bg-fox-dark transition-colors"
                                                onClick={goToNext}
                                                aria-label="Image suivante"
                                            >
                                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                                                </svg>
                                            </button>
                                        </>
                                    )}

                                    {/* Bouton de fermeture */}
                                    <button
                                        className="absolute top-4 right-4 p-2 bg-fox-dark/80 rounded-full text-white hover:bg-fox-dark transition-colors"
                                        onClick={closeLightbox}
                                        aria-label="Fermer la galerie"
                                    >
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                                        </svg>
                                    </button>

                                    {/* Indicateur de position */}
                                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-fox-dark/80 px-3 py-1 rounded-full text-white text-sm">
                                        {currentImageIndex + 1} / {images.length}
                                    </div>
                                </motion.div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
};