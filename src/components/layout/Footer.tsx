import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import newsletterService from '../../services/newsletter.service';
import { SubscribePayload } from '../../types';

export const Footer: React.FC = () => {
    const [email, setEmail] = useState('');
    const [subscriptionStatus, setSubscriptionStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [statusMessage, setStatusMessage] = useState('');

    const currentYear = new Date().getFullYear();

    const handleSubscribe = async (e: React.FormEvent) => {
        e.preventDefault();
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
            setEmail('');
            setTimeout(() => {
                setSubscriptionStatus('idle');
                setStatusMessage('');
            }, 5000);
        } catch (error) {
            console.error('Erreur lors de l\'abonnement:', error);
            setSubscriptionStatus('error');
            setStatusMessage('Une erreur est survenue. Veuillez réessayer.');
            setTimeout(() => {
                setSubscriptionStatus('idle');
                setStatusMessage('');
            }, 5000);
        }
    };

    return (
        <footer className="bg-white dark:bg-black border-t border-gray-200 dark:border-gray-900 pt-24 pb-12">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-24">
                    {/* Brand & Newsletter */}
                    <div className="md:col-span-5 space-y-8">
                        <Link to="/" className="block">
                            <img
                                src="/logo-fox-light.png"
                                alt="Fox Logo"
                                className="h-10 w-auto"
                            />
                        </Link>
                        <p className="text-gray-600 dark:text-gray-400 max-w-sm text-lg leading-relaxed">
                            Ingénierie logicielle et services numériques pour les entreprises et startups innovantes.
                        </p>

                        <div className="pt-4">
                            <h3 className="text-sm font-semibold text-black dark:text-white mb-4">
                                Restez informé
                            </h3>
                            <form onSubmit={handleSubscribe} className="flex gap-2 max-w-sm">
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Votre email"
                                    className="flex-1 bg-gray-50 dark:bg-gray-900 border-0 rounded-lg px-4 py-3 text-black dark:text-white placeholder-gray-500 focus:ring-2 focus:ring-black dark:focus:ring-white transition-all"
                                    disabled={subscriptionStatus === 'loading'}
                                />
                                <button
                                    type="submit"
                                    disabled={subscriptionStatus === 'loading'}
                                    className="bg-black dark:bg-white text-white dark:text-black px-6 py-3 rounded-lg font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
                                >
                                    {subscriptionStatus === 'loading' ? '...' : 'OK'}
                                </button>
                            </form>
                            {statusMessage && (
                                <p className={`mt-2 text-sm ${subscriptionStatus === 'error' ? 'text-red-500' : 'text-green-500'}`}>
                                    {statusMessage}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Navigation Links */}
                    <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">
                        <div>
                            <h3 className="font-semibold text-black dark:text-white mb-6">Navigation</h3>
                            <ul className="space-y-4">
                                {['Accueil', 'Projets', 'À propos', 'Blog', 'Contact'].map((item) => (
                                    <li key={item}>
                                        <Link
                                            to={item === 'Accueil' ? '/' : `/${item.toLowerCase().replace('à ', '').replace(' ', '-')}`}
                                            className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors"
                                        >
                                            {item}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div>
                            <h3 className="font-semibold text-black dark:text-white mb-6">Outils</h3>
                            <ul className="space-y-4">
                                <li><a href="https://mood-music-fox.vercel.app/" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors">Mood-Music</a></li>
                                <li><a href="https://nan-cv.vercel.app" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors">NAN-CV</a></li>
                                <li><a href="https://yt-learn.the-fox.tech/" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors">YT-Learn</a></li>
                                <li><a href="https://foxy-blue-light.the-fox.tech" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors">FoxyBlueLight</a></li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="font-semibold text-black dark:text-white mb-6">Social</h3>
                            <ul className="space-y-4">
                                <li><a href="https://www.instagram.com/i_am_the_fox_coder/" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors">Instagram</a></li>
                                <li><a href="https://github.com/Tiger-Foxx/" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors">GitHub</a></li>
                                <li><a href="https://www.linkedin.com/in/arthur-pascal-montgomery-donfack-48b4a2311/" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors">LinkedIn</a></li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="pt-8 border-t border-gray-100 dark:border-gray-900 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-sm text-gray-500 dark:text-gray-500">
                        &copy; {currentYear} Fox Engineering. Tous droits réservés.
                    </p>
                    <div className="flex gap-6 text-sm text-gray-500 dark:text-gray-500">
                        <Link to="/privacy" className="hover:text-black dark:hover:text-white transition-colors">Confidentialité</Link>
                        <Link to="/terms" className="hover:text-black dark:hover:text-white transition-colors">Conditions</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};