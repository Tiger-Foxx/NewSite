import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

export const Header: React.FC = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const location = useLocation();
    const previousScrollPosition = useRef(0);
    const [headerVisible, setHeaderVisible] = useState(true);

    // 1. Fermer le menu au changement de route
    useEffect(() => {
        setMobileMenuOpen(false);
    }, [location.pathname]);

    // 2. Empêcher le scroll du body quand le menu mobile est ouvert (C'est la clé !)
    useEffect(() => {
        if (mobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [mobileMenuOpen]);

    // 3. Gestion du scroll pour cacher/montrer le header
    useEffect(() => {
        const handleScroll = () => {
            const currentScrollPos = window.scrollY;
            const isScrollingDown = currentScrollPos > previousScrollPosition.current;

            // On ne cache le header que si on scrolle vers le bas ET que le menu n'est pas ouvert
            if (currentScrollPos > 50 && !mobileMenuOpen) {
                setHeaderVisible(!isScrollingDown);
            } else if (!mobileMenuOpen) {
                // Si on est tout en haut
                setHeaderVisible(true);
            }

            setIsScrolled(currentScrollPos > 20);
            previousScrollPosition.current = currentScrollPos;
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [mobileMenuOpen]); // Ajout de mobileMenuOpen aux dépendances

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

    // Variantes d'animation pour le menu mobile (Effet cascade)
    const menuVariants = {
        closed: {
            opacity: 0,
            y: "-100%",
            transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] }
        },
        open: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
        }
    };

    const linkVariants = {
        closed: { y: 30, opacity: 0 },
        open: { y: 0, opacity: 1 }
    };

    // Détermine si le header doit avoir un fond solide (soit scrolé, soit menu ouvert)
    const shouldHaveBackground = isScrolled || mobileMenuOpen;

    return (
        <>
            <motion.header
                // On force y:0 si le menu est ouvert pour éviter qu'il remonte
                animate={{ y: (headerVisible || mobileMenuOpen) ? 0 : -100 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${shouldHaveBackground
                    ? 'bg-white/90 dark:bg-black/90 backdrop-blur-lg border-b border-gray-200/50 dark:border-gray-800/50 shadow-sm'
                    : 'bg-transparent'
                    }`}
            >
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="flex justify-between items-center h-20">
                        {/* --- TON LOGO REMIS ICI --- */}
                        <Link to="/" className="relative z-50 flex items-center">
                            <img
                                src="/logo-fox-light.png"
                                alt="Fox Logo"
                                className="h-8 md:h-10 w-auto object-contain"
                            />
                        </Link>
                        {/* -------------------------- */}

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
                                        <motion.div
                                            layoutId="underline"
                                            className="absolute -bottom-1 left-0 w-full h-0.5 bg-white rounded-full"
                                        />
                                    )}
                                </Link>
                            ))}
                        </nav>

                        {/* Mobile Menu Button (Burger Modernisé) */}
                        <button
                            className="md:hidden relative z-50 p-2 -mr-2 text-black dark:text-white focus:outline-none"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            aria-label="Toggle menu"
                        >
                            <div className="w-6 flex flex-col items-end gap-1.5">
                                <motion.span
                                    animate={mobileMenuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                                    className="w-6 h-0.5 bg-current block origin-center transition-transform"
                                />
                                <motion.span
                                    animate={mobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                                    className="w-4 h-0.5 bg-current block transition-opacity"
                                />
                                <motion.span
                                    animate={mobileMenuOpen ? { rotate: -45, y: -8, width: 24 } : { rotate: 0, y: 0, width: 16 }}
                                    className="h-0.5 bg-current block origin-center transition-all"
                                />
                            </div>
                        </button>
                    </div>
                </div>
            </motion.header>

            {/* Mobile Menu Overlay - Full Screen */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial="closed"
                        animate="open"
                        exit="closed"
                        variants={menuVariants}
                        className="fixed inset-0 bg-white dark:bg-black z-40 flex flex-col items-center justify-center md:hidden"
                    >
                        {/* Background décoratif optionnel */}
                        <div className="absolute inset-0 bg-gradient-to-b from-blue-50/50 to-transparent dark:from-blue-900/10 pointer-events-none" />

                        <motion.nav className="flex flex-col items-center space-y-8 relative z-10">
                            {navItems.map((item, i) => (
                                <motion.div
                                    key={item.path}
                                    variants={linkVariants}
                                    transition={{ delay: i * 0.1 }}
                                >
                                    <Link
                                        to={item.path}
                                        onClick={() => setMobileMenuOpen(false)}
                                        className={`text-4xl font-medium tracking-tight transition-colors ${isActive(item.path)
                                            ? 'text-white dark:text-white underline'
                                            : 'text-black dark:text-white hover:text-gray-500'
                                            }`}
                                    >
                                        {item.name}
                                    </Link>
                                </motion.div>
                            ))}
                        </motion.nav>

                        {/* Footer du menu mobile (optionnel) */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="absolute bottom-10 text-sm text-gray-400"
                        >
                            © 2024 Fox Agency
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};