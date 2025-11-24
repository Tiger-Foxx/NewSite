import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

export const Header: React.FC = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const location = useLocation();
    const previousScrollPosition = useRef(0);
    const [headerVisible, setHeaderVisible] = useState(true);

    // Fermer le menu mobile lors des changements de route
    useEffect(() => {
        setMobileMenuOpen(false);
    }, [location.pathname]);

    // Détection de scroll avancée
    useEffect(() => {
        const handleScroll = () => {
            const currentScrollPos = window.scrollY;
            const isScrollingDown = currentScrollPos > previousScrollPosition.current;

            if (currentScrollPos > 100) {
                setHeaderVisible(!isScrollingDown);
            } else {
                setHeaderVisible(true);
            }

            setIsScrolled(currentScrollPos > 20);
            previousScrollPosition.current = currentScrollPos;
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navItems = [
        { name: 'Accueil', path: '/' },
        { name: 'Projets', path: '/projects' },
        { name: 'À propos', path: '/about' },
        { name: 'Blog', path: '/blog' },
        { name: 'Contact', path: '/contact' }
    ];

    const isActive = (path: string) => {
        if (path === '/' && location.pathname !== '/') return false;
        return location.pathname === path || location.pathname.startsWith(`${path}/`);
    };

    return (
        <motion.header
            initial={{ y: -100 }}
            animate={{ y: headerVisible ? 0 : -100 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className={`fixed top-0 left-0 w-full z-50 transition-colors duration-500 ${isScrolled
                ? 'bg-white/80 dark:bg-black/80 backdrop-blur-md border-b border-gray-100 dark:border-gray-900'
                : 'bg-transparent'
                }`}
        >
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    {/* Logo */}
                    <Link to="/" className="flex items-center group z-50">
                        <img
                            src="/logo-fox-light.png"
                            alt="Fox Logo"
                            className="h-8 md:h-10 w-auto object-contain"
                        />
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center space-x-8">
                        {navItems.map((item) => (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`relative text-sm font-medium transition-colors duration-300 ${isActive(item.path)
                                    ? 'text-black dark:text-white'
                                    : 'text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white'
                                    }`}
                            >
                                {item.name}
                                {isActive(item.path) && (
                                    <motion.span
                                        layoutId="underline"
                                        className="absolute -bottom-1 left-0 w-full h-px bg-black dark:bg-white"
                                    />
                                )}
                            </Link>
                        ))}
                    </nav>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden z-50 p-2 text-black dark:text-white"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        <div className="w-6 h-5 flex flex-col justify-between">
                            <span className={`w-full h-0.5 bg-current transform transition-all duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
                            <span className={`w-full h-0.5 bg-current transition-opacity duration-300 ${mobileMenuOpen ? 'opacity-0' : ''}`} />
                            <span className={`w-full h-0.5 bg-current transform transition-all duration-300 ${mobileMenuOpen ? '-rotate-45 -translate-y-2.5' : ''}`} />
                        </div>
                    </button>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="fixed inset-0 bg-white dark:bg-black z-40 flex flex-col items-center justify-center space-y-8 md:hidden"
                    >
                        {navItems.map((item) => (
                            <Link
                                key={item.path}
                                to={item.path}
                                onClick={() => setMobileMenuOpen(false)}
                                className="text-2xl font-light tracking-tight text-black dark:text-white hover:opacity-50 transition-opacity"
                            >
                                {item.name}
                            </Link>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.header>
    );
};