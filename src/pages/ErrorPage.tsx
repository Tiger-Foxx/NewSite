import React from 'react';
import { Link } from 'react-router-dom';

export const ErrorPage: React.FC = () => {
    React.useEffect(() => {
        document.title = 'Page non trouvée - Fox Engineering';
    }, []);

    return (
        <div className="min-h-screen pt-16 md:pt-20 flex flex-col items-center justify-center text-center px-4 bg-white dark:bg-black text-black dark:text-white">
            <h1 className="text-6xl font-bold text-red-500">404</h1>
            <h2 className="mt-4 text-3xl font-semibold">Page Non Trouvée</h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
                Désolé, la page que vous recherchez n'existe pas ou a été déplacée.
            </p>
            <Link
                to="/"
                className="mt-8 px-6 py-3 bg-black dark:bg-white text-white dark:text-black rounded-full font-medium hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
            >
                Retour à l'accueil
            </Link>
        </div>
    );
};

export default ErrorPage;