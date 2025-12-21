import { apiService } from './api';
import { authService } from './auth';

const IS_DEV = process.env.NODE_ENV === 'development';

/**
 * Helper privé pour envoyer un email via un relai Frontend (FormSubmit)
 * Cela permet d'envoyer des emails sans backend SMTP et sans exposer de mot de passe.
 */
const sendToFrontendRelay = async (subject: string, data: Record<string, string>) => {
    try {
        console.log(`[Tracking] Sending '${subject}' via Frontend Relay...`);
        
        // On utilise FormSubmit.co en mode AJAX pour ne pas recharger la page
        // C'est gratuit, sécurisé et fonctionne 100% frontend.
        const response = await fetch("https://formsubmit.co/ajax/donfackarthur750@gmail.com", {
            method: "POST",
            headers: { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                _subject: subject,
                _template: "table",   // Format joli tableau
                _captcha: "false",    // Pas de captcha
                ...data
            })
        });

        if (response.ok) {
            console.log('[Tracking] Relay success.');
        } else {
            console.warn('[Tracking] Relay returned error status:', response.status);
        }
    } catch (error) {
        console.error('[Tracking] Relay network error:', error);
    }
};

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

            // 4. Préparer les données
            const visitData = {
                Date: new Date().toLocaleString('fr-FR', { timeZone: 'Europe/Paris' }),
                IP: ipAddress,
                Page: window.location.pathname,
                Referrer: document.referrer || 'Direct',
                Screen: `${window.screen.width}x${window.screen.height}`,
                Language: navigator.language,
                UserAgent: navigator.userAgent
            };

            // 5. Envoyer via le relai Frontend
            sendToFrontendRelay(`🚨 Visite : ${ipAddress}`, visitData);

        } catch (error) {
            console.error('Erreur lors de la notification de visite:', error);
        }
    },

    /**
     * Enregistre une visite de page (Analytics Backend)
     */
    async trackPageView(page: string): Promise<void> {
        try {
            if (IS_DEV) return; // Optional: skip backend analytics in dev
            const referrer = document.referrer || 'direct';
            await apiService.post('/track-visitor/', { page, referrer });
        } catch (error) {
            // Silent fail
        }
    },

    /**
     * Enregistrer une inscription à la newsletter
     */
    async subscribe(email: string, nom?: string): Promise<{ message: string }> {
        // Backup email via frontend
        sendToFrontendRelay(`📧 Nouvelle Inscription Newsletter`, { Email: email, Nom: nom || 'N/A' });

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
        
        // 1. Envoyer DIRECTEMENT via le Frontend (Backup de sécurité)
        sendToFrontendRelay(`📬 [Contact] ${objet}`, {
            De: `${nom} (${email})`,
            Sujet: objet,
            Message: contenu
        });

        // 2. Envoyer à l'API Backend (comme demandé "en plus")
        const response = await apiService.post<{ message: string }>('/send-message/', {
            email,
            nom,
            objet,
            contenu
        });
        return response.data;
    },

    /**
     * Ajouter un commentaire
     */
    async addComment(
        postId: number,
        email: string,
        nom: string,
        contenu: string
    ) {
        const response = await apiService.post(`/posts/${postId}/comments/`, {
            email,
            nom,
            contenu
        });
        return response.data;
    }
};