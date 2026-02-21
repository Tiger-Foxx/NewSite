import React from 'react';
import { motion } from 'framer-motion';
import { ImageWithSkeleton } from '../ui/ImageWithSkeleton';

const openSourceProductsData = [
    { id: 'mood-music', name: 'Mood-Music', description: 'Playlist Spotify générée par IA selon votre humeur.', iconUrl: 'https://mood-music-fox.vercel.app/icons/mood-192.png', liveUrl: 'https://mood-music.myfox.tech/', image: "https://images.unsplash.com/photo-1614680376593-902f74cf0d41?q=80&w=2574&auto=format&fit=crop" },
    { id: 'nan-cv', name: 'NAN-CV', description: 'Créez des CV professionnels avec l\'IA en quelques minutes.', iconUrl: 'https://nancy-cv.vercel.app/assets/nancy-D_KPpY8c.jpg', liveUrl: 'https://nancy-cv.myfox.tech/', image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?q=80&w=2670&auto=format&fit=crop" },
    { id: 'yt-learn', name: 'YT-Learn', description: 'Transformez vidéos YouTube et PDF en jeux éducatifs interactifs.', iconUrl: 'https://yt-learn-eight.vercel.app/assets/logo-CUh3ZhgP.png', liveUrl: 'https://yt-learn.myfox.tech/', image: "https://cdn.dribbble.com/userupload/40076356/file/original-1a57132eff4b3ab07f585329ba923296.jpg" },
    { id: 'qualityshoot', name: 'QualityShoot', description: "UPSCALER vos images et vidéos grâce à l'IA.", iconUrl: 'https://github.com/Tiger-Foxx/QualityShoot---frontend/raw/main/src/assets/logo.png', liveUrl: 'https://quality-shoot.myfox.tech/', image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=2600&auto=format&fit=crop" },
    { id: 'openpay', name: 'OpenPay', description: 'Savoir Combien Tu Vaux sur le Marché Tech', iconUrl: 'https://raw.githubusercontent.com/Tiger-Foxx/openpay/main/public/favicon.png', liveUrl: 'https://openpay.myfox.tech', image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=2670&auto=format&fit=crop" },
    { id: 'minou', name: 'Minou', description: 'Un compagnon virtuel intelligent pour votre bureau', iconUrl: 'https://github.com/Tiger-Foxx/minou/raw/main/assets/logo.png', liveUrl: 'https://minou.myfox.tech', image: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=2643&auto=format&fit=crop" },
];

export const OpenSourceDesktop: React.FC = () => {
    return (
        <section className="py-40 bg-white dark:bg-[#050505] overflow-hidden">
            <div className="container mx-auto px-8 lg:px-16 mb-20 flex flex-col items-center">
                <motion.h2 
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                    className="text-[6vw] md:text-[5vw] font-black tracking-tighter uppercase leading-none text-black dark:text-white mb-8 text-center"
                >
                    Quelques de nos projets<br/>Open Source
                </motion.h2>
                <a href="https://github.com/Tiger-Foxx" target="_blank" rel="noopener noreferrer" className="text-sm font-bold tracking-widest uppercase text-gray-500 hover:text-black dark:hover:text-white transition-colors border-b border-gray-300 pb-1">
                    Découvrir notre GitHub
                </a>
            </div>

            {/* Changed from 3 columns to an innovative, large, alternating grid combining big images and strong text visibility */}
            <div className="container mx-auto px-4 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-32">
                {openSourceProductsData.map((project, idx) => {
                    // Alternate margin top for a masonry-like scattered feel
                    const isEven = idx % 2 === 0;

                    return (
                        <motion.a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            key={project.id}
                            initial={{ opacity: 0, y: 100 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ delay: 0.1, duration: 0.8, ease: "easeOut" }}
                            className={`group block relative w-full ${isEven ? 'mt-0' : 'md:mt-32'} cursor-pointer`}
                        >
                            {/* The Big Bold Image Container */}
                            <div className="relative w-full aspect-[4/5] overflow-hidden shadow-2xl">
                                <ImageWithSkeleton 
                                    src={project.image} 
                                    alt={project.name} 
                                    className="w-full h-full object-cover filter grayscale opacity-90 group-hover:filter-none group-hover:opacity-100 transform transition-all duration-[1.5s] ease-out group-hover:scale-105" 
                                    onError={(e) => {
                                        const target = e.target as HTMLImageElement;
                                        target.style.display = 'none';
                                    }}
                                />
                                
                                {/* Elegant gradient mask allowing text readability without making the whole thing dark */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-700" />
                                
                                {/* Logo Floating Heroically */}
                                <div className="absolute top-8 right-8 z-20 w-16 h-16 rounded-full bg-white dark:bg-black/50 backdrop-blur-md flex items-center justify-center p-3 shadow-2xl border border-white/20 transform transition-transform duration-700 group-hover:scale-110 group-hover:rotate-12">
                                    <ImageWithSkeleton
                                        src={project.iconUrl}
                                        alt={`${project.name} icon`}
                                        className="w-full h-full object-contain rounded-full"
                                        skeletonClassName="bg-transparent"
                                        onError={(e) => {
                                            const target = e.target as HTMLImageElement;
                                            target.style.display = 'none';
                                        }}
                                    />
                                </div>

                                {/* Text content placed elegantly at the bottom inside the image */}
                                <div className="absolute bottom-0 left-0 w-full p-10 z-20 flex flex-col justify-end transform transition-transform duration-700 group-hover:-translate-y-4">
                                    <h3 className="text-4xl lg:text-5xl font-black uppercase tracking-tighter text-white mb-4 group-hover:text-yellow-400 transition-colors duration-500">
                                        {project.name}
                                    </h3>
                                    <p className="text-gray-300 font-light text-lg lg:text-xl leading-relaxed max-w-sm mb-8 opacity-80 group-hover:opacity-100 transition-opacity">
                                        {project.description}
                                    </p>
                                    
                                    <div className="flex items-center gap-4">
                                        <span className="text-xs font-bold uppercase tracking-[0.2em] text-white flex items-center gap-2 border-b border-white/30 pb-1">
                                            Explorer le projet
                                            <svg className="w-4 h-4 transform group-hover:translate-x-3 transition-transform duration-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                            </svg>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </motion.a>
                    );
                })}
            </div>
        </section>
    );
};
