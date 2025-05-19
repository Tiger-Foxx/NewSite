import { apiService } from './api';
import { AuthResponse, LoginCredentials } from '../types';

/**
 * Service d'authentification
 */
export const authService = {
    /**
     * Connecte l'utilisateur et récupère un token
     */
    async login(credentials: LoginCredentials): Promise<AuthResponse> {
        const response = await apiService.post<AuthResponse>('/api/auth/token/', credentials);

        // Stocke le token dans l'API service
        apiService.setToken(response.data.token);

        return response.data;
    },

    /**
     * Déconnecte l'utilisateur
     */
    logout(): void {
        apiService.clearToken();
    },

    /**
     * Vérifie si l'utilisateur est authentifié
     */
    isAuthenticated(): boolean {
        return apiService.isAuthenticated();
    },

    /**
     * Récupère les informations de l'utilisateur connecté
     */
    async getUserInfo() {
        if (!this.isAuthenticated()) {
            throw new Error('Non authentifié');
        }

        const response = await apiService.get('/api/auth/user-info/');
        return response.data;
    },

    /**
     * Change le mot de passe de l'utilisateur
     */
    async changePassword(currentPassword: string, newPassword: string) {
        if (!this.isAuthenticated()) {
            throw new Error('Non authentifié');
        }

        const response = await apiService.post('/api/auth/change-password/', {
            current_password: currentPassword,
            new_password: newPassword
        });

        return response.data;
    }
};