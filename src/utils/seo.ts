export interface SeoProps {
    title: string;
    description: string;
    canonical?: string;
    image?: string;
    type?: 'website' | 'article' | 'profile';
    keywords?: string[];
    author?: string;
    datePublished?: string;
}

/**
 * Met à jour les balises meta pour le SEO
 */
export function updateMetaTags({
                                   title,
                                   description,
                                   canonical,
                                   image,
                                   type = 'website',
                                   keywords,
                                   author,
                                   datePublished
                               }: SeoProps): void {
    // Titre de la page
    document.title = `${title} | Fox - Service d'ingénierie Informatique`;

    // Meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
        metaDescription = document.createElement('meta');
        metaDescription.setAttribute('name', 'description');
        document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', description);

    // Mots-clés
    if (keywords && keywords.length > 0) {
        let metaKeywords = document.querySelector('meta[name="keywords"]');
        if (!metaKeywords) {
            metaKeywords = document.createElement('meta');
            metaKeywords.setAttribute('name', 'keywords');
            document.head.appendChild(metaKeywords);
        }
        metaKeywords.setAttribute('content', keywords.join(', '));
    }

    // Auteur
    if (author) {
        let metaAuthor = document.querySelector('meta[name="author"]');
        if (!metaAuthor) {
            metaAuthor = document.createElement('meta');
            metaAuthor.setAttribute('name', 'author');
            document.head.appendChild(metaAuthor);
        }
        metaAuthor.setAttribute('content', author);
    }

    // URL canonique
    let linkCanonical = document.querySelector('link[rel="canonical"]');
    if (!linkCanonical) {
        linkCanonical = document.createElement('link');
        linkCanonical.setAttribute('rel', 'canonical');
        document.head.appendChild(linkCanonical);
    }
    linkCanonical.setAttribute('href', canonical || window.location.href);

    // Open Graph
    updateOpenGraphTags({
        title,
        description,
        url: canonical || window.location.href,
        image,
        type,
        datePublished
    });

    // Twitter Card
    updateTwitterTags({
        title,
        description,
        image
    });
}

interface OpenGraphProps {
    title: string;
    description: string;
    url: string;
    image?: string;
    type: 'website' | 'article' | 'profile';
    datePublished?: string;
}

/**
 * Met à jour les balises Open Graph
 */
function updateOpenGraphTags({
                                 title,
                                 description,
                                 url,
                                 image,
                                 type,
                                 datePublished
                             }: OpenGraphProps): void {
    const ogTags = [
        { property: 'og:title', content: title },
        { property: 'og:description', content: description },
        { property: 'og:url', content: url },
        { property: 'og:type', content: type },
        { property: 'og:site_name', content: 'Fox - Service d\'ingénierie Informatique' }
    ];

    if (image) {
        ogTags.push({ property: 'og:image', content: image });
    }

    if (type === 'article' && datePublished) {
        ogTags.push({ property: 'article:published_time', content: datePublished });
    }

    // Mettre à jour ou créer chaque balise
    ogTags.forEach(({ property, content }) => {
        let tag = document.querySelector(`meta[property="${property}"]`);
        if (!tag) {
            tag = document.createElement('meta');
            tag.setAttribute('property', property);
            document.head.appendChild(tag);
        }
        tag.setAttribute('content', content);
    });
}

interface TwitterCardProps {
    title: string;
    description: string;
    image?: string;
}

/**
 * Met à jour les balises Twitter Card
 */
function updateTwitterTags({
                               title,
                               description,
                               image
                           }: TwitterCardProps): void {
    const twitterTags = [
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: title },
        { name: 'twitter:description', content: description }
    ];

    if (image) {
        twitterTags.push({ name: 'twitter:image', content: image });
    }

    // Mettre à jour ou créer chaque balise
    twitterTags.forEach(({ name, content }) => {
        let tag = document.querySelector(`meta[name="${name}"]`);
        if (!tag) {
            tag = document.createElement('meta');
            tag.setAttribute('name', name);
            document.head.appendChild(tag);
        }
        tag.setAttribute('content', content);
    });
}