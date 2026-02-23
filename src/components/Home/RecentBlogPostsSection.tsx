import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useApi } from '../../hooks/useApi';
import { UnifiedPostItem } from '../../types';

// Fonction pour formater la date
const formatDate = (dateString: string | undefined): string => {
    if (!dateString) return 'Date inconnue';
    return new Date(dateString).toLocaleDateString('fr-FR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
};

export const RecentBlogPostsSection: React.FC = () => {
    const { data, loading, error } = useApi<{ results: UnifiedPostItem[] }>({
        endpoint: '/api/all-posts/?limit=6',
        loadOnMount: true,
    });

    // Variantes d'animation pour l'apparition progressive
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5 }
        }
    };

    return (
        <section className="py-32 bg-white dark:bg-black">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16">
                    <div>
                        <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-black dark:text-white mb-4">
                            Journal
                        </h2>
                        <p className="text-gray-600 dark:text-gray-400 text-lg max-w-xl">
                            Exploration de l'ingénierie, de la cyber et un peu de Fun !
                        </p>
                    </div>
                    <Link to="/blog" className="hidden md:inline-flex items-center text-sm font-medium text-black dark:text-white border-b border-black dark:border-white pb-1 hover:opacity-50 transition-opacity">
                        Lire tous les articles
                    </Link>
                </div>

                {loading && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[...Array(6)].map((_, i) => (
                            <div key={i} className={`animate-pulse ${i === 0 ? 'md:col-span-2 md:row-span-2' : ''}`}>
                                <div className="bg-gray-900 dark:bg-gray-900 rounded-3xl w-full h-full min-h-[300px]" />
                            </div>
                        ))}
                    </div>
                )}

                {error && (
                    <div className="text-center py-20 bg-gray-50 dark:bg-gray-900 rounded-2xl">
                        <p className="text-gray-500">Impossible de charger les articles pour le moment.</p>
                    </div>
                )}

                {data && data.results && (
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[minmax(300px,auto)]"
                    >
                        {data.results.map((post, index) => {
                            // Le premier article est mis en avant (grand format)
                            const isFeatured = index === 0;

                            return (
                                <motion.div
                                    key={post.id}
                                    variants={itemVariants}
                                    className={`group relative overflow-hidden rounded-3xl bg-gray-100 dark:bg-gray-900 ${isFeatured ? 'md:col-span-2 md:row-span-2 min-h-[400px] md:min-h-[600px]' : 'min-h-[300px]'
                                        }`}
                                >
                                    <Link to={post.article_type === 'v2' ? `/article/${post.slug}` : `/blog/${post.id}`} className="block h-full w-full">
                                        {/* Image de fond */}
                                        <div className="absolute inset-0">
                                            <img
                                                src={post.photo_cover_url}
                                                alt={post.titre}
                                                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                                                onError={(e) => {
                                                    const target = e.target as HTMLImageElement;
                                                    target.style.display = 'none';
                                                }}
                                            />
                                            <div className={`absolute inset-0 bg-gradient-to-t from-black/100 via-black/90 to-transparent transition-opacity duration-300 ${isFeatured ? 'opacity-90' : 'opacity-95 group-hover:opacity-90'}`} />
                                        </div>

                                        {/* Contenu */}
                                        <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end">
                                            <div className="transform transition-transform duration-300 group-hover:-translate-y-2">
                                                <div className="flex items-center gap-3 text-xs md:text-sm text-gray-300 mb-3 font-mono">
                                                    <span className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-white">
                                                        {post.categorie}
                                                    </span>
                                                    <span>{formatDate(post.date)}</span>
                                                </div>

                                                <h3 className={`font-bold text-white mb-3 leading-tight ${isFeatured ? 'text-3xl md:text-5xl' : 'text-xl md:text-2xl'
                                                    }`}>
                                                    {post.titre}
                                                </h3>

                                                {isFeatured && (
                                                    <p className="text-gray-300 text-lg line-clamp-2 max-w-2xl mb-4 hidden md:block">
                                                        {post.description}
                                                    </p>
                                                )}

                                                <div className="flex items-center text-white text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-4 group-hover:translate-y-0">
                                                    Lire l'article
                                                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </motion.div>
                            );
                        })}
                    </motion.div>
                )}

                <div className="mt-12 text-center md:hidden">
                    <Link to="/blog" className="inline-flex items-center text-sm font-medium text-black dark:text-white border-b border-black dark:border-white pb-1">
                        Lire tous les articles
                    </Link>
                </div>
            </div>
        </section>
    );
};