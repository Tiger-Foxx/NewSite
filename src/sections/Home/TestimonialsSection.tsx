import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Temoignage } from '../../types';

export const TestimonialsSection: React.FC = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(sectionRef, { once: false, amount: 0.1 });
    const [activeIndex, setActiveIndex] = useState(0);

    // Données de témoignages
    const testimonials: Temoignage[] = [
        {
            id: 1,
            texte: "Arthur a développé une application sur mesure qui a transformé notre processus de gestion. Son professionnalisme et sa réactivité sont remarquables.",
            auteur: "Jean Dupont",
            fonction: "CEO, TechInnovate"
        },
        {
            id: 2,
            texte: "Fox possède une expertise rare en sécurité informatique. Il a identifié et corrigé des vulnérabilités critiques dans notre infrastructure que personne n'avait détectées.",
            auteur: "Marie Laurent",
            fonction: "CISO, SecureData"
        },
        {
            id: 3,
            texte: "Travailler avec Arthur sur notre application a été une expérience exceptionnelle. Sa compréhension technique et sa vision créative ont donné vie à notre projet.",
            auteur: "Thomas Moreau",
            fonction: "Fondateur, AppStartup"
        },
        {
            id: 4,
            texte: "L'audit de sécurité réalisé par Fox a permis d'identifier des failles que nous n'aurions jamais imaginées. Son approche pédagogique a permis à toute l'équipe de comprendre les enjeux.",
            auteur: "Sophie Dubois",
            fonction: "CTO, DataSec"
        }
    ];

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

    const titleVariants = {
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

    const cardVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.7,
                ease: [0.6, 0.05, -0.01, 0.9]
            }
        }
    };

    // Navigation entre les témoignages
    const handleNext = () => {
        setActiveIndex((prev) => (prev + 1) % testimonials.length);
    };

    const handlePrev = () => {
        setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    };

    // Fonction pour générer les initiales à partir du nom
    const getInitials = (name: string) => {
        return name
            .split(' ')
            .map(part => part.charAt(0))
            .join('')
            .toUpperCase();
    };

    return (
        <section
            id="testimonials"
            className="py-20 px-4 sm:px-6 lg:px-8"
            ref={sectionRef}
        >
            <div className="container mx-auto">
                {/* Titre de section */}
                <motion.div
                    className="text-center mb-16"
                    variants={titleVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        Ce que disent mes clients
                    </h2>
                    <p className="text-lg text-gray-400 max-w-3xl mx-auto">
                        Des collaborations fructueuses qui ont mené à des résultats exceptionnels
                    </p>
                </motion.div>

                {/* Carousel de témoignages */}
                <motion.div
                    className="max-w-4xl mx-auto"
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                >
                    <div className="relative">
                        {/* Affichage du témoignage actif */}
                        <motion.div
                            key={activeIndex}
                            className="card p-8 rounded-2xl border border-fox-light/20"
                            variants={cardVariants}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -30 }}
                            transition={{ duration: 0.5 }}
                        >
                            <div className="flex flex-col md:flex-row">
                                <div className="mb-6 md:mb-0 md:mr-8">
                                    <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-2xl">
                                        {getInitials(testimonials[activeIndex].auteur)}
                                    </div>
                                </div>

                                <div className="flex-1">
                                    <svg className="w-12 h-12 text-primary/20 mb-4" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M14.017 21v-7.391C14.017 10.141 16.39 7.241 19.658 6L21 8.809C19.352 9.323 18.178 10.536 18.178 12.049c0 1.143.727 1.082 1.822 1.082V21h-5.983zm-9.996 0v-7.391C4.021 10.141 6.39 7.241 9.658 6L11 8.809C9.353 9.323 8.178 10.536 8.178 12.049c0 1.143.727 1.082 1.822 1.082V21H4.021z"></path>
                                    </svg>

                                    <p className="text-gray-300 text-lg mb-6 leading-relaxed">
                                        {testimonials[activeIndex].texte}
                                    </p>

                                    <div>
                                        <h4 className="text-white font-semibold">
                                            {testimonials[activeIndex].auteur}
                                        </h4>
                                        <p className="text-primary">
                                            {testimonials[activeIndex].fonction}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Navigation arrows */}
                        <div className="flex justify-between mt-6">
                            <button
                                onClick={handlePrev}
                                className="p-3 rounded-full bg-fox-light/20 hover:bg-fox-light/30 text-white transition-colors"
                                aria-label="Témoignage précédent"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
                                </svg>
                            </button>

                            <button
                                onClick={handleNext}
                                className="p-3 rounded-full bg-fox-light/20 hover:bg-fox-light/30 text-white transition-colors"
                                aria-label="Témoignage suivant"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                                </svg>
                            </button>
                        </div>

                        {/* Indicateurs de pagination */}
                        <div className="flex justify-center mt-6 space-x-2">
                            {testimonials.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setActiveIndex(index)}
                                    className={`w-3 h-3 rounded-full transition-all ${
                                        index === activeIndex ? 'bg-primary scale-125' : 'bg-gray-600'
                                    }`}
                                    aria-label={`Témoignage ${index + 1}`}
                                />
                            ))}
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};