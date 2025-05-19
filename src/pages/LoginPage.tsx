import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import {AuthContext} from "@/context/AuthContext.tsx";
import {updateMetaTags} from "@/utils/seo.ts";


export const LoginPage: React.FC = () => {
    const { isAuthenticated, login, loading } = useContext(AuthContext);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();
    const location = useLocation();

    // Redirection si déjà authentifié
    useEffect(() => {
        if (isAuthenticated) {
            // Rediriger vers la page précédente ou l'accueil
            const from = (location.state as any)?.from?.pathname || '/';
            navigate(from, { replace: true });
        }
    }, [isAuthenticated, navigate, location]);

    // Mettre à jour les meta tags
    useEffect(() => {
        updateMetaTags({
            title: 'Connexion',
            description: 'Connexion à votre espace administrateur Fox.',
            type: 'website'
        });
    }, []);

    // Gérer la soumission du formulaire
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!username || !password) {
            setError('Veuillez remplir tous les champs');
            return;
        }

        try {
            await login(username, password);
            // La redirection sera gérée par l'effet ci-dessus
        } catch (err) {
            setError('Identifiants incorrects. Veuillez réessayer.');
        }
    };

    // Animation de la page
    const pageVariants = {
        initial: { opacity: 0, y: 20 },
        animate: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5 }
        },
        exit: {
            opacity: 0,
            transition: { duration: 0.3 }
        }
    };

    // Animation des éléments du formulaire
    const formVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.3
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5
            }
        }
    };

    return (
        <motion.div
            className="min-h-screen flex items-center justify-center px-4 py-24"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
        >
            <div className="fox-noise absolute inset-0"></div>
            <div className="fox-gradient-bg absolute inset-0"></div>

            <motion.div
                className="w-full max-w-md bg-fox-dark rounded-xl shadow-2xl border border-fox-light/10 p-8 relative z-10"
                variants={formVariants}
                initial="hidden"
                animate="visible"
            >
                <motion.div
                    className="text-center mb-8"
                    variants={itemVariants}
                >
                    <h1 className="text-3xl font-bold gradient-text mb-2">Administration Fox</h1>
                    <p className="text-gray-400">Connectez-vous pour accéder à l'interface d'administration</p>
                </motion.div>

                {error && (
                    <motion.div
                        className="mb-6 p-4 bg-red-900/20 border border-red-700/30 rounded-lg text-red-400"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                    >
                        {error}
                    </motion.div>
                )}

                <form onSubmit={handleSubmit}>
                    <motion.div
                        className="mb-6"
                        variants={itemVariants}
                    >
                        <label htmlFor="username" className="block text-gray-300 mb-2">
                            Nom d'utilisateur
                        </label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full px-4 py-3 bg-fox-light/10 border border-fox-light/20 rounded-md text-white placeholder-gray-500 focus:outline-none focus:border-primary"
                            placeholder="Votre nom d'utilisateur"
                            disabled={loading}
                            required
                        />
                    </motion.div>

                    <motion.div
                        className="mb-8"
                        variants={itemVariants}
                    >
                        <label htmlFor="password" className="block text-gray-300 mb-2">
                            Mot de passe
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-3 bg-fox-light/10 border border-fox-light/20 rounded-md text-white placeholder-gray-500 focus:outline-none focus:border-primary"
                            placeholder="Votre mot de passe"
                            disabled={loading}
                            required
                        />
                    </motion.div>

                    <motion.div
                        variants={itemVariants}
                    >
                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full px-6 py-3 bg-primary hover:bg-primary-light text-white font-medium rounded-md transition-colors ${
                                loading ? 'opacity-70 cursor-not-allowed' : ''
                            }`}
                        >
                            {loading ? (
                                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Connexion...
                </span>
                            ) : (
                                'Se connecter'
                            )}
                        </button>
                    </motion.div>
                </form>

                <motion.div
                    className="mt-6 text-center text-sm text-gray-500"
                    variants={itemVariants}
                >
                    Accès réservé à l'administrateur du site
                </motion.div>
            </motion.div>
        </motion.div>
    );
};