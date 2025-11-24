import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useApi } from '../../hooks/useApi';
import { Project } from '../../types';

export const FeaturedProjects: React.FC = () => {
    // Utiliser le hook useApi pour récupérer les projets depuis l'API
    const { data, loading, error } = useApi<{ results: Project[] }>({
        endpoint: '/api/projects/?featured=true&limit=6',
        loadOnMount: true
    });

    return (
        <section id="projets" className="py-32 bg-gray-50 dark:bg-gray-950">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="flex flex-col md:flex-row md:justify-between md:items-end mb-16">
                    <div className="max-w-2xl">
                        <h2 className="text-4xl md:text-6xl font-bold tracking-tighter text-black dark:text-white mb-4">
                            Quelques Projets
                        </h2>
                        <p className="text-lg text-gray-600 dark:text-gray-400">
                            Une sélection de quelques de nos réalisations.
                        </p>
                    </div>

                    <Link
                        to="/projects"
                        className="mt-6 md:mt-0 inline-flex items-center text-sm font-medium text-black dark:text-white border-b border-black dark:border-white pb-1 hover:opacity-50 transition-opacity"
                    >
                        <span>Voir plus de projets</span>
                    </Link>
                </div>

                {loading && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[...Array(3)].map((_, i) => (
                            <div key={i} className="bg-white dark:bg-black rounded-3xl overflow-hidden shadow-sm animate-pulse h-[400px]">
                                <div className="h-full bg-gray-200 dark:bg-gray-900"></div>
                            </div>
                        ))}
                    </div>
                )}

                {error && (
                    <div className="text-center text-red-500 py-10 bg-red-50 dark:bg-red-900/20 rounded-2xl">
                        <p className="text-lg font-semibold">Erreur de chargement des projets.</p>
                    </div>
                )}

                {data && data.results && data.results.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {data.results.map((project, index) => (
                            <motion.div
                                key={project.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <Link
                                    to={`/projects/${project.id}`}
                                    className="group flex flex-col h-full bg-white dark:bg-black rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2"
                                >
                                    <div className="relative aspect-[4/3] overflow-hidden">
                                        <img
                                            src={project.photo1_800_x_550}
                                            alt={project.nom}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                            onError={(e) => {
                                                const target = e.target as HTMLImageElement;
                                                target.onerror = null;
                                                target.src = '/images/fallback-project.jpg';
                                            }}
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/70 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500"></div>

                                        <div className="absolute bottom-6 left-6 right-6">
                                            <span className="inline-block px-3 py-1 bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-bold rounded-full mb-3">
                                                {project.categorie}
                                            </span>
                                            <h3 className="text-2xl font-bold text-white mb-2 leading-tight">
                                                {project.nom}
                                            </h3>
                                        </div>
                                    </div>

                                    <div className="p-6 flex flex-col flex-grow">
                                        <div className="flex flex-wrap gap-2 mb-4">
                                            {project.sujet && (
                                                <span className="px-3 py-1 bg-gray-100 dark:bg-gray-900 text-gray-600 dark:text-gray-400 text-xs font-medium rounded-full">
                                                    {project.sujet}
                                                </span>
                                            )}
                                        </div>

                                        <div className="mt-auto flex items-center justify-between text-sm font-medium text-black dark:text-white group-hover:opacity-70 transition-opacity">
                                            <span>Découvrir le projet</span>
                                            <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                            </svg>
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                )}
                <Link
                    to="/projects"
                    className="mt-6 md:mt-0 inline-flex items-center text-sm font-medium text-black dark:text-white border-b border-black dark:border-white pb-1 hover:opacity-50 transition-opacity"
                >
                    <span>Voir plus de projets</span>
                </Link>
            </div>
        </section>
    );
};