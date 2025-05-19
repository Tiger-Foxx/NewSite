import React, { createContext, useState, useEffect, ReactNode } from 'react';

type Theme = 'dark' | 'light';

interface ThemeContextType {
    theme: Theme;
    toggleTheme: () => void;
}

const defaultContext: ThemeContextType = {
    theme: 'dark',
    toggleTheme: () => {}
};

export const ThemeContext = createContext<ThemeContextType>(defaultContext);

interface ThemeProviderProps {
    children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
    const [theme, setTheme] = useState<Theme>('dark');

    // Initialiser le thème au chargement
    useEffect(() => {
        // Vérifier les préférences enregistrées
        const savedTheme = localStorage.getItem('foxTheme') as Theme | null;
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

        // Priorité: préférence sauvegardée > préférence système > dark par défaut
        if (savedTheme) {
            setTheme(savedTheme);
        } else if (prefersDark) {
            setTheme('dark');
        }

        // Appliquer le thème initial au document
        document.documentElement.classList.toggle('dark', theme === 'dark');
        document.documentElement.classList.toggle('light', theme === 'light');
    }, []);

    // Mettre à jour les classes CSS et le localStorage à chaque changement de thème
    useEffect(() => {
        document.documentElement.classList.toggle('dark', theme === 'dark');
        document.documentElement.classList.toggle('light', theme === 'light');
        localStorage.setItem('foxTheme', theme);
    }, [theme]);

    // Fonction pour changer de thème
    const toggleTheme = () => {
        setTheme(prevTheme => prevTheme === 'dark' ? 'light' : 'dark');
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};