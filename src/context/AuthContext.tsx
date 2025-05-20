import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { authService } from '../services';

interface AuthContextType {
    isAuthenticated: boolean;
    user: any | null;
    login: (username: string, password: string) => Promise<void>;
    logout: () => void;
    loading: boolean;
}

const defaultContext: AuthContextType = {
    isAuthenticated: false,
    user: null,
    login: async () => {},
    logout: () => {},
    loading: true
};

export const AuthContext = createContext<AuthContextType>(defaultContext);

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [user, setUser] = useState<any | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    // Vérifier l'authentification au chargement
    useEffect(() => {
        const checkAuth = async () => {
            try {
                // Vérifier si un token existe
                if (authService.isAuthenticated()) {
                    // Récupérer les informations de l'utilisateur
                    const userInfo = await authService.getUserInfo();
                    setUser(userInfo);
                    setIsAuthenticated(true);
                }
            } catch (error) {
                // Si erreur, déconnecter l'utilisateur
                authService.logout();
                setIsAuthenticated(false);
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        checkAuth();
    }, []);

    // Fonction de connexion
    const login = async (username: string, password: string) => {
        setLoading(true);
        try {
            console.log(username,password)
            const authData = await authService.login({ username, password });
            console.log("DATA",authData)

            // Récupérer les informations complètes de l'utilisateur
            const userInfo = await authService.getUserInfo();

            setUser(userInfo);
            setIsAuthenticated(true);
        } catch (error) {
            authService.logout();
            setIsAuthenticated(false);
            setUser(null);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    // Fonction de déconnexion
    const logout = () => {
        authService.logout();
        setIsAuthenticated(false);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};