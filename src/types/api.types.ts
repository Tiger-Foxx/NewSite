// Types de base pour l'API
export interface ApiResponse<T> {
    data: T;
    error?: string;
    status: number;
}

export interface PaginatedResponse<T> {
    count: number;
    next: string | null;
    previous: string | null;
    results: T[];
}

export interface ApiError {
    message: string;
    status: number;
    errors?: Record<string, string[]>;
}

// Auth types
export interface LoginCredentials {
    username: string;
    password: string;
}

export interface AuthResponse {
    token: string;
    user_id: number;
    email: string;
    is_staff: boolean;
    is_superuser: boolean;
}