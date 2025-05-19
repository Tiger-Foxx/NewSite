import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BlogCategories, BlogList } from '../sections/Blog';
import { Post, PaginatedResponse } from '../types';
import { useApi } from '../hooks';
import { updateMetaTags } from '../utils';

export const BlogPage: React.FC = () => {
    const [activeCategory, setActiveCategory] = useState('all');
    const [posts, setPosts] = useState<Post[]>([]);

    // Catégories de blog
    const categories = [
        { name: 'Tous les articles', value: 'all' },
        { name: 'Développement', value: 'dev' },
        { name: 'Cybersécurité', value: 'cybersecurity' },
        { name: 'Intelligence Artificielle', value: 'ai' },
        { name: 'Tutoriels', value: 'tutorial' }
    ];

    // Endpoint API pour les articles
    const endpoint = activeCategory === 'all'
        ? '/api/posts/'
        : `/api/posts/?categorie=${activeCategory}`;

    // Utiliser le hook API
    const { data, loading, error, refetch } = useApi<PaginatedResponse<Post>>({
        endpoint,
        loadOnMount: true
    });

    // Mettre à jour les posts quand les données changent
    useEffect(() => {
        if (data) {
            setPosts(data.results);
        }
    }, [data]);

    // Mettre à jour les meta tags
    useEffect(() => {
        updateMetaTags({
            title: 'Blog',
            description: 'Articles et tutoriels sur le développement, la cybersécurité et l\'intelligence artificielle.',
            keywords: ['blog', 'développement', 'cybersécurité', 'intelligence artificielle', 'tutoriels'],
            author: 'Arthur Donfack',
            type: 'website'
        });
    }, []);

    // Changer de catégorie
    const handleCategoryChange = (category: string) => {
        setActiveCategory(category);
    };

    // Animation de la page
    const pageVariants = {
        initial: { opacity: 0 },
        animate: {
            opacity: 1,
            transition: { duration: 0.5 }
        },
        exit: {
            opacity: 0,
            transition: { duration: 0.3 }
        }
    };

    return (
        <motion.div
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
        >
            {/* En-tête de la page */}
            <header className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 bg-fox-dark relative">
                <div className="fox-gradient-bg absolute inset-0 opacity-30"></div>
                <div className="fox-noise absolute inset-0"></div>

                <div className="container mx-auto relative z-10">
                    <div className="max-w-3xl mx-auto text-center">
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                            Blog & Articles
                        </h1>
                        <p className="text-xl text-gray-300">
                            Découvrez mes articles sur le développement, la cybersécurité et l'IA.
                        </p>
                    </div>
                </div>
            </header>

            {/* Contenu principal */}
            <main className="py-16 px-4 sm:px-6 lg:px-8">
                <div className="container mx-auto">
                    {/* Filtres de catégories */}
                    <BlogCategories
                        categories={categories}
                        activeCategory={activeCategory}
                        onCategoryChange={handleCategoryChange}
                    />

                    {/* Liste des articles */}
                    <BlogList
                        posts={posts}
                        loading={loading}
                        error={error}
                        onRetry={refetch}
                    />
                </div>
            </main>
        </motion.div>
    );
};