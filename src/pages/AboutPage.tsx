import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useApi } from '../hooks/useApi';
import { Profile } from '../types';
import { Link } from 'react-router-dom';
import { ImageWithSkeleton } from '../components/ui/ImageWithSkeleton';
import { Github, Linkedin, ArrowRight } from 'lucide-react';
import meImage from '../assets/images/me.png';

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

    // Skills pour la section compétences avec logos (depuis devicon)
    const skills = [
        { name: 'Software engineering', level: 98, categories: ['PC', 'Mobile', 'web'], icons: ['https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg', 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg', 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg', 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/flutter/flutter-original.svg'] },
        { name: 'Cyber-sec RED-TEAM', level: 92, categories: ['Hacking'], icons: ['https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/bash/bash-original.svg', 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg', 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/linux/linux-original.svg'] },
        { name: 'Cyber-sec BLUE-TEAM', level: 82, categories: ['Security'], icons: ['https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/ubuntu/ubuntu-original.svg', 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg', 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cloudflare/cloudflare-original.svg'] },
        { name: 'UX/UI Design', level: 78, categories: ['Design'], icons: ['https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg', 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/illustrator/illustrator-plain.svg'] },
        { name: 'DevOps', level: 70, categories: ['Infra', 'CI/CD'], icons: ['https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg', 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg', 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/gitlab/gitlab-original.svg'] },
        { name: 'Machine Learning', level: 75, categories: ['IA'], icons: ['https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg', 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tensorflow/tensorflow-original.svg', 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/pytorch/pytorch-original.svg'] },
        { name: 'Management', level: 99, categories: ['collaboration'], icons: ['https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/jira/jira-original.svg', 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/trello/trello-original.svg', 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/slack/slack-original.svg'] }
    ];

    // Milestones de carrière originaux textuellement préservés
    const milestones = [
        {
            year: 'Today !',
            title: 'JE ME FORME AUX OUTILS D\'IA ET JE MENE UN CERTAIN PROJET DE RECHERCHE',
            description: 'Oui, le monde de la recherche m\'ouvre ses portes et je dois dire qu\'il est plutôt intéressant... pour le moment le projet reste secret mais bientôt on en parle'
        },
        {
            year: 'Août 2024 - Août 2025',
            title: 'JE BOOSTE TOUT AU MACHINE LEARNING/IA',
            description: 'Oui, je sais : \'Toujours eu du mal à me poser exactement dans mon domaine tranquille\', il faut toujours que je l\'affine avec d\'autres.'
        },
        {
            year: 'Sept 2023 - Juin 2024',
            title: 'La Cyber, c\'est mon univers',
            description: 'Ces derniers mois, et années ma passion pour la cybersécurité est devenue mon focus principal. J\'ai développé plusieurs outils spécialisés.'
        },
        {
            year: 'Fév 2024 - Mai 2024',
            title: 'Immergé Spring Boot, JEE... etc',
            description: 'Un réseau social scolaire ou encore une application de monétisation. Ce fut une période où j\'ai vraiment mis les bouchées doubles dans les technos java, et en Front niveau JS halala que c\'était bon. Bien sûr la cyber-sécu est restée ma passion principale'
        },
        {
            year: 'Août 2023 - Jan 2024',
            title: 'Une drôle de Passion pour le machine learning avancé',
            description: 'Étant un grand Passionné de cyber, j\'ai toujours eu l\'habitude de toucher un peu à tout. Mais si on m\'avait dit que le ML allait m\'intéresser autant...'
        },
        {
            year: 'Fév 2022 - Juil 2023',
            title: 'Développement Mobile... Flutter',
            description: 'Avec Flutter, j\'ai pu enchaîner les projets, notamment pour des clients dans le monde de la crypto. Une réalisation dont je suis particulièrement fier dans cette période est Zenfamili mon bébé'
        },
        {
            year: 'Sept 2021 - Janv 2022',
            title: 'Développement Web... c\'était le moment',
            description: 'Ah, Django ! J\'ai passé ces mois à travailler sur des projets persos à but non lucratif et d\'autres pour des clients, je me demande bien pourquoi je suis tant obnubilé par cette techno.'
        },
        {
            year: 'Juin 2020 - Août 2021',
            title: 'Ingénieur Logiciel niveau galactique',
            description: 'Que ce soit pour des jeux vidéo, des outils ou des utilitaires avancés, Python était mon langage de prédilection pour ce genre de travaux.'
        },
    ];

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-[#050505]">
                <div className="w-16 h-16 border-t-2 border-white rounded-full animate-spin"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-black p-4 text-white font-mono">
                Erreur de chargement: {error.message}
            </div>
        );
    }

    return (
        <main className="bg-white dark:bg-[#050505] min-h-screen text-black dark:text-white selection:bg-black selection:text-white dark:selection:bg-white dark:selection:text-black overflow-hidden font-sans pt-24 lg:pt-32">
            
            {/* HERO SECTION - Brutalist & Massive */}
            <section className="px-6 md:px-12 lg:px-20 mb-32">
                <div className="flex flex-col lg:flex-row items-start justify-between gap-12 border-b-[2px] border-black dark:border-white pb-20">
                    
                    {/* Typographie Calibrée et Élégante */}
                    <div className="w-full lg:w-3/5">
                        <motion.h1 
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 leading-tight"
                        >
                            Hello, I'm <br/>
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-500 to-black dark:from-white dark:to-gray-600">
                                {profile?.nom || "Fox"}
                            </span>
                        </motion.h1>

                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 1, delay: 0.5 }}
                            className="flex flex-col gap-6"
                        >
                            <p className="text-xl md:text-2xl font-light tracking-wide max-w-2xl text-gray-500">
                                {profile?.sousTitre || "Engineering Scientist passionné par l'innovation et la création de solutions performantes."}
                            </p>
                            
                            <div className="flex gap-4">
                                {profile?.github && (
                                    <a href={profile.github} target="_blank" rel="noopener noreferrer" className="p-3 border border-gray-300 dark:border-gray-700 hover:border-black dark:hover:border-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors rounded-full">
                                        <Github className="w-5 h-5" />
                                    </a>
                                )}
                                {profile?.linkedIn && (
                                    <a href={profile.linkedIn} target="_blank" rel="noopener noreferrer" className="p-3 border border-gray-300 dark:border-gray-700 hover:border-black dark:hover:border-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors rounded-full">
                                        <Linkedin className="w-5 h-5" />
                                    </a>
                                )}
                            </div>
                            
                            {/* Petite photo Pop Culture / Hacker Vibes */}
                            <div className="mt-6 md:mt-10 lg:mt-12 group/pop flex items-start">
                                <div className="p-2 rounded-2xl bg-gray-50/50 dark:bg-zinc-900/50 border border-gray-200 dark:border-zinc-800 backdrop-blur-sm">
                                    <img 
                                        src="https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=600&auto=format&fit=crop" 
                                        alt="Matrix Code / Hacker Aesthetic"
                                        className="h-24 md:h-32 w-auto max-w-[200px] object-cover rounded-xl filter grayscale group-hover/pop:grayscale-0 transition-all duration-700 shadow-sm"
                                    />
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Image Profil Modérée */}
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                        className="w-full lg:w-2/5 aspect-[4/5] relative overflow-hidden group"
                    >
                        <ImageWithSkeleton 
                            src={meImage}
                            alt="Fox Profile"
                            className="w-full h-full object-cover filter grayscale-75 transition-all duration-700 group-hover:grayscale-0"
                            containerClassName="rounded-3xl shadow-2xl"
                        />
                        <div className="absolute inset-0 border-[2px] border-black/10 dark:border-white/10 rounded-3xl pointer-events-none z-10" />
                        
                        {profile?.cv && (
                            <a href={profile.cv} target="_blank" rel="noopener noreferrer" className="absolute bottom-6 right-6 z-20 px-6 py-3 bg-white dark:bg-black text-black dark:text-white font-bold tracking-widest text-xs shadow-xl rounded-full hover:scale-105 transition-transform">
                                CV
                            </a>
                        )}
                    </motion.div>
                </div>
            </section>

            {/* BIO QUOTE */}
            {profile && (
                <section className="px-6 md:px-12 lg:px-20 mb-32">
                    <motion.div 
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8 }}
                        className="max-w-4xl mx-auto text-center"
                    >
                        <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold leading-relaxed mb-8 text-black dark:text-white">
                            "{profile.descriptionP1}"
                        </h2>
                        <div className="w-24 h-1 bg-gray-300 dark:bg-gray-700 mx-auto mb-8" />
                        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 leading-relaxed font-light">
                            {profile.descriptionP2}
                        </p>
                    </motion.div>
                </section>
            )}

            {/* EXPERTISE GRID */}
            <section className="bg-gray-50 dark:bg-gray-900/30 py-32 px-6 md:px-12 lg:px-20 mb-32">
                <div className="max-w-7xl mx-auto">
                    <div className="mb-20 border-b border-gray-200 dark:border-gray-800 pb-8">
                        <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Expertise</h2>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
                        {skills.map((skill, index) => (
                            <motion.div 
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.05 }}
                            >
                                <div className="flex justify-between items-end mb-4">
                                    <div className="flex items-center gap-3">
                                        <h3 className="text-xl font-medium">{skill.name}</h3>
                                    </div>
                                    <span className="text-sm text-gray-500 font-mono">{skill.level}%</span>
                                </div>
                                <div className="w-full h-1 bg-gray-200 dark:bg-gray-800 overflow-hidden rounded-full mb-3">
                                    <motion.div
                                        className="h-full bg-black dark:bg-white rounded-full"
                                        initial={{ width: 0 }}
                                        whileInView={{ width: `${skill.level}%` }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 1, ease: "easeOut" }}
                                    />
                                </div>
                                <div className="flex flex-wrap items-center justify-between gap-2 mt-4">
                                    <div className="flex gap-2">
                                        {skill.categories.map((cat, i) => (
                                            <span key={i} className="text-xs text-gray-500 uppercase tracking-wider">
                                                {cat} {i < skill.categories.length - 1 && '•'}
                                            </span>
                                        ))}
                                    </div>
                                    <div className="flex gap-2 bg-gray-100 dark:bg-gray-800 p-1.5 rounded-lg border border-gray-200 dark:border-gray-700">
                                        {skill.icons.map((icon, i) => (
                                            <img key={i} src={icon} alt="tech logo" className="w-5 h-5 object-contain filter drop-shadow-sm grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500" />
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* JOURNEY LOG */}
            <section className="px-6 md:px-12 lg:px-20 mb-40">
                <div className="mb-24 flex items-end justify-between border-b-[2px] border-black dark:border-white pb-6">
                    <h2 className="text-5xl md:text-[6vw] font-black uppercase tracking-tighter leading-none">
                        PARCOURS.
                    </h2>
                    <span className="text-sm font-bold uppercase tracking-widest text-gray-500 hidden md:block">
                        HISTORIQUE DES MISSIONS
                    </span>
                </div>

                <div className="space-y-0">
                    {milestones.map((milestone, index) => (
                        <motion.div 
                            key={index}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.8 }}
                            className="flex flex-col lg:flex-row gap-8 lg:gap-16 py-16 border-b border-gray-200 dark:border-zinc-800 hover:bg-gray-50 dark:hover:bg-zinc-900/50 transition-colors px-6 lg:-mx-6 cursor-default group"
                        >
                            <div className="lg:w-1/4 shrink-0">
                                <span className="text-2xl font-mono font-bold text-gray-400 group-hover:text-black dark:group-hover:text-white transition-colors block">
                                    {milestone.year}
                                </span>
                            </div>
                            
                            <div className="lg:w-3/4">
                                {/* Title exactly as user asked */}
                                <h3 className="text-2xl md:text-3xl font-bold tracking-tight leading-snug mb-4">
                                    {milestone.title}
                                </h3>
                                {/* Description exactly as user asked */}
                                <p className="text-xl font-light text-gray-600 dark:text-gray-400 leading-relaxed max-w-3xl">
                                    {milestone.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* CTA Brutalist Block */}
            <section className="px-6 md:px-12 lg:px-20 mb-32 flex justify-center">
                <Link 
                    to="/contact"
                    className="group relative flex flex-col md:flex-row items-center justify-center w-full max-w-5xl aspect-video md:aspect-[21/9] border-[2px] border-black dark:border-white overflow-hidden bg-white dark:bg-[#050505]"
                >
                    <div className="absolute inset-0 bg-black dark:bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out z-0" />
                    <div className="relative z-10 flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 mix-blend-difference text-white">
                        <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight text-center px-4">
                            Prêt à créer quelque chose d'unique ?
                        </h2>
                        <ArrowRight className="w-10 h-10 md:w-16 md:h-16 group-hover:translate-x-4 transition-transform duration-300" />
                    </div>
                </Link>
            </section>
        </main>
    );
};

export default AboutPage;