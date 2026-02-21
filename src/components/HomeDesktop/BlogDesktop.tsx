import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useApi } from '../../hooks/useApi';
import { Post } from '../../types';
import { ImageWithSkeleton } from '../ui/ImageWithSkeleton';

const formatDate = (dateString: string | undefined): string => {
    if (!dateString) return 'Date inconnue';
    return new Date(dateString).toLocaleDateString('fr-FR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
};

export const BlogDesktop: React.FC = () => {
    const { data, loading } = useApi<{ results: Post[] }>({
        endpoint: '/api/posts/?limit=4&ordering=-date_publication',
        loadOnMount: true,
    });

    return (
        <section className="py-40 bg-white dark:bg-[#050505]">
            <div className="container mx-auto px-8 lg:px-16">
                
                <div className="flex justify-between items-end mb-24 border-b-[2px] border-black dark:border-white pb-6">
                    <h2 className="text-[6vw] font-black uppercase tracking-tighter leading-none text-black dark:text-white">
                        Journal.
                    </h2>
                    <Link to="/blog" className="text-sm font-bold uppercase tracking-widest text-black dark:text-white hover:opacity-50 transition-opacity mb-2">
                        Tous les articles
                    </Link>
                </div>

                {loading && (
                    <div className="w-full h-96 bg-gray-100 dark:bg-gray-900 animate-pulse rounded-none" />
                )}

                {data?.results && data.results.length > 0 && (
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                        {data.results.map((post, index) => {
                            const isFeatured = index === 0;

                            if (isFeatured) {
                                return (
                                    <motion.div
                                        key={post.id}
                                        className="lg:col-span-12 flex flex-col md:flex-row gap-12 group mb-10"
                                        initial={{ opacity: 0, y: 50 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true, margin: "-100px" }}
                                        transition={{ duration: 0.8 }}
                                    >
                                        <div className="md:w-3/5 overflow-hidden">
                                            <Link to={`/blog/${post.id}`} className="block w-full h-[500px] lg:h-[700px] relative">
                                                <ImageWithSkeleton
                                                    src={post.photo500_x_800 || post.photo800_x_533}
                                                    alt={post.titre}
                                                    // Restored the grayscale to be stronger as requested, but keeping it elegant
                                                    className="w-full h-full object-cover filter grayscale-[90%] opacity-90 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000 transform group-hover:scale-105"
                                                    onError={(e) => {
                                                        const target = e.target as HTMLImageElement;
                                                        target.style.display = 'none';
                                                    }}
                                                />
                                            </Link>
                                        </div>
                                        <div className="md:w-2/5 flex flex-col justify-center pr-8">
                                            <div className="flex items-center gap-4 mb-8">
                                                <span className="px-3 py-1 bg-black dark:bg-white text-white dark:text-black text-xs font-bold uppercase tracking-widest">
                                                    {post.categorie}
                                                </span>
                                                <span className="text-gray-500 text-sm font-mono tracking-wider">
                                                    {formatDate(post.date)}
                                                </span>
                                            </div>
                                            <Link to={`/blog/${post.id}`}>
                                                {/* Notice the removal of "uppercase" class here to fix user concern about readability */}
                                                <h3 className="text-4xl lg:text-5xl font-bold tracking-tight text-black dark:text-white leading-tight mb-8 hover:underline decoration-2 underline-offset-8">
                                                    {post.titre}
                                                </h3>
                                            </Link>
                                            <p className="text-lg font-light text-gray-600 dark:text-gray-400 mb-10 line-clamp-4">
                                                {post.description || "Découvrez une analyse pointue sur l'ingénierie moderne à travers ce nouveau billet."}
                                            </p>
                                            <Link 
                                                to={`/blog/${post.id}`}
                                                className="inline-flex items-center gap-4 uppercase tracking-[0.2em] text-xs font-bold text-black dark:text-white"
                                            >
                                                Lire l'article
                                                <svg className="w-5 h-5 transform group-hover:translate-x-2 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                                </svg>
                                            </Link>
                                        </div>
                                    </motion.div>
                                );
                            }

                            return (
                                <motion.div
                                    key={post.id}
                                    className="lg:col-span-4 group flex flex-col"
                                    initial={{ opacity: 0, y: 50 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-100px" }}
                                    transition={{ duration: 0.8, delay: index * 0.1 }}
                                >
                                    <Link to={`/blog/${post.id}`} className="block relative h-64 overflow-hidden mb-6">
                                        <ImageWithSkeleton
                                            src={post.photo500_x_800 || post.photo800_x_533}
                                            alt={post.titre}
                                            className="w-full h-full object-cover filter saturate-50 group-hover:saturate-100 transition-all duration-700 transform group-hover:scale-105"
                                            onError={(e) => {
                                                const target = e.target as HTMLImageElement;
                                                target.style.display = 'none';
                                            }}
                                        />
                                    </Link>
                                    
                                    <div className="flex flex-col flex-grow">
                                        <div className="flex items-center gap-3 mb-4">
                                            <span className="text-black dark:text-white text-[10px] font-bold uppercase tracking-widest border border-black/20 dark:border-white/20 px-2 py-1">
                                                {post.categorie}
                                            </span>
                                            <span className="text-gray-500 text-xs font-mono">
                                                {formatDate(post.date)}
                                            </span>
                                        </div>

                                        <Link to={`/blog/${post.id}`}>
                                            {/* Removed uppercase for better readability as requested */}
                                            <h3 className="font-bold tracking-tight text-black dark:text-white text-xl md:text-2xl mb-4 group-hover:underline decoration-1 underline-offset-4 line-clamp-3 leading-snug">
                                                {post.titre}
                                            </h3>
                                        </Link>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                )}
            </div>
        </section>
    );
};
