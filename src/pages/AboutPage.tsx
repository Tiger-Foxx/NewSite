import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useApi } from '../hooks/useApi';
import { Profile } from '../types';
import { Link } from 'react-router-dom';

export const AboutPage: React.FC = () => {
    const [profile, setProfile] = useState<Profile | null>(null);

    // Récupérer les données du profil
    const { data, loading, error } = useApi<Profile>({
        endpoint: '/api/profile/',
        loadOnMount: true
    });

    // Mettre à jour le profil lorsque les données sont chargées
    useEffect(() => {
        if (data) {
            console.log("*************** DONNEES RECUES *************",data.results[0])
            setProfile(data.results[0]);
            document.title = `À propos de Fox `;
        }
    }, [data]);

    // Skills pour la section compétences
    const skills = [
        { name: 'Développement Web', level: 95, categories: ['Frontend', 'Backend'] },
        { name: 'JavaScript/TypeScript', level: 90, categories: ['Frontend'] },
        { name: 'React & Vue.js', level: 90, categories: ['Frontend'] },
        { name: 'Python', level: 85, categories: ['Backend', 'IA'] },
        { name: 'Java', level: 85, categories: ['Backend'] },
        { name: 'Cybersécurité', level: 82, categories: ['Sécurité'] },
        { name: 'UX/UI Design', level: 78, categories: ['Design'] },
        { name: 'DevOps', level: 80, categories: ['Infra'] },
        { name: 'Machine Learning', level: 75, categories: ['IA'] },
        { name: 'Mobile (React Native , Flutter)', level: 82, categories: ['Mobile'] }
    ];

    // Milestones de carrière
    const milestones = [
        {
            year: '2022 - Présent',
            title: 'Engineering Scientist',
            description: 'Fondateur de Fox, Computer Engineering Scientist, dev de solutions IA.'
        },
        {
            year: '2020 - 2022',
            title: 'Engineering Scientist ',
            description: 'Hacking Ethique, gestion d\'architecture de systèmes complexes.'
        },
        {
            year: '2018 - 2020',
            title: 'Engineering Scientiste',
            description: 'Gestion d\'équipe et développement de solutions  à grande échelle.'
        },

    ];

    // Animation variants
    const fadeInUp = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: "easeOut" }
        }
    };

    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2
            }
        }
    };

    // Gérer l'état de chargement
    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-white dark:bg-black">
                <div className="flex flex-col items-center">
                    <div className="w-16 h-16 border-t-4 border-b-4 border-black dark:border-white rounded-full animate-spin"></div>
                    <p className="mt-4 text-black dark:text-white">Chargement du profil...</p>
                </div>
            </div>
        );
    }

    // Gérer les erreurs
    if (error) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-white dark:bg-black p-4">
                <div className="max-w-md w-full bg-red-50 dark:bg-red-900/20 p-6 rounded-lg shadow-lg text-center">
                    <svg className="w-16 h-16 text-red-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    <h2 className="text-xl font-bold text-red-700 dark:text-red-300 mb-2">Impossible de charger le profil</h2>
                    <p className="text-red-600 dark:text-red-400 mb-4">{error.message || "Une erreur est survenue lors de la récupération des données."}</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors duration-300"
                    >
                        Réessayer
                    </button>
                </div>
            </div>
        );
    }

    return (
        <main className="bg-white dark:bg-black min-h-screen">
            {/* Header Section */}
            <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden">
                <div className="absolute inset-0 opacity-[0.03] bg-[url('/noise.png')] dark:opacity-[0.02]"></div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                    <motion.div
                        className="text-center mb-16"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <span className="inline-block px-3 py-1 text-xs font-medium uppercase tracking-wider bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full mb-4">À propos</span>
                        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-black dark:text-white mb-6 leading-tight">
                            Découvrez <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-600 via-black to-black dark:from-gray-400 dark:via-gray-100 dark:to-white">qui je suis</span>
                        </h1>
                        <div className="w-24 h-1 bg-gray-200 dark:bg-gray-800 mx-auto mb-8"></div>
                        <p className="max-w-2xl mx-auto text-xl text-gray-600 dark:text-gray-400">
                            {profile?.sousTitre || "Enineering Scientist passionné par l'innovation et la création de solutions performantes."}
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Profile Section */}
            {profile && (
                <section className="py-16 md:py-24 bg-gray-50 dark:bg-gray-900/50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex flex-col lg:flex-row gap-16 items-center">
                            {/* Photo */}
                            <motion.div
                                className="lg:w-2/5"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.7 }}
                            >
                                <div className="relative">
                                    <div className="absolute -inset-4 bg-gray-200 dark:bg-gray-800 rounded-xl -z-10 transform -rotate-2"></div>
                                    <div className="relative rounded-xl overflow-hidden aspect-[3/4]">
                                        <img
                                            src={profile.photo}
                                            alt={profile.nom}
                                            className="w-full h-full object-cover"
                                            onError={(e) => {
                                                const target = e.target as HTMLImageElement;
                                                target.onerror = null;
                                                target.src = '/images/profile-fallback.jpg';
                                            }}
                                        />
                                    </div>
                                </div>
                            </motion.div>

                            {/* Bio */}
                            <motion.div
                                className="lg:w-3/5"
                                variants={fadeInUp}
                                initial="hidden"
                                animate="visible"
                            >
                                <h2 className="text-3xl font-bold text-black dark:text-white mb-6">
                                    Bonjour, je suis {profile.nom}
                                </h2>

                                <div className="prose prose-lg dark:prose-invert mb-8">
                                    <p>{profile.descriptionP1}</p>
                                    <p>{profile.descriptionP2}</p>
                                </div>

                                <div className="flex flex-wrap gap-2 mb-8">
                                    <span className="inline-block px-3 py-1 text-xs font-medium bg-black text-white dark:bg-white dark:text-black rounded-full">Développement Web</span>
                                    <span className="inline-block px-3 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-full">Cybersécurité</span>
                                    <span className="inline-block px-3 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-full">IA & Machine Learning</span>
                                    <span className="inline-block px-3 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-full">Architecture Logicielle</span>
                                </div>

                                <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-8">
                                    <a
                                        href={`mailto:${profile.email}`}
                                        className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800/70 transition-colors"
                                    >
                                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                                        </svg>
                                        {profile.email}
                                    </a>

                                    {profile.telephone && (
                                        <a
                                            href={`tel:${profile.telephone}`}
                                            className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800/70 transition-colors"
                                        >
                                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                                            </svg>
                                            {profile.telephone}
                                        </a>
                                    )}
                                </div>

                                <div className="flex items-center space-x-4">
                                    {profile.linkedIn && (
                                        <a
                                            href={profile.linkedIn}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="group flex items-center justify-center w-10 h-10 rounded-full border border-gray-300 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black hover:border-transparent transition-colors"
                                            aria-label="LinkedIn"
                                        >
                                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                                            </svg>
                                        </a>
                                    )}

                                    {profile.github && (
                                        <a
                                            href={profile.github}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="group flex items-center justify-center w-10 h-10 rounded-full border border-gray-300 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black hover:border-transparent transition-colors"
                                            aria-label="GitHub"
                                        >
                                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd"/>
                                            </svg>
                                        </a>
                                    )}

                                    {profile.facebook && (
                                        <a
                                            href={profile.facebook}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="group flex items-center justify-center w-10 h-10 rounded-full border border-gray-300 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black hover:border-transparent transition-colors"
                                            aria-label="Facebook"
                                        >
                                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/>
                                            </svg>
                                        </a>
                                    )}

                                    {profile.instagram && (
                                        <a
                                            href={profile.instagram}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="group flex items-center justify-center w-10 h-10 rounded-full border border-gray-300 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black hover:border-transparent transition-colors"
                                            aria-label="Instagram"
                                        >
                                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                                <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd"/>
                                            </svg>
                                        </a>
                                    )}

                                    {profile.youtube && (
                                        <a
                                            href={profile.youtube}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="group flex items-center justify-center w-10 h-10 rounded-full border border-gray-300 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black hover:border-transparent transition-colors"
                                            aria-label="YouTube"
                                        >
                                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                                            </svg>
                                        </a>
                                    )}

                                    {profile.cv && (
                                        <a
                                            href={profile.cv}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center px-4 py-2 bg-black dark:bg-white text-white dark:text-black rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
                                        >
                                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                                            </svg>
                                            Télécharger mon CV
                                        </a>
                                    )}
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </section>
            )}

            {/* Skills Section */}
            <section className="py-16 md:py-24 bg-white dark:bg-black">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        className="text-center mb-16"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <span className="inline-block px-3 py-1 text-xs font-medium uppercase tracking-wider bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full mb-4">Compétences</span>
                        <h2 className="text-3xl md:text-4xl font-bold text-black dark:text-white mb-4">
                            Expertise Technique
                        </h2>
                        <p className="max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-400">
                            Des compétences variées pour répondre à tous vos besoins technologiques
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
                        {skills.map((skill, index) => (
                            <motion.div
                                key={index}
                                className="p-6 bg-gray-50 dark:bg-gray-900/50 rounded-xl shadow-sm"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ duration: 0.5, delay: index * 0.05 }}
                            >
                                <div className="flex justify-between items-center mb-2">
                                    <h3 className="text-lg font-semibold text-black dark:text-white">{skill.name}</h3>
                                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400">{skill.level}%</span>
                                </div>
                                <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                                    <motion.div
                                        className="h-full bg-black dark:bg-white rounded-full"
                                        initial={{ width: 0 }}
                                        whileInView={{ width: `${skill.level}%` }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 1, ease: "easeOut" }}
                                    ></motion.div>
                                </div>
                                <div className="mt-2 flex gap-2">
                                    {skill.categories.map((category, catIndex) => (
                                        <span
                                            key={catIndex}
                                            className="text-xs px-2 py-0.5 bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full"
                                        >
                      {category}
                    </span>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Journey Section */}
            <section className="py-16 md:py-24 bg-gray-50 dark:bg-gray-900/50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        className="text-center mb-16"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <span className="inline-block px-3 py-1 text-xs font-medium uppercase tracking-wider bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full mb-4">Parcours</span>
                        <h2 className="text-3xl md:text-4xl font-bold text-black dark:text-white mb-4">
                            Mon Expérience
                        </h2>
                        <p className="max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-400">
                            Un parcours professionnel riche et diversifié
                        </p>
                    </motion.div>

                    <div className="relative">
                        {/* Vertical line */}
                        <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gray-200 dark:bg-gray-800 hidden md:block"></div>

                        <motion.div
                            variants={staggerContainer}
                            initial="hidden"
                            animate="visible"
                            className="space-y-12"
                        >
                            {milestones.map((milestone, index) => (
                                <motion.div
                                    key={index}
                                    className="relative"
                                    variants={fadeInUp}
                                >
                                    <div className={`md:flex items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                                        {/* Date */}
                                        <div className={`md:w-1/2 ${index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'}`}>
                                            <div className="bg-white dark:bg-black p-4 rounded-lg shadow-sm inline-block mb-4 md:mb-0">
                                                <span className="text-lg font-bold text-black dark:text-white">{milestone.year}</span>
                                            </div>
                                        </div>

                                        {/* Content */}
                                        <div className="md:w-1/2 bg-white dark:bg-black p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800">
                                            <h3 className="text-xl font-bold text-black dark:text-white mb-2">{milestone.title}</h3>
                                            <p className="text-gray-600 dark:text-gray-400">{milestone.description}</p>
                                        </div>
                                    </div>

                                    {/* Circle marker */}
                                    <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-black dark:bg-white hidden md:block"></div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 bg-black dark:bg-white text-white dark:text-black">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">
                        Prêt à concrétiser votre projet ?
                    </h2>
                    <p className="text-xl text-gray-300 dark:text-gray-700 max-w-2xl mx-auto mb-8">
                        Discutons de vos besoins et travaillons ensemble pour créer des solutions innovantes.
                    </p>

                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <Link
                            to="/contact"
                            className="px-8 py-4 bg-white dark:bg-black text-black dark:text-white font-medium rounded-lg hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors"
                        >
                            Me contacter
                        </Link>
                        <Link
                            to="/projects"
                            className="px-8 py-4 border border-white dark:border-black rounded-lg font-medium hover:bg-white/10 dark:hover:bg-black/10 transition-colors"
                        >
                            Voir mes projets
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default AboutPage;