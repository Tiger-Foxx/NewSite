import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import newsletterService from '../../services/newsletter.service';
import { SubscribePayload } from '../../types';

export const Footer: React.FC = () => {
    // État pour le formulaire de newsletter
    const [email, setEmail] = useState('');
    const [subscriptionStatus, setSubscriptionStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [statusMessage, setStatusMessage] = useState('');

    // Année courante pour le copyright
    const currentYear = new Date().getFullYear();

    // Gérer la soumission du formulaire d'abonnement
    const handleSubscribe = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validation simple
        if (!email || !email.includes('@')) {
            setSubscriptionStatus('error');
            setStatusMessage('Veuillez saisir une adresse email valide');
            return;
        }

        setSubscriptionStatus('loading');

        try {
            const payload: SubscribePayload = { email };
            const response = await newsletterService.subscribe(payload);

            setSubscriptionStatus('success');
            setStatusMessage(response.message || 'Inscription réussie !');
            setEmail(''); // Réinitialiser le champ

            // Réinitialiser l'état après 5 secondes
            setTimeout(() => {
                setSubscriptionStatus('idle');
                setStatusMessage('');
            }, 5000);
        } catch (error) {
            console.error('Erreur lors de l\'abonnement:', error);
            setSubscriptionStatus('error');
            setStatusMessage('Une erreur est survenue. Veuillez réessayer.');

            // Réinitialiser l'état d'erreur après 5 secondes
            setTimeout(() => {
                setSubscriptionStatus('idle');
                setStatusMessage('');
            }, 5000);
        }
    };

    return (
        <footer className="bg-white dark:bg-black border-t border-gray-200 dark:border-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section principale du footer */}
                <div className="py-12 md:py-16 grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-8">
                    {/* Informations de l'entreprise */}
                    <div className="md:col-span-2 space-y-6">
                        <Link to="/" className="flex items-center" aria-label="Page d'accueil">
                            <img
                                src="/logo-fox-light.png"
                                alt="Fox Logo"
                                className="h-10 w-auto"
                            />
                        </Link>
                        <p className="text-gray-600 dark:text-gray-400 max-w-md">
                            Ingénierie logicielle et services numériques pour les entreprises et startups innovantes. Développement, sécurité, et accompagnement technique sur mesure.
                        </p>

                        {/* Réseaux sociaux */}
                        <div className="flex space-x-5">
                            <a
                                href="https://www.instagram.com/i_am_the_fox_coder/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors duration-200"
                                aria-label="Twitter"
                            >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                                </svg>
                            </a>
                            <a
                                href="https://github.com/Tiger-Foxx/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors duration-200"
                                aria-label="GitHub"
                            >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                                </svg>
                            </a>
                            <a
                                href="https://www.linkedin.com/in/arthur-pascal-montgomery-donfack-48b4a2311/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors duration-200"
                                aria-label="LinkedIn"
                            >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                                </svg>
                            </a>
                        </div>

                        {/* Newsletter avec gestion d'état */}
                        <div className="pt-4">
                            <h3 className="text-sm font-semibold uppercase tracking-wider text-black dark:text-white mb-3">
                                Newsletter
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                                Restez informé des dernières actualités et articles.
                            </p>
                            {subscriptionStatus === 'success' ? (
                                <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-3 text-sm text-green-800 dark:text-green-300">
                                    {statusMessage}
                                </div>
                            ) : subscriptionStatus === 'error' ? (
                                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3 text-sm text-red-800 dark:text-red-300">
                                    {statusMessage}
                                </div>
                            ) : (
                                <form onSubmit={handleSubscribe} className="flex sm:max-w-md">
                                    <label htmlFor="email-address" className="sr-only">Adresse email</label>
                                    <input
                                        id="email-address"
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full min-w-0 px-4 py-2 text-base text-gray-900 dark:text-white placeholder-gray-500 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-l-lg focus:outline-none focus:ring-1 focus:ring-black dark:focus:ring-white focus:border-black dark:focus:border-white"
                                        placeholder="Votre email"
                                        disabled={subscriptionStatus === 'loading'}
                                    />
                                    <button
                                        type="submit"
                                        disabled={subscriptionStatus === 'loading'}
                                        className={`flex-shrink-0 px-4 py-2 text-base font-medium text-white bg-black border border-transparent rounded-r-lg dark:bg-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black dark:focus:ring-white ${
                                            subscriptionStatus === 'loading' ? 'opacity-70 cursor-not-allowed' : ''
                                        }`}
                                    >
                                        {subscriptionStatus === 'loading' ? (
                                            <span className="flex items-center">
                                                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white dark:text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                                Envoi...
                                            </span>
                                        ) : (
                                            'S\'abonner'
                                        )}
                                    </button>
                                </form>
                            )}
                        </div>
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold uppercase tracking-wider text-black dark:text-white mb-4">
                            Navigation
                        </h3>
                        <ul className="space-y-3">
                            <li>
                                <Link to="/" className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors">
                                    Accueil
                                </Link>
                            </li>
                            <li>
                                <Link to="/projects" className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors">
                                    Projets
                                </Link>
                            </li>
                            <li>
                                <Link to="/about" className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors">
                                    À propos
                                </Link>
                            </li>
                            <li>
                                <Link to="/blog" className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors">
                                    Blog
                                </Link>
                            </li>
                            <li>
                                <Link to="/contact" className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors">
                                    Contact
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold uppercase tracking-wider text-black dark:text-white mb-4">
                            Nos outils
                        </h3>
                        <ul className="space-y-3">
                            <li>
                                <a href="https://mood-music-fox.vercel.app/" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors">
                                    Mood-Music
                                </a>
                            </li>
                            <li>
                                <a href="https://nan-cv.vercel.app" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors">
                                    NAN-CV
                                </a>
                            </li>
                            <li>
                                <a href="https://yt-learn.the-fox.tech/" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors">
                                    YT-Learn
                                </a>
                            </li>
                            <li>
                                <a href="https://foxy-blue-light.the-fox.tech" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors">
                                    FoxyBlueLight
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold uppercase tracking-wider text-black dark:text-white mb-4">
                            Contact
                        </h3>
                        <ul className="space-y-3">
                            <li className="flex items-center text-gray-600 dark:text-gray-400">
                                <svg className="h-5 w-5 mr-2 text-gray-500 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                                <a href="mailto:donfackarthur750@gmail.com" className="hover:text-black dark:hover:text-white transition-colors">
                                    donfackarthur750@gmail.com
                                </a>
                            </li>
                            <li className="flex items-center text-gray-600 dark:text-gray-400">
                                <svg className="h-5 w-5 mr-2 text-gray-500 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                                <a href="https://wa.me/+237658866639" className="hover:text-black dark:hover:text-white transition-colors">
                                    +237 658 86 66 39
                                </a>
                            </li>
                            <li className="flex items-center text-gray-600 dark:text-gray-400">
                                <svg className="h-5 w-5 mr-2 text-gray-500 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                <span>Yaoundé, Cameroun</span>
                            </li>
                        </ul>

                        {/* Badges de certification/expertise */}
                        <div className="mt-6 flex space-x-3">
                            <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded-md">
                                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/81/Twitter_Verified_Badge_Gold.svg/2048px-Twitter_Verified_Badge_Gold.svg.png" alt="Certification 1" className="h-8 w-8" />
                            </div>
                            <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded-md">
                                <img src="https://cdn.freebiesupply.com/logos/large/2x/ai-logo-black-and-white.png" alt="Certification 2" className="h-8 w-8" />
                            </div>
                            <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded-md">
                                <img src="https://images.credly.com/images/54fb7539-513a-4475-9eeb-9fa629792abc/cybersecurity_badges_blue_600x600.png" alt="Certification 3" className="h-8 w-8" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Section de copyright et liens légaux */}
                <div className="py-6 border-t border-gray-200 dark:border-gray-800 flex flex-col md:flex-row justify-between items-center text-sm">
                    <p className="text-gray-600 dark:text-gray-400 mb-4 md:mb-0">
                        &copy; {currentYear} Fox Engineering. Tous droits réservés.
                    </p>
                    <div className="flex flex-wrap justify-center space-x-6">
                        <Link to="/privacy" className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors mb-2 md:mb-0">
                            Politique de confidentialité
                        </Link>
                        <Link to="/terms" className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors mb-2 md:mb-0">
                            Conditions d'utilisation
                        </Link>
                        <Link to="/mentions-legales" className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors mb-2 md:mb-0">
                            Mentions légales
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};