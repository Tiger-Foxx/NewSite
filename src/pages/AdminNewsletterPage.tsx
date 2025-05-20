import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { motion } from 'framer-motion';
import {AuthContext} from "@/context/AuthContext.tsx";
import {apiService} from "@/services";

interface Newsletter {
    id: number;
    title: string;
    subtitle: string;
    main_content: string;
    quote: string;
    conclusion: string;
    image_url: string;
    created_at: string;
    article_url: string;
}

interface Subscriber {
    id: number;
    email: string;
    nom?: string;
    date_inscription: string;
}

export const AdminNewsletterPage: React.FC = () => {
    const { isAuthenticated } = useContext(AuthContext);
    const navigate = useNavigate();

    // États pour gérer les données
    const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
    const [previousNewsletters, setPreviousNewsletters] = useState<Newsletter[]>([]);
    const [subscribersCount, setSubscribersCount] = useState<number>(0);
    const [isLoading, setIsLoading] = useState(false);
    const [success, setSuccess] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    // État pour le formulaire de nouvelle newsletter
    const [newsletter, setNewsletter] = useState<Omit<Newsletter, 'id' | 'created_at'>>({
        title: '',
        subtitle: '',
        main_content: '',
        quote: '',
        conclusion: '',
        image_url: '',
        article_url: ''
    });

    const [testEmail, setTestEmail] = useState('');

    // Redirection si non authentifié
    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login', { state: { from: { pathname: '/admin/newsletter' } } });
        }
    }, [isAuthenticated, navigate]);

    // Charger les données initiales
    useEffect(() => {
        if (isAuthenticated) {
            fetchSubscribers();
            fetchNewsletters();
        }
    }, [isAuthenticated]);

    // Récupérer les abonnés (visiteurs)
    const fetchSubscribers = async () => {
        try {
            const response = await apiService.get('/api/visiteurs/');
            setSubscribers(response.data.results || []);
            setSubscribersCount(response.data.count || 0);
        } catch (err) {
            setError('Erreur lors de la récupération des abonnés');
            console.error('Erreur :', err);
        }
    };

    // Récupérer les newsletters précédentes
    const fetchNewsletters = async () => {
        try {
            const response = await apiService.get('/api/newsletters/');
            setPreviousNewsletters(response.data.results || []);
        } catch (err) {
            setError('Erreur lors de la récupération des newsletters');
            console.error('Erreur :', err);
        }
    };

    // Gérer le changement des valeurs du formulaire
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setNewsletter(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Envoyer un email de test
    const handleSendTest = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!testEmail) {
            setError('Veuillez saisir une adresse email pour le test');
            return;
        }

        if (!newsletter.title || !newsletter.main_content || !newsletter.conclusion) {
            setError('Veuillez remplir au moins le titre, le contenu principal et la conclusion');
            return;
        }

        setIsLoading(true);
        setError(null);
        setSuccess(null);

        try {
            await apiService.post('/api/send-newsletter/', {
                ...newsletter,
                test_email: testEmail
            });

            setSuccess('Email de test envoyé avec succès !');
        } catch (err) {
            setError('Erreur lors de l\'envoi de l\'email de test');
            console.error('Erreur :', err);
        } finally {
            setIsLoading(false);
        }
    };

    // Envoyer la newsletter à tous les abonnés
    const handleSendNewsletter = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!newsletter.title || !newsletter.main_content || !newsletter.conclusion) {
            setError('Veuillez remplir au moins le titre, le contenu principal et la conclusion');
            return;
        }

        // Confirmer l'envoi
        const confirmer = window.confirm(
            `Êtes-vous sûr de vouloir envoyer cette newsletter à ${subscribersCount} abonnés ?`
        );

        if (!confirmer) return;

        setIsLoading(true);
        setError(null);
        setSuccess(null);

        try {
            // D'abord, créer la newsletter
            const createResponse = await apiService.post('/api/newsletters/', newsletter);

            // Ensuite, envoyer la newsletter
            await apiService.post(`/api/newsletters/${createResponse.data.id}/send/`, {});

            setSuccess('Newsletter créée et envoyée avec succès !');

            // Réinitialiser le formulaire
            setNewsletter({
                title: '',
                subtitle: '',
                main_content: '',
                quote: '',
                conclusion: '',
                image_url: '',
                article_url: ''
            });

            // Rafraîchir la liste des newsletters
            fetchNewsletters();
        } catch (err) {
            setError('Erreur lors de l\'envoi de la newsletter');
            console.error('Erreur :', err);
        } finally {
            setIsLoading(false);
        }
    };

    // Animations
    const pageVariants = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
        exit: { opacity: 0, y: -20, transition: { duration: 0.3 } }
    };

    // Formatter la date
    const formatDate = (dateString: string): string => {
        return new Date(dateString).toLocaleDateString('fr-FR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <motion.div
            className="min-h-screen bg-white dark:bg-black py-16 px-4 sm:px-6 lg:px-8"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
        >
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-3xl font-bold text-black dark:text-white mb-4">
                        Administration des Newsletters
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                        Créez et envoyez des newsletters à vos abonnés. La newsletter sera formatée selon votre modèle enregistré.
                    </p>
                </div>

                {/* Affichage des messages */}
                {error && (
                    <div className="mb-6 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-800 dark:text-red-300 p-4 rounded-lg">
                        {error}
                    </div>
                )}

                {success && (
                    <div className="mb-6 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-800 dark:text-green-300 p-4 rounded-lg">
                        {success}
                    </div>
                )}

                {/* Statistiques */}
                <div className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-gray-50 dark:bg-gray-900/50 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800">
                        <h3 className="text-lg font-semibold text-black dark:text-white mb-2">Abonnés</h3>
                        <p className="text-3xl font-bold text-black dark:text-white">
                            {subscribersCount}
                        </p>
                    </div>

                    <div className="bg-gray-50 dark:bg-gray-900/50 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800">
                        <h3 className="text-lg font-semibold text-black dark:text-white mb-2">Newsletters envoyées</h3>
                        <p className="text-3xl font-bold text-black dark:text-white">
                            {previousNewsletters.length}
                        </p>
                    </div>

                    <div className="bg-gray-50 dark:bg-gray-900/50 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800">
                        <h3 className="text-lg font-semibold text-black dark:text-white mb-2">Dernière newsletter</h3>
                        <p className="text-base text-gray-600 dark:text-gray-400">
                            {previousNewsletters.length > 0
                                ? formatDate(previousNewsletters[0].created_at)
                                : "Aucune newsletter envoyée"}
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Formulaire de newsletter */}
                    <div className="lg:col-span-2">
                        <div className="bg-white dark:bg-black rounded-xl shadow-lg border border-gray-200 dark:border-gray-800 p-6">
                            <form onSubmit={handleSendNewsletter}>
                                <h2 className="text-xl font-bold text-black dark:text-white mb-6">
                                    Créer une nouvelle newsletter
                                </h2>

                                {/* Titre */}
                                <div className="mb-6">
                                    <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Titre <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        id="title"
                                        name="title"
                                        required
                                        value={newsletter.title}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-black text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-transparent"
                                        placeholder="Titre de la newsletter"
                                    />
                                </div>

                                {/* Sous-titre */}
                                <div className="mb-6">
                                    <label htmlFor="subtitle" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Sous-titre
                                    </label>
                                    <input
                                        type="text"
                                        id="subtitle"
                                        name="subtitle"
                                        value={newsletter.subtitle}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-black text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-transparent"
                                        placeholder="Sous-titre de la newsletter (optionnel)"
                                    />
                                </div>

                                {/* URL de l'image */}
                                <div className="mb-6">
                                    <label htmlFor="image_url" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        URL de l'image
                                    </label>
                                    <input
                                        type="url"
                                        id="image_url"
                                        name="image_url"
                                        value={newsletter.image_url}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-black text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-transparent"
                                        placeholder="https://example.com/image.jpg"
                                    />
                                    <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                                        URL d'une image mise en avant dans la newsletter (optionnel)
                                    </p>
                                </div>

                                {/* Contenu principal */}
                                <div className="mb-6">
                                    <label htmlFor="main_content" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Contenu principal <span className="text-red-500">*</span>
                                    </label>
                                    <textarea
                                        id="main_content"
                                        name="main_content"
                                        rows={8}
                                        required
                                        value={newsletter.main_content}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-black text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-transparent resize-none"
                                        placeholder="Contenu principal de la newsletter (HTML supporté)"
                                    ></textarea>
                                    <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                                        Format HTML supporté. Utilisez les balises HTML pour mettre en forme le contenu.
                                    </p>
                                </div>

                                {/* Citation */}
                                <div className="mb-6">
                                    <label htmlFor="quote" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Citation
                                    </label>
                                    <textarea
                                        id="quote"
                                        name="quote"
                                        rows={3}
                                        value={newsletter.quote}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-black text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-transparent resize-none"
                                        placeholder="Citation mise en avant (optionnel)"
                                    ></textarea>
                                </div>

                                {/* Conclusion */}
                                <div className="mb-6">
                                    <label htmlFor="conclusion" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Conclusion <span className="text-red-500">*</span>
                                    </label>
                                    <textarea
                                        id="conclusion"
                                        name="conclusion"
                                        rows={4}
                                        required
                                        value={newsletter.conclusion}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-black text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-transparent resize-none"
                                        placeholder="Conclusion de la newsletter"
                                    ></textarea>
                                </div>

                                {/* URL de l'article */}
                                <div className="mb-6">
                                    <label htmlFor="article_url" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        URL de l'article associé
                                    </label>
                                    <input
                                        type="url"
                                        id="article_url"
                                        name="article_url"
                                        value={newsletter.article_url}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-black text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-transparent"
                                        placeholder="https://example.com/article"
                                    />
                                    <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                                        URL d'un article associé à cette newsletter (optionnel)
                                    </p>
                                </div>

                                {/* Test email */}
                                <div className="mb-6">
                                    <label htmlFor="testEmail" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Email de test
                                    </label>
                                    <div className="flex">
                                        <input
                                            type="email"
                                            id="testEmail"
                                            value={testEmail}
                                            onChange={(e) => setTestEmail(e.target.value)}
                                            className="flex-grow px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-l-lg bg-white dark:bg-black text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-transparent"
                                            placeholder="Entrez un email pour tester"
                                        />
                                        <button
                                            type="button"
                                            onClick={handleSendTest}
                                            disabled={isLoading || !testEmail}
                                            className="flex-shrink-0 px-4 py-2 bg-gray-800 dark:bg-gray-700 text-white rounded-r-lg hover:bg-gray-700 dark:hover:bg-gray-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            Tester
                                        </button>
                                    </div>
                                    <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                                        Envoyez-vous un email de test avant de l'envoyer à tous vos abonnés.
                                    </p>
                                </div>

                                {/* Bouton d'envoi */}
                                <div className="text-right">
                                    <button
                                        type="submit"
                                        disabled={isLoading || !newsletter.title || !newsletter.main_content || !newsletter.conclusion}
                                        className="px-6 py-3 bg-black dark:bg-white text-white dark:text-black rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {isLoading ? (
                                            <span className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white dark:text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Envoi en cours...
                      </span>
                                        ) : (
                                            'Envoyer la newsletter'
                                        )}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>

                    {/* Panneau latéral */}
                    <div className="space-y-6">
                        {/* Liste des newsletters précédentes */}
                        <div className="bg-white dark:bg-black rounded-xl shadow-lg border border-gray-200 dark:border-gray-800 p-6">
                            <h3 className="text-lg font-semibold text-black dark:text-white mb-4">
                                Newsletters précédentes
                            </h3>

                            {previousNewsletters.length === 0 ? (
                                <p className="text-gray-500 dark:text-gray-400 text-sm">
                                    Aucune newsletter envoyée pour le moment.
                                </p>
                            ) : (
                                <div className="space-y-4 max-h-96 overflow-y-auto">
                                    {previousNewsletters.map(newsletter => (
                                        <div
                                            key={newsletter.id}
                                            className="p-4 bg-gray-50 dark:bg-gray-900/50 rounded-lg"
                                        >
                                            <h4 className="text-black dark:text-white font-medium mb-1">
                                                {newsletter.title}
                                            </h4>
                                            <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                                                Envoyée le {formatDate(newsletter.created_at)}
                                            </p>
                                            <div className="flex space-x-2">
                                                <button
                                                    onClick={() => {
                                                        // Pré-remplir le formulaire avec cette newsletter
                                                        setNewsletter({
                                                            title: newsletter.title,
                                                            subtitle: newsletter.subtitle,
                                                            main_content: newsletter.main_content,
                                                            quote: newsletter.quote,
                                                            conclusion: newsletter.conclusion,
                                                            image_url: newsletter.image_url,
                                                            article_url: newsletter.article_url
                                                        });
                                                    }}
                                                    className="text-xs px-2 py-1 bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors"
                                                >
                                                    Réutiliser
                                                </button>
                                                <button
                                                    onClick={() => {
                                                        window.open(`/api/newsletters/${newsletter.id}/preview/`, '_blank');
                                                    }}
                                                    className="text-xs px-2 py-1 bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors"
                                                >
                                                    Prévisualiser
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            <button
                                type="button"
                                onClick={fetchNewsletters}
                                className="mt-4 w-full text-center text-sm text-black dark:text-white hover:underline"
                            >
                                Rafraîchir la liste
                            </button>
                        </div>

                        {/* Liste des abonnés récents */}
                        <div className="bg-white dark:bg-black rounded-xl shadow-lg border border-gray-200 dark:border-gray-800 p-6">
                            <h3 className="text-lg font-semibold text-black dark:text-white mb-4">
                                Derniers abonnés
                            </h3>

                            {subscribers.length === 0 ? (
                                <p className="text-gray-500 dark:text-gray-400 text-sm">
                                    Aucun abonné pour le moment.
                                </p>
                            ) : (
                                <div className="space-y-3 max-h-72 overflow-y-auto">
                                    {subscribers.slice(0, 10).map(subscriber => (
                                        <div key={subscriber.id} className="flex items-center justify-between">
                                            <div>
                                                <p className="text-black dark:text-white font-medium">
                                                    {subscriber.email}
                                                </p>
                                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                                    {subscriber.nom || 'Anonyme'} · {new Date(subscriber.date_inscription).toLocaleDateString()}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            <button
                                type="button"
                                onClick={fetchSubscribers}
                                className="mt-4 w-full text-center text-sm text-black dark:text-white hover:underline"
                            >
                                Rafraîchir la liste
                            </button>
                        </div>

                        {/* Aide */}
                        <div className="bg-white dark:bg-black rounded-xl shadow-lg border border-gray-200 dark:border-gray-800 p-6">
                            <h3 className="text-lg font-semibold text-black dark:text-white mb-4">
                                Conseils
                            </h3>
                            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                                <li className="flex items-start">
                                    <svg className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                    </svg>
                                    <span>Utilisez un titre court et accrocheur pour maximiser l'ouverture.</span>
                                </li>
                                <li className="flex items-start">
                                    <svg className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                    </svg>
                                    <span>Incluez toujours une image pertinente pour illustrer votre contenu.</span>
                                </li>
                                <li className="flex items-start">
                                    <svg className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                    </svg>
                                    <span>Envoyez un test à vous-même avant d'envoyer à tous les abonnés.</span>
                                </li>
                                <li className="flex items-start">
                                    <svg className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                    </svg>
                                    <span>Utilisez le HTML avec parcimonie pour les mises en forme complexes.</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default AdminNewsletterPage;