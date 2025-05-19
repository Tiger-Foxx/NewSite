import { apiService } from './api';

const IS_DEV = process.env.NODE_ENV === 'development';

/**
 * Service de tracking des visiteurs
 */
export const trackingService = {
    /**
     * Enregistre une visite de page
     */
    async trackPageView(page: string): Promise<void> {
        try {
            // En développement, ne pas faire d'appel API pour éviter les erreurs 401
            if (IS_DEV) {
                console.log(`[DEV] Page view tracked: ${page}`);
                return;
            }

            const referrer = document.referrer || 'direct';
            await apiService.post('/track-visitor/', {
                page,
                referrer
            });
        } catch (error) {
            // Log silencieux pour ne pas perturber l'UX en cas d'erreur
            console.error('Erreur de tracking:', error);
        }
    },

    /**
     * Enregistrer une inscription à la newsletter
     */
    async subscribe(email: string, nom?: string): Promise<{ message: string }> {
        // En développement, simuler une réponse
        if (IS_DEV) {
            console.log(`[DEV] Newsletter subscription: ${email}, ${nom}`);
            return { message: "Inscription réussie!" };
        }

        const response = await apiService.post<{ message: string }>('/subscribe/', {
            email,
            nom
        });
        return response.data;
    },

    /**
     * Envoyer un message de contact
     */
    async sendMessage(
        email: string,
        nom: string,
        objet: string,
        contenu: string
    ): Promise<{ message: string }> {
        // En développement, simuler une réponse
        if (IS_DEV) {
            console.log(`[DEV] Message sent: ${email}, ${nom}, ${objet}`);
            return { message: "Message envoyé avec succès!" };
        }

        const response = await apiService.post<{ message: string }>('/send-message/', {
            email,
            nom,
            objet,
            contenu
        });
        return response.data;
    },

    /**
     * Ajouter un commentaire à un article de blog
     */
    async addComment(
        postId: number,
        email: string,
        nom: string,
        contenu: string
    ) {
        // En développement, simuler une réponse
        if (IS_DEV) {
            console.log(`[DEV] Comment added to post ${postId}: ${email}, ${nom}`);
            return { message: "Commentaire ajouté avec succès!" };
        }

        const response = await apiService.post(`/posts/${postId}/comments/`, {
            email,
            nom,
            contenu
        });
        return response.data;
    }
};