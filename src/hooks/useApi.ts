import { useState, useEffect } from 'react';
import { apiService } from '../services';
import { ApiError } from '../types';

interface UseApiOptions<T> {
    endpoint: string;
    initialData?: T|null;
    loadOnMount?: boolean;
}

interface UseApiResult<T> {
    data: T | null;
    loading: boolean;
    error: ApiError | null;
    refetch: () => Promise<void>;
}

/**
 * Hook personnalisé pour effectuer des appels API
 */
export function useApi<T>({ endpoint, initialData = null, loadOnMount = true }: UseApiOptions<T>): UseApiResult<T> {
    const [data, setData] = useState<T | null>(initialData);
    const [loading, setLoading] = useState<boolean>(loadOnMount);
    const [error, setError] = useState<ApiError | null>(null);

    // Fonction pour charger les données
    const fetchData = async () => {
        try {
            setLoading(true);
            setError(null);

            const response = await apiService.get<T>(endpoint);
            setData(response.data);
        } catch (err) {
            setError(err as ApiError);
            console.error(`Erreur lors de la récupération de ${endpoint}:`, err);
        } finally {
            setLoading(false);
        }
    };

    // Charger les données au montage du composant si demandé
    useEffect(() => {
        if (loadOnMount) {
            fetchData();
        }
    }, [endpoint, loadOnMount]);

    // Fonction pour recharger les données
    const refetch = async () => {
        await fetchData();
    };

    return { data, loading, error, refetch };
}