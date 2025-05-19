/**
 * Formate une date au format français
 */
export function formatDate(dateString: string): string {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('fr-FR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
    }).format(date);
}

/**
 * Tronque un texte à une longueur spécifiée
 */
export function truncateText(text: string, maxLength: number): string {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + '...';
}

/**
 * Convertit une chaîne en slug URL-friendly
 */
export function slugify(text: string): string {
    return text
        .toString()
        .normalize('NFD') // Normaliser les caractères accentués
        .replace(/[\u0300-\u036f]/g, '') // Enlever les accents
        .toLowerCase()
        .trim()
        .replace(/\s+/g, '-') // Espaces en tirets
        .replace(/[^\w-]+/g, '') // Enlever les caractères non-word
        .replace(/--+/g, '-'); // Remplacer les tirets multiples
}

/**
 * Génère des initiales à partir d'un nom
 */
export function getInitials(name: string): string {
    return name
        .split(' ')
        .map(part => part.charAt(0))
        .join('')
        .toUpperCase();
}

/**
 * Détermine si une URL est externe
 */
export function isExternalLink(url: string): boolean {
    if (!url) return false;
    return url.startsWith('http://') || url.startsWith('https://');
}