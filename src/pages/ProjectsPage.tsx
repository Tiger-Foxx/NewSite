import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ProjectsFilter, ProjectsGrid } from '../sections/Projects';
import { Project, PaginatedResponse, ProjectCategory } from '../types';
import { useApi } from '../hooks';
import { updateMetaTags } from '../utils';

export const ProjectsPage: React.FC = () => {
    const [activeCategory, setActiveCategory] = useState<ProjectCategory>('all');
    const [projects, setProjects] = useState<Project[]>([]);

    // Catégories de projets
    const categories = [
        { name: 'Tous les projets', value: 'all' as ProjectCategory },
        { name: 'Développement', value: 'dev' as ProjectCategory },
        { name: 'Cybersécurité', value: 'security' as ProjectCategory },
        { name: 'Intelligence Artificielle', value: 'ia' as ProjectCategory }
    ];

    // Endpoint API pour les projets
    const endpoint = activeCategory === 'all'
        ? '/api/projects/'
        : `/api/projects/?categorie=${activeCategory}`;

    // Utiliser le hook API
    const { data, loading, error, refetch } = useApi<PaginatedResponse<Project>>({
        endpoint,
        loadOnMount: true
    });

    // Mettre à jour les projets quand les données changent
    useEffect(() => {
        if (data) {
            setProjects(data.results);
        }
    }, [data]);

    // Mettre à jour les meta tags
    useEffect(() => {
        updateMetaTags({
            title: 'Projets',
            description: 'Découvrez les projets réalisés par Fox en développement web, mobile, desktop et sécurité informatique.',
            keywords: ['projets', 'portfolio', 'développement', 'sécurité informatique', 'intelligence artificielle'],
            author: 'Arthur Donfack',
            type: 'website'
        });
    }, []);

    // Changer de catégorie
    const handleCategoryChange = (category: ProjectCategory) => {
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
                            Mes Projets
                        </h1>
                        <p className="text-xl text-gray-300">
                            Des solutions innovantes pour des défis technologiques variés
                        </p>
                    </div>
                </div>
            </header>

            {/* Contenu principal */}
            <main className="py-16 px-4 sm:px-6 lg:px-8">
                <div className="container mx-auto">
                    {/* Filtres de catégories */}
                    <ProjectsFilter
                        categories={categories}
                        activeCategory={activeCategory}
                        onCategoryChange={handleCategoryChange}
                    />

                    {/* Liste des projets */}
                    <ProjectsGrid
                        projects={projects}
                        loading={loading}
                        error={error}
                        onRetry={refetch}
                    />
                </div>
            </main>
        </motion.div>
    );
};