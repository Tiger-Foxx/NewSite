import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useApi } from '../hooks/useApi';
import { Profile } from '../types';
import { Link } from 'react-router-dom';

export const AboutPage: React.FC = () => {
    const [profile, setProfile] = useState<Profile | null>(null);

    // Récupérer les données du profil
    const { data, loading, error } = useApi<Profile>({
        endpoint: '/api/profile/?limit=1',
        loadOnMount: true
    });

    // Mettre à jour le profil lorsque les données sont chargées
    useEffect(() => {
        if (data && data.results && data.results.length > 0) {
            setProfile(data.results[0]);
            document.title = `À propos de Fox`;
        }
    }, [data]);

    // Skills pour la section compétences
    const skills = [
        { name: 'Software engineering', level: 98, categories: ['PC', 'Mobile', 'web'] },
        { name: 'Cyber-sec RED-TEAM', level: 92, categories: ['Hacking'] },
        { name: 'Cyber-sec BLUE-TEAM', level: 82, categories: ['Security'] },
        { name: 'UX/UI Design', level: 78, categories: ['Design'] },
        { name: 'DevOps', level: 70, categories: ['Infra', 'CI/CD'] },
        { name: 'Machine Learning', level: 75, categories: ['IA'] },
        { name: 'Management ', level: 99, categories: ['collaboration'] }
    ];

    // Milestones de carrière
    const milestones = [
        {
            year: 'Today ! ',
            title: 'JE ME FORME AUX OUTILS D\'IA ET JE MENE UN CERTAIN PROJET DE RECHERCHE',
            description: 'Oui, le monde de la recherche m\'ouvre ses portes et je dois dire qu\'il est plutot interressant .. pour le moment le projet reste secret mais bientot on en parle'
        },
        {
            year: 'Aout 2024 - Aout 2025',
            title: 'JE BOOSTE TOUT AU MACHINE LEARNING/IA',
            description: 'Oui, je sais : \'Toujours eu du mal à me poser exactement dans mon domaine tranquille\', il faut toujours que je l\'affine avec d\'autres.'
        },
        {
            year: 'Sept 2023 - Juin 2024',
            title: 'La Cyber , c\'est mon univers',
            description: 'Ces derniers mois, et années ma passion pour la cybersécurité est devenue mon focus principal. J\'ai développé plusieurs outils spécialisés.'
        },
        {
            year: 'Fév 2024 - Mai 2024',
            title: 'Immergé Spring Boot , JEE ...etc ',
            description: 'Un réseau social scolaire ou encore une application de monétisation. Ce fut une période où j\'ai vraiment mis les bouchées doubles dans les technos java ,  et en Front niveau JS halala que c\'était bon. Biensur la cyber-secu est restée ma passion principale'
        },
        {
            year: 'Août 2023 - Jan 2024',
            title: 'Une drole de Passion pour le machine learning avancé',
            description: 'Etant un grand Passoné de cyber , j\'ai toujours eu l\'habitude de touhcer un peu à tout. Mais si on m\'avais dis que le ML allait m\'interresser autant...'
        },
        {
            year: 'Fév 2022 - Juil 2023',
            title: 'Développement Mobile ...Flutter',
            description: 'Avec Flutter, j\'ai pu enchaîner les projets, notamment pour des clients dans le monde de la crypto. Une realisation dont je suis particulièrement fier dans cette période est Zenfamili mon béébééé'
        },
        {
            year: 'Sept 2021 - Janv 2022',
            title: 'Développement Web .. c\'eatit le moment',
            description: 'Ah, Django ! J’ai passé ces mois à travailler sur des projets persos à but non lucratif et d\'autres pour des clients, je me demande bien pourquoi je suis tant omnibulé par cette techno.'
        },
        {
            year: 'Juin 2020 - Août 2021',
            title: 'Ingenieur Logiciel niveau galactique',
            description: 'Que ce soit pour des jeux vidéo, des outils  ou des utilitaires avancés, Python était mon langage de prédilection pour ce genre de travaux.'
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

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-white dark:bg-black">
                <div className="w-16 h-16 border-t-4 border-b-4 border-black dark:border-white rounded-full animate-spin"></div>
            </div>
        );
    }

    // Gérer les erreurs
    if (error) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-white dark:bg-black p-4">
                <div className="max-w-md w-full bg-red-50 dark:bg-red-900/20 p-6 rounded-lg shadow-lg text-center">
                    <p className="text-red-600 dark:text-red-400 mb-4">{error.message || "Une erreur est survenue."}</p>
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
        <main className="bg-white dark:bg-black min-h-screen text-black dark:text-white">
            {/* Hero / Intro Section */}
            <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
                <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
                    <div className="flex flex-col md:flex-row items-center gap-16">
                        {/* Profile Image - Circular & Premium */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                            className="relative shrink-0"
                        >
                            <div className="w-48 h-48 md:w-64 md:h-64 rounded-full p-1 bg-gradient-to-tr from-gray-200 to-transparent dark:from-gray-800">
                                <div className="w-full h-full rounded-full overflow-hidden border-4 border-white dark:border-black shadow-2xl">
                                    <img
                                        src="https://avatars.githubusercontent.com/u/118616410?v=4"
                                        alt="Fox Profile"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            </div>
                            {/* Decorative elements */}
                            <div className="absolute -top-4 -right-4 w-24 h-24 bg-gray-100 dark:bg-gray-900 rounded-full -z-10 blur-2xl opacity-60"></div>
                            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gray-200 dark:bg-gray-800 rounded-full -z-10 blur-3xl opacity-40"></div>
                        </motion.div>

                        {/* Text Content */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                            className="text-center md:text-left"
                        >
                            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6">
                                Hello, I'm <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-500 to-black dark:from-gray-400 dark:to-white">
                                    {profile?.nom || "Fox"}
                                </span>
                            </h1>
                            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 max-w-2xl font-light leading-relaxed">
                                {profile?.sousTitre || "Engineering Scientist passionné par l'innovation et la création de solutions performantes."}
                            </p>

                            {/* Social Links */}
                            <div className="mt-8 flex items-center justify-center md:justify-start gap-6">
                                {profile?.github && (
                                    <a href={profile.github} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-black dark:hover:text-white transition-colors">
                                        <span className="sr-only">GitHub</span>
                                        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" /></svg>
                                    </a>
                                )}
                                {profile?.linkedIn && (
                                    <a href={profile.linkedIn} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-black dark:hover:text-white transition-colors">
                                        <span className="sr-only">LinkedIn</span>
                                        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
                                    </a>
                                )}
                                {profile?.cv && (
                                    <a href={profile.cv} target="_blank" rel="noopener noreferrer" className="px-6 py-2 bg-black dark:bg-white text-white dark:text-black rounded-full text-sm font-medium hover:opacity-80 transition-opacity">
                                        CV
                                    </a>
                                )}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Bio Section */}
            {profile && (
                <section className="py-20 bg-gray-50 dark:bg-gray-900/30">
                    <div className="max-w-4xl mx-auto px-6 lg:px-8">
                        <motion.div
                            variants={fadeInUp}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            className="prose prose-lg dark:prose-invert mx-auto text-center"
                        >
                            <p className="text-2xl md:text-3xl font-medium leading-relaxed text-gray-800 dark:text-gray-200">
                                "{profile.descriptionP1}"
                            </p>
                            <p className="mt-8 text-lg text-gray-600 dark:text-gray-400">
                                {profile.descriptionP2}
                            </p>
                        </motion.div>
                    </div>
                </section>
            )}

            {/* Skills Section */}
            <section className="py-32">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="mb-20 border-b border-gray-200 dark:border-gray-800 pb-8">
                        <h2 className="text-4xl md:text-6xl font-bold tracking-tighter">Expertise</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
                        {skills.map((skill, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.05 }}
                            >
                                <div className="flex justify-between items-end mb-4">
                                    <h3 className="text-xl font-medium">{skill.name}</h3>
                                    <span className="text-sm text-gray-500 font-mono">{skill.level}%</span>
                                </div>
                                <div className="w-full h-1 bg-gray-100 dark:bg-gray-800 overflow-hidden">
                                    <motion.div
                                        className="h-full bg-black dark:bg-white"
                                        initial={{ width: 0 }}
                                        whileInView={{ width: `${skill.level}%` }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 1, ease: "easeOut" }}
                                    />
                                </div>
                                <div className="mt-3 flex gap-2">
                                    {skill.categories.map((cat, i) => (
                                        <span key={i} className="text-xs text-gray-500 uppercase tracking-wider">{cat}</span>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Journey Section */}
            <section className="py-32 bg-black text-white dark:bg-white dark:text-black">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="mb-20">
                        <h2 className="text-4xl md:text-6xl font-bold tracking-tighter">Parcours</h2>
                    </div>

                    <div className="relative border-l border-white/20 dark:border-black/20 ml-4 md:ml-0 md:border-l-0">
                        <div className="space-y-16">
                            {milestones.map((milestone, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    className="relative md:grid md:grid-cols-12 md:gap-8"
                                >
                                    {/* Year */}
                                    <div className="md:col-span-3 mb-2 md:mb-0 pl-8 md:pl-0 md:text-right">
                                        <span className="text-sm font-mono opacity-60">{milestone.year}</span>
                                    </div>

                                    {/* Content */}
                                    <div className="md:col-span-9 pl-8 md:pl-0 md:border-l md:border-white/20 md:dark:border-black/20 md:pl-12 relative">
                                        {/* Dot */}
                                        <div className="absolute left-[-5px] md:left-[-5px] top-2 w-2.5 h-2.5 bg-white dark:bg-black rounded-full ring-4 ring-black dark:ring-white"></div>

                                        <h3 className="text-2xl font-bold mb-4 leading-tight">{milestone.title}</h3>
                                        <p className="text-lg opacity-80 font-light leading-relaxed max-w-3xl">
                                            {milestone.description}
                                        </p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-32 text-center">
                <div className="max-w-3xl mx-auto px-6">
                    <h2 className="text-4xl md:text-5xl font-bold mb-8 tracking-tight">
                        Prêt à créer quelque chose d'unique ?
                    </h2>
                    <div className="flex flex-col sm:flex-row justify-center gap-6">
                        <Link to="/contact" className="px-8 py-4 bg-black dark:bg-white text-white dark:text-black rounded-full font-medium hover:opacity-90 transition-opacity">
                            Me contacter
                        </Link>
                        <Link to="/projects" className="px-8 py-4 border border-gray-200 dark:border-gray-800 rounded-full font-medium hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors">
                            Voir mes projets
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default AboutPage;