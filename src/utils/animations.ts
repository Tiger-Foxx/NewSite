export interface AnimationProps {
    initial?: any;
    animate?: any;
    exit?: any;
    transition?: any;
    whileHover?: any;
    whileTap?: any;
    variants?: any;
}

/**
 * Animations pour les éléments qui apparaissent
 */
export const fadeInUp = (delay = 0): AnimationProps => ({
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: {
        duration: 0.5,
        delay,
        ease: "easeOut"
    }
});

export const fadeInDown = (delay = 0): AnimationProps => ({
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0 },
    transition: {
        duration: 0.5,
        delay,
        ease: "easeOut"
    }
});

export const fadeInLeft = (delay = 0): AnimationProps => ({
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0 },
    transition: {
        duration: 0.5,
        delay,
        ease: "easeOut"
    }
});

export const fadeInRight = (delay = 0): AnimationProps => ({
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    transition: {
        duration: 0.5,
        delay,
        ease: "easeOut"
    }
});

export const staggerChildren = (staggerTime = 0.1): AnimationProps => ({
    variants: {
        initial: { opacity: 0 },
        animate: {
            opacity: 1,
            transition: {
                staggerChildren: staggerTime
            }
        }
    },
    initial: "initial",
    animate: "animate"
});

export const childVariants = {
    initial: { opacity: 0, y: 20 },
    animate: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
            ease: "easeOut"
        }
    }
};

/**
 * Animations pour les cartes et containers
 */
export const cardHoverEffect = {
    whileHover: {
        y: -5,
        boxShadow: "0 10px 25px rgba(255, 123, 37, 0.2)",
        transition: {
            duration: 0.3
        }
    },
    whileTap: {
        scale: 0.98
    }
};

/**
 * Animations de page
 */
export const pageTransition = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: {
        duration: 0.3,
        ease: "easeInOut"
    }
};

/**
 * Effet parallaxe pour les images et arrière-plans
 */
export const useParallax = (value: number, distance = 100) => {
    return {
        y: value * distance
    };
};