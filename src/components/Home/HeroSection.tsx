import React from 'react';
import { Link } from 'react-router-dom';

interface OpenSourceProduct {
    id: string;
    name: string;
    description: string;
    iconUrl: string;
    liveUrl: string;
    githubUrl: string;
    buttonText: string;
    secondaryButtonText: string;
}

const openSourceProductsData: OpenSourceProduct[] = [
    {
        id: 'mood-music',
        name: 'Mood-Music',
        description: 'Playlist Spotify générée par IA selon votre humeur.',
        iconUrl: 'https://mood-music-fox.vercel.app/icons/mood-192.png',
        liveUrl: 'https://mood-music-fox.vercel.app/',
        githubUrl: 'https://github.com/theTigerFox/mood-music',
        buttonText: 'Tester Mood-Music',
        secondaryButtonText: 'Voir le code',
    },
    {
        id: 'nan-cv',
        name: 'NAN-CV',
        description: 'Créez des CV professionnels avec l\'IA en quelques minutes.',
        iconUrl: 'https://nancy-cv.vercel.app/assets/nancy-D_KPpY8c.jpg',
        liveUrl: 'https://nan-cv.fox-dev.com',
        githubUrl: 'https://github.com/theTigerFox/nan-cv',
        buttonText: 'Créer mon CV',
        secondaryButtonText: 'Voir le code',
    },
    {
        id: 'yt-learn',
        name: 'YT-Learn',
        description: 'Transformez vidéos YouTube et PDF en jeux éducatifs interactifs.',
        iconUrl: 'https://yt-learn-eight.vercel.app/assets/logo-CUh3ZhgP.png',
        liveUrl: 'https://yt-learn.fox-dev.com',
        githubUrl: 'https://github.com/theTigerFox/yt-learn',
        buttonText: 'Essayer YT-Learn',
        secondaryButtonText: 'Voir sur GitHub', // J'ai unifié ce texte pour la cohérence
    },
    {
        id: 'foxybluelight',
        name: 'FoxyBlueLight',
        description: 'Filtre de lumière bleue intelligent pour Windows.',
        iconUrl: 'https://github.com/Tiger-Foxx/BlueLightFox/raw/main/FoxyBlueLight/Resources/logo.png',
        liveUrl: 'https://foxy-blue-light.the-fox.tech',
        githubUrl: 'https://github.com/Tiger-Foxx/BlueLightFox',
        buttonText: 'Télécharger FoxyBlueLight',
        secondaryButtonText: 'Voir sur GitHub',
    },
];

export const HeroSection: React.FC = () => {
    return (
        <>
            <section className="relative pt-28 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-white dark:bg-black">
                <div className="absolute inset-0 opacity-[0.03] bg-[url('/noise.png')] dark:opacity-[0.02]"></div>

                <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <Link
                        to="/blog/nouvelle-version-site" // Exemple de lien vers un article de blog pertinent
                        className="group inline-flex items-center justify-center mb-6 px-4 py-1.5 text-xs font-medium uppercase tracking-wider border border-gray-300 dark:border-gray-700 rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                    >
                        <span>Nouveau Design, Nouvelles Ambitions</span>
                        <svg className="ml-1.5 w-3 h-3 text-gray-500 dark:text-gray-400 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                    </Link>

                    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tighter text-black dark:text-white mb-8 !leading-tight">
                        Solutions Digitales <br className="hidden sm:block" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-600 via-black to-black dark:from-gray-400 dark:via-gray-100 dark:to-white">
              Performantes & Modernes
            </span>
                    </h1>

                    <p className="max-w-2xl mx-auto text-md sm:text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-10">
                        Développement sur mesure, expertise en sécurité et passion pour l'innovation.
                        Nous transformons vos idées en réalité digitale impactante.
                    </p>

                    <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                        <Link
                            to="/contact"
                            className="w-full sm:w-auto px-8 py-3.5 bg-black dark:bg-white text-white dark:text-black text-base font-semibold rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition-all duration-300 ease-in-out shadow-lg hover:shadow-xl transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-black focus:ring-black dark:focus:ring-white"
                        >
                            Démarrer un Projet
                        </Link>
                        <Link
                            to="/projects"
                            className="w-full sm:w-auto px-8 py-3.5 border border-gray-300 dark:border-gray-700 rounded-lg text-base font-semibold text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800/60 hover:border-gray-400 dark:hover:border-gray-600 transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-black focus:ring-gray-500 dark:focus:ring-gray-400"
                        >
                            Voir Nos Réalisations
                        </Link>
                    </div>
                </div>
            </section>

            {/* Section des Produits Open Source Intégrée */}
            <section className="py-16 md:py-24 bg-gray-50 dark:bg-gray-900/50 border-t border-b border-gray-200 dark:border-gray-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-left mb-12 md:mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-black dark:text-white">
                            Nos Outils <span className="text-gray-500 dark:text-gray-400">Open Source</span>
                        </h2>
                        <p className="mt-3 max-w-2xl text-lg text-gray-600 dark:text-gray-400">
                            Des applications utiles développées par nos soins, accessibles à tous.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                        {openSourceProductsData.map((product) => (
                            <div
                                key={product.id}
                                className="group bg-white dark:bg-black rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out transform hover:-translate-y-1.5 border border-gray-200 dark:border-gray-800 overflow-hidden flex flex-col"
                            >
                                <div className="p-6 flex-grow flex flex-col">
                                    <div className="flex items-start space-x-4 mb-4">
                                        <div className="flex-shrink-0 h-12 w-12 flex items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-800 overflow-hidden border border-gray-200 dark:border-gray-700">
                                            <img
                                                src={product.iconUrl}
                                                alt={`${product.name} icon`}
                                                className="h-8 w-8 object-contain transition-transform duration-300 group-hover:scale-110"
                                            />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-semibold text-black dark:text-white">
                                                {product.name}
                                            </h3>
                                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 line-clamp-2">
                                                {product.description}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="mt-auto pt-4 space-y-2">
                                        <a
                                            href={product.liveUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="w-full flex items-center justify-center px-4 py-2.5 text-sm font-medium text-white dark:text-black bg-black dark:bg-white rounded-md hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors duration-200"
                                        >
                                            {product.buttonText}
                                            <svg className="ml-2 w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                                        </a>
                                        <a
                                            href={product.githubUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="w-full flex items-center justify-center px-4 py-2 text-xs font-medium text-gray-600 dark:text-gray-400 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-black dark:hover:text-white transition-colors duration-200 border border-gray-300 dark:border-gray-700"
                                        >
                                            {product.secondaryButtonText}
                                        </a>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
};