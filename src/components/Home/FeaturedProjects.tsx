import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApi } from '../../hooks/useApi';
import { Project } from '../../types';

export const FeaturedProjects: React.FC = () => {
    const [hoveredProject, setHoveredProject] = useState<number | null>(null);

    // Utiliser le hook useApi pour récupérer les projets depuis l'API
    const { data, loading, error } = useApi<{results: Project[]}>({
        endpoint: '/api/projects/?featured=true&limit=6',
        loadOnMount: true
    });

    return (
        <section id="projets" className="py-20 md:py-28 bg-gray-50 dark:bg-gray-950">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row md:justify-between md:items-end mb-12 md:mb-16">
                    <div className="max-w-2xl">
            <span className="inline-block mb-2 px-3 py-1 text-xs font-semibold uppercase tracking-wider bg-gray-200 dark:bg-gray-800 text-black dark:text-white rounded-full">
              Projets
            </span>
                        <h2 className="text-3xl md:text-4xl font-bold text-black dark:text-white leading-tight">
                            Quelques projets de Fox
                        </h2>
                        <p className="mt-3 text-lg text-gray-600 dark:text-gray-400">
                            Découvrez une sélection de nos projets les plus récents.
                        </p>
                    </div>

                    <Link
                        to="/projects"
                        className="mt-6 md:mt-0 inline-flex items-center text-sm font-medium text-black dark:text-white hover:text-gray-700 dark:hover:text-gray-300 group"
                    >
                        <span>Tous les projets</span>
                        <svg className="ml-2 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                    </Link>
                </div>

                {loading && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[...Array(3)].map((_, i) => (
                            <div key={i} className="bg-white dark:bg-black rounded-xl overflow-hidden shadow-lg animate-pulse">
                                <div className="h-48 bg-gray-200 dark:bg-gray-800"></div>
                                <div className="p-6">
                                    <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-1/4 mb-4"></div>
                                    <div className="h-6 bg-gray-200 dark:bg-gray-800 rounded w-3/4 mb-4"></div>
                                    <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-full mb-4"></div>
                                    <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-2/3"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {error && (
                    <div className="text-center text-red-500 py-10 bg-red-50 dark:bg-red-900/20 rounded-lg">
                        <p className="text-lg font-semibold">Erreur de chargement des projets.</p>
                        <p className="text-sm">Veuillez réessayer plus tard ou contacter le support.</p>
                    </div>
                )}

                {data && data.results && data.results.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {data.results.map((project) => (
                            <Link
                                key={project.id}
                                to={`/projects/${project.id}`}
                                className="group flex flex-col h-full bg-white dark:bg-black rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-200/50 dark:border-gray-800/50"
                                onMouseEnter={() => setHoveredProject(project.id)}
                                onMouseLeave={() => setHoveredProject(null)}
                            >
                                <div className="relative aspect-[16/9] overflow-hidden">
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
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-70 group-hover:opacity-80 transition-opacity"></div>
                                    <div className="absolute bottom-4 left-4">
                    <span className="inline-block px-3 py-1 bg-black/80 backdrop-blur-sm text-white text-xs font-bold rounded-full mb-2">
                      {project.categorie}
                    </span>
                                    </div>
                                </div>

                                <div className="p-6 flex flex-col flex-grow">
                                    <h3 className="text-xl font-bold text-black dark:text-white mb-3 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors">
                                        {project.nom}
                                    </h3>

                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {project.sujet && (
                                            <span className="px-2.5 py-0.5 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 text-xs font-medium rounded-full">
                        {project.sujet}
                      </span>
                                        )}
                                        {project.demo && (
                                            <span className="px-2.5 py-0.5 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 text-xs font-medium rounded-full">
                        Demo disponible
                      </span>
                                        )}
                                    </div>

                                    <div className="mt-auto pt-4 flex items-center justify-between">
                    <span className="inline-flex items-center text-sm font-medium text-black dark:text-white group-hover:underline">
                      Découvrir
                      <svg className="ml-1.5 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </span>
                                    </div>
                                </div>

                                {/* Effet de brillance au survol */}
                                {hoveredProject === project.id && (
                                    <div className="absolute inset-0 pointer-events-none">
                                        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 dark:via-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" style={{ backgroundSize: '200% 200%' }}></div>
                                    </div>
                                )}
                            </Link>
                        ))}
                    </div>
                )}

                <div className="text-center mt-12 md:mt-16">
                    <Link
                        to="/projects"
                        className="inline-flex items-center px-7 py-3.5 bg-black dark:bg-white text-white dark:text-black text-sm font-semibold rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition-all duration-300 ease-in-out shadow-md hover:shadow-lg"
                    >
                        Explorer Plus de Projets
                        <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </Link>
                </div>
            </div>
        </section>
    );
};