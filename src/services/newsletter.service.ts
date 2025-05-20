import { SubscribePayload } from '../types';
import {apiService} from "@/services/api.ts";

/**
 * Service pour la gestion des newsletters
 */
const newsletterService = {
    /**
     * S'abonner à la newsletter
     */
    async subscribe(data: SubscribePayload): Promise<any> {
        try {
            const response = await apiService.post('/api/subscribe/', data);
            alert("Merci pour votre abonnement à la newsletter !");
            return response.data;
        } catch (error) {
            console.error('Erreur lors de l\'abonnement à la newsletter:', error);
            throw error;
        }
    },

    /**
     * Envoyer une newsletter (admin seulement)
     */
    async sendNewsletter(newsletterData: any): Promise<any> {
        try {
            const response = await apiService.post('/api/send-newsletter/', newsletterData);
            return response.data;
        } catch (error) {
            console.error('Erreur lors de l\'envoi de la newsletter:', error);
            throw error;
        }
    },

    /**
     * Tester l'envoi d'une newsletter à une adresse email (admin seulement)
     */
    async sendTestNewsletter(newsletterData: any, testEmail: string): Promise<any> {
        try {
            const data = {
                ...newsletterData,
                test_email: testEmail
            };
            const response = await apiService.post('/api/send-test-newsletter/', data);
            return response.data;
        } catch (error) {
            console.error('Erreur lors de l\'envoi du test de newsletter:', error);
            throw error;
        }
    }
};

export default newsletterService;