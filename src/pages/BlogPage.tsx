import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { useApi } from '../hooks/useApi';
import { Post, PaginatedResponse } from '../types';
import newsletterService from "@/services/newsletter.service.ts";
import { 
    Search, 
    Filter, 
    LayoutTemplate, 
    CodeXml, 
    ShieldCheck, 
    BrainCircuit, 
    BookOpen,
    ArrowUpRight,
    ChevronLeft,
    ChevronRight,
    Mail,

} from 'lucide-react';

interface Category {
    id: string;
    name: string;
    icon?: React.ReactNode;
}

export const BlogPage: React.FC = () => {
    // --- State ---
    const [posts, setPosts] = useState<Post[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string>('all');
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [showFilters, setShowFilters] = useState(false);
    
    // Pagination
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);
    const [totalPosts, setTotalPosts] = useState<number>(0);
    const limit = 9; // Increased limit for better grid filling

    // Newsletter State
    const [email, setEmail] = useState('');
    const [subscriptionStatus, setSubscriptionStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [statusMessage, setStatusMessage] = useState('');

    // Scroll Animations
    const { scrollY } = useScroll();
    const yHero = useTransform(scrollY, [0, 300], [0, 100]);
    const opacityHero = useTransform(scrollY, [0, 300], [1, 0.5]);

    // --- API Calls ---
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

    const {
        data: postsData,
        loading: postsLoading,
        error: postsError,
        refetch: refetchPosts
    } = useApi<PaginatedResponse<Post>>({
        endpoint: buildEndpoint(),
        loadOnMount: true
    });

    const { data: categoriesData } = useApi<{results: Category[]}>({
        endpoint: '/api/categories/',
        loadOnMount: true
    });

    // --- Effects ---
    useEffect(() => {
        if (postsData && postsData.results) {
            setPosts(postsData.results);
            setTotalPosts(postsData.count);
            setTotalPages(Math.ceil(postsData.count / limit));
            document.title = 'Insights - Fox Engineering';
            console.log(postsError);
        }
    }, [postsData]);

    useEffect(() => {
        refetchPosts();
    }, [currentPage, selectedCategory, searchQuery]);

    useEffect(() => {
        if (categoriesData && categoriesData.results) {
            const mappedCategories = [
                { id: 'all', name: 'All', icon: <LayoutTemplate className="w-4 h-4" /> },
                ...categoriesData.results.map(c => ({
                    id: c.id,
                    name: c.name,
                    icon: getCategoryIcon(c.id)
                }))
            ];
            setCategories(mappedCategories);
        } else {
            // Fallbacks
            setCategories([
                { id: 'all', name: 'All', icon: <LayoutTemplate className="w-4 h-4" /> },
                { id: 'dev', name: 'Dev', icon: <CodeXml className="w-4 h-4" /> },
                { id: 'cybersecurity', name: 'Security', icon: <ShieldCheck className="w-4 h-4" /> },
                { id: 'ai', name: 'AI', icon: <BrainCircuit className="w-4 h-4" /> },
                { id: 'tutorial', name: 'Tutorials', icon: <BookOpen className="w-4 h-4" /> }
            ]);
        }
    }, [categoriesData]);

    // --- Helpers ---
    const getCategoryIcon = (id: string) => {
        const lowerId = id.toLowerCase();
        if (lowerId.includes('dev')) return <CodeXml className="w-4 h-4" />;
        if (lowerId.includes('secu') || lowerId.includes('cyber')) return <ShieldCheck className="w-4 h-4" />;
        if (lowerId.includes('ai') || lowerId.includes('ia')) return <BrainCircuit className="w-4 h-4" />;
        return <BookOpen className="w-4 h-4" />;
    };

    const formatDate = (dateString: string | undefined): string => {
        if (!dateString) return 'Date inconnue';
        return new Date(dateString).toLocaleDateString('fr-FR', {
            year: 'numeric', month: 'long', day: 'numeric',
        });
    };

    const handleSubscribe = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email || !email.includes('@')) {
            setSubscriptionStatus('error');
            setStatusMessage('Adresse email invalide.');
            return;
        }
        setSubscriptionStatus('loading');
        try {
            const response = await newsletterService.subscribe({ email });
            setSubscriptionStatus('success');
            setStatusMessage(response.message || 'Bienvenue dans la meute !');
            setEmail('');
            setTimeout(() => setSubscriptionStatus('idle'), 5000);
        } catch (error) {
            setSubscriptionStatus('error');
            setStatusMessage('Erreur lors de l\'inscription.');
            setTimeout(() => setSubscriptionStatus('idle'), 5000);
        }
    };

    // --- Variants ---
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 30, scale: 0.95 },
        visible: { 
            opacity: 1, y: 0, scale: 1,
            transition: { type: "spring", stiffness: 50, damping: 20 }
        }
    };

    return (
        <main className="bg-white dark:bg-black min-h-screen relative overflow-hidden selection:bg-black selection:text-white dark:selection:bg-white dark:selection:text-black pb-32">
            {/* Ambient Noise & Gradient */}
            <div className="fixed inset-0 pointer-events-none z-50 opacity-[0.04] bg-[url('/noise.png')] mix-blend-overlay"></div>
            <div className="fixed top-[-10%] right-[-5%] w-[600px] h-[600px] bg-indigo-500/10 dark:bg-indigo-900/10 blur-[130px] rounded-full pointer-events-none" />
            <div className="fixed bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-teal-500/10 dark:bg-teal-900/10 blur-[130px] rounded-full pointer-events-none" />

            {/* --- Hero Section --- */}
            <section className="relative pt-32 pb-12 px-6 md:px-12 max-w-8xl mx-auto">
                <motion.div 
                    style={{ y: yHero, opacity: opacityHero }}
                    className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8"
                >
                    <div className="relative z-10">
                        <motion.span 
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="inline-block px-4 py-1.5 mb-6 text-xs font-bold tracking-widest uppercase bg-black/5 dark:bg-white/10 rounded-full backdrop-blur-md"
                        >
                            Journal & R&D
                        </motion.span>
                        <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.9] mb-4 text-black dark:text-white">
                            FOX <br/>
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-400 to-black dark:from-gray-600 dark:to-white">INSIGHTS.</span>
                        </h1>
                    </div>
                </motion.div>
            </section>

             {/* --- Mobile View: The "Deck" (Portrait Cards) --- */}
             <section className="md:hidden py-8 min-h-[65vh] flex flex-col justify-center relative z-10">
                <div className="px-6 mb-4 flex justify-between items-center">
                    <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-400">À la une</h2>
                    <span className="text-xs text-gray-500">{totalPosts} Articles</span>
                </div>
                
                <div className="flex overflow-x-auto snap-x snap-mandatory gap-6 px-6 pb-8 scrollbar-none" style={{ scrollPaddingLeft: '24px' }}>
                    {postsLoading ? (
                        [...Array(3)].map((_, i) => (
                             <div key={i} className="min-w-[85vw] h-[60vh] bg-gray-100 dark:bg-zinc-900 rounded-[2rem] animate-pulse snap-center" />
                        ))
                    ) : (
                        <AnimatePresence>
                            {posts.map((post, i) => (
                                <motion.div
                                    key={post.id}
                                    initial={{ opacity: 0, x: 50 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    className="snap-center min-w-[85vw] relative flex flex-col h-[60vh] bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-[2rem] overflow-hidden shadow-2xl"
                                >
                                    {/* Image Area - Portrait Optimized */}
                                    <div className="relative h-2/3 overflow-hidden group">
                                        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60 z-10" />
                                        <img 
                                            src={post.photo500_x_800 || post.photo800_x_533 || '/images/fallback-post.jpg'}
                                            alt={post.titre}
                                            className="w-full h-full object-cover transition-transform duration-700 ease-out"
                                        />
                                        <div className="absolute top-4 right-4 z-20">
                                            <span className="px-3 py-1 bg-white/20 backdrop-blur-md text-white border border-white/20 rounded-full text-xs font-bold uppercase tracking-wider">
                                                {post.categorie}
                                            </span>
                                        </div>
                                    </div>
                                    
                                    {/* Content Area */}
                                    <div className="p-6 flex flex-col justify-between flex-grow bg-white dark:bg-zinc-900 relative">
                                        <div>
                                            <span className="text-xs text-gray-400 mb-2 block font-mono">{formatDate(post.date)}</span>
                                            <h3 className="text-2xl font-bold mb-2 text-black dark:text-white leading-tight line-clamp-3">{post.titre}</h3>
                                        </div>
                                        <Link 
                                            to={`/blog/${post.id}`}
                                            className="mt-2 w-full py-3 flex items-center justify-center gap-2 bg-black dark:bg-white text-white dark:text-black rounded-xl font-bold text-sm tracking-wide active:scale-95 transition-transform"
                                        >
                                            Lire l'article <ArrowUpRight className="w-4 h-4" />
                                        </Link>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    )}
                </div>
            </section>

             {/* --- Desktop View: Grid (Landscape Cards) --- */}
             <section className="hidden md:block py-12 px-6 md:px-12 max-w-8xl mx-auto min-h-[60vh]">
                 {postsLoading ? (
                    <div className="grid grid-cols-3 gap-8">
                        {[...Array(6)].map((_, i) => (
                            <div key={i} className="h-96 bg-gray-100 dark:bg-zinc-900 rounded-2xl animate-pulse" />
                        ))}
                    </div>
                 ) : (
                    <motion.div 
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                    >
                        <AnimatePresence mode="popLayout">
                            {posts.map((post) => (
                                <motion.div
                                    key={post.id}
                                    variants={cardVariants}
                                    layoutId={`post-${post.id}`}
                                    className="group flex flex-col gap-0 rounded-3xl bg-gray-50 dark:bg-zinc-900/40 border border-transparent hover:border-gray-200 dark:hover:border-zinc-700 overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-black/5 dark:hover:shadow-white/5"
                                >
                                    <div className="h-56 relative overflow-hidden bg-gray-200 dark:bg-zinc-800">
                                        <img
                                            src={post.photo800_x_533 || post.photo500_x_800 || '/images/fallback-post.jpg'}
                                            alt={post.titre}
                                            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                                        />
                                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
                                            <Link 
                                                to={`/blog/${post.id}`}
                                                className="px-6 py-3 bg-white text-black rounded-full font-bold text-sm tracking-wide flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 shadow-xl"
                                            >
                                                Lire <ArrowUpRight className="w-4 h-4" />
                                            </Link>
                                        </div>
                                        <div className="absolute top-4 left-4 z-20">
                                            <span className="px-3 py-1 bg-white/90 dark:bg-black/80 backdrop-blur text-black dark:text-white rounded-lg text-[10px] font-bold uppercase tracking-wider shadow-sm">
                                                {post.categorie}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="p-6 flex flex-col flex-grow">
                                        <div className="mb-3 flex justify-between items-center text-xs text-gray-500 font-mono">
                                            <span>{formatDate(post.date)}</span>
                                            <span className="flex items-center gap-1"><BookOpen className="w-3 h-3" /> {Math.ceil(post.description.length / 200)} min read</span>
                                        </div>
                                        <h3 className="text-xl font-bold text-black dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-tight">
                                            {post.titre}
                                        </h3>
                                        <p className="text-gray-500 dark:text-gray-400 text-sm line-clamp-3 mb-6 font-normal leading-relaxed">
                                            {post.description}
                                        </p>
                                        
                                        <div className="mt-auto pt-4 border-t border-gray-100 dark:border-zinc-800/50 flex items-center justify-between">
                                             <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">{post.auteur || "FOX TEAM"}</span>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </motion.div>
                 )}
            </section>

            {/* --- Pagination (Simple & Clean) --- */}
            {!postsLoading && totalPages > 1 && (
                <div className="flex justify-center gap-2 py-8">
                    <button 
                        onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                        disabled={currentPage === 1}
                        className="p-3 rounded-full bg-gray-100 dark:bg-zinc-800 text-black dark:text-white disabled:opacity-30 hover:bg-gray-200 dark:hover:bg-zinc-700 transition"
                    >
                        <ChevronLeft className="w-5 h-5" />
                    </button>
                    <span className="px-4 py-3 font-mono text-sm bg-gray-50 dark:bg-zinc-900 rounded-full border border-gray-200 dark:border-zinc-800">
                        {currentPage} / {totalPages}
                    </span>
                    <button 
                        onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                        disabled={currentPage === totalPages}
                        className="p-3 rounded-full bg-gray-100 dark:bg-zinc-800 text-black dark:text-white disabled:opacity-30 hover:bg-gray-200 dark:hover:bg-zinc-700 transition"
                    >
                        <ChevronRight className="w-5 h-5" />
                    </button>
                </div>
            )}

            {/* --- Newsletter Section (Redesigned) --- */}
            <section className="py-24 px-6 relative z-10 w-full max-w-4xl mx-auto">
                <div className="relative overflow-hidden bg-black dark:bg-white rounded-[2.5rem] p-8 md:p-16 text-center shadow-2xl">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-gray-800 dark:bg-gray-200 rounded-bl-full opacity-20" />
                    <div className="absolute bottom-0 left-0 w-48 h-48 bg-gray-800 dark:bg-gray-200 rounded-tr-full opacity-20" />
                    
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className="relative z-10"
                    >
                        <Mail className="w-12 h-12 mx-auto text-white dark:text-black mb-6" />
                        <h2 className="text-3xl md:text-5xl font-black mb-4 text-white dark:text-black tracking-tight">
                            Rejoignez la meute.
                        </h2>
                        <p className="text-lg text-gray-400 dark:text-gray-600 mb-8 max-w-lg mx-auto leading-relaxed">
                            Recevez nos meilleures analyses tech, tutoriels et actualités directement, sans spam.
                        </p>

                        <form onSubmit={handleSubscribe} className="max-w-md mx-auto relative flex items-center">
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="votre@email.com"
                                className="w-full px-6 py-4 rounded-full bg-white/10 dark:bg-black/5 border border-white/20 dark:border-black/10 text-white dark:text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white dark:focus:ring-black backdrop-blur-md"
                                required
                            />
                            <button
                                type="submit"
                                disabled={subscriptionStatus === 'loading'}
                                className="absolute right-2 p-2 bg-white dark:bg-black rounded-full hover:scale-105 transition-transform disabled:opacity-50 disabled:scale-100"
                            >
                                <ArrowUpRight className="w-5 h-5 text-black dark:text-white" />
                            </button>
                        </form>
                        
                        {statusMessage && (
                            <motion.p 
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className={`mt-4 text-sm font-medium ${subscriptionStatus === 'error' ? 'text-red-400' : 'text-green-400'}`}
                            >
                                {statusMessage}
                            </motion.p>
                        )}
                    </motion.div>
                </div>
            </section>

             {/* --- Floating Filter Dock --- */}
             <div className="fixed bottom-6 inset-x-0 z-40 flex justify-center pointer-events-none px-4">
                <div className="pointer-events-auto bg-white/90 dark:bg-zinc-900/90 backdrop-blur-xl border border-gray-200 dark:border-zinc-800 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.12)] p-2 flex items-center gap-2 max-w-full md:max-w-fit transition-all duration-500 ease-spring">
                    
                    {/* Toggle Filters Button */}
                    <button 
                        onClick={() => setShowFilters(!showFilters)}
                        className={`p-3 rounded-xl transition-all duration-300 ${showFilters ? 'bg-black text-white dark:bg-white dark:text-black shadow-lg scale-105' : 'hover:bg-gray-100 dark:hover:bg-zinc-800 text-gray-600 dark:text-gray-300'}`}
                    >
                        <Filter className="w-5 h-5" />
                    </button>

                    {/* Filter List (Expandable) */}
                    <AnimatePresence mode="popLayout">
                        {showFilters ? (
                            <motion.div 
                                initial={{ opacity: 0, width: 0, scale: 0.9 }}
                                animate={{ opacity: 1, width: 'auto', scale: 1 }}
                                exit={{ opacity: 0, width: 0, scale: 0.9 }}
                                className="flex items-center gap-1 overflow-x-auto scrollbar-none pr-2"
                                style={{ maxWidth: '60vw' }}
                            >
                                {categories.map(cat => (
                                    <button
                                        key={cat.id}
                                        onClick={() => {
                                            setSelectedCategory(cat.id);
                                            setCurrentPage(1);
                                        }}
                                        className={`px-3 py-2 text-xs font-bold whitespace-nowrap rounded-lg flex items-center gap-2 transition-all duration-300 ${
                                            selectedCategory === cat.id 
                                            ? 'bg-gray-200 dark:bg-zinc-700 text-black dark:text-white' 
                                            : 'text-gray-500 hover:bg-gray-100 dark:hover:bg-zinc-800'
                                        }`}
                                    >
                                        {cat.icon}
                                        {cat.name}
                                    </button>
                                ))}
                            </motion.div>
                        ) : (
                            <motion.div 
                                initial={{ opacity: 0, width: 0 }}
                                animate={{ opacity: 1, width: 'auto' }}
                                exit={{ opacity: 0, width: 0 }}
                                className="flex-1 md:w-64 relative px-2 bg-gray-100 dark:bg-zinc-800/50 rounded-xl mx-1"
                            >
                                <Search className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
                                <input 
                                    type="text" 
                                    placeholder="Search insights..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full bg-transparent border-none focus:ring-0 text-sm pl-8 h-10 text-black dark:text-white"
                                />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

        </main>
    );
};

export default BlogPage;
