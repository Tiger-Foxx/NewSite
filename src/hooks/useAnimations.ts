import { useEffect, useState, RefObject } from 'react';

/**
 * Hook pour gérer l'animation d'un élément au scroll
 * @param ref Référence à l'élément DOM
 * @param threshold Seuil d'intersection (0-1)
 * @param rootMargin Marge pour le root
 */
export function useIntersectionAnimation(
    ref: RefObject<Element>,
    threshold = 0.1,
    rootMargin = '0px'
): { inView: boolean; hasAnimated: boolean } {
    const [inView, setInView] = useState(false);
    const [hasAnimated, setHasAnimated] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                const [entry] = entries;
                if (entry.isIntersecting) {
                    setInView(true);
                    setHasAnimated(true);
                    // Optionnel: désabonner après la première animation
                    // observer.disconnect();
                } else {
                    setInView(false);
                    // Commentez la ligne ci-dessous si vous souhaitez que l'animation
                    // se produise une seule fois (pas à chaque fois que l'élément entre dans la vue)
                    // setHasAnimated(false);
                }
            },
            { threshold, rootMargin }
        );

        const currentRef = ref.current;
        if (currentRef) {
            observer.observe(currentRef);
        }

        return () => {
            if (currentRef) {
                observer.unobserve(currentRef);
            }
        };
    }, [ref, threshold, rootMargin]);

    return { inView, hasAnimated };
}

/**
 * Hook pour animer un compteur
 * @param end Valeur finale
 * @param start Valeur initiale
 * @param duration Durée de l'animation en ms
 * @param trigger Déclencheur de l'animation (ex: inView d'un useIntersectionAnimation)
 */
export function useCounter(
    end: number,
    start = 0,
    duration = 2000,
    trigger = true
): number {
    const [count, setCount] = useState(start);

    useEffect(() => {
        if (!trigger) return;

        let startTime: number | null = null;
        let animationFrameId: number;

        const updateCount = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = timestamp - startTime;
            const percentage = Math.min(progress / duration, 1);

            // Fonction d'easing (easeOutQuad)
            const easeOutQuad = (t: number) => t * (2 - t);
            const easedProgress = easeOutQuad(percentage);

            setCount(Math.floor(start + easedProgress * (end - start)));

            if (progress < duration) {
                animationFrameId = requestAnimationFrame(updateCount);
            }
        };

        animationFrameId = requestAnimationFrame(updateCount);

        return () => cancelAnimationFrame(animationFrameId);
    }, [start, end, duration, trigger]);

    return count;
}