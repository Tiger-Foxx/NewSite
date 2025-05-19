import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';

export const Header: React.FC = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const location = useLocation();
    const previousScrollPosition = useRef(0);
    const [headerVisible, setHeaderVisible] = useState(true);
    const headerRef = useRef<HTMLDivElement>(null);

    // Fermer le menu mobile lors des changements de route
    useEffect(() => {
        setMobileMenuOpen(false);
    }, [location.pathname]);

    // Détection de scroll avancée avec effet de masquage/affichage
    useEffect(() => {
        const handleScroll = () => {
            const currentScrollPos = window.scrollY;
            // Vérifier si on scrolle vers le haut ou vers le bas
            const isScrollingDown = currentScrollPos > previousScrollPosition.current;

            // Masquer/afficher le header en fonction de la direction du scroll, mais seulement après un certain seuil
            if (currentScrollPos > 100) {
                if (isScrollingDown) {
                    setHeaderVisible(false);
                } else {
                    setHeaderVisible(true);
                }
            } else {
                setHeaderVisible(true);
            }

            // Mettre à jour l'état de scroll pour l'effet visuel
            setIsScrolled(currentScrollPos > 20);

            // Sauvegarder la position pour la prochaine comparaison
            previousScrollPosition.current = currentScrollPos;
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Navigation items avec des icônes modernes
    const navItems = [
        {
            name: 'Accueil',
            path: '/',
            icon: (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
            )
        },
        {
            name: 'Projets',
            path: '/projects',
            icon: (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                </svg>
            )
        },
        {
            name: 'À propos',
            path: '/about',
            icon: (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
            )
        },
        {
            name: 'Blog',
            path: '/blog',
            icon: (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
            )
        },
        {
            name: 'Contact',
            path: '/contact',
            icon: (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
            )
        }
    ];

    // Vérifier si un lien est actif
    const isActive = (path: string) => {
        if (path === '/' && location.pathname !== '/') return false;
        return location.pathname === path || location.pathname.startsWith(`${path}/`);
    };

    return (
        <header
            ref={headerRef}
            className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
                isScrolled
                    ? 'bg-white/95 dark:bg-black/95 backdrop-blur-lg shadow-sm border-b border-gray-200/70 dark:border-gray-800/70'
                    : 'bg-transparent'
            } ${
                headerVisible ? 'translate-y-0' : '-translate-y-full'
            }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16 md:h-20">
                    {/* Logo avec animation subtile */}
                    <Link
                        to="/"
                        className="flex items-center group transition-all duration-300"
                        aria-label="Accueil"
                    >
                        <div className="relative overflow-hidden h-8 md:h-10 w-auto transition-all duration-300">
                            <img
                                src="/logo-fox-light.png"
                                alt="Fox Logo"
                                className={`h-full w-auto object-contain transition-opacity duration-300 ${
                                    isScrolled && !location.pathname.includes('/dark-theme') ? 'opacity-100' : 'opacity-90'
                                }`}
                            />
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000 animate-pulse-slow" />
                        </div>
                        <div className="ml-3 flex flex-col transition-all duration-300">
              <span className={`font-semibold text-black dark:text-white tracking-tight hidden sm:block  ${
                  isScrolled ? 'text-lg md:text-xl' : 'text-xl md:text-2xl'
              }`}>
                FOX
              </span>
                            <span className={`text-gray-600 dark:text-gray-400 text-xs hidden sm:block transition-all duration-300 ${
                                isScrolled ? 'opacity-100' : 'opacity-90'
                            }`}>
                Service d'ingénierie
              </span>
                        </div>
                    </Link>

                    {/* Navigation desktop avec animations subtiles */}
                    <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
                        {navItems.map((item) => (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`relative px-3 py-2 text-sm font-medium rounded-full transition-all duration-300 flex items-center ${
                                    isActive(item.path)
                                        ? 'text-black dark:text-white'
                                        : 'text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white hover:bg-gray-100/50 dark:hover:bg-gray-800/50'
                                }`}
                            >
                <span className={`mr-1.5 transition-colors duration-300 ${
                    isActive(item.path) ? 'text-black dark:text-white' : 'text-gray-500 dark:text-gray-400'
                }`}>
                  {item.icon}
                </span>
                                <span>{item.name}</span>
                                {isActive(item.path) && (
                                    <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-black dark:bg-white rounded-full" />
                                )}
                            </Link>
                        ))}

                        {/* Bouton CTA flottant */}
                        <Link
                            to="/contact"
                            className="ml-4 bg-black dark:bg-white text-white dark:text-black px-5 py-2 text-sm font-medium rounded-full hover:shadow-md hover:shadow-black/5 dark:hover:shadow-white/5 hover:-translate-y-0.5 transition-all active:translate-y-0 duration-300"
                        >
              <span className="flex items-center">
                <span>Collaborons</span>
                <svg className="ml-1.5 w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </span>
                        </Link>
                    </nav>

                    {/* Bouton de menu mobile amélioré */}
                    <button
                        type="button"
                        className="md:hidden flex items-center justify-center w-10 h-10 text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white hover:bg-gray-100/50 dark:hover:bg-gray-800/50 rounded-full transition-colors"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        aria-expanded={mobileMenuOpen}
                        aria-label={mobileMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
                    >
            <span className="sr-only">
              {mobileMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
            </span>
                        <div className="relative w-5 h-5">
              <span
                  className={`absolute top-0 left-0 w-5 h-0.5 bg-current transform transition-all duration-300 ease-in-out ${
                      mobileMenuOpen ? 'rotate-45 translate-y-2' : ''
                  }`}
              />
                            <span
                                className={`absolute top-2 left-0 w-5 h-0.5 bg-current transform transition-all duration-200 ease-in-out ${
                                    mobileMenuOpen ? 'opacity-0 translate-x-2' : ''
                                }`}
                            />
                            <span
                                className={`absolute top-4 left-0 w-5 h-0.5 bg-current transform transition-all duration-300 ease-in-out ${
                                    mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''
                                }`}
                            />
                        </div>
                    </button>
                </div>
            </div>

            {/* Menu mobile avec animation fluide */}
            <div
                className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
                    mobileMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
                }`}
                aria-hidden={!mobileMenuOpen}
            >
                <div className="px-2 pt-3 pb-6 space-y-1 bg-white/98 dark:bg-black/98 backdrop-blur-lg border-b border-gray-200/70 dark:border-gray-800/70">
                    {navItems.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`flex items-center px-4 py-3.5 rounded-xl text-base font-medium transition-all duration-200 ${
                                isActive(item.path)
                                    ? 'text-black dark:text-white bg-gray-100 dark:bg-gray-900/70'
                                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100/70 dark:hover:bg-gray-900/50 hover:text-black dark:hover:text-white'
                            }`}
                            onClick={() => setMobileMenuOpen(false)}
                        >
              <span className={`mr-3 ${isActive(item.path) ? 'text-black dark:text-white' : 'text-gray-500 dark:text-gray-400'}`}>
                {item.icon}
              </span>
                            {item.name}
                        </Link>
                    ))}

                    {/* Bouton CTA mobile */}
                    <div className="pt-3 px-2">
                        <Link
                            to="/contact"
                            className="flex items-center justify-center w-full bg-black dark:bg-white text-white dark:text-black px-4 py-3.5 text-base font-medium rounded-xl hover:bg-gray-900 dark:hover:bg-gray-100 transition-colors shadow-sm"
                            onClick={() => setMobileMenuOpen(false)}
                        >
              <span className="flex items-center">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                Discutons de votre projet
              </span>
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    );
};