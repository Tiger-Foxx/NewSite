import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Timeline } from '../../types';
import { safeAnimation } from '../../utils/fixEasing'; // Assurez-vous que cette fonction est disponible

interface AboutTimelineProps {
    timeline: Timeline[];
    loading: boolean;
}

export const AboutTimeline: React.FC<AboutTimelineProps> = ({ timeline, loading }) => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(sectionRef, { once: false, amount: 0.1 });

    // Animation variants avec des valeurs sécurisées
    const containerVariants = safeAnimation({
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.3
            }
        }
    });

    const titleVariants = safeAnimation({
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.7,
                ease: "easeOut" // Remplacé le cubic-bezier problématique
            }
        }
    });

    const itemVariants = safeAnimation({
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.7,
                ease: "easeOut" // Remplacé le cubic-bezier problématique
            }
        }
    });

    // Affichage pendant le chargement
    if (loading) {
        return (
            <section
                className="py-20 px-4 sm:px-6 lg:px-8"
                ref={sectionRef}
            >
                <div className="container mx-auto animate-pulse">
                    <div className="text-center mb-16">
                        <div className="h-10 bg-fox-light/10 rounded mb-4 w-64 mx-auto"></div>
                        <div className="h-4 bg-fox-light/10 rounded mb-2 w-96 mx-auto"></div>
                        <div className="h-4 bg-fox-light/10 rounded w-80 mx-auto"></div>
                    </div>

                    <div className="max-w-3xl mx-auto">
                        <div className="relative pl-8 border-l-2 border-primary/50">
                            {[1, 2, 3, 4].map((item) => (
                                <div key={item} className="mb-12">
                                    <div className="absolute -left-3 w-6 h-6 rounded-full bg-fox-light/20"></div>
                                    <div className="ml-6">
                                        <div className="h-6 bg-fox-light/10 rounded mb-2 w-48"></div>
                                        <div className="h-4 bg-fox-light/10 rounded mb-4 w-32"></div>
                                        <div className="h-24 bg-fox-light/10 rounded w-full"></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    // Vérifier si timeline est un tableau valide
    const timelineItems = Array.isArray(timeline) ? timeline : [];

    return (
        <section
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
                        Mon Parcours
                    </h2>
                    <p className="text-lg text-gray-400 max-w-3xl mx-auto">
                        Une évolution constante dans les domaines du développement et de la sécurité
                    </p>
                </motion.div>

                {/* Timeline */}
                <motion.div
                    className="relative max-w-3xl mx-auto pl-12 border-l-2 border-primary/50"
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                >
                    {timelineItems.length > 0 ? (
                        // Afficher la timeline si les données sont disponibles
                        <>
                            {timelineItems.map((item, index) => (
                                <motion.div
                                    key={item.id || index}
                                    className="relative mb-12 last:mb-0 timeline-item"
                                    variants={itemVariants}
                                    custom={index}
                                >
                                    {/* Dot on timeline */}
                                    <div className="absolute -left-[25px] top-0 w-12 h-12 bg-fox-dark rounded-full border-2 border-primary flex items-center justify-center">
                                        <div className="w-6 h-6 rounded-full bg-primary/30 flex items-center justify-center">
                                            <div className="w-3 h-3 rounded-full bg-primary"></div>
                                        </div>
                                    </div>

                                    {/* Content card */}
                                    <div className="card p-6 ml-4">
                                        <div className="flex flex-col md:flex-row md:items-center justify-between mb-3">
                                            <h3 className="text-xl font-bold text-white">{item.titre}</h3>
                                            <span className="text-primary font-semibold mt-1 md:mt-0">{item.periode}</span>
                                        </div>
                                        <p className="text-gray-400">{item.description}</p>
                                    </div>
                                </motion.div>
                            ))}

                            {/* Timeline continuation indicator */}
                            <motion.div
                                className="absolute -bottom-8 -left-[9px] flex flex-col items-center"
                                variants={itemVariants}
                                custom={timelineItems.length}
                            >
                                <div className="w-4 h-4 bg-primary rounded-full"></div>
                                <div className="w-2 h-14 bg-gradient-to-b from-primary to-transparent mt-1"></div>
                            </motion.div>
                        </>
                    ) : (
                        // Message si aucune donnée n'est disponible
                        <div className="text-center py-10">
                            <p className="text-gray-400">Aucune donnée de timeline disponible</p>
                        </div>
                    )}
                </motion.div>
            </div>
        </section>
    );
};