import React from 'react';
import { Link } from 'react-router-dom';
import { useApi } from '../../hooks/useApi';
import { Project } from '../../types';

export const FeaturedProjects: React.FC = () => {
    // Utiliser le hook useApi pour récupérer les projets depuis l'API
    const { data, loading, error } = useApi<{results: Project[]}>({
        endpoint: '/api/projects/?featured=true&limit=3',
        loadOnMount: true
    });

    return (
        <section className="py-24 bg-white dark:bg-black">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
          <span className="inline-block mb-4 px-3 py-1 text-xs font-medium uppercase tracking-wider border border-gray-300 dark:border-gray-700 rounded-full text-gray-600 dark:text-gray-400">
            Portfolio
          </span>
                    <h2 className="text-3xl md:text-4xl font-bold text-black dark:text-white mb-4">
                        Projets Récents
                    </h2>
                    <p className="max-w-2xl mx-auto text-gray-600 dark:text-gray-400">
                        Découvrez une sélection de mes dernières réalisations et projets dans le domaine du développement.
                    </p>
                </div>

                {loading && (
                    <div className="flex justify-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black dark:border-white"></div>
                    </div>
                )}

                {error && (
                    <div className="text-center text-red-500">
                        <p>Une erreur est survenue lors du chargement des projets.</p>
                    </div>
                )}

                {data && data.results && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {data.results.map((project) => (
                            <Link
                                key={project.id}
                                to={`/projects/${project.id}`}
                                className="group"
                            >
                                <div className="overflow-hidden rounded-2xl shadow-sm bg-gray-100 dark:bg-gray-900 hover:shadow-md transition-shadow duration-300">
                                    <div className="aspect-[16/9] overflow-hidden">
                                        <img
                                            src={project.photo1_800_x_550}
                                            alt={project.nom}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                        />
                                    </div>

                                    <div className="p-6">
                                        <div className="mb-3">
                      <span className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200">
                        {project.categorie}
                      </span>
                                        </div>

                                        <h3 className="text-xl font-semibold text-black dark:text-white mb-2 group-hover:underline">
                                            {project.nom}
                                        </h3>

                                        <div className="flex items-center text-gray-600 dark:text-gray-400">
                                            <span>Voir le projet</span>
                                            <svg className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}

                <div className="text-center mt-16">
                    <Link
                        to="/projects"
                        className="inline-flex items-center px-6 py-3 border border-gray-300 dark:border-gray-700 rounded-full text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors"
                    >
                        Voir tous les projets
                        <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                    </Link>
                </div>
            </div>
        </section>
    );
};