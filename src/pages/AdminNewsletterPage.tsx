import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AuthContext } from "@/context/AuthContext.tsx";
import { apiService } from "@/services"; // Assurez-vous que ce chemin est correct

// Interface pour une Newsletter (correspondant au modèle Django et à votre usage)
interface Newsletter {
    id: number;
    subject: string;
    title: string;
    subtitle: string; // blank=True dans Django, donc optionnel
    main_content: string;
    quote: string; // blank=True dans Django, donc optionnel
    conclusion: string;
    image_url: string; // blank=True dans Django, donc optionnel
    created_at: string;
    article_url: string; // blank=True, null=True dans Django, donc optionnel
}

// Interface pour un Abonné (Visiteur)
interface Subscriber {
    id: number;
    email: string;
    nom?: string; // Supposant que le backend peut le fournir, sinon le retirer
    date_inscription: string; // Assurez-vous que le backend sérialise la date de création du Visiteur sous ce nom
}

// Payload pour la création/envoi d'une newsletter via /api/send-newsletter/
interface SendNewsletterPayload {
    subject: string;
    title: string;
    subtitle?: string;
    main_content: string;
    quote?: string;
    conclusion: string;
    image_url?: string;
    article_url?: string;
}

// Payload pour l'envoi d'un email de test (endpoint backend hypothétique)
interface SendTestNewsletterPayload extends SendNewsletterPayload {
    test_email: string;
}


