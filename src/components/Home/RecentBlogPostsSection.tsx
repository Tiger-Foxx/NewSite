import React from 'react';
import { Link } from 'react-router-dom';
import { useApi } from '../../hooks/useApi';
import { Post } from '../../types';

// Fonction pour formater la date
const formatDate = (dateString: string | undefined): string => {
    if (!dateString) return 'Date inconnue';
    return new Date(dateString).toLocaleDateString('fr-FR', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    });
};

export const RecentBlogPostsSection: React.FC = () => {
    const { data, loading, error } = useApi<{ results: Post[] }>({
        endpoint: '/api/posts/?limit=6&ordering=-date_publication', // ou -date
        loadOnMount: true,
    });

    return (
        <section id="blog" className="py-20 md:py-28 bg-white dark:bg-black">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row md:justify-between md:items-end mb-12 md:mb-16">
                    <div className="max-w-2xl">
            <span className="inline-block mb-2 px-3 py-1 text-xs font-semibold uppercase tracking-wider bg-gray-100 dark:bg-gray-800 text-black dark:text-white rounded-full">
              Notre Expertise
            </span>
                        <h2 className="text-3xl md:text-4xl font-bold text-black dark:text-white leading-tight">
                            Au Cœur de l'Innovation
                        </h2>
                        <p className="mt-3 text-lg text-gray-600 dark:text-gray-400">
                            Découvrez nos dernières réflexions, analyses et tutoriels.
                        </p>
                    </div>

                    <Link
                        to="/blog"
                        className="mt-6 md:mt-0 inline-flex items-center text-sm font-medium text-black dark:text-white hover:text-gray-700 dark:hover:text-gray-300 group"
                    >
                        <span>Tous les articles</span>
                        <svg className="ml-2 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                    </Link>
                </div>

                {loading && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[...Array(3)].map((_, i) => (
                            <div key={i} className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6 animate-pulse">
                                <div className="h-40 bg-gray-200 dark:bg-gray-800 rounded-md mb-4"></div>
                                <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-1/4 mb-2"></div>
                                <div className="h-6 bg-gray-200 dark:bg-gray-800 rounded w-3/4 mb-3"></div>
                                <div className="h-10 bg-gray-200 dark:bg-gray-800 rounded w-full mb-4"></div>
                                <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-1/2"></div>
                            </div>
                        ))}
                    </div>
                )}

                {error && (
                    <div className="text-center text-red-500 py-10 bg-red-50 dark:bg-red-900/20 rounded-lg">
                        <p className="text-lg font-semibold">Erreur de chargement des articles.</p>
                        <p className="text-sm">Veuillez réessayer plus tard ou contacter le support.</p>
                    </div>
                )}

                {data && data.results && data.results.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                        {data.results.map((post) => (
                            <Link
                                key={post.id}
                                to={`/blog/${ post.id}`}
                                className="group flex flex-col bg-gray-50 dark:bg-gray-900/70 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-1 border border-gray-200 dark:border-gray-800 overflow-hidden h-full"
                            >
                                {post.photo800_x_533 && (
                                    <div className="aspect-video overflow-hidden">
                                        <img
                                            src={post.photo800_x_533}
                                            alt={post.titre}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                            onError={(e) => {
                                                const target = e.target as HTMLImageElement;
                                                target.onerror = null;
                                                target.src = '/images/fallback-post.jpg';
                                            }}
                                        />
                                    </div>
                                )}
                                <div className="p-6 flex flex-col flex-grow">
                                    <div className="mb-2">
                    <span className="inline-block px-2.5 py-0.5 text-xs font-semibold rounded-full bg-gray-200 dark:bg-gray-700 text-black dark:text-white">
                      {post.categorie}
                    </span>
                                    </div>
                                    <h3 className="text-lg font-semibold text-black dark:text-white mb-2 leading-tight group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors">
                                        {post.titre}
                                    </h3>
                                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-3 flex-grow">
                                        {post.description.substring(0, 120)  + '...'}
                                    </p>
                                    <div className="mt-auto flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                                        <span>{formatDate( post.date)}</span>
                                        <span className="inline-flex items-center font-medium text-black dark:text-white group-hover:underline">
                      Lire la suite
                      <svg className="ml-1 w-3 h-3 transition-transform duration-300 group-hover:translate-x-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path>
                      </svg>
                    </span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}

                {data && data.results && data.results.length === 0 && !loading && (
                    <div className="text-center text-gray-600 dark:text-gray-400 py-10 bg-gray-50 dark:bg-gray-900 rounded-lg">
                        <p className="text-lg">Aucun article à afficher pour le moment.</p>
                        <p className="text-sm">Revenez bientôt pour de nouvelles publications !</p>
                    </div>
                )}

                <div className="text-center mt-12 md:mt-16">
                    <Link
                        to="/blog"
                        className="inline-flex items-center px-7 py-3.5 bg-black dark:bg-white text-white dark:text-black text-sm font-semibold rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition-all duration-300 ease-in-out shadow-md hover:shadow-lg"
                    >
                        Explorer Tous Nos Articles
                        <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </Link>
                </div>
            </div>
        </section>
    );
};