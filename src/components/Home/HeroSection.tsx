import React, { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Lottie from 'lottie-react';
import foxZenAnimation from '../../assets/lotties/fox-zen.json';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';

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
        liveUrl: 'https://mood-music.the-fox.tech/',
        githubUrl: 'https://github.com/theTigerFox/mood-music',
        buttonText: 'Tester Mood-Music',
        secondaryButtonText: 'Voir le code',
    },
    {
        id: 'nan-cv',
        name: 'NAN-CV',
        description: 'Créez des CV professionnels avec l\'IA en quelques minutes.',
        iconUrl: 'https://nancy-cv.vercel.app/assets/nancy-D_KPpY8c.jpg',
        liveUrl: 'https://nancy-cv.the-fox.tech/',
        githubUrl: 'https://github.com/theTigerFox/nancy-cv',
        buttonText: 'Créer mon CV',
        secondaryButtonText: 'Voir le code',
    },
    {
        id: 'yt-learn',
        name: 'YT-Learn',
        description: 'Transformez vidéos YouTube et PDF en jeux éducatifs interactifs.',
        iconUrl: 'https://yt-learn-eight.vercel.app/assets/logo-CUh3ZhgP.png',
        liveUrl: 'https://yt-learn.the-fox.tech/',
        githubUrl: 'https://github.com/Tiger-Foxx/yt-learn',
        buttonText: 'Essayer YT-Learn',
        secondaryButtonText: 'Voir sur GitHub',
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
    const heroRef = useRef<HTMLDivElement>(null);
    const [hoverProduct, setHoverProduct] = useState<string | null>(null);
    const [showFoxZen, setShowFoxZen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    // Détecter si on est sur mobile
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Effets de parallaxe et animations au scroll
    const { scrollYProgress } = useScroll({
        target: heroRef,
        offset: ["start start", "end start"]
    });

    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
    // const y = useTransform(scrollYProgress, [0, 1], [0, 200]);

    // Animation pour le renard qui médite
    useEffect(() => {
        // Afficher le renard après un délai pour créer un effet surprise
        const timer = setTimeout(() => {
            setShowFoxZen(true);
        }, 1500);

        return () => clearTimeout(timer);
    }, []);

    return (
        <>
            <section
                ref={heroRef}
                className="relative pt-19 md:pt-23 pb-20 overflow-hidden bg-white dark:bg-black"
            >
                {/* Éléments d'arrière-plan et effets visuels */}
                <div className="absolute inset-0 opacity-[0.03] bg-[url('/noise.png')] dark:opacity-[0.02]"></div>

                {/* Cercles abstraits d'arrière-plan */}
                <motion.div
                    className="absolute top-0 right-0 w-[800px] h-[800px] rounded-full bg-gradient-to-b from-gray-100 to-transparent dark:from-gray-900/30 dark:to-transparent opacity-70 -z-10"
                    style={{ x: useTransform(scrollYProgress, [0, 1], [50, 150]), y: useTransform(scrollYProgress, [0, 1], [-100, -50]) }}
                ></motion.div>

                <motion.div
                    className="absolute -bottom-40 -left-40 w-[600px] h-[600px] rounded-full bg-gradient-to-t from-gray-100 to-transparent dark:from-gray-900/30 dark:to-transparent opacity-70 -z-10"
                    style={{ x: useTransform(scrollYProgress, [0, 1], [-50, 50]), y: useTransform(scrollYProgress, [0, 1], [0, -50]) }}
                ></motion.div>

                <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Version mobile: centrée et optimisée */}
                    {isMobile && (
                        <div className="text-center">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                            >
                                <Link
                                    to="/blog/nouvelle-version-site"
                                    className="group inline-flex items-center justify-center mb-5 px-4 py-1.5 text-xs font-medium uppercase tracking-wider border border-gray-300 dark:border-gray-700 rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                                >
                                    <span className="w-2 h-2 bg-black dark:bg-white rounded-full mr-2"></span>
                                    <span>Nouveau Design</span>
                                    <svg className="ml-1.5 w-3 h-3 text-gray-500 dark:text-gray-400 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                                    </svg>
                                </Link>

                                <motion.h1
                                    className="text-4xl sm:text-5xl font-extrabold tracking-tight text-black dark:text-white !leading-tight mb-5"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: 0.1 }}
                                >
                                    Solutions Digitales
                                    <div className="mt-1">
                                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-600 via-black to-black dark:from-gray-400 dark:via-gray-100 dark:to-white">
                                            Performantes & Modernes
                                        </span>
                                    </div>
                                </motion.h1>

                                {/* Image et animation en mode mobile */}
                                <motion.div
                                    className="relative my-8 mx-auto max-w-xs"
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.5, delay: 0.2 }}
                                >
                                    <div className="relative aspect-square overflow-hidden rounded-2xl shadow-xl border border-gray-200 dark:border-gray-800">
                                        <img
                                            src="/noise.png"
                                            alt="Fox Development Illustration"
                                            className="w-full h-full object-cover"

                                        />
                                        <div className="absolute inset-0 bg-gradient-to-tr from-black/30 to-transparent mix-blend-multiply"></div>

                                        {/* Badges sur mobile */}
                                        <div className="absolute top-3 left-3 bg-white/90 dark:bg-black/90 backdrop-blur-sm px-3 py-1.5 rounded-lg shadow-md border border-gray-200 dark:border-gray-800 text-xs font-medium">
                                            <div className="flex items-center space-x-1.5">
                                                <svg className="w-3.5 h-3.5 text-black dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                                </svg>
                                                <span className="text-black dark:text-white">Sécurité</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Animation du renard zen - plus grande sur mobile */}
                                    <AnimatePresence>
                                        {showFoxZen && (
                                            <motion.div
                                                className="absolute -bottom-5 -right-5 w-40 h-40 z-10"
                                                initial={{ opacity: 0, scale: 0.5 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                exit={{ opacity: 0, scale: 0.5 }}
                                                transition={{ duration: 0.5, ease: "easeOut" }}
                                            >
                                                <div className="w-full h-full bg-white dark:bg-black rounded-full shadow-lg p-2 border border-gray-200 dark:border-gray-800">
                                                    <Lottie
                                                        animationData={foxZenAnimation}
                                                        loop={true}
                                                        style={{ width: '100%', height: '100%' }}
                                                    />
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </motion.div>

                                <motion.p
                                    className="text-base text-gray-600 dark:text-gray-400 max-w-md mx-auto mb-8"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: 0.3 }}
                                >
                                    Développement sur mesure, expertise en sécurité et passion pour l'innovation.
                                    Nous transformons vos idées en réalité digitale impactante.
                                </motion.p>

                                <motion.div
                                    className="flex flex-col gap-3 max-w-xs mx-auto"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: 0.4 }}
                                >
                                    <Link
                                        to="/contact"
                                        className="w-full px-8 py-3.5 bg-black dark:bg-white text-white dark:text-black text-base font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center"
                                    >
                                        Démarrer un Projet
                                        <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                        </svg>
                                    </Link>
                                    <Link
                                        to="/projects"
                                        className="w-full px-8 py-3.5 border border-gray-300 dark:border-gray-700 rounded-lg text-base font-medium text-black dark:text-white hover:bg-gray-50 dark:hover:bg-gray-900/30 transition-all duration-300"
                                    >
                                        Voir Nos Réalisations
                                    </Link>
                                </motion.div>
                            </motion.div>
                        </div>
                    )}

                    {/* Version desktop: layout en colonnes */}
                    {!isMobile && (
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                            {/* Contenu principal du hero - côté texte */}
                            <motion.div
                                className="text-center lg:text-left"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.5 }}
                            >
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5 }}
                                >
                                    <Link
                                        to="/blog/nouvelle-version-site"
                                        className="group inline-flex items-center mb-6 px-4 py-1.5 text-xs font-medium uppercase tracking-wider border border-gray-300 dark:border-gray-700 rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                                    >
                                        <span className="w-2 h-2 bg-black dark:bg-white rounded-full mr-2"></span>
                                        <span>Nouveau Design, Nouvelles Ambitions</span>
                                        <svg className="ml-1.5 w-3 h-3 text-gray-500 dark:text-gray-400 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                                        </svg>
                                    </Link>
                                </motion.div>

                                <motion.h1
                                    className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-black dark:text-white !leading-tight"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: 0.1 }}
                                >
                                    Solutions Digitales <br className="hidden sm:block" />
                                    <span className="relative inline-block">
                                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-600 via-black to-black dark:from-gray-400 dark:via-gray-100 dark:to-white">
                                            Performantes & Modernes
                                        </span>
                                        <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-700 to-transparent"></span>
                                    </span>
                                </motion.h1>

                                <motion.p
                                    className="mt-6 text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-xl"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: 0.2 }}
                                >
                                    Développement sur mesure, expertise en sécurité et passion pour l'innovation.
                                    Nous transformons vos idées en réalité digitale impactante.
                                </motion.p>

                                <motion.div
                                    className="mt-8 flex flex-col sm:flex-row gap-4"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: 0.3 }}
                                >
                                    <Link
                                        to="/contact"
                                        className="px-8 py-4 bg-black dark:bg-white text-white dark:text-black text-base font-medium rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center sm:justify-start"
                                    >
                                        <span>Démarrer un Projet</span>
                                        <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
                                        </svg>
                                    </Link>
                                    <Link
                                        to="/projects"
                                        className="px-8 py-4 border border-gray-300 dark:border-gray-700 rounded-lg text-base font-medium text-black dark:text-white hover:bg-gray-50 dark:hover:bg-gray-900/30 transition-all duration-300"
                                    >
                                        Voir Nos Réalisations
                                    </Link>
                                </motion.div>
                            </motion.div>

                            {/* Animation du renard + image d'illustration */}
                            <motion.div
                                className="relative text-center lg:text-right"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                            >
                                <div className="relative inline-block rounded-2xl overflow-hidden shadow-2xl">
                                    {/* Image principale */}
                                    <div className="aspect-square md:aspect-[4/3] w-full max-w-lg mx-auto lg:ml-auto overflow-hidden bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
                                        <img
                                            src="/noise.png"
                                            alt="Fox Development Illustration"
                                            className="w-full h-full object-cover"

                                        />
                                        <div className="absolute inset-0 bg-gradient-to-tr from-black/30 to-transparent mix-blend-multiply"></div>
                                    </div>

                                    {/* Animation du renard zen superposée */}
                                    <AnimatePresence>
                                        {showFoxZen && (
                                            <motion.div
                                                className="absolute -bottom-6 -right-6 w-40 h-40 z-10"
                                                initial={{ opacity: 0, scale: 0.5, y: 20 }}
                                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                                exit={{ opacity: 0, scale: 0.5, y: 20 }}
                                                transition={{ duration: 0.5, ease: "easeOut" }}
                                            >
                                                <div className="w-full h-full bg-white dark:bg-black rounded-full shadow-lg p-2 border border-gray-200 dark:border-gray-800">
                                                    <Lottie
                                                        animationData={foxZenAnimation}
                                                        loop={true}
                                                        style={{ width: '100%', height: '100%' }}
                                                    />
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>

                                    {/* Badge flottant avec technologie */}
                                    <motion.div
                                        className="absolute top-4 left-4 bg-white/90 dark:bg-black/90 backdrop-blur-sm px-3 py-2 rounded-lg shadow-lg border border-gray-200 dark:border-gray-800 text-sm font-medium"
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.5, delay: 0.5 }}
                                    >
                                        <div className="flex items-center space-x-2">
                                            <svg className="w-4 h-4 text-black dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                            </svg>
                                            <span className="text-black dark:text-white">Sécurité Avancée</span>
                                        </div>
                                    </motion.div>

                                    {/* Badge flottant avec innovation */}
                                    <motion.div
                                        className="absolute bottom-4 left-4 bg-white/90 dark:bg-black/90 backdrop-blur-sm px-3 py-2 rounded-lg shadow-lg border border-gray-200 dark:border-gray-800 text-sm font-medium"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5, delay: 0.6 }}
                                    >
                                        <div className="flex items-center space-x-2">
                                            <svg className="w-4 h-4 text-black dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                            </svg>
                                            <span className="text-black dark:text-white">Innovation IA</span>
                                        </div>
                                    </motion.div>
                                </div>
                            </motion.div>
                        </div>
                    )}

                    {/* Indicateur de défilement */}
                    <motion.div
                        className="absolute bottom-4 left-1/2 transform -translate-x-1/2"
                        style={{ opacity }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.5, duration: 0.8 }}
                    >
                        <motion.div
                            className="w-6 h-10 border-2 border-gray-400 dark:border-gray-600 rounded-full flex justify-center"
                            animate={{ y: [0, 10, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
                        >
                            <motion.div
                                className="w-1.5 h-1.5 bg-gray-500 dark:bg-gray-400 rounded-full mt-2"
                                animate={{ opacity: [0, 1, 0] }}
                                transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
                            />
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Section des Produits Open Source */}
            <section className="py-16 md:py-24 bg-gray-50 dark:bg-gray-900/50 border-t border-b border-gray-200 dark:border-gray-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        className="text-center mb-12 md:mb-16"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.7 }}
                    >
                        <h2 className="text-3xl md:text-4xl font-bold text-black dark:text-white mb-4">
                            Nos Outils <span className="text-gray-500 dark:text-gray-400">Open Source</span>
                        </h2>
                        <div className="w-20 h-1 bg-gray-200 dark:bg-gray-700 mx-auto mb-6"></div>
                        <p className="max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-400">
                            Quelques des applications gratuites et open source développées par nos soins, accessibles à tous.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                        {openSourceProductsData.map((product, index) => (
                            <motion.div
                                key={product.id}
                                className={`group bg-white dark:bg-black rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-200 dark:border-gray-800 overflow-hidden flex flex-col ${
                                    hoverProduct === product.id ? 'ring-2 ring-black dark:ring-white ring-offset-2 ring-offset-gray-50 dark:ring-offset-gray-900' : ''
                                }`}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.1 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                onMouseEnter={() => setHoverProduct(product.id)}
                                onMouseLeave={() => setHoverProduct(null)}
                                whileHover="hover"
                            >
                                <div className="p-6 flex-grow flex flex-col">
                                    <div className="flex items-start space-x-4 mb-4">
                                        <div className="flex-shrink-0 h-12 w-12 flex items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-800 overflow-hidden border border-gray-200 dark:border-gray-700">
                                            <img
                                                src={product.iconUrl}
                                                alt={`${product.name} icon`}
                                                className="h-8 w-8 object-contain transition-transform duration-300 group-hover:scale-110"
                                                onError={(e) => {
                                                    const target = e.target as HTMLImageElement;
                                                    target.onerror = null;
                                                    target.src = '/favicon.png';
                                                }}
                                            />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-semibold text-black dark:text-white group-hover:underline decoration-1 underline-offset-4">
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
                                            <svg className="ml-2 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                                            </svg>
                                        </a>
                                        <a
                                            href={product.githubUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="w-full flex items-center justify-center px-4 py-2 text-xs font-medium text-gray-600 dark:text-gray-400 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-black dark:hover:text-white transition-colors duration-200 border border-gray-300 dark:border-gray-700"
                                        >
                                            <svg className="w-4 h-4 mr-1.5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                                            </svg>
                                            {product.secondaryButtonText}
                                        </a>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
};