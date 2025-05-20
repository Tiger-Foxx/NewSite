import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useApi } from '../hooks/useApi';
import { Project } from '../types';

interface Category {
    id: string;
    name: string;
}

export const ProjectsPage: React.FC = () => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string>('all');
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [isViewGrid, setIsViewGrid] = useState<boolean>(true);
    const [hoveredProject, setHoveredProject] = useState<number | null>(null);

    // Appel API pour récupérer les projets
    const {
        data: projectsData,
        loading: projectsLoading,
        error: projectsError,
        refetch: refetchProjects
    } = useApi<{results: Project[]}>({
        endpoint: '/api/projects/?limit=50',
        loadOnMount: true
    });

    // Appel API pour récupérer les catégories (optionnel - simulé ici)
    const {
        data: categoriesData,
        loading: categoriesLoading
    } = useApi<{results: Category[]}>({
        endpoint: '/api/categories/',
        loadOnMount: true
    });

    // Si vous n'avez pas d'API pour les catégories, vous pouvez les extraire des projets
    useEffect(() => {
        if (projectsData && projectsData.results) {
            console.log(projectsData)
            // Mettre à jour les projets
            setProjects(projectsData.results);

            // Si pas de catégories depuis l'API, extraire des projets
            if (!categoriesData || !categoriesData.results) {
                const uniqueCategories = Array.from(new Set(projectsData.results.map(project => project.categorie)))
                    .filter(Boolean)
                    .map(cat => ({
                        id: cat.toLowerCase().replace(/\s+/g, '-'),
                        name: cat
                    }));

                setCategories([{ id: 'all', name: 'Tous les projets' }, ...uniqueCategories]);
            }

            // Mettre à jour le titre de la page
            document.title = 'Projets - Fox Engineering';
        }
    }, [projectsData, categoriesData]);

    // Mettre à jour les catégories si elles viennent de l'API
    useEffect(() => {
        if (categoriesData && categoriesData.results) {
            setCategories([{ id: 'all', name: 'Tous les projets' }, ...categoriesData.results]);
        }
    }, [categoriesData]);

    // Fonction de filtrage des projets
    const filteredProjects = projects.filter(project => {
        // Filtrer par catégorie
        const matchesCategory = selectedCategory === 'all' || project.categorie.toLowerCase() === selectedCategory;

        // Filtrer par recherche
        const matchesSearch = searchQuery === '' ||
            project.nom.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (project.description && project.description.toLowerCase().includes(searchQuery.toLowerCase()))

        return matchesCategory && matchesSearch;
    });

    // Animations
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
            transition: { duration: 0.5, ease: "easeOut" }
        }
    };

    return (
        <main className="bg-white dark:bg-black min-h-screen">
            {/* Header Section */}
            <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden">
                <div className="absolute inset-0 opacity-[0.03] bg-[url('/noise.png')] dark:opacity-[0.02]"></div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                    <motion.div
                        className="text-center mb-16"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <span className="inline-block px-3 py-1 text-xs font-medium uppercase tracking-wider bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full mb-4">Portfolio</span>
                        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-black dark:text-white mb-6 leading-tight">
                            Mes <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-600 via-black to-black dark:from-gray-400 dark:via-gray-100 dark:to-white">Projets Récents</span>
                        </h1>
                        <div className="w-24 h-1 bg-gray-200 dark:bg-gray-800 mx-auto mb-8"></div>
                        <p className="max-w-2xl mx-auto text-xl text-gray-600 dark:text-gray-400">
                            Découvrez une sélection de mes réalisations et projets dans divers domaines
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Filters Section */}
            <section className="py-8 border-t border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50 sticky top-16 z-10 backdrop-blur-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
                        {/* Categories Filter */}
                        <div className="flex items-center overflow-x-auto scrollbar-hide py-2 space-x-2">
                            {categoriesLoading ? (
                                <div className="animate-pulse flex space-x-2">
                                    {[...Array(4)].map((_, i) => (
                                        <div key={i} className="h-10 w-32 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                                    ))}
                                </div>
                            ) : (
                                categories.map(category => (
                                    <button
                                        key={category.id}
                                        onClick={() => setSelectedCategory(category.id)}
                                        className={`px-4 py-2 text-sm font-medium rounded-full whitespace-nowrap transition-colors ${
                                            selectedCategory === category.id
                                                ? 'bg-black text-white dark:bg-white dark:text-black'
                                                : 'bg-white dark:bg-black text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 border border-gray-200 dark:border-gray-800'
                                        }`}
                                    >
                                        {category.name}
                                    </button>
                                ))
                            )}
                        </div>

                        {/* Search and View Toggle */}
                        <div className="flex items-center space-x-4">
                            <div className="relative flex-grow max-w-xs">
                                <input
                                    type="text"
                                    placeholder="Rechercher..."
                                    value={searchQuery}
                                    onChange={e => setSearchQuery(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-black text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-transparent"
                                />
                                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                                    </svg>
                                </div>
                            </div>

                            {/* View Toggle */}
                            <div className="flex items-center space-x-2 bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-lg p-1">
                                <button
                                    onClick={() => setIsViewGrid(true)}
                                    className={`p-1.5 rounded ${
                                        isViewGrid
                                            ? 'bg-gray-100 dark:bg-gray-800 text-black dark:text-white'
                                            : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                                    }`}
                                    aria-label="Affichage en grille"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path>
                                    </svg>
                                </button>
                                <button
                                    onClick={() => setIsViewGrid(false)}
                                    className={`p-1.5 rounded ${
                                        !isViewGrid
                                            ? 'bg-gray-100 dark:bg-gray-800 text-black dark:text-white'
                                            : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                                    }`}
                                    aria-label="Affichage en liste"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 6h16M4 12h16M4 18h16"></path>
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Projects Grid Section */}
            <section className="py-16 bg-white dark:bg-black">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Loading State */}
                    {projectsLoading && (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {[...Array(6)].map((_, i) => (
                                <div key={i} className="animate-pulse bg-gray-100 dark:bg-gray-900 rounded-xl overflow-hidden">
                                    <div className="h-48 bg-gray-200 dark:bg-gray-800"></div>
                                    <div className="p-6 space-y-4">
                                        <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-1/4"></div>
                                        <div className="h-6 bg-gray-200 dark:bg-gray-800 rounded w-3/4"></div>
                                        <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-full"></div>
                                        <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-2/3"></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Error State */}
                    {projectsError && (
                        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6 text-center">
                            <svg className="w-12 h-12 text-red-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>
                            <h3 className="text-lg font-medium text-red-800 dark:text-red-300 mb-2">Erreur de chargement</h3>
                            <p className="text-red-600 dark:text-red-400 mb-4">{projectsError.message || "Impossible de récupérer les projets."}</p>
                            <button
                                onClick={() => refetchProjects()}
                                className="inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                            >
                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                                </svg>
                                Réessayer
                            </button>
                        </div>
                    )}

                    {/* No Results */}
                    {!projectsLoading && !projectsError && filteredProjects.length === 0 && (
                        <div className="bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800 rounded-lg p-10 text-center">
                            <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>
                            <h3 className="text-xl font-bold text-gray-700 dark:text-gray-300 mb-2">Aucun projet trouvé</h3>
                            <p className="text-gray-500 dark:text-gray-400 mb-6">
                                Aucun projet ne correspond à vos critères de recherche.
                            </p>
                            <button
                                onClick={() => {
                                    setSelectedCategory('all');
                                    setSearchQuery('');
                                }}
                                className="inline-flex items-center px-4 py-2 bg-black dark:bg-white text-white dark:text-black rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
                            >
                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                                </svg>
                                Réinitialiser les filtres
                            </button>
                        </div>
                    )}

                    {/* Grid View */}
                    {!projectsLoading && !projectsError && filteredProjects.length > 0 && isViewGrid && (
                        <motion.div
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                        >
                            <AnimatePresence>
                                {filteredProjects.map(project => (
                                    <motion.div
                                        key={project.id}
                                        variants={itemVariants}
                                        layout
                                        className={`group bg-white dark:bg-black rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-200 dark:border-gray-800 overflow-hidden flex flex-col ${
                                            hoveredProject === project.id ? 'ring-2 ring-black dark:ring-white ring-offset-2 ring-offset-white dark:ring-offset-black' : ''
                                        }`}
                                        onMouseEnter={() => setHoveredProject(project.id)}
                                        onMouseLeave={() => setHoveredProject(null)}
                                        onFocus={() => setHoveredProject(project.id)}
                                        onBlur={() => setHoveredProject(null)}
                                    >
                                        <div className="relative aspect-[16/9] overflow-hidden">
                                            <img
                                                src={project.photo1_800_x_550 || '/images/fallback-project.jpg'}
                                                alt={project.nom}
                                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                                onError={(e) => {
                                                    const target = e.target as HTMLImageElement;
                                                    target.onerror = null;
                                                    target.src = '/images/fallback-project.jpg';
                                                }}
                                            />
                                            <div className="absolute top-4 left-4">
                        <span className="inline-block px-3 py-1 text-xs font-medium bg-white/90 dark:bg-black/90 backdrop-blur-sm text-black dark:text-white rounded-full">
                          {project.categorie}
                        </span>
                                            </div>
                                        </div>

                                        <div className="p-6 flex-grow flex flex-col">
                                            <h3 className="text-xl font-bold text-black dark:text-white mb-3 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors">
                                                {project.nom}
                                            </h3>

                                            {/*{project.description && (*/}
                                            {/*    <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">*/}
                                            {/*        {project.description}*/}
                                            {/*    </p>*/}
                                            {/*)}*/}

                                            <div className="flex flex-wrap gap-2 mb-6">
                                                {project.sujet && (
                                                    <span className="px-2.5 py-0.5 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 text-xs font-medium rounded-full">
                            {project.sujet}
                          </span>
                                                )}

                                            </div>

                                            <div className="mt-auto">
                                                <Link
                                                    to={`/projects/${project.id}`}
                                                    className="inline-flex items-center text-black dark:text-white font-medium group"
                                                >
                                                    Voir le projet
                                                    <svg className="ml-2 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                                                    </svg>
                                                </Link>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </motion.div>
                    )}

                    {/* List View */}
                    {!projectsLoading && !projectsError && filteredProjects.length > 0 && !isViewGrid && (
                        <motion.div
                            className="space-y-6"
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                        >
                            <AnimatePresence>
                                {filteredProjects.map(project => (
                                    <motion.div
                                        key={project.id}
                                        variants={itemVariants}
                                        layout
                                        className={`group bg-white dark:bg-black rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-200 dark:border-gray-800 overflow-hidden ${
                                            hoveredProject === project.id ? 'ring-2 ring-black dark:ring-white ring-offset-2 ring-offset-white dark:ring-offset-black' : ''
                                        }`}
                                        onMouseEnter={() => setHoveredProject(project.id)}
                                        onMouseLeave={() => setHoveredProject(null)}
                                        onFocus={() => setHoveredProject(project.id)}
                                        onBlur={() => setHoveredProject(null)}
                                    >
                                        <div className="md:flex">
                                            <div className="md:w-1/3 lg:w-1/4 relative">
                                                <img
                                                    src={project.photo1_800_x_550 || '/images/fallback-project.jpg'}
                                                    alt={project.nom}
                                                    className="w-full h-48 md:h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                                    onError={(e) => {
                                                        const target = e.target as HTMLImageElement;
                                                        target.onerror = null;
                                                        target.src = '/images/fallback-project.jpg';
                                                    }}
                                                />
                                                <div className="absolute top-4 left-4">
                          <span className="inline-block px-3 py-1 text-xs font-medium bg-white/90 dark:bg-black/90 backdrop-blur-sm text-black dark:text-white rounded-full">
                            {project.categorie}
                          </span>
                                                </div>
                                            </div>

                                            <div className="p-6 md:w-2/3 lg:w-3/4">
                                                <div className="flex flex-col h-full">
                                                    <h3 className="text-xl font-bold text-black dark:text-white mb-3 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors">
                                                        {project.nom}
                                                    </h3>

                                                    {project.description && (
                                                        <div className="text-gray-600 dark:text-gray-400 mb-4" dangerouslySetInnerHTML={{ __html: project.description }} />
                                                    )}

                                                    <div className="flex flex-wrap gap-2 mb-6">
                                                        {project.sujet && (
                                                            <span className="px-2.5 py-0.5 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 text-xs font-medium rounded-full">
                                {project.sujet}
                              </span>
                                                        )}

                                                    </div>

                                                    <div className="mt-auto">
                                                        <Link
                                                            to={`/projects/${project.id}`}
                                                            className="inline-flex items-center px-4 py-2 bg-black dark:bg-white text-white dark:text-black rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
                                                        >
                                                            Voir le projet
                                                            <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                                                            </svg>
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </motion.div>
                    )}
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 bg-black dark:bg-white text-white dark:text-black">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">
                        Vous avez un projet en tête ?
                    </h2>
                    <p className="text-xl text-gray-300 dark:text-gray-700 max-w-2xl mx-auto mb-8">
                        Partagez votre vision avec moi et transformons-la en réalité numérique. Je suis prêt à vous accompagner dans votre projet.
                    </p>

                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <Link
                            to="/contact"
                            className="px-8 py-4 bg-white dark:bg-black text-black dark:text-white font-medium rounded-lg hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors shadow-lg"
                        >
                            Discuter de mon projet
                        </Link>
                        <a
                            href="mailto:donfackarthur750@gmail.com"
                            className="px-8 py-4 border border-white dark:border-black rounded-lg font-medium hover:bg-white/10 dark:hover:bg-black/10 transition-colors"
                        >
                            M'envoyer un email
                        </a>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default ProjectsPage;