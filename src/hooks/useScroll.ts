import { useState, useEffect } from 'react';

interface ScrollPosition {
    x: number;
    y: number;
}

interface ScrollStatus {
    position: ScrollPosition;
    direction: 'up' | 'down' | 'none';
    isScrollingUp: boolean;
    isScrollingDown: boolean;
    isAtTop: boolean;
    isAtBottom: boolean;
    scrollPercentage: number;
}

/**
 * Hook pour suivre le défilement de la page
 */
export function useScroll(threshold = 50): ScrollStatus {
    const [scrollPosition, setScrollPosition] = useState<ScrollPosition>({ x: 0, y: 0 });
    const [prevScrollPosition, setPrevScrollPosition] = useState<ScrollPosition>({ x: 0, y: 0 });
    const [direction, setDirection] = useState<'up' | 'down' | 'none'>('none');

    useEffect(() => {
        const handleScroll = () => {
            const currentPosition = {
                x: window.scrollX,
                y: window.scrollY
            };

            // Mettre à jour la direction seulement si le changement dépasse le seuil
            if (Math.abs(currentPosition.y - prevScrollPosition.y) > threshold) {
                setDirection(currentPosition.y > prevScrollPosition.y ? 'down' : 'up');
                setPrevScrollPosition(currentPosition);
            }

            setScrollPosition(currentPosition);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll(); // Initialiser les valeurs

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [prevScrollPosition, threshold]);

    // Calculer des valeurs dérivées
    const isScrollingUp = direction === 'up';
    const isScrollingDown = direction === 'down';
    const isAtTop = scrollPosition.y <= 5; // Petit seuil pour éviter les faux positifs

    // Calculer si nous sommes en bas de page
    const isAtBottom = () => {
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        const scrollPosition = window.scrollY;

        // On considère qu'on est en bas si on est à moins de 10px du bas
        return documentHeight - (scrollPosition + windowHeight) <= 10;
    };

    // Calculer le pourcentage de défilement
    const scrollPercentage = () => {
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        const scrollPosition = window.scrollY;

        if (documentHeight === windowHeight) return 100;
        return (scrollPosition / (documentHeight - windowHeight)) * 100;
    };

    return {
        position: scrollPosition,
        direction,
        isScrollingUp,
        isScrollingDown,
        isAtTop,
        isAtBottom: isAtBottom(),
        scrollPercentage: scrollPercentage()
    };
}