export const AdminNewsletterPage: React.FC = () => {
    const { isAuthenticated } = useContext(AuthContext);
    const navigate = useNavigate();

    const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
    const [previousNewsletters, setPreviousNewsletters] = useState<Newsletter[]>([]);
    const [subscribersCount, setSubscribersCount] = useState<number>(0);
    const [isLoading, setIsLoading] = useState(false);
    const [success, setSuccess] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const [newsletterForm, setNewsletterForm] = useState<Omit<Newsletter, 'id' | 'created_at'>>({
        subject: '',
        title: '',
        subtitle: '',
        main_content: '',
        quote: '',
        conclusion: '',
        image_url: '',
        article_url: ''
    });

    const [testEmail, setTestEmail] = useState('');

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login', { state: { from: { pathname: '/admin/newsletter' } } });
        }
    }, [isAuthenticated, navigate]);

    useEffect(() => {
        if (isAuthenticated) {
            fetchSubscribers();
            fetchPreviousNewsletters();
        }
    }, [isAuthenticated]);

    const fetchSubscribers = async () => {
        try {
            // Assurez-vous que l'endpoint /api/visiteurs/ est bien configuré dans votre backend
            // et qu'il renvoie une structure avec { count: number, results: Subscriber[] }
            const response = await apiService.get<{ count: number; results: Subscriber[] }>('/api/visiteurs/?limit=50');
            setSubscribers(response.data.results || []);
            setSubscribersCount(response.data.count || 0);
        } catch (err: any) {
            setError(err.message || 'Erreur lors de la récupération des abonnés');
            console.error('Erreur fetchSubscribers:', err);
        }
    };

    const fetchPreviousNewsletters = async () => {
        try {
            // Assurez-vous que l'endpoint /api/newsletters/ est bien configuré dans votre backend
            // pour lister les newsletters (GET) et qu'il renvoie { count: number, results: Newsletter[] }
            const response = await apiService.get<{ count: number; results: Newsletter[] }>('/api/newsletters/?limit=50');
            setPreviousNewsletters(response.data.results || []);
        } catch (err: any) {
            setError(err.message || 'Erreur lors de la récupération des newsletters précédentes');
            console.error('Erreur fetchPreviousNewsletters:', err);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setNewsletterForm(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSendTest = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!testEmail) {
            setError('Veuillez saisir une adresse email pour le test.');
            return;
        }
        if (!newsletterForm.title || !newsletterForm.main_content || !newsletterForm.conclusion) {
            setError('Veuillez remplir au moins le titre, le contenu principal et la conclusion pour un test.');
            return;
        }

        setIsLoading(true);
        setError(null);
        setSuccess(null);

        const payload: SendTestNewsletterPayload = {
            ...newsletterForm,
            test_email: testEmail
        };

        try {
            // ATTENTION : L'endpoint '/api/send-test-newsletter/' est HYPOTHÉTIQUE.
            // Vous devez créer cette route et sa vue côté Django.
            // Cette vue backend devrait prendre le payload et envoyer l'email
            // UNIQUEMENT à 'test_email' sans sauvegarder la newsletter ou l'envoyer à tous.
            await apiService.post('/api/send-test-newsletter/', payload);
            setSuccess(`Email de test envoyé avec succès à ${testEmail} !`);
        } catch (err: any) {
            setError(err.message || 'Erreur lors de l\'envoi de l\'email de test. Vérifiez que l\'endpoint backend est configuré.');
            console.error('Erreur handleSendTest:', err);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSendNewsletter = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newsletterForm.title || !newsletterForm.main_content || !newsletterForm.conclusion || !newsletterForm.subject) {
            setError('Veuillez remplir au moins le sujet, le titre, le contenu principal et la conclusion.');
            return;
        }

        const confirmer = window.confirm(
            `Êtes-vous sûr de vouloir envoyer cette newsletter à ${subscribersCount} abonnés ? Cette action créera la newsletter et l'enverra immédiatement.`
        );
        if (!confirmer) return;

        setIsLoading(true);
        setError(null);
        setSuccess(null);

        const payload: SendNewsletterPayload = { ...newsletterForm };

        try {
            // Appel à l'endpoint /api/send-newsletter/ qui correspond à votre vue Django send_newsletter
            // Cette vue crée la newsletter et l'envoie à tous les abonnés.
            const response = await apiService.post<{ message: string }>('/api/send-newsletter/', payload);
            setSuccess(response.data.message || 'Newsletter envoyée avec succès !');
            setNewsletterForm({
                subject: '',
                title: '',
                subtitle: '',
                main_content: '',
                quote: '',
                conclusion: '',
                image_url: '',
                article_url: ''
            });
            fetchPreviousNewsletters(); // Rafraîchir la liste après l'envoi
        } catch (err: any) {
            setError(err.message || 'Erreur lors de l\'envoi de la newsletter.');
            console.error('Erreur handleSendNewsletter:', err);
        } finally {
            setIsLoading(false);
        }
    };

    const pageVariants = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
        exit: { opacity: 0, y: -20, transition: { duration: 0.3 } }
    };

    const formatDate = (dateString: string): string => {
        if (!dateString) return "Date inconnue";
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
                        Créez et envoyez des newsletters à vos abonnés. La newsletter sera formatée selon votre modèle HTML.
                    </p>
                </div>

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
                            {previousNewsletters.length > 0 && previousNewsletters[0]
                                ? formatDate(previousNewsletters[0].created_at)
                                : "Aucune newsletter envoyée"}
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2">
                        <div className="bg-white dark:bg-black rounded-xl shadow-lg border border-gray-200 dark:border-gray-800 p-6">
                            <form onSubmit={handleSendNewsletter}>
                                <h2 className="text-xl font-bold text-black dark:text-white mb-6">
                                    Créer une nouvelle newsletter
                                </h2>

                                <div className="mb-6">
                                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Objet de l'email (Subject) <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        id="subject"
                                        name="subject"
                                        required
                                        value={newsletterForm.subject}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-black text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-transparent"
                                        placeholder="Ce qui s'affichera dans la boite mail..."
                                    />
                                    <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                                        C'est le titre accrocheur qui donne envie d'ouvrir l'email.
                                    </p>
                                </div>

                                <div className="mb-6">
                                    <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Titre <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        id="title"
                                        name="title"
                                        required
                                        value={newsletterForm.title}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-black text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-transparent"
                                        placeholder="Titre de la newsletter"
                                    />
                                </div>

                                <div className="mb-6">
                                    <label htmlFor="subtitle" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Sous-titre
                                    </label>
                                    <input
                                        type="text"
                                        id="subtitle"
                                        name="subtitle"
                                        value={newsletterForm.subtitle}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-black text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-transparent"
                                        placeholder="Sous-titre (optionnel)"
                                    />
                                </div>

                                <div className="mb-6">
                                    <label htmlFor="image_url" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        URL de l'image
                                    </label>
                                    <input
                                        type="url"
                                        id="image_url"
                                        name="image_url"
                                        value={newsletterForm.image_url}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-black text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-transparent"
                                        placeholder="https://example.com/image.jpg (optionnel)"
                                    />
                                </div>

                                <div className="mb-6">
                                    <label htmlFor="main_content" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Contenu principal <span className="text-red-500">*</span>
                                    </label>
                                    <textarea
                                        id="main_content"
                                        name="main_content"
                                        rows={8}
                                        required
                                        value={newsletterForm.main_content}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-black text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-transparent resize-none"
                                        placeholder="Contenu principal (HTML supporté)"
                                    ></textarea>
                                    <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                                        Vous pouvez utiliser des balises HTML pour la mise en forme.
                                    </p>
                                </div>

                                <div className="mb-6">
                                    <label htmlFor="quote" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Citation
                                    </label>
                                    <textarea
                                        id="quote"
                                        name="quote"
                                        rows={3}
                                        value={newsletterForm.quote}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-black text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-transparent resize-none"
                                        placeholder="Citation (optionnel)"
                                    ></textarea>
                                </div>

                                <div className="mb-6">
                                    <label htmlFor="conclusion" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Conclusion <span className="text-red-500">*</span>
                                    </label>
                                    <textarea
                                        id="conclusion"
                                        name="conclusion"
                                        rows={4}
                                        required
                                        value={newsletterForm.conclusion}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-black text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-transparent resize-none"
                                        placeholder="Conclusion de la newsletter"
                                    ></textarea>
                                </div>

                                <div className="mb-6">
                                    <label htmlFor="article_url" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        URL de l'article associé
                                    </label>
                                    <input
                                        type="url"
                                        id="article_url"
                                        name="article_url"
                                        value={newsletterForm.article_url}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-black text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-transparent"
                                        placeholder="https://example.com/article (optionnel)"
                                    />
                                </div>

                                <div className="mb-6 p-4 border border-dashed border-gray-300 dark:border-gray-700 rounded-lg">
                                    <label htmlFor="testEmail" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Envoyer un email de test
                                    </label>
                                    <div className="flex">
                                        <input
                                            type="email"
                                            id="testEmail"
                                            value={testEmail}
                                            onChange={(e) => setTestEmail(e.target.value)}
                                            className="flex-grow px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-l-lg bg-white dark:bg-black text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-transparent"
                                            placeholder="votre.email@example.com"
                                        />
                                        <button
                                            type="button"
                                            onClick={handleSendTest}
                                            disabled={isLoading || !testEmail || !newsletterForm.title}
                                            className="flex-shrink-0 px-4 py-2 bg-gray-800 dark:bg-gray-700 text-white rounded-r-lg hover:bg-gray-700 dark:hover:bg-gray-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            Tester
                                        </button>
                                    </div>
                                    <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                                        Nécessite un endpoint backend `/api/send-test-newsletter/` configuré.
                                    </p>
                                </div>

                                <div className="text-right">
                                    <button
                                        type="submit"
                                        disabled={isLoading || !newsletterForm.title || !newsletterForm.main_content || !newsletterForm.conclusion}
                                        className="px-6 py-3 bg-black dark:bg-white text-white dark:text-black rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {isLoading ? (
                                            <span className="flex items-center justify-center">
                                                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white dark:text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                                Envoi en cours...
                                            </span>
                                        ) : (
                                            `Envoyer à ${subscribersCount} abonnés`
                                        )}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="bg-white dark:bg-black rounded-xl shadow-lg border border-gray-200 dark:border-gray-800 p-6">
                            <h3 className="text-lg font-semibold text-black dark:text-white mb-4">
                                Newsletters précédentes
                            </h3>
                            {previousNewsletters.length === 0 ? (
                                <p className="text-gray-500 dark:text-gray-400 text-sm">Aucune newsletter envoyée.</p>
                            ) : (
                                <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
                                    {previousNewsletters.map(nl => (
                                        <div key={nl.id} className="p-3 bg-gray-50 dark:bg-gray-900/50 rounded-lg">
                                            <h4 className="text-black dark:text-white font-medium text-sm mb-1 truncate" title={nl.title}>
                                                {nl.title}
                                            </h4>
                                            <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                                                Envoyée le {formatDate(nl.created_at)}
                                            </p>
                                            <div className="flex space-x-2">
                                                <button
                                                    onClick={() => setNewsletterForm({
                                                        subject: nl.subject || nl.title,
                                                        title: nl.title,
                                                        subtitle: nl.subtitle || '',
                                                        main_content: nl.main_content,
                                                        quote: nl.quote || '',
                                                        conclusion: nl.conclusion,
                                                        image_url: nl.image_url || '',
                                                        article_url: nl.article_url || ''
                                                    })}
                                                    className="text-xs px-2 py-1 bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors"
                                                >
                                                    Réutiliser
                                                </button>
                                                <button
                                                    onClick={() => {
                                                        // Assurez-vous que /api/newsletters/${nl.id}/preview/ existe et renvoie le HTML
                                                        window.open(`${apiService.getBaseUrl()}/api/newsletters/${nl.id}/preview/`, '_blank');
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
                                onClick={fetchPreviousNewsletters}
                                className="mt-4 w-full text-center text-sm text-black dark:text-white hover:underline"
                            >
                                Rafraîchir la liste
                            </button>
                        </div>

                        <div className="bg-white dark:bg-black rounded-xl shadow-lg border border-gray-200 dark:border-gray-800 p-6">
                            <h3 className="text-lg font-semibold text-black dark:text-white mb-4">
                                Derniers abonnés ({subscribers.slice(0, 10).length})
                            </h3>
                            {subscribers.length === 0 ? (
                                <p className="text-gray-500 dark:text-gray-400 text-sm">Aucun abonné.</p>
                            ) : (
                                <div className="space-y-3 max-h-72 overflow-y-auto pr-2">
                                    {subscribers.slice(0, 10).map(sub => (
                                        <div key={sub.id} className="text-sm">
                                            <p className="text-black dark:text-white font-medium truncate" title={sub.email}>
                                                {sub.email}
                                            </p>
                                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                                {sub.nom || 'Anonyme'} - Inscrit le {formatDate(sub.date_inscription)}
                                            </p>
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

                        <div className="bg-white dark:bg-black rounded-xl shadow-lg border border-gray-200 dark:border-gray-800 p-6">
                            <h3 className="text-lg font-semibold text-black dark:text-white mb-4">Conseils</h3>
                            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                                {/* ... (vos conseils ici) ... */}
                                <li className="flex items-start">
                                    <svg className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                                    <span>Utilisez un titre court et accrocheur.</span>
                                </li>
                                <li className="flex items-start">
                                    <svg className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                                    <span>Envoyez toujours un test avant l'envoi final.</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

// Pour que apiService.getBaseUrl() fonctionne, ajoutez cette méthode à votre classe ApiService:
// Dans votre fichier apiService.ts :
/*
public getBaseUrl(): string {
    return API_BASE_URL;
}
*/

export default AdminNewsletterPage;