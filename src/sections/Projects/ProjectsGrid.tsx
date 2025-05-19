import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Project } from '../../types';
import { formatDate } from '../../utils';

interface ProjectsGridProps {
    projects: Project[];
    loading: boolean;
    error: any;
    onRetry: () => void;
}

export const ProjectsGrid: React.FC<ProjectsGridProps> = ({
                                                              projects,
                                                              loading,
                                                              error,
                                                              onRetry
                                                          }) => {
    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: [0.6, 0.05, -0.01, 0.9]
            }
        }
    };

    // Rendu en fonction de l'état de chargement
    if (loading) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-pulse">
                {Array.from({ length: 6 }).map((_, index) => (
                    <div key={index} className="bg-fox-dark rounded-xl overflow-hidden">
                        <div className="aspect-video bg-fox-light/10"></div>
                        <div className="p-6 space-y-3">
                            <div className="h-6 bg-fox-light/10 rounded w-3/4"></div>
                            <div className="h-4 bg-fox-light/10 rounded w-1/2"></div>
                            <div className="space-y-2">
                                <div className="h-4 bg-fox-light/10 rounded w-full"></div>
                                <div className="h-4 bg-fox-light/10 rounded w-5/6"></div>
                            </div>
                            <div className="h-4 bg-fox-light/10 rounded w-1/4 mt-4"></div>
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center text-gray-400 py-16">
                <svg className="w-16 h-16 mx-auto mb-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <h3 className="text-xl font-bold mb-2">Une erreur est survenue</h3>
                <p className="mb-4">Impossible de charger les projets pour le moment.</p>
                <button
                    onClick={onRetry}
                    className="px-4 py-2 bg-primary hover:bg-primary-light text-white rounded-md transition-colors"
                >
                    Réessayer
                </button>
            </div>
        );
    }

    if (projects.length === 0) {
        return (
            <div className="text-center text-gray-400 py-16">
                <svg className="w-16 h-16 mx-auto mb-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
                </svg>
                <h3 className="text-xl font-bold mb-2">Aucun projet trouvé</h3>
                <p>Aucun projet ne correspond à vos critères.</p>
            </div>
        );
    }

    return (
        <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            {projects.map((project) => (
                <motion.div
                    key={project.id}
                    className="card overflow-hidden rounded-xl flex flex-col h-full"
                    variants={cardVariants}
                    whileHover={{ y: -10, transition: { duration: 0.3 } }}
                >
                    <Link to={`/projects/${project.id}`} className="block relative overflow-hidden aspect-video">
                        <img
                            src={project.photo1_800_x_550}
                            alt={project.nom}
                            className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-fox-dark via-transparent to-transparent"></div>
                        <div className="absolute bottom-4 left-4">
              <span className="px-3 py-1 bg-primary/90 text-white text-xs font-medium rounded-full">
                {project.categorie}
              </span>
                        </div>
                    </Link>

                    <div className="p-6 flex-grow flex flex-col">
                        <Link to={`/projects/${project.id}`} className="block">
                            <h3 className="text-xl font-bold text-white mb-2 hover:text-primary transition-colors">
                                {project.nom}
                            </h3>
                        </Link>

                        <p className="text-gray-400 mb-4 flex-grow">
                            {project.description.length > 120
                                ? `${project.description.substring(0, 120)}...`
                                : project.description}
                        </p>

                        <div className="flex items-center justify-between mt-auto pt-4 border-t border-fox-light/10">
                            <span className="text-sm text-gray-500">{formatDate(project.date)}</span>

                            {project.demo && (
                                <a
                                    href={project.demo}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-primary hover:text-primary-light text-sm flex items-center transition-colors"
                                >
                                    <span className="mr-1">Démo</span>
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                                    </svg>
                                </a>
                            )}
                        </div>
                    </div>
                </motion.div>
            ))}
        </motion.div>
    );
};