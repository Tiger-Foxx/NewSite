import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Post } from '@/types';
import { formatDate, truncateText } from '@/utils';

interface BlogListProps {
    posts: Post[];
    loading: boolean;
    error: any;
    onRetry: () => void;
}

export const BlogList: React.FC<BlogListProps> = ({
                                                      posts,
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
            <div className="flex justify-center items-center h-64">
                <div className="w-16 h-16 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
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
                <p className="mb-4">Impossible de charger les articles pour le moment.</p>
                <button
                    onClick={onRetry}
                    className="px-4 py-2 bg-primary hover:bg-primary-light text-white rounded-md transition-colors"
                >
                    Réessayer
                </button>
            </div>
        );
    }

    if (posts.length === 0) {
        return (
            <div className="text-center text-gray-400 py-16">
                <svg className="w-16 h-16 mx-auto mb-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
                </svg>
                <h3 className="text-xl font-bold mb-2">Aucun article trouvé</h3>
                <p>Aucun article ne correspond à vos critères.</p>
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
            {posts.map((post) => (
                <motion.article
                    key={post.id}
                    className="card overflow-hidden rounded-xl flex flex-col h-full"
                    variants={cardVariants}
                    whileHover={{ y: -10, transition: { duration: 0.3 } }}
                >
                    <Link to={`/blog/${post.id}`} className="block relative overflow-hidden aspect-video">
                        <img
                            src={post.photo800_x_533}
                            alt={post.titre}
                            className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-fox-dark via-transparent to-transparent"></div>
                        <div className="absolute bottom-4 left-4">
              <span className="px-3 py-1 bg-primary/90 text-white text-xs font-medium rounded-full">
                {post.categorie}
              </span>
                        </div>
                    </Link>

                    <div className="p-6 flex-grow flex flex-col">
                        <Link to={`/blog/${post.id}`} className="block">
                            <h3 className="text-xl font-bold text-white mb-2 hover:text-primary transition-colors">
                                {post.titre}
                            </h3>
                        </Link>

                        <p className="text-gray-400 mb-4 flex-grow">
                            {truncateText(post.description, 120)}
                        </p>

                        <div className="flex items-center justify-between mt-auto pt-4 border-t border-fox-light/10">
                            <div className="flex items-center">
                                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-sm">
                                    {post.auteur ? post.auteur.charAt(0) : "F"}
                                </div>
                                <span className="ml-2 text-sm text-gray-400">{post.auteur || "Fox"}</span>
                            </div>
                            <span className="text-sm text-gray-500">{formatDate(post.date)}</span>
                        </div>
                    </div>
                </motion.article>
            ))}
        </motion.div>
    );
};