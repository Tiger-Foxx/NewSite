import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

export const HeaderDesktop: React.FC = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navItems = [
        { name: 'Accueil', path: '/' },
        { name: 'Projets', path: '/projects' },
        { name: 'À propos', path: '/about' },
        { name: 'Blog', path: '/blog' }
    ];

    const isActive = (path: string) => {
        if (path === '/' && location.pathname !== '/') return false;
        return location.pathname === path || location.pathname.startsWith(`${path}/`);
    };

    return (
        <motion.header
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className={`fixed top-0 left-0 w-full z-50 transition-all duration-700 flex justify-center py-6 ${
                isScrolled ? 'py-3' : ''
            }`}
        >
            {/* 
                An ultra-premium floating glassmorphism pill navigation bar. 
                Shrinks dynamically and becomes more discreet upon scroll.
            */}
            <div 
                className={`flex items-center justify-between transition-all duration-700 overflow-hidden relative ${
                    isScrolled 
                        ? 'px-4 py-2 w-10/12 max-w-3xl bg-white/80 dark:bg-black/80 backdrop-blur-xl border border-black/5 dark:border-white/5 shadow-2xl rounded-full' 
                        : 'px-8 py-4 w-11/12 max-w-6xl bg-transparent border border-transparent rounded-full'
                }`}
            >
                {/* Logo Section */}
                <Link to="/" className="relative z-10 flex items-center gap-4 group">
                    <img
                        src="/logo-fox-light.png"
                        alt="Fox Logo"
                        className={`w-auto object-contain transform group-hover:scale-105 transition-all duration-500 ${isScrolled ? 'h-6' : 'h-8 md:h-10'}`}
                    />
                    <span className={`font-black uppercase tracking-widest text-black dark:text-white hidden lg:block opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all duration-500 ${isScrolled ? 'text-xs' : 'text-sm'}`}>
                        Fox Eng.
                    </span>
                </Link>

                {/* Main Navigation Links */}
                <nav className="hidden md:flex flex-1 justify-center items-center space-x-1 relative z-10">
                    {navItems.map((item) => {
                        const active = isActive(item.path);
                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`relative px-5 py-2 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] transition-all duration-500 group ${
                                    active 
                                        ? 'text-white dark:text-black' // Fix: active text color is now black in dark mode
                                        : 'text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white'
                                }`}
                            >
                                <span className="relative z-10">{item.name}</span>
                                {active && (
                                    <motion.div
                                        layoutId="desktop-nav-pill"
                                        className="absolute inset-0 bg-black dark:bg-white rounded-full z-0"
                                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                    />
                                )}
                                {!active && (
                                    <div className="absolute left-1/2 bottom-0 w-1 h-1 rounded-full bg-black dark:bg-white opacity-0 group-hover:opacity-50 -translate-x-1/2 transition-all duration-300" />
                                )}
                            </Link>
                        );
                    })}
                </nav>

                {/* Call to action button on the right */}
                <div className="flex items-center justify-end relative z-10">
                    <Link
                        to="/contact"
                        className={`group relative flex items-center justify-center font-bold uppercase tracking-[0.2em] overflow-hidden transition-all duration-500 rounded-full border border-black dark:border-white ${
                            isScrolled
                                ? 'px-5 py-2 text-[10px] bg-transparent text-black dark:text-white hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black'
                                : 'px-8 py-3 text-xs bg-black dark:bg-white text-white dark:text-black hover:bg-transparent hover:text-black dark:hover:text-white'
                        }`}
                    >
                        <span className="relative z-10 flex items-center gap-2">
                            {isScrolled ? 'Lancer' : 'Lancer Un Projet'}
                            <svg className={`transform transition-transform duration-300 ${isScrolled ? 'w-3 h-3 group-hover:translate-x-1' : 'w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth="2.5" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </span>
                    </Link>
                </div>
                
            </div>
        </motion.header>
    );
};
