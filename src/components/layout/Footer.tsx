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
        <footer className="bg-[#020202] text-white pt-32 pb-12 relative z-20 border-t border-white/5">
            <div className="container mx-auto px-8 lg:px-16">
                
                {/* Top Section - Brand & Newsletter */}
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-16 mb-32">
                    <div className="w-full lg:w-1/2">
                        <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-8 leading-tight">
                            Fox<br/>Engineering
                        </h2>
                        <p className="text-gray-400 font-light text-lg max-w-sm mb-12">
                            L'avant-garde de l'ingénierie logicielle. Nous sculptons l'avenir numérique avec une précision implacable.
                        </p>
                        
                        <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4 max-w-md w-full relative">
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Votre email pour la newsletter..."
                                className="flex-1 bg-transparent border-b border-white/20 px-0 py-4 text-white placeholder-gray-600 focus:border-white focus:outline-none focus:ring-0 transition-colors font-mono text-sm uppercase tracking-wider"
                                disabled={subscriptionStatus === 'loading'}
                            />
                            <button
                                type="submit"
                                disabled={subscriptionStatus === 'loading'}
                                className="group flex items-center gap-2 text-sm font-bold uppercase tracking-[0.2em] hover:text-gray-300 transition-colors sm:absolute sm:right-0 sm:top-4"
                            >
                                {subscriptionStatus === 'loading' ? 'Patientez...' : 'Souscrire'}
                                {!subscriptionStatus && (
                                    <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                )}
                            </button>
                            {statusMessage && (
                                <p className={`absolute -bottom-8 left-0 text-xs font-mono uppercase tracking-widest ${subscriptionStatus === 'error' ? 'text-red-500' : 'text-green-500'}`}>
                                    {statusMessage}
                                </p>
                            )}
                        </form>
                    </div>

                    {/* Navigation Grid */}
                    <div className="w-full lg:w-1/2 grid grid-cols-2 md:grid-cols-3 gap-12 font-mono text-sm uppercase tracking-widest">
                        <div>
                            <span className="text-gray-600 block mb-8 font-bold">Index</span>
                            <ul className="space-y-4">
                                {['Accueil', 'Projets', 'Services', 'Blog'].map((item) => (
                                    <li key={item}>
                                        <Link
                                            to={item === 'Accueil' ? '/' : `/${item.toLowerCase()}`}
                                            className="text-gray-300 hover:text-white transition-colors relative group inline-block"
                                        >
                                            {item}
                                            <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full" />
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div>
                            <span className="text-gray-600 block mb-8 font-bold">Laboratoire</span>
                            <ul className="space-y-4">
                                {['Mood-Music', 'NAN-CV', 'YT-Learn', 'QualityShoot'].map((item) => (
                                    <li key={item}>
                                        <a href="#" className="text-gray-300 hover:text-white transition-colors relative group inline-block">
                                            {item}
                                            <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full" />
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div>
                            <span className="text-gray-600 block mb-8 font-bold">Réseau</span>
                            <ul className="space-y-4">
                                {['Instagram', 'GitHub', 'LinkedIn', 'YouTube'].map((item) => (
                                    <li key={item}>
                                        <a href="#" className="text-gray-300 hover:text-white transition-colors relative group inline-block">
                                            {item}
                                            <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full" />
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6 font-mono text-xs uppercase tracking-widest text-gray-600">
                    <p>
                        &copy; {currentYear} Fox Engineering. Tous Droits Réservés.
                    </p>
                    <div className="flex gap-8">
                        <Link to="/legal" className="hover:text-white transition-colors">Mentions Légales</Link>
                        <Link to="/privacy" className="hover:text-white transition-colors">Confidentialité</Link>
                    </div>
                </div>
                
                {/* Absolutely gigantic background text (Watermark effect) */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full overflow-hidden pointer-events-none flex justify-center opacity-[0.02]">
                    <span className="text-[20vw] font-black uppercase tracking-tighter whitespace-nowrap">
                        FOX ENG
                    </span>
                </div>
            </div>
        </footer>
    );
};