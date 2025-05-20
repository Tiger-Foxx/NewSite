import { ApiError, ApiResponse, PaginatedResponse } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://192.168.100.208:8000';

/**
 * Service d'API pour gérer les communications avec le backend
 */
export class ApiService {
    private static instance: ApiService;
    private token: string | null = null;

    private constructor() {
        // Récupérer le token depuis localStorage s'il existe
        this.token = localStorage.getItem('foxAuthToken');
    }

    /**
     * Retourne l'instance unique du service (Singleton)
     */
    public static getInstance(): ApiService {
        if (!ApiService.instance) {
            ApiService.instance = new ApiService();
        }
        return ApiService.instance;
    }
    public getBaseUrl(): string {
        return API_BASE_URL;
    }

    /**
     * Définit le token d'authentification
     */
    public setToken(token: string): void {
        this.token = token;
        localStorage.setItem('foxAuthToken', token);
    }

    /**
     * Supprime le token d'authentification
     */
    public clearToken(): void {
        this.token = null;
        localStorage.removeItem('foxAuthToken');
    }

    /**
     * Vérifie si l'utilisateur est authentifié
     */
    public isAuthenticated(): boolean {
        return !!this.token;
    }

    /**
     * Construit les en-têtes pour les requêtes API
     */
    private getHeaders(includeContent = true): Headers {
        const headers = new Headers();

        if (includeContent) {
            headers.append('Content-Type', 'application/json');
        }

        if (this.token) {
            headers.append('Authorization', `Token ${this.token}`);
        }

        return headers;
    }

    /**
     * Effectue une requête GET
     */
    public async get<T>(endpoint: string): Promise<ApiResponse<T>> {
        try {
            const response = await fetch(`${API_BASE_URL}${endpoint}`, {
                method: 'GET',
                headers: this.getHeaders(false)
            });

            const data = await response.json();

            if (!response.ok) {
                throw {
                    message: data.message || 'Une erreur est survenue',
                    status: response.status,
                    errors: data.errors
                } as ApiError;
            }

            return {
                data,
                status: response.status
            };
        } catch (error) {
            if ((error as ApiError).status) {
                throw error;
            }
            throw {
                message: (error as Error).message || 'Erreur réseau',
                status: 0
            } as ApiError;
        }
    }

    /**
     * Effectue une requête POST
     */
    public async post<T>(endpoint: string, body: any): Promise<ApiResponse<T>> {
        try {
            const response = await fetch(`${API_BASE_URL}${endpoint}`, {
                method: 'POST',
                headers: this.getHeaders(),
                body: JSON.stringify(body)
            });

            const data = await response.json();

            if (!response.ok) {
                throw {
                    message: data.message || 'Une erreur est survenue',
                    status: response.status,
                    errors: data.errors
                } as ApiError;
            }

            return {
                data,
                status: response.status
            };
        } catch (error) {
            if ((error as ApiError).status) {
                throw error;
            }
            throw {
                message: (error as Error).message || 'Erreur réseau',
                status: 0
            } as ApiError;
        }
    }

    /**
     * Charge les ressources paginées
     */
    public async getPaginated<T>(endpoint: string): Promise<PaginatedResponse<T>> {
        const response = await this.get<PaginatedResponse<T>>(endpoint);
        return response.data;
    }
}

export const apiService = ApiService.getInstance();