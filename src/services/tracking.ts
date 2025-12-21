import { apiService } from './api';
import { authService } from './auth';

const IS_DEV = process.env.NODE_ENV === 'development';

/**
 * Service de tracking des visiteurs
 */
export const trackingService = {
    /**
     * Notifie l'admin d'une nouvelle visite (une fois par session)
     */
    async notifyNewVisitor(): Promise<void> {
        try {
            // 1. Ne pas tracker l'admin
            if (authService.isAuthenticated()) {
                console.log('[Tracking] Admin detected - Notification skipped.');
                return;
            }

            // 2. Vérifier si déjà notifié pour cette session
            if (sessionStorage.getItem('fox_visit_notified')) {
                return;
            }

            // Marquer immédiatement pour éviter double appel
            sessionStorage.setItem('fox_visit_notified', 'true');

            // 3. Récupérer l'IP
            let ipAddress = 'Unknown';
            try {
                const ipRes = await fetch('https://api.ipify.org?format=json');
                const ipData = await ipRes.json();
                ipAddress = ipData.ip;
            } catch (e) {
                console.warn('Could not fetch IP', e);
            }

            // 4. Construire le rapport
            const visitData = {
                timestamp: new Date().toLocaleString('fr-FR', { timeZone: 'Africa/Douala' }),
                page: window.location.pathname,
                referrer: document.referrer || 'Direct',
                userAgent: navigator.userAgent,
                screen: `${window.screen.width}x${window.screen.height}`,
                language: navigator.language,
                ip: ipAddress
            };

            const emailContent = `
🚨 NOUVEAU VISITEUR DÉTECTÉ

📅 Date: ${visitData.timestamp}
🌍 IP: ${visitData.ip}
📍 Page d'entrée: ${visitData.page}
🔗 Referrer: ${visitData.referrer}
💻 Écran: ${visitData.screen}
🗣 Langue: ${visitData.language}
🤖 User Agent: ${visitData.userAgent}

----------------------------------------
Ceci est un message automatique du système de surveillance FOX.
            `;

            // 5. Envoyer via l'endpoint de contact existant
            // On envoie le mail À l'admin (donfackarthur750)
            await apiService.post('/api/send-message/', {
                email: 'donfackarthur750@gmail.com',
                nom: 'FOX WATCHDOG',
                objet: `🚨 Visite : ${ipAddress} - ${visitData.page}`,
                contenu: emailContent
            });

            console.log('[Tracking] Visit notification sent.');

        } catch (error) {
            console.error('Erreur lors de la notification de visite:', error);
            // On retire le flag pour retenter plus tard si c'était une erreur réseau critique ? 
            // Non, on évite le spam en cas d'erreur.
        }
    },

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