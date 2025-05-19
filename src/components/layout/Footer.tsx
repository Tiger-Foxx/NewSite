import React from 'react';
import { Link } from 'react-router-dom';

const footerNavLinks = [
    { name: 'Accueil', path: '/' },
    { name: 'Projets', path: '/projects' },
    { name: 'Services', path: '/#services' }, // Lien vers la section services sur la homepage
    { name: 'Blog', path: '/blog' },
    { name: 'À propos', path: '/about' },
    { name: 'Contact', path: '/contact' },
];

const legalLinks = [
    { name: 'Politique de Confidentialité', path: '/privacy' }, // Crée ces pages si elles n'existent pas
    { name: 'Conditions d\'Utilisation', path: '/terms' },
    // { name: 'Plan du site', path: '/sitemap' },
];

// SVG Icons for social media (minimalist style)
const SocialIcon: React.FC<{ href: string; title: string; children: React.ReactNode }> = ({ href, title, children }) => (
    <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        title={title}
        className="text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors duration-200"
    >
        <span className="sr-only">{title}</span>
        {children}
    </a>
);

const GitHubIcon = () => (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
    </svg>
);

const LinkedInIcon = () => (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
    </svg>
);

const TwitterIcon = () => (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
    </svg>
);


export const Footer: React.FC = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-gray-50 dark:bg-gray-900/70 border-t border-gray-200 dark:border-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                    {/* Logo and description */}
                    <div className="md:col-span-4 lg:col-span-5">
                        <Link to="/" className="flex items-center mb-4 group">
                            <img
                                src="/logo-fox-light.png" // Assure-toi que ce chemin est correct
                                alt="Fox Logo"
                                className="h-9 w-auto transition-transform duration-300 group-hover:scale-105"
                            />
                            <span className="ml-2.5 text-xl font-semibold text-black dark:text-white tracking-tight">
                FOX Engineering
              </span>
                        </Link>
                        <p className="text-sm text-gray-600 dark:text-gray-400 max-w-xs">
                            Conception et développement de solutions logicielles innovantes, sécurisées et sur mesure pour un avenir digital performant.
                        </p>
                        <div className="mt-6 flex space-x-5">
                            <SocialIcon href="https://github.com/theTigerFox" title="GitHub">
                                <GitHubIcon />
                            </SocialIcon>
                            <SocialIcon href="https://linkedin.com/in/yourprofile" title="LinkedIn">
                                <LinkedInIcon />
                            </SocialIcon>
                            <SocialIcon href="https://twitter.com/yourprofile" title="Twitter">
                                <TwitterIcon />
                            </SocialIcon>
                        </div>
                    </div>

                    {/* Navigation Links */}
                    <div className="md:col-span-8 lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">
                        <div>
                            <h3 className="text-sm font-semibold uppercase tracking-wider text-black dark:text-white mb-4">
                                Navigation
                            </h3>
                            <ul className="space-y-3">
                                {footerNavLinks.map((item) => (
                                    <li key={item.name}>
                                        <Link
                                            to={item.path}
                                            className="text-sm text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white hover:underline transition-colors"
                                        >
                                            {item.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div>
                            <h3 className="text-sm font-semibold uppercase tracking-wider text-black dark:text-white mb-4">
                                Contact
                            </h3>
                            <ul className="space-y-3 text-sm">
                                <li>
                                    <a href="mailto:contact@fox-dev.com" className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white hover:underline transition-colors">
                                        contact@fox-dev.com
                                    </a>
                                </li>
                                <li className="text-gray-600 dark:text-gray-400">
                                    Paris, France
                                </li>
                                {/* Ajoutez d'autres infos si besoin, ex: téléphone */}
                            </ul>
                        </div>

                        <div>
                            <h3 className="text-sm font-semibold uppercase tracking-wider text-black dark:text-white mb-4">
                                Légal
                            </h3>
                            <ul className="space-y-3">
                                {legalLinks.map((item) => (
                                    <li key={item.name}>
                                        <Link
                                            to={item.path}
                                            className="text-sm text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white hover:underline transition-colors"
                                        >
                                            {item.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700 text-center">
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                        © {currentYear} Fox Engineering. Tous droits réservés. Développé avec passion.
                    </p>
                </div>
            </div>
        </footer>
    );
};