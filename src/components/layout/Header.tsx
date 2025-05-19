import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

export const Header: React.FC = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const location = useLocation();

    // Fermer le menu mobile lors des changements de route
    useEffect(() => {
        setMobileMenuOpen(false);
    }, [location.pathname]);

    // Détecter le scroll
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Navigation items
    const navItems = [
        { name: 'Accueil', path: '/' },
        { name: 'Projets', path: '/projects' },
        { name: 'À propos', path: '/about' },
        { name: 'Blog', path: '/blog' },
        { name: 'Contact', path: '/contact' }
    ];

    return (
        <header
            className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
                isScrolled
                    ? 'bg-white/90 dark:bg-black/90 backdrop-blur-md shadow-sm border-b border-gray-200 dark:border-gray-800'
                    : 'bg-transparent'
            }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16 md:h-20">
                    {/* Logo */}
                    <Link to="/" className="flex items-center">
                        <img
                            src="/logo-fox-light.png"
                            alt="Fox Logo"
                            className="h-8 md:h-10 w-auto"
                        />
                        <span className="ml-3 text-xl font-semibold text-black dark:text-white">
              FOX
            </span>
                    </Link>

                    {/* Navigation desktop */}
                    <nav className="hidden md:flex items-center space-x-8">
                        {navItems.map((item) => (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`text-sm font-medium transition-colors hover:text-black dark:hover:text-white ${
                                    location.pathname === item.path
                                        ? 'text-black dark:text-white'
                                        : 'text-gray-600 dark:text-gray-400'
                                }`}
                            >
                                {item.name}
                            </Link>
                        ))}

                        <Link
                            to="/contact"
                            className="ml-4 bg-black dark:bg-white text-white dark:text-black px-5 py-2 text-sm font-medium rounded-full hover:bg-gray-900 dark:hover:bg-gray-100 transition-colors"
                        >
                            Collaborons
                        </Link>
                    </nav>

                    {/* Mobile menu button */}
                    <button
                        type="button"
                        className="md:hidden text-gray-600 dark:text-gray-400 p-2 rounded-md"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        <span className="sr-only">Ouvrir le menu</span>
                        <svg
                            className="h-6 w-6"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            aria-hidden="true"
                        >
                            {mobileMenuOpen ? (
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            ) : (
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            )}
                        </svg>
                    </button>
                </div>
            </div>

            {/* Mobile menu, show/hide based on menu state */}
            {mobileMenuOpen && (
                <div className="md:hidden bg-white dark:bg-black border-b border-gray-200 dark:border-gray-800">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        {navItems.map((item) => (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`block px-3 py-2 rounded-md text-base font-medium ${
                                    location.pathname === item.path
                                        ? 'text-black dark:text-white bg-gray-100 dark:bg-gray-900'
                                        : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-900 hover:text-black dark:hover:text-white'
                                }`}
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                {item.name}
                            </Link>
                        ))}
                        <Link
                            to="/contact"
                            className="block mt-4 bg-black dark:bg-white text-white dark:text-black px-3 py-2 text-base font-medium rounded-md hover:bg-gray-900 dark:hover:bg-gray-100"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Collaborons
                        </Link>
                    </div>
                </div>
            )}
        </header>
    );
};