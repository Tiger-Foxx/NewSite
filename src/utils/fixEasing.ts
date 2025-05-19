/**
 * Corrige les valeurs de cubic-bezier problématiques pour éviter l'erreur
 * "Failed to execute 'animate' on 'Element': 'cubic-bezier(X, Y, Z, W)' is not a valid value for easing"
 */
export function fixEasingValues(obj: any): any {
    // Si c'est null, undefined, ou un type primitif, le retourner tel quel
    if (obj === null || obj === undefined || typeof obj !== 'object') {
        return obj;
    }

    // Si c'est un tableau, corriger chaque élément
    if (Array.isArray(obj)) {
        return obj.map(item => fixEasingValues(item));
    }

    // Parcourir les propriétés de l'objet
    const result = { ...obj };
    for (const key in result) {
        // Si la propriété est "ease" ou "easing" et contient "cubic-bezier"
        if (
            (key === 'ease' || key === 'easing') &&
            typeof result[key] === 'string' &&
            result[key].includes('cubic-bezier')
        ) {
            // Vérifier si le cubic-bezier contient des valeurs négatives
            const match = result[key].match(/cubic-bezier\(([\d.-]+),\s*([\d.-]+),\s*([\d.-]+),\s*([\d.-]+)\)/);
            if (match) {
                const [_, x1, y1, x2, y2] = match.map(Number);
                // Remplacer par une valeur sûre
                result[key] = "easeInOut";
                console.warn(`Corrected cubic-bezier(${x1}, ${y1}, ${x2}, ${y2}) to "easeInOut"`);
            }
        }
        // Si c'est "transition" qui contient un objet avec ease/easing
        else if (key === 'transition' && typeof result[key] === 'object') {
            if (result[key].ease && typeof result[key].ease === 'string' && result[key].ease.includes('cubic-bezier')) {
                const match = result[key].ease.match(/cubic-bezier\(([\d.-]+),\s*([\d.-]+),\s*([\d.-]+),\s*([\d.-]+)\)/);
                if (match) {
                    const [_, x1, y1, x2, y2] = match.map(Number);
                    // Remplacer par une valeur sûre
                    result[key].ease = "easeInOut";
                    console.warn(`Corrected transition.ease cubic-bezier(${x1}, ${y1}, ${x2}, ${y2}) to "easeInOut"`);
                }
            }
        }
        // Si c'est une autre propriété qui contient un objet ou un tableau
        else if (typeof result[key] === 'object') {
            result[key] = fixEasingValues(result[key]);
        }
    }

    return result;
}

/**
 * Fonction utilitaire pour nettoyer les options d'animation Framer Motion
 */
export function safeAnimation(animations: any): any {
    return fixEasingValues(animations);
}