import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Timeline } from '../../types';

export const TimelinePreview: React.FC = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(sectionRef, { once: false, amount: 0.1 });

    // Données timeline (version prévisualisation)
    const timelineItems: Timeline[] = [
        {
            id: 1,
            titre: "ML & IA pour sécurité réseau",
            periode: "2024-Présent",
            description: "Application du Machine Learning et de l'Intelligence Artificielle à la détection d'intrusions et à l'analyse comportementale des réseaux.",
            ordre: 1
        },
        {
            id: 2,
            titre: "Spécialisation en sécurité informatique",
            periode: "2023-2024",
            description: "Certification en cybersécurité et hacking éthique. Analyse de vulnérabilités et tests d'intrusion.",
            ordre: 2
        },
        {
            id: 3,
            titre: "Spring Boot, JEE, frameworks JS",
            periode: "2023",
            description: "Développement d'applications d'entreprise avec Spring Boot et frameworks JavaScript modernes.",
            ordre: 3
        }
    ];

    // Variants d'animation
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.3
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

    const itemVariants = {
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

    return (
        <section
            id="timeline-preview"
            className="py-20 px-4 sm:px-6 lg:px-8 bg-fox-light/5"
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
                        Mon Parcours Technologique
                    </h2>
                    <p className="text-lg text-gray-400 max-w-3xl mx-auto">
                        Une évolution constante dans l'univers du développement et de la sécurité
                    </p>
                </motion.div>

                {/* Timeline (version prévisualisation) */}
                <motion.div
                    className="relative max-w-3xl mx-auto pl-12 border-l-2 border-primary/50"
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                >
                    {timelineItems.map((item, index) => (
                        <motion.div
                            key={item.id}
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
                </motion.div>

                {/* Call to action */}
                <motion.div
                    className="text-center mt-16"
                    variants={titleVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    transition={{ delay: 0.6 }}
                >
                    <Link
                        to="/about"
                        className="btn btn-outline px-8 py-3"
                    >
                        Voir mon parcours complet
                    </Link>
                </motion.div>
            </div>
        </section>
    );
};