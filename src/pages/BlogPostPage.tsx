import React from 'react';
import { useParams } from 'react-router-dom';

export const BlogPostPage: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();

    React.useEffect(() => {
        document.title = `Article: ${slug} - Fox Engineering`;
        // Ici, tu pourrais charger le contenu de l'article basé sur le slug
    }, [slug]);

    return (
        <div className="min-h-screen pt-16 md:pt-20 flex flex-col items-center justify-center bg-white dark:bg-black text-black dark:text-white">
            <h1 className="text-4xl font-bold">Article de Blog</h1>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
                Affichage de l'article avec le slug: {slug}
            </p>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
                Contenu à venir...
            </p>
        </div>
    );
};

export default BlogPostPage;