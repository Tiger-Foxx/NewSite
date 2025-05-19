import React from 'react';
import { motion } from 'framer-motion';
import { Post } from '../../types';
import { formatDate } from '../../utils';

interface BlogPostHeaderProps {
    post: Post;
}

export const BlogPostHeader: React.FC<BlogPostHeaderProps> = ({ post }) => {
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

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.7,
                ease: [0.6, 0.05, -0.01, 0.9]
            }
        }
    };

    return (
        <motion.header
            className="relative px-4 py-24 sm:py-32 md:py-40 bg-fox-dark overflow-hidden"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0">
                <img
                    src={post.photo800_x_533}
                    alt={post.titre}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-fox-dark via-fox-dark/80 to-fox-dark/60"></div>
            </div>

            <div className="fox-noise absolute inset-0 z-0"></div>

            <div className="container mx-auto relative z-10">
                <motion.div
                    className="max-w-3xl mx-auto text-center"
                    variants={containerVariants}
                >
                    <motion.div
                        className="flex justify-center items-center mb-6"
                        variants={itemVariants}
                    >
            <span className="px-4 py-1 bg-primary/90 text-white text-sm font-medium rounded-full">
              {post.categorie}
            </span>
                    </motion.div>

                    <motion.h1
                        className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight"
                        variants={itemVariants}
                    >
                        {post.titre}
                    </motion.h1>

                    <motion.p
                        className="text-lg text-gray-300 mb-8"
                        variants={itemVariants}
                    >
                        {post.description}
                    </motion.p>

                    <motion.div
                        className="flex flex-col sm:flex-row justify-center items-center sm:space-x-6 mb-8"
                        variants={itemVariants}
                    >
                        <div className="flex items-center mb-3 sm:mb-0">
                            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                                {post.auteur ? post.auteur.charAt(0) : "F"}
                            </div>
                            <div className="ml-3 text-left">
                                <p className="text-white font-medium">{post.auteur || "Fox"}</p>
                                <p className="text-gray-400 text-sm">Auteur</p>
                            </div>
                        </div>

                        <div className="flex items-center">
                            <svg className="w-5 h-5 text-primary mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                            </svg>
                            <span className="text-gray-300">{formatDate(post.date)}</span>
                        </div>
                    </motion.div>

                    <motion.div
                        className="flex justify-center space-x-3"
                        variants={itemVariants}
                    >
                        <button className="p-2 rounded-full bg-fox-light/20 hover:bg-fox-light/30 text-white transition-colors">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"></path>
                            </svg>
                        </button>

                        <button className="p-2 rounded-full bg-fox-light/20 hover:bg-fox-light/30 text-white transition-colors">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"></path>
                            </svg>
                        </button>

                        <button className="p-2 rounded-full bg-fox-light/20 hover:bg-fox-light/30 text-white transition-colors">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path d="M23.44 4.83c-.8.37-1.5.38-2.22.02.93-.56.98-.96 1.32-2.02-.88.52-1.86.9-2.9 1.1-.82-.88-2-1.43-3.3-1.43-2.5 0-4.55 2.04-4.55 4.54 0 .36.03.7.1 1.04-3.77-.2-7.12-2-9.36-4.75-.4.67-.6 1.45-.6 2.3 0 1.56.8 2.95 2 3.77-.74-.03-1.44-.23-2.05-.57v.06c0 2.2 1.56 4.03 3.64 4.44-.67.2-1.37.2-2.06.08.58 1.8 2.26 3.12 4.25 3.16C5.78 18.1 3.37 18.74 1 18.46c2 1.3 4.4 2.04 6.97 2.04 8.35 0 12.92-6.92 12.92-12.93 0-.2 0-.4-.02-.6.9-.63 1.96-1.22 2.56-2.14z"></path>
                            </svg>
                        </button>

                        <button className="p-2 rounded-full bg-fox-light/20 hover:bg-fox-light/30 text-white transition-colors">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path d="M0 3v18h24v-18h-24zm6.623 7.929l-4.623 5.712v-9.458l4.623 3.746zm-4.141-5.929h19.035l-9.517 7.713-9.518-7.713zm5.694 7.188l3.824 3.099 3.83-3.104 5.612 6.817h-18.779l5.513-6.812zm9.208-1.264l4.616-3.741v9.348l-4.616-5.607z"></path>
                            </svg>
                        </button>
                    </motion.div>
                </motion.div>
            </div>
        </motion.header>
    );
};