import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useApi } from '../../hooks/useApi';
import { Project } from '../../types';
import { ImageWithSkeleton } from '../ui/ImageWithSkeleton';

export const ProjectsDesktop: React.FC = () => {
    const { data, loading } = useApi<{ results: Project[] }>({
        endpoint: '/api/projects/?featured=true&limit=6',
        loadOnMount: true
    });

    return (
        <section id="projets" className="pt-32 pb-0 bg-white dark:bg-[#050505] relative z-10 w-full">
            <div className="container mx-auto px-8 lg:px-16 mb-24">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 1, ease: "easeOut" }}
                >
                    <h2 className="text-[6vw] font-black tracking-tighter uppercase leading-none mb-4">
                        Sélection<br/>Radicale
                    </h2>
                    <p className="text-xl md:text-2xl text-gray-500 font-light max-w-2xl border-l-[1px] border-black dark:border-white pl-4">
                        À découvrir: une sélection de quelques uns de nos projets
                    </p>
                </motion.div>
            </div>

            {loading && (
                <div className="container mx-auto px-16 space-y-40 animate-pulse">
                    {[1, 2].map((i) => (
                        <div key={i} className="flex gap-20 min-h-[50vh]">
                            <div className="w-1/2 h-full bg-gray-200 dark:bg-gray-900 rounded-none"></div>
                            <div className="w-1/2 h-full bg-gray-100 dark:bg-gray-800 rounded-none"></div>
                        </div>
                    ))}
                </div>
            )}

            {data?.results && (
                <div className="flex flex-col w-full m-0 p-0 overflow-hidden">
                    {data.results.map((project, index) => {
                        const isEven = index % 2 === 0;

                        return (
                            <div key={project.id} className="w-full relative flex flex-col md:flex-row items-center border-t border-gray-100 dark:border-white/5 py-24 lg:py-32">
                                
                                {/* Image Container */}
                                <div className={`w-full md:w-1/2 flex justify-center items-center px-8 lg:px-16 ${isEven ? 'order-1' : 'order-1 md:order-2'}`}>
                                    <motion.div 
                                        className="relative w-full aspect-[4/3] overflow-hidden group shadow-2xl"
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        viewport={{ once: true, margin: "-10%" }}
                                        transition={{ duration: 1.2, ease: "easeOut" }}
                                    >
                                        <ImageWithSkeleton
                                            src={project.photo1_800_x_550}
                                            alt={project.nom}
                                            className="absolute inset-0 w-full h-full object-cover transform transition-transform duration-[2s] ease-out group-hover:scale-105"
                                            onError={(e) => {
                                                const target = e.target as HTMLImageElement;
                                                target.onerror = null;
                                                target.src = '/images/fallback-project.jpg';
                                            }}
                                        />
                                        <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-1000 mix-blend-overlay" />
                                    </motion.div>
                                </div>

                                {/* Text Container */}
                                <div className={`w-full md:w-1/2 flex flex-col justify-center px-8 lg:px-24 mt-12 md:mt-0 ${isEven ? 'order-2' : 'order-2 md:order-1'}`}>
                                    <motion.div
                                        initial={{ opacity: 0, x: isEven ? 50 : -50 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true, margin: "-20%" }}
                                        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                                    >
                                        <span className="text-sm font-bold tracking-[0.2em] uppercase text-gray-400 dark:text-gray-500 mb-2 block">
                                            {String(index + 1).padStart(2, '0')} — {project.categorie}
                                        </span>
                                        
                                        <h3 className="text-4xl lg:text-5xl xl:text-6xl font-black uppercase tracking-tighter mb-8 leading-[0.9]">
                                            {project.nom}
                                        </h3>

                                        <div className="w-16 h-[2px] bg-black dark:bg-white mb-8" />

                                        {/* Added the client or target information if available (using another field as mock if needed, like 'sujet') */}
                                        <div className="mb-10 text-xs font-mono uppercase tracking-widest text-black/50 dark:text-white/50 border border-black/10 dark:border-white/10 p-4 inline-block">
                                            <span>Sujet: {project.sujet || 'Projet Tech'}</span>
                                        </div>

                                        <p className="text-lg lg:text-xl font-light text-gray-600 dark:text-gray-400 mb-16 leading-relaxed max-w-xl">
                                            Une réalisation {project.categorie} d'exception. Conception robuste, interface immersive et performances maximales garanties.
                                        </p>

                                        <Link 
                                            to={`/projects/${project.id}`}
                                            className="inline-flex items-center gap-6 group"
                                        >
                                            <span className="text-sm font-bold uppercase tracking-[0.2em] relative">
                                                Découvrir le projet
                                                <span className="absolute -bottom-2 left-0 w-0 h-[1px] bg-black dark:bg-white transition-all duration-500 group-hover:w-full" />
                                            </span>
                                            <svg className="w-6 h-6 transform transition-transform duration-500 group-hover:translate-x-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth="1.5" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                            </svg>
                                        </Link>
                                    </motion.div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            {/* Added "Voir tous les projets" button to satisfy user request */}
            <div className="container mx-auto px-8 lg:px-16 mt-24 pb-32 flex justify-center">
                <Link 
                    to="/projects"
                    className="group relative flex items-center justify-center px-12 py-6 border border-black dark:border-white hover:border-transparent transition-all duration-700 ease-out overflow-hidden bg-transparent cursor-pointer"
                >
                    <div className="absolute inset-0 bg-black dark:bg-white -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-in-out" />
                    <span className="relative z-10 font-bold uppercase tracking-[0.2em] text-sm group-hover:text-white dark:group-hover:text-black transition-colors duration-500">
                        Voir plus de projets
                    </span>
                </Link>
            </div>
        </section>
    );
};
