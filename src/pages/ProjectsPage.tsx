import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useTransform} from 'framer-motion';
import { useApi } from '../hooks/useApi';
import { Project } from '../types';
import { 
  ArrowUpRight, 
  Filter, 
  Grid2X2, 
  List, 
  Search, 
  Cpu,
  CodeXml,
  ShieldCheck,
  BrainCircuit,
  LayoutTemplate
} from 'lucide-react';

interface Category {
    id: string;
    name: string;
    icon?: React.ReactNode;
}

export const ProjectsPage: React.FC = () => {
    // --- State ---
    const [projects, setProjects] = useState<Project[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string>('all');
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [isViewGrid, setIsViewGrid] = useState<boolean>(true);
    const [hoveredProject, setHoveredProject] = useState<number | null>(null);
    const [showFilters, setShowFilters] = useState(false);

    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const { scrollY } = useScroll();
    const yHero = useTransform(scrollY, [0, 300], [0, 100]);
    const opacityHero = useTransform(scrollY, [0, 300], [1, 0.5]);

    // --- API Calls ---
    const {
        data: projectsData,
        loading: projectsLoading,
        error: projectsError,
        refetch: refetchProjects
    } = useApi<{results: Project[]}>({
        endpoint: '/api/projects/?limit=50',
        loadOnMount: true
    });

    const {
        data: categoriesData,
        loading: categoriesLoading
    } = useApi<{results: Category[]}>({
        endpoint: '/api/categories/',
        loadOnMount: true
    
    });

    // --- Effects ---
    useEffect(() => {
        if (projectsData && projectsData.results) {
            setProjects(projectsData.results);
            console.log(categoriesLoading);
            console.log(projectsError);
            console.log(refetchProjects,scrollContainerRef,hoveredProject);

            if (!categoriesData || !categoriesData.results) {
                const uniqueCategories = Array.from(new Set(projectsData.results.map(project => project.categorie)))
                    .filter(Boolean)
                    .map(cat => ({
                        id: cat.toLowerCase().replace(/\s+/g, '-'),
                        name: cat
                    }));

                const defaultCategories = [
                    { id: 'all', name: 'All', icon: <LayoutTemplate className="w-4 h-4" /> },
                    ...uniqueCategories.map(c => ({
                        id: c.id, 
                        name: c.name,
                        icon: getCategoryIcon(c.id)
                    }))
                ];
                setCategories(defaultCategories);
            }
            document.title = 'Projets - Fox Engineering';
        }
    }, [projectsData, categoriesData]);

    useEffect(() => {
        if (categoriesData && categoriesData.results) {
            setCategories([
                { id: 'all', name: 'All', icon: <LayoutTemplate className="w-4 h-4" /> }, 
                ...categoriesData.results.map(c => ({...c, icon: getCategoryIcon(c.id)}))
            ]);
        }
    }, [categoriesData]);

    // --- Helpers ---
    const getCategoryIcon = (id: string) => {
        if (id.includes('dev')) return <CodeXml className="w-4 h-4" />;
        if (id.includes('secu')) return <ShieldCheck className="w-4 h-4" />;
        if (id.includes('ia') || id.includes('ai')) return <BrainCircuit className="w-4 h-4" />;
        return <Cpu className="w-4 h-4" />;
    };

    const filteredProjects = projects.filter(project => {
        // Safe check for category match
        const projectCat = project.categorie ? project.categorie.toLowerCase().replace(/\s+/g, '-') : 'unknown';
        const matchesCategory = selectedCategory === 'all' || projectCat === selectedCategory;
        const matchesSearch = searchQuery === '' ||
            project.nom.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (project.description && project.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
            (project.sujet && project.sujet.toLowerCase().includes(searchQuery.toLowerCase()));
        return matchesCategory && matchesSearch;
    });

    // --- Variants ---
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 30, scale: 0.95 },
        visible: { 
            opacity: 1, 
            y: 0, 
            scale: 1,
            transition: { type: "spring", stiffness: 50, damping: 20 }
        }
    };

    return (
        <main className="bg-white dark:bg-black min-h-screen relative overflow-hidden selection:bg-black selection:text-white dark:selection:bg-white dark:selection:text-black">
            {/* Ambient Noise & Gradient */}
            <div className="fixed inset-0 pointer-events-none z-50 opacity-[0.04] bg-[url('/noise.png')] mix-blend-overlay"></div>
            <div className="fixed top-[-20%] right-[-10%] w-[500px] h-[500px] bg-purple-500/10 dark:bg-purple-900/10 blur-[120px] rounded-full pointer-events-none" />
            <div className="fixed bottom-[-20%] left-[-10%] w-[600px] h-[600px] bg-blue-500/10 dark:bg-blue-900/10 blur-[120px] rounded-full pointer-events-none" />

            {/* --- Hero Section --- */}
            <section className="relative pt-32 pb-16 px-6 md:px-12 max-w-8xl mx-auto">
                <motion.div 
                    style={{ y: yHero, opacity: opacityHero }}
                    className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8"
                >
                    <div>
                        <motion.span 
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="inline-block px-4 py-1.5 mb-6 text-xs font-bold tracking-widest uppercase bg-black/5 dark:bg-white/10 rounded-full backdrop-blur-md"
                        >
                            Exploration & Innovation
                        </motion.span>
                        <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.9] mb-4 text-black dark:text-white">
                            SELECT <br/>
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-400 to-black dark:from-gray-600 dark:to-white">WORKS.</span>
                        </h1>
                    </div>
                    <div className="max-w-md">
                        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 font-light leading-relaxed">
                            Explorez l'intersection entre design, ingénierie et créativité.
                        </p>
                    </div>
                </motion.div>
            </section>

            {/* --- Mobile View: The "Deck" --- */}
            <section className="md:hidden py-8 min-h-[70vh] flex flex-col justify-center">
                <div className="px-6 mb-6 flex justify-between items-center">
                    <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-400">Glisser pour explorer</h2>
                    <span className="text-xs text-gray-500">{filteredProjects.length} Projets</span>
                </div>
                
                <div className="flex overflow-x-auto snap-x snap-mandatory gap-6 px-6 pb-12 scrollbar-none" style={{ scrollPaddingLeft: '24px' }}>
                    {projectsLoading ? (
                        [...Array(3)].map((_, i) => (
                             <div key={i} className="min-w-[85vw] h-[60vh] bg-gray-100 dark:bg-gray-900 rounded-[2rem] animate-pulse snap-center" />
                        ))
                    ) : (
                        <AnimatePresence>
                            {filteredProjects.map((project, i) => (
                                <motion.div
                                    key={project.id}
                                    initial={{ opacity: 0, x: 50 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    className="snap-center min-w-[85vw] relative flex flex-col h-[65vh] bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-[2rem] overflow-hidden shadow-2xl"
                                >
                                    <div className="relative h-3/5 overflow-hidden group">
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10" />
                                        <div className="absolute inset-0 bg-black/20 z-0" />
                                        <img 
                                            src={project.photo1_800_x_550 || '/images/fallback-project.jpg'}
                                            alt={project.nom}
                                            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                                            onError={(e) => {
                                                const target = e.target as HTMLImageElement;
                                                target.onerror = null;
                                                target.src = '/images/fallback-project.jpg';
                                            }}
                                        />
                                        <div className="absolute top-4 right-4 z-20">
                                            <span className="px-3 py-1 bg-white/20 backdrop-blur-md text-white border border-white/20 rounded-full text-xs font-medium">
                                                {project.categorie}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="p-6 flex flex-col justify-between flex-grow bg-white dark:bg-zinc-900">
                                        <div>
                                            <h3 className="text-3xl font-bold mb-2 text-black dark:text-white line-clamp-2 tracking-tight">{project.nom}</h3>
                                            <p className="text-sm text-gray-500 line-clamp-2 leading-relaxed">{project.sujet}</p>
                                        </div>
                                        <Link 
                                            to={`/projects/${project.id}`}
                                            className="mt-4 w-full py-4 flex items-center justify-center gap-2 bg-black dark:bg-white text-white dark:text-black rounded-xl font-bold text-sm tracking-wide active:scale-95 transition-transform"
                                        >
                                            View Details <ArrowUpRight className="w-4 h-4" />
                                        </Link>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    )}
                </div>
            </section>

            {/* --- Desktop View: The "Grid" --- */}
            <section className="hidden md:block py-16 px-6 md:px-12 max-w-8xl mx-auto min-h-[60vh]">
                 {projectsLoading ? (
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
                        className={isViewGrid ? "grid grid-cols-2 lg:grid-cols-3 gap-8" : "flex flex-col gap-8 max-w-4xl mx-auto"}
                    >
                        <AnimatePresence mode="popLayout">
                            {filteredProjects.map((project) => (
                                <motion.div
                                    key={project.id}
                                    variants={cardVariants}
                                    layoutId={`project-${project.id}`}
                                    className={`group relative ${!isViewGrid ? 'flex gap-8 items-center bg-gray-50 dark:bg-zinc-900/50 p-4 rounded-3xl border border-transparent dark:hover:border-zinc-700' : ''}`}
                                    onMouseEnter={() => setHoveredProject(project.id)}
                                    onMouseLeave={() => setHoveredProject(null)}
                                >
                                    <div className={`${isViewGrid ? 'aspect-[4/3] w-full' : 'w-72 h-44'} relative overflow-hidden rounded-2xl bg-gray-100 dark:bg-zinc-800`}>
                                        <img
                                            src={project.photo1_800_x_550 || '/images/fallback-project.jpg'}
                                            alt={project.nom}
                                            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                                            onError={(e) => {
                                                const target = e.target as HTMLImageElement;
                                                target.onerror = null;
                                                target.src = '/images/fallback-project.jpg';
                                            }}
                                        />
                                        {isViewGrid && (
                                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
                                                <Link 
                                                    to={`/projects/${project.id}`}
                                                    className="px-6 py-3 bg-white text-black rounded-full font-bold text-sm tracking-wide flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 shadow-xl"
                                                >
                                                    View Project <ArrowUpRight className="w-4 h-4" />
                                                </Link>
                                            </div>
                                        )}
                                        <div className="absolute top-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                            <span className="px-2 py-1 bg-black/50 backdrop-blur text-white text-[10px] font-bold uppercase tracking-wider rounded">
                                                {project.categorie}
                                            </span>
                                        </div>
                                    </div>

                                    <div className={`${isViewGrid ? 'mt-5' : 'flex-1'}`}>
                                        <div className="flex justify-between items-start mb-2">
                                            <h3 className="text-xl font-bold text-black dark:text-white group-hover:underline decoration-2 underline-offset-4 decoration-gray-400 dark:decoration-gray-600 transition-all">
                                                {project.nom}
                                            </h3>
                                            {isViewGrid && (
                                                <span className="text-[10px] font-mono text-gray-400 border border-gray-200 dark:border-zinc-800 px-2 py-1 rounded-full">
                                                    {project.date?.split('-')[0] || '2025'}
                                                </span>
                                            )}
                                        </div>
                                        <p className="text-gray-500 dark:text-gray-400 text-sm line-clamp-2 mb-4 font-medium leading-relaxed">{project.sujet}</p>
                                        
                                        {!isViewGrid && (
                                             <Link 
                                                to={`/projects/${project.id}`}
                                                className="inline-flex items-center text-sm font-bold border-b-2 border-black dark:border-white pb-0.5 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                                            >
                                                Voir le détail <ArrowUpRight className="ml-1 w-3 h-3" />
                                            </Link>
                                        )}

                                        {isViewGrid && (
                                            <div className="flex flex-wrap gap-2">
                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-gray-100 dark:bg-zinc-800 text-gray-800 dark:text-gray-300">
                                                    {project.categorie}
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </motion.div>
                 )}
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
                                        onClick={() => setSelectedCategory(cat.id)}
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
                                    placeholder="Search works..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full bg-transparent border-none focus:ring-0 text-sm pl-8 h-10 text-black dark:text-white"
                                />
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* View Switcher (Desktop Only) */}
                    <div className="hidden md:flex items-center border-l border-gray-200 dark:border-zinc-800 pl-2 ml-1 space-x-1">
                        <button 
                            onClick={() => setIsViewGrid(true)}
                            className={`p-2 rounded-lg transition-colors ${isViewGrid ? 'bg-gray-100 dark:bg-zinc-800 text-black dark:text-white' : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'}`}
                        >
                            <Grid2X2 className="w-4 h-4" />
                        </button>
                        <button 
                            onClick={() => setIsViewGrid(false)}
                            className={`p-2 rounded-lg transition-colors ${!isViewGrid ? 'bg-gray-100 dark:bg-zinc-800 text-black dark:text-white' : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'}`}
                        >
                            <List className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>
            
        </main>
    );
};

export default ProjectsPage;