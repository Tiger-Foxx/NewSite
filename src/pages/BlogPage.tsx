import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useApi } from '../hooks/useApi';
import {Post, PaginatedResponse, SubscribePayload} from '../types';
import newsletterService from "@/services/newsletter.service.ts";

interface Category {
    id: string;
    name: string;
}

export const BlogPage: React.FC = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string>('all');
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);
    const [totalPosts, setTotalPosts] = useState<number>(0);
    // État pour le formulaire de newsletter
    const [email, setEmail] = useState('');
    const [subscriptionStatus, setSubscriptionStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [statusMessage, setStatusMessage] = useState('');

    // Année courante pour le copyright
    const currentYear = new Date().getFullYear();

    // Gérer la soumission du formulaire d'abonnement
    const handleSubscribe = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validation simple
        if (!email || !email.includes('@')) {
            setSubscriptionStatus('error');
            setStatusMessage('Veuillez saisir une adresse email valide');
            return;
        }

        setSubscriptionStatus('loading');

        try {
            const payload: SubscribePayload = { email };
            const response = await newsletterService.subscribe(payload);

            setSubscriptionStatus('success');
            setStatusMessage(response.message || 'Inscription réussie !');
            setEmail(''); // Réinitialiser le champ

            // Réinitialiser l'état après 5 secondes
            setTimeout(() => {
                setSubscriptionStatus('idle');
                setStatusMessage('');
            }, 5000);
        } catch (error) {
            console.error('Erreur lors de l\'abonnement:', error);
            setSubscriptionStatus('error');
            setStatusMessage('Une erreur est survenue. Veuillez réessayer.');

            // Réinitialiser l'état d'erreur après 5 secondes
            setTimeout(() => {
                setSubscriptionStatus('idle');
                setStatusMessage('');
            }, 5000);
        }
    };

    // Pagination et filtrage
    const limit = 6; // Nombre d'articles par page

    // Construction de l'endpoint avec pagination et filtres
    const buildEndpoint = () => {
        let endpoint = `/api/posts/?limit=${limit}&offset=${(currentPage - 1) * limit}`;

        if (selectedCategory !== 'all') {
            endpoint += `&categorie=${selectedCategory}`;
        }

        if (searchQuery) {
            endpoint += `&search=${searchQuery}`;
        }

        return endpoint;
    };

    // Appel API pour récupérer les articles
    const {
        data: postsData,
        loading: postsLoading,
        error: postsError,
        refetch: refetchPosts
    } = useApi<PaginatedResponse<Post>>({
        endpoint: buildEndpoint(),
        loadOnMount: true
    });

    // Appel API pour récupérer les catégories (optionnel - simulé ici)
    const {
        data: categoriesData
    } = useApi<{results: Category[]}>({
        endpoint: '/api/categories/',
        loadOnMount: true
    });

    // Mettre à jour les articles quand les données changent
    useEffect(() => {
        if (postsData) {
            setPosts(postsData.results);
            setTotalPosts(postsData.count);
            setTotalPages(Math.ceil(postsData.count / limit));

            // Mettre à jour le titre de la page
            document.title = 'Blog - Fox Engineering';
        }
    }, [postsData]);

    // Mettre à jour les catégories si elles viennent de l'API
    useEffect(() => {
        if (categoriesData && categoriesData.results) {
            setCategories([{ id: 'all', name: 'Tous les articles' }, ...categoriesData.results]);
        } else {
            // Catégories par défaut si pas d'API
            setCategories([
                { id: 'all', name: 'Tous les articles' },
                { id: 'dev', name: 'Développement' },
                { id: 'cybersecurity', name: 'Cybersécurité' },
                { id: 'ai', name: 'Intelligence Artificielle' },
                { id: 'tutorial', name: 'Tutoriels' }
            ]);
        }
    }, [categoriesData]);

    // Refetch lorsque les filtres ou la pagination changent
    useEffect(() => {
        refetchPosts();
    }, [currentPage, selectedCategory, searchQuery]);

    // Fonction pour formater la date
    const formatDate = (dateString: string | undefined): string => {
        if (!dateString) return 'Date inconnue';
        return new Date(dateString).toLocaleDateString('fr-FR', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
    };

    // Gérer le changement de catégorie
    const handleCategoryChange = (categoryId: string) => {
        setSelectedCategory(categoryId);
        setCurrentPage(1); // Réinitialiser à la première page
    };

    // Gérer la recherche
    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setCurrentPage(1); // Réinitialiser à la première page
    };

    // Animation variants
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
                        <span className="inline-block px-3 py-1 text-xs font-medium uppercase tracking-wider bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full mb-4">Blog</span>
                        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-black dark:text-white mb-6 leading-tight">
                            Idées & <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-600 via-black to-black dark:from-gray-400 dark:via-gray-100 dark:to-white">Inspirations</span>
                        </h1>
                        <div className="w-24 h-1 bg-gray-200 dark:bg-gray-800 mx-auto mb-8"></div>
                        <p className="max-w-2xl mx-auto text-xl text-gray-600 dark:text-gray-400">
                            Articles, tutoriels et actualités sur le développement web, la cybersécurité et l'intelligence artificielle
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
                            {categories.map(category => (
                                <button
                                    key={category.id}
                                    onClick={() => handleCategoryChange(category.id)}
                                    className={`px-4 py-2 text-sm font-medium rounded-full whitespace-nowrap transition-colors ${
                                        selectedCategory === category.id
                                            ? 'bg-black text-white dark:bg-white dark:text-black'
                                            : 'bg-white dark:bg-black text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 border border-gray-200 dark:border-gray-800'
                                    }`}
                                >
                                    {category.name}
                                </button>
                            ))}
                        </div>

                        {/* Search */}
                        <form onSubmit={handleSearch} className="relative flex-grow max-w-xs">
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
                            <button type="submit" className="sr-only">Rechercher</button>
                        </form>
                    </div>
                </div>
            </section>

            {/* Blog Posts Grid */}
            <section className="py-16 bg-white dark:bg-black">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Loading State */}
                    {postsLoading && (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {[...Array(6)].map((_, i) => (
                                <div key={i} className="animate-pulse bg-gray-100 dark:bg-gray-900 rounded-xl overflow-hidden h-[420px]">
                                    <div className="h-48 bg-gray-200 dark:bg-gray-800"></div>
                                    <div className="p-6 space-y-4">
                                        <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-1/4"></div>
                                        <div className="h-6 bg-gray-200 dark:bg-gray-800 rounded w-3/4"></div>
                                        <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-full"></div>
                                        <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-full"></div>
                                        <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-2/3"></div>
                                        <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-1/4 mt-6"></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Error State */}
                    {postsError && (
                        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6 text-center">
                            <svg className="w-12 h-12 text-red-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>
                            <h3 className="text-lg font-medium text-red-800 dark:text-red-300 mb-2">Erreur de chargement</h3>
                            <p className="text-red-600 dark:text-red-400 mb-4">{postsError.message || "Impossible de récupérer les articles."}</p>
                            <button
                                onClick={() => refetchPosts()}
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
                    {!postsLoading && !postsError && posts.length === 0 && (
                        <div className="bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800 rounded-lg p-10 text-center">
                            <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>
                            <h3 className="text-xl font-bold text-gray-700 dark:text-gray-300 mb-2">Aucun article trouvé</h3>
                            <p className="text-gray-500 dark:text-gray-400 mb-6">
                                Aucun article ne correspond à vos critères de recherche.
                            </p>
                            <button
                                onClick={() => {
                                    setSelectedCategory('all');
                                    setSearchQuery('');
                                    setCurrentPage(1);
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

                    {/* Posts Grid */}
                    {!postsLoading && !postsError && posts.length > 0 && (
                        <motion.div
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                        >
                            <AnimatePresence>
                                {posts.map(post => (
                                    <motion.div
                                        key={post.id}
                                        className="group flex flex-col bg-gray-50 dark:bg-gray-900/70 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-1 border border-gray-200 dark:border-gray-800 overflow-hidden h-full"
                                        variants={itemVariants}
                                        layout
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
                                            <div className="mb-2 flex items-center justify-between">
                        <span className="inline-block px-2.5 py-0.5 text-xs font-medium rounded-full bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200">
                          {post.categorie}
                        </span>
                                                <span className="text-xs text-gray-500 dark:text-gray-400">
                          {formatDate(post.date_publication || post.date)}
                        </span>
                                            </div>
                                            <h3 className="text-lg font-semibold text-black dark:text-white mb-2 leading-tight group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors">
                                                {post.titre}
                                            </h3>
                                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-3 flex-grow">
                                                {post.description || post.contenu?.substring(0, 120) + '...'}
                                            </p>
                                            <div className="mt-auto flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                                                <span>{post.auteur || 'Fox'}</span>
                                                <Link
                                                    to={`/blog/${post.slug || post.id}`}
                                                    className="inline-flex items-center font-medium text-black dark:text-white group-hover:underline"
                                                >
                                                    Lire la suite
                                                    <svg className="ml-1 w-3 h-3 transition-transform duration-300 group-hover:translate-x-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path>
                                                    </svg>
                                                </Link>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </motion.div>
                    )}

                    {/* Pagination */}
                    {!postsLoading && !postsError && totalPages > 1 && (
                        <div className="mt-12 flex justify-between items-center">
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                                Affichage {(currentPage - 1) * limit + 1} - {Math.min(currentPage * limit, totalPosts)} sur {totalPosts} articles
                            </div>

                            <div className="flex space-x-2">
                                <button
                                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                    disabled={currentPage === 1}
                                    className={`inline-flex items-center justify-center w-10 h-10 rounded-full border ${
                                        currentPage === 1
                                            ? 'border-gray-200 dark:border-gray-800 text-gray-400 dark:text-gray-600 cursor-not-allowed'
                                            : 'border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                                    }`}
                                    aria-label="Page précédente"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
                                    </svg>
                                </button>

                                {[...Array(totalPages)].map((_, i) => {
                                    const pageNum = i + 1;
                                    // N'afficher que les 5 pages autour de la page actuelle pour éviter trop de boutons
                                    if (
                                        pageNum === 1 ||
                                        pageNum === totalPages ||
                                        (pageNum >= currentPage - 2 && pageNum <= currentPage + 2)
                                    ) {
                                        return (
                                            <button
                                                key={pageNum}
                                                onClick={() => setCurrentPage(pageNum)}
                                                className={`inline-flex items-center justify-center w-10 h-10 rounded-full ${
                                                    currentPage === pageNum
                                                        ? 'bg-black dark:bg-white text-white dark:text-black'
                                                        : 'border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                                                }`}
                                                aria-label={`Page ${pageNum}`}
                                                aria-current={currentPage === pageNum ? 'page' : undefined}
                                            >
                                                {pageNum}
                                            </button>
                                        );
                                    } else if (
                                        (pageNum === 2 && currentPage > 4) ||
                                        (pageNum === totalPages - 1 && currentPage < totalPages - 3)
                                    ) {
                                        // Ajouter des points de suspension pour indiquer les pages cachées
                                        return (
                                            <span
                                                key={pageNum}
                                                className="inline-flex items-center justify-center w-10 h-10 text-gray-500 dark:text-gray-400"
                                            >
                        ...
                      </span>
                                        );
                                    }
                                    return null;
                                })}

                                <button
                                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                    disabled={currentPage === totalPages}
                                    className={`inline-flex items-center justify-center w-10 h-10 rounded-full border ${
                                        currentPage === totalPages
                                            ? 'border-gray-200 dark:border-gray-800 text-gray-400 dark:text-gray-600 cursor-not-allowed'
                                            : 'border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                                    }`}
                                    aria-label="Page suivante"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                                    </svg>
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </section>

            {/* Newsletter Section */}
            <section className="py-16 bg-black dark:bg-white text-white dark:text-black">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                            Restez informé
                        </h2>
                        <p className="text-lg text-gray-300 dark:text-gray-700 max-w-2xl mx-auto mb-8">
                            Abonnez-vous à notre newsletter pour recevoir nos derniers articles et actualités directement dans votre boîte mail.
                        </p>

                        <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                            <input
                                onChange={(e) => setEmail(e.target.value)}
                                type="email"
                                name="email"
                                placeholder="Votre adresse email"
                                disabled={subscriptionStatus === 'loading'}
                                className="flex-grow px-5 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-white dark:focus:ring-black text-black dark:text-white bg-white/90 dark:bg-black/90"
                                required

                            />
                            <button
                                type="submit"
                                disabled={subscriptionStatus === 'loading'}
                                className={`flex-shrink-0 px-4 py-2 text-base font-medium text-white bg-black border border-transparent rounded-r-lg dark:bg-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black dark:focus:ring-white ${
                                    subscriptionStatus === 'loading' ? 'opacity-70 cursor-not-allowed' : ''
                                }`}
                            >
                                {subscriptionStatus === 'loading' ? (
                                    <span className="flex items-center">
                                                <svg
                                                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white dark:text-black"
                                                    xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10"
                                                            stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor"
                                                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                                Envoi...
                                            </span>
                                ) : (
                                    'S\'abonner'
                                )}
                            </button>
                        </form>

                        <p className="text-xs text-gray-400 dark:text-gray-600 mt-4">
                            En vous inscrivant, vous acceptez notre politique de confidentialité. Vous pourrez vous
                            désabonner à tout moment.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Featured Categories Section */}
            <section className="py-16 bg-white dark:bg-black">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        className="text-center mb-12"
                        initial={{opacity: 0, y: 20}}
                        whileInView={{opacity: 1, y: 0}}
                        viewport={{once: true}}
                        transition={{duration: 0.5}}
                    >
                        <h2 className="text-3xl font-bold text-black dark:text-white mb-4">
                            Explorez par catégorie
                        </h2>
                        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                            Découvrez notre contenu organisé par thématiques
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            {name: 'Développement', icon: 'code', color: 'bg-blue-500', slug: 'dev'},
                            {name: 'Cybersécurité', icon: 'shield-check', color: 'bg-red-500', slug: 'secu'},
                            {name: 'Intelligence Artificielle', icon: 'chip', color: 'bg-purple-500', slug: 'IA'},
                            { name: 'Tutos', icon: 'academic-cap', color: 'bg-green-500',slug:'Tuto'}
                        ].map((category, index) => (
                            <motion.div
                                key={index}
                                className="group bg-gray-50 dark:bg-gray-900/50 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                onClick={() => handleCategoryChange(category.slug.toLowerCase().replace(/\s+/g, '-'))}
                            >
                                <div className={`h-2 ${category.color}`}></div>
                                <div className="p-6 flex flex-col items-center">
                                    <div className="w-16 h-16 flex items-center justify-center rounded-full bg-white dark:bg-black mb-4 shadow-sm">
                                        {category.icon === 'code' && (
                                            <svg className="w-8 h-8 text-black dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path>
                                            </svg>
                                        )}
                                        {category.icon === 'shield-check' && (
                                            <svg className="w-8 h-8 text-black dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                                            </svg>
                                        )}
                                        {category.icon === 'chip' && (
                                            <svg className="w-8 h-8 text-black dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"></path>
                                            </svg>
                                        )}
                                        {category.icon === 'academic-cap' && (
                                            <svg className="w-8 h-8 text-black dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M12 14l9-5-9-5-9 5 9 5z"></path>
                                                <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"></path>
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"></path>
                                            </svg>
                                        )}
                                    </div>
                                    <h3 className="text-xl font-bold text-black dark:text-white mb-2 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors">
                                        {category.name}
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                                        {category.count} article{category.count > 1 ? 's' : ''}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 bg-gray-50 dark:bg-gray-900/50 border-t border-gray-200 dark:border-gray-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-black rounded-2xl shadow-lg p-8 md:p-12 border border-gray-200 dark:border-gray-800">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                            <div className="mb-6 md:mb-0 md:mr-10">
                                <h3 className="text-2xl font-bold text-black dark:text-white mb-3">
                                    Vous avez des questions ?
                                </h3>
                                <p className="text-gray-600 dark:text-gray-400">
                                    N'hésitez pas à me contacter pour discuter de votre projet ou pour toute autre information.
                                </p>
                            </div>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <Link
                                    to="/contact"
                                    className="inline-flex items-center justify-center px-6 py-3 bg-black dark:bg-white text-white dark:text-black rounded-lg font-medium hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
                                >
                                    Me contacter
                                </Link>
                                <Link
                                    to="/about"
                                    className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors"
                                >
                                    En savoir plus
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default BlogPage;
