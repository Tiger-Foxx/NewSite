import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Project } from '@/types';
import { useApi } from '@/hooks';
import { Loader } from '../Shared/Loader';
import { safeAnimation } from '@/utils/fixEasing';

export const FeaturedProjects: React.FC = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(sectionRef, { once: false, amount: 0.1 });
    const [hoveredProject, setHoveredProject] = useState<number | null>(null);

    // Utiliser le hook useApi pour récupérer les projets depuis l'API
    const { data, loading, error } = useApi<{results: Project[]}>({
        endpoint: '/api/projects/?featured=true&limit=3',
        loadOnMount: true
    });

    // Variants d'animation sécurisés
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

    const titleVariants = safeAnimation({
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.7,
                ease: "easeOut"
            }
        }
    });

    const projectVariants = safeAnimation({
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.7,
                ease: "easeOut"
            }
        },
        hover: {
            y: -10,
            transition: {
                duration: 0.3,
                ease: "easeOut"
            }
        }
    });

    return (
        <section
            id="featured-projects"
            className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-fox-dark to-fox-dark/95"
            ref={sectionRef}
        >
            <div className="container mx-auto">
                {/* Titre de section avec design amélioré */}
                <motion.div
                    className="text-center mb-20"
                    variants={titleVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                >
                    <div className="inline-block mb-4">
                        <span className="inline-block px-4 py-1 bg-primary/20 text-primary text-sm font-semibold rounded-full mb-4">
                            Portfolio
                        </span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                        <span className="gradient-text">Projets</span> Réalisés
                    </h2>
                    <div className="w-24 h-1.5 bg-gradient-to-r from-primary to-primary/50 mx-auto rounded-full mb-6"></div>
                    <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                        Une sélection de mes créations les plus impressionnantes et innovantes
                    </p>
                </motion.div>

                {/* Affichage des projets */}
                {loading && <Loader fullScreen={false} message="Chargement des projets..." />}

                {error && (
                    <div className="text-center text-red-500 mb-8">
                        <p>Une erreur est survenue lors du chargement des projets.</p>
                        <p className="text-sm mt-2">{error.message}</p>
                    </div>
                )}

                {data && data.results && (
                    <motion.div
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10"
                        variants={containerVariants}
                        initial="hidden"
                        animate={isInView ? "visible" : "hidden"}
                    >
                        {data.results.map((project) => (
                            <motion.div
                                key={project.id}
                                className="group relative h-[400px] rounded-2xl overflow-hidden shadow-xl shadow-fox-dark/50 border border-fox-light/5"
                                variants={projectVariants}
                                whileHover="hover"
                                onMouseEnter={() => setHoveredProject(project.id)}
                                onMouseLeave={() => setHoveredProject(null)}
                            >
                                {/* Image de fond avec superposition du gradient */}
                                <div className="absolute inset-0 w-full h-full">
                                    <img
                                        src={project.photo1_800_x_550}
                                        alt={project.nom}
                                        className="w-full h-full object-cover transition-transform duration-700 ease-out transform group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-fox-dark via-fox-dark/70 to-transparent opacity-95"></div>
                                </div>

                                {/* Badge de catégorie */}
                                <div className="absolute top-6 left-6">
                                    <span className="inline-block px-4 py-1.5 bg-primary/90 text-white text-xs font-semibold rounded-full shadow-lg">
                                        {project.categorie}
                                    </span>
                                </div>

                                {/* Contenu centré avec seulement le titre */}
                                <div className="absolute inset-0 flex flex-col justify-end p-8">
                                    <h3 className="text-3xl font-bold text-white mb-3 tracking-tight">
                                        {project.nom}
                                    </h3>

                                    {/* Technologies ou tags */}
                                    <div className="flex flex-wrap gap-2 mt-2 mb-6">
                                        <span className="px-3 py-1 bg-fox-light/10 text-primary text-xs font-medium rounded-full">
                                            {project.sujet}
                                        </span>
                                        {project.demo && (
                                            <span className="px-3 py-1 bg-primary/20 text-primary text-xs font-medium rounded-full">
                                                Démo live
                                            </span>
                                        )}
                                    </div>

                                    {/* Bouton de découverte */}
                                    <Link
                                        to={`/projects/${project.id}`}
                                        className="btn btn-primary py-3 group-hover:shadow-lg group-hover:shadow-primary/20 transition-all duration-300"
                                    >
                                        Découvrir le projet
                                        <svg className="w-4 h-4 ml-2 transform transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                                        </svg>
                                    </Link>
                                </div>

                                {/* Effet de brillance au survol */}
                                {hoveredProject === project.id && (
                                    <motion.div
                                        className="absolute inset-0 pointer-events-none"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <div
                                            className="absolute inset-0 bg-gradient-to-tr from-transparent via-primary/10 to-transparent"
                                            style={{
                                                backgroundSize: '200% 200%',
                                                animation: 'gradient-animation 3s ease infinite'
                                            }}
                                        />
                                    </motion.div>
                                )}
                            </motion.div>
                        ))}
                    </motion.div>
                )}

                {/* Bouton pour voir tous les projets */}
                <motion.div
                    className="mt-16 text-center"
                    variants={titleVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    transition={{ delay: 0.6 }}
                >
                    <Link
                        to="/projects"
                        className="btn btn-outline px-10 py-4 text-lg hover:bg-primary hover:border-primary transition-all duration-300"
                    >
                        Voir tous les projets
                        <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                        </svg>
                    </Link>
                </motion.div>
            </div>
        </section>
    );
};