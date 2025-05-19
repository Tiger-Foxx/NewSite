import React from 'react';
import { motion, MotionProps, Variants } from 'framer-motion';

/**
 * Corrige les valeurs de cubic-bezier problématiques
 */
const fixEasingValues = (obj: any): any => {
    if (!obj || typeof obj !== 'object') return obj;

    // Si c'est un tableau
    if (Array.isArray(obj)) return obj.map(fixEasingValues);

    // Copie de l'objet pour ne pas modifier l'original
    const result = { ...obj };

    // Parcours récursif de toutes les propriétés
    Object.keys(result).forEach(key => {
        const value = result[key];

        // Si c'est une chaîne contenant cubic-bezier, la corriger
        if (typeof value === 'string' &&
            value.includes('cubic-bezier') &&
            value.includes('-')) {
            result[key] = 'ease-in-out';
        }
        // Si c'est un objet transition, vérifier son ease
        else if (key === 'transition' && value && typeof value === 'object') {
            if (typeof value.ease === 'string' &&
                value.ease.includes('cubic-bezier') &&
                value.ease.includes('-')) {
                result[key].ease = 'ease-in-out';
            }
        }
        // Si c'est un autre objet, le traiter récursivement
        else if (value && typeof value === 'object') {
            result[key] = fixEasingValues(value);
        }
    });

    return result;
};

/**
 * Corrige les variants récursivement
 */
const fixVariants = (variants: Variants | undefined): Variants | undefined => {
    if (!variants) return undefined;

    const result: Variants = {};

    // Parcourir toutes les variantes
    Object.keys(variants).forEach(key => {
        // Si la propriété est une fonction (comme pour staggerChildren)
        if (typeof variants[key] === 'function') {
            const originalFn = variants[key] as any;
            result[key] = (...args: any[]) => {
                const fnResult = originalFn(...args);
                return fixEasingValues(fnResult);
            };
        } else {
            result[key] = fixEasingValues(variants[key]);
        }
    });

    return result;
};

/**
 * Wrapper pour Div avec animation sécurisée
 */
export const SafeMotionDiv: React.FC<MotionProps & { className?: string }> = ({
                                                                                  children,
                                                                                  animate,
                                                                                  initial,
                                                                                  exit,
                                                                                  variants,
                                                                                  transition,
                                                                                  ...props
                                                                              }) => {
    // Corriger toutes les propriétés d'animation
    const safeAnimate = fixEasingValues(animate);
    const safeInitial = fixEasingValues(initial);
    const safeExit = fixEasingValues(exit);
    const safeVariants = fixVariants(variants);
    const safeTransition = fixEasingValues(transition);

    return (
        <motion.div
            animate={safeAnimate}
            initial={safeInitial}
            exit={safeExit}
            variants={safeVariants}
            transition={safeTransition}
            {...props}
        >
            {children}
        </motion.div>
    );
};

// Créer des wrappers pour tous les éléments de motion que vous utilisez
export const SafeMotionSpan: React.FC<MotionProps & { className?: string }> = (props) => {
    // Même logique que SafeMotionDiv
    const {
        children,
        animate,
        initial,
        exit,
        variants,
        transition,
        ...rest
    } = props;

    return (
        <motion.span
            animate={fixEasingValues(animate)}
            initial={fixEasingValues(initial)}
            exit={fixEasingValues(exit)}
            variants={fixVariants(variants)}
            transition={fixEasingValues(transition)}
            {...rest}
        >
            {children}
        </motion.span>
    );
};

// Etc. pour les autres éléments motion que vous utilisez