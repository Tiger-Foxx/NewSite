import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';

/**
 * Hook pour accéder au contexte de thème
 */
export function useTheme() {
    const context = useContext(ThemeContext);

    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }

    return context;
}