import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const ScrollToTop = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        // Quand l'URL change, faire défiler la page vers le haut
        window.scrollTo(0, 0);
    }, [pathname]);

    return null;
};