import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useScroll, useTheme } from '@/hooks';
import { ThemeSwitcher } from './ThemeSwitcher';
import { safeAnimation } from '@/utils/fixEasing';

export const Header: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { position, isAtTop } = useScroll();
    const location = useLocation();
    const { theme } = useTheme();
    const headerRef = useRef<HTMLDivElement>(null);

    // Fermer le menu mobile lors du changement de route
    useEffect(() => {
        setIsOpen(false);
    }, [location]);

    // Variables pour les styles et animations en fonction du scroll
    const headerBg = isAtTop
        ? 'bg-transparent'
        : 'bg-fox-dark/95 backdrop-blur-xl border-b border-fox-light/10 shadow-lg';

    const headerHeight = isAtTop ? 'h-24 md:h-28' : 'h-20 md:h-24';
    const logoSize = isAtTop ? 'h-14 md:h-12' : 'h-10 md:h-12';
    const textSize = isAtTop ? 'text-3xl' : 'text-2xl';

    // Variants pour les animations
    const logoVariants = safeAnimation({
        hidden: { opacity: 0, y: -20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                ease: "easeOut"
            }
        }
    });

    const navItemVariants = safeAnimation({
        hidden: { opacity: 0, y: -10 },
        visible: (i: number) => ({
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.3,
                delay: 0.1 + (i * 0.05),
                ease: "easeOut"
            }
        })
    });

    // Navigation items avec des icônes pour un design plus riche
    const navItems = [
        {
            name: 'Accueil',
            path: '/',
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
                </svg>
            )
        },
        {
            name: 'Projets',
            path: '/projects',
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
                </svg>
            )
        },
        {
            name: 'Blog',
            path: '/blog',
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"></path>
                </svg>
            )
        },
        {
            name: 'À propos',
            path: '/about',
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                </svg>
            )
        },
        {
            name: 'Contact',
            path: '/contact',
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                </svg>
            )
        }
    ];

    // Vérifier si le lien est actif
    const isActive = (path: string) => {
        if (path === '/' && location.pathname !== '/') return false;
        return location.pathname.startsWith(path);
    };

    return (
        <header
            ref={headerRef}
            className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${headerBg}`}
        >
            <div className="container mx-auto px-6 lg:px-8 relative">
                <div className={`flex justify-between items-center ${headerHeight} transition-all duration-500`}>
                    {/* Logo avec taille contrôlée */}
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={logoVariants}
                        className="flex items-center"
                    >
                        <Link to="/" className="flex items-center group">
                            <div className={`h-30 transition-all duration-500 overflow-hidden relative group-hover:scale-105`}>
                                <img
                                    src="/logo-fox-light.png"
                                    alt="Fox Logo"
                                    className="  object-contain transition-all duration-300"
                                />
                                <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
                            </div>

                        </Link>
                    </motion.div>

                    {/* Navigation desktop améliorée */}
                    <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
                        {navItems.map((item, i) => (
                            <motion.div
                                key={item.path}
                                custom={i}
                                initial="hidden"
                                animate="visible"
                                variants={navItemVariants}
                            >
                                <Link
                                    to={item.path}
                                    className={`relative flex items-center px-3 py-2 text-base font-medium transition-all duration-300 rounded-lg group hover:bg-fox-light/5
                                        ${isActive(item.path)
                                        ? 'text-white'
                                        : 'text-gray-300 hover:text-white'}`}
                                >
                                    <span className={`mr-2 transition-colors duration-300 
                                        ${isActive(item.path) ? 'text-primary' : 'text-gray-400 group-hover:text-primary'}`}>
                                        {item.icon}
                                    </span>
                                    {item.name}
                                    {isActive(item.path) && (
                                        <motion.div
                                            layoutId="activeNavIndicator"
                                            className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-primary to-primary/70 rounded-full"
                                            transition={{ duration: 0.3, ease: "easeOut" }}
                                        />
                                    )}
                                </Link>
                            </motion.div>
                        ))}

                        {/* Theme Switcher */}
                        <motion.div
                            custom={navItems.length}
                            initial="hidden"
                            animate="visible"
                            variants={navItemVariants}
                            className="ml-2"
                        >
                            <ThemeSwitcher />
                        </motion.div>

                        {/* CTA Button amélioré */}
                        <motion.div
                            custom={navItems.length + 1}
                            initial="hidden"
                            animate="visible"
                            variants={navItemVariants}
                        >
                            <Link
                                to="/contact"
                                className="btn btn-primary group flex items-center px-5 py-2.5 shadow-lg shadow-primary/10 hover:shadow-primary/20 transition-all duration-300"
                            >
                                <span>Discutons</span>
                                <svg className="w-4 h-4 ml-2 transform transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                                </svg>
                            </Link>
                        </motion.div>
                    </nav>

                    {/* Mobile menu button amélioré */}
                    <div className="md:hidden flex items-center">
                        {/* Theme Switcher (mobile) */}
                        <ThemeSwitcher className="mr-3" />

                        <button
                            type="button"
                            className="p-2.5 rounded-lg text-gray-400 hover:text-white hover:bg-fox-light/10 focus:outline-none transition-colors duration-300"
                            onClick={() => setIsOpen(!isOpen)}
                            aria-expanded={isOpen}
                        >
                            <span className="sr-only">Ouvrir le menu</span>
                            <div className="relative w-6 h-5">
                                <span
                                    className={`absolute h-0.5 w-6 bg-current transform transition duration-300 ease-in-out ${
                                        isOpen ? 'rotate-45 translate-y-2.5' : 'translate-y-0'
                                    }`}
                                />
                                <span
                                    className={`absolute h-0.5 w-6 bg-current transform transition-opacity duration-300 ease-in-out ${
                                        isOpen ? 'opacity-0 translate-x-4' : 'opacity-100'
                                    }`}
                                    style={{ top: '10px' }}
                                />
                                <span
                                    className={`absolute h-0.5 w-6 bg-current transform transition duration-300 ease-in-out ${
                                        isOpen ? '-rotate-45 -translate-y-2.5' : 'translate-y-5'
                                    }`}
                                />
                            </div>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu amélioré */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="md:hidden overflow-hidden"
                    >
                        <div className="px-4 pt-3 pb-6 space-y-2 bg-gradient-to-b from-fox-dark to-fox-dark/95 backdrop-blur-xl border-t border-fox-light/10 shadow-lg">
                            {navItems.map((item, i) => (
                                <motion.div
                                    key={item.path}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.05, ease: "easeOut" }}
                                >
                                    <Link
                                        to={item.path}
                                        className={`flex items-center px-4 py-3.5 rounded-lg text-base font-medium ${
                                            isActive(item.path)
                                                ? 'text-white bg-gradient-to-r from-fox-light/10 to-transparent border-l-2 border-primary shadow-inner'
                                                : 'text-gray-300 hover:text-white hover:bg-fox-light/5'
                                        }`}
                                    >
                                        <span className={`mr-3 ${isActive(item.path) ? 'text-primary' : 'text-gray-400'}`}>
                                            {item.icon}
                                        </span>
                                        {item.name}
                                    </Link>
                                </motion.div>
                            ))}
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: navItems.length * 0.05, ease: "easeOut" }}
                                className="pt-2"
                            >
                                <Link
                                    to="/contact"
                                    className="flex items-center justify-center w-full px-4 py-3.5 rounded-lg bg-gradient-to-r from-primary to-primary/90 text-white text-center font-medium shadow-lg transition-all duration-300"
                                >
                                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
                                    </svg>
                                    Discutons de votre projet
                                </Link>
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
};