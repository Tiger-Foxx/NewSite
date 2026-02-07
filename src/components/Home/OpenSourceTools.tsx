import React from 'react';
import { motion } from 'framer-motion';

interface OpenSourceProduct {
    id: string;
    name: string;
    description: string;
    iconUrl: string;
    liveUrl: string;
    githubUrl: string;
    buttonText: string;
    secondaryButtonText: string;
    image: string;
}

const openSourceProductsData: OpenSourceProduct[] = [
    {
        id: 'mood-music',
        name: 'Mood-Music',
        description: 'Playlist Spotify générée par IA selon votre humeur.',
        iconUrl: 'https://mood-music-fox.vercel.app/icons/mood-192.png',
        liveUrl: 'https://mood-music.myfox.tech/',
        githubUrl: 'https://github.com/theTigerFox/mood-music',
        buttonText: 'Tester Mood-Music',
        secondaryButtonText: 'Voir le code',
        image: "https://images.unsplash.com/photo-1614680376593-902f74cf0d41?q=80&w=2574&auto=format&fit=crop"
    },
    {
        id: 'nan-cv',
        name: 'NAN-CV',
        description: 'Créez des CV professionnels avec l\'IA en quelques minutes.',
        iconUrl: 'https://nancy-cv.vercel.app/assets/nancy-D_KPpY8c.jpg',
        liveUrl: 'https://nancy-cv.myfox.tech/',
        githubUrl: 'https://github.com/theTigerFox/nancy-cv',
        buttonText: 'Créer mon CV',
        secondaryButtonText: 'Voir le code',
        image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?q=80&w=2670&auto=format&fit=crop"
    },
    {
        id: 'yt-learn',
        name: 'YT-Learn',
        description: 'Transformez vidéos YouTube et PDF en jeux éducatifs interactifs.',
        iconUrl: 'https://yt-learn-eight.vercel.app/assets/logo-CUh3ZhgP.png',
        liveUrl: 'https://yt-learn.myfox.tech/',
        githubUrl: 'https://github.com/Tiger-Foxx/yt-learn',
        buttonText: 'Essayer YT-Learn',
        secondaryButtonText: 'Voir sur GitHub',
        image: "https://cdn.dribbble.com/userupload/40076356/file/original-1a57132eff4b3ab07f585329ba923296.jpg"
    },
    {
        id: 'qualityshoot',
        name: 'QualityShoot',
        description: 'Application desktop qui te permet d\'upscaler tes images et vidéos',
        iconUrl: 'https://github.com/Tiger-Foxx/QualityShoot---frontend/raw/main/src/assets/logo.png',
        liveUrl: 'https://quality-shoot.myfox.tech/',
        githubUrl: 'https://github.com/Tiger-Foxx/QualityShoot---frontend',
        buttonText: 'Télécharger',
        secondaryButtonText: 'Voir sur GitHub',
        image: "https://copyrightalliance.org/wp-content/uploads/2020/05/ThinkstockPhotos-512034218.jpg"
    },
    {
        id: 'openpay',
        name: 'OpenPay',
        description: 'Enfin Savoir Combien Tu Vaux (ou pas) sur le Marché Tech',
        iconUrl: 'https://raw.githubusercontent.com/Tiger-Foxx/openpay/main/public/favicon.png',
        liveUrl: 'https://openpay.myfox.tech',
        githubUrl: 'https://github.com/Tiger-Foxx/openpay',
        buttonText: 'Tester OpenPay',
        secondaryButtonText: 'Voir sur GitHub',
        image: "https://remoly.oss-eu-central-1.aliyuncs.com/storage/default/20240711/afb3f7ee5580aef3a5e4b3d39abf0e256db4d80f.jpg"
    },
    {
        id: 'minou',
        name: 'Minou',
        description: 'Un compagnon virtuel intelligent pour votre bureau',
        iconUrl: 'https://github.com/Tiger-Foxx/minou/raw/main/assets/logo.png',
        liveUrl: 'https://minou.myfox.tech',
        githubUrl: 'https://github.com/Tiger-Foxx/minou',
        buttonText: 'Télécharger',
        secondaryButtonText: 'Voir sur GitHub',
        image: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=2643&auto=format&fit=crop"
    },
    {
        id: 'foxysecurity',
        name: 'FoxySecurity',
        description: 'Système antivirus pour la plateforme Windows',
        iconUrl: 'https://foxy-security.vercel.app/favicon.png',
        liveUrl: 'https://foxy-security.vercel.app',
        githubUrl: 'https://github.com/Tiger-Foxx/Anti-Virus',
        buttonText: 'Télécharger',
        secondaryButtonText: 'Voir sur GitHub',
        image: "https://informatiqueseniors-larochelle.fr/wp-content/uploads/2021/09/meilleurs-antivirus.jpg"
    },
    {
        id: 'foxybluelight',
        name: 'FoxyBlueLight',
        description: 'Filtre de lumière bleue intelligent pour Windows.',
        iconUrl: 'https://github.com/Tiger-Foxx/BlueLightFox/raw/main/FoxyBlueLight/Resources/logo.png',
        liveUrl: 'https://foxy-blue-light.myfox.tech',
        githubUrl: 'https://github.com/Tiger-Foxx/BlueLightFox',
        buttonText: 'Télécharger',
        secondaryButtonText: 'Voir sur GitHub',
        image: "https://www.digitalcheck.com/wp-content/uploads/2024/06/bright-screen-dark-room-1200px.jpg"
    },
    {
        id: 'konan',
        name: 'Konan',
        description: 'Gestionnaire de presse papier persistant pour Windows.',
        iconUrl: 'https://github.com/Tiger-Foxx/Konan/raw/main/screens/fox.png',
        liveUrl: 'https://konan.myfox.tech/',
        githubUrl: 'https://github.com/Tiger-Foxx/Konan',
        buttonText: 'Télécharger',
        secondaryButtonText: 'Voir sur GitHub',
        image: "https://cdnb.artstation.com/p/assets/images/images/029/881/589/large/lilimonada-lilimon-captura-de-pantalla-2020-08-31-a-la-s-19-36-53.jpg?1598920715"
    },
];

export const OpenSourceTools: React.FC = () => {
    return (
        <section className="py-32 bg-white dark:bg-black">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-end mb-20">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-6xl font-bold tracking-tighter text-black dark:text-white"
                    >
                        Open Source <br /> Tools
                    </motion.h2>
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="mt-6 md:mt-0"
                    >
                        <a href="https://github.com/Tiger-Foxx" target="_blank" rel="noopener noreferrer" className="text-sm font-medium border-b border-black dark:border-white pb-1 hover:opacity-50 transition-opacity">
                            Voir tout sur GitHub
                        </a>
                    </motion.div>
                </div>

                <div className="space-y-32">
                    {openSourceProductsData.map((project) => (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.8 }}
                            className="group"
                        >
                            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="block">
                                <div className="relative overflow-hidden rounded-3xl aspect-[16/9] md:aspect-[21/9] mb-8 bg-gray-100 dark:bg-gray-900">
                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500 z-10" />
                                    <img
                                        src={project.image}
                                        alt={project.name}
                                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                                    />

                                    {/* Logo in top right corner */}
                                    <div className="absolute top-6 right-6 z-20 bg-white dark:bg-black p-3 rounded-2xl shadow-xl transform transition-transform duration-500 group-hover:scale-110">
                                        <img
                                            src={project.iconUrl}
                                            alt={`${project.name} icon`}
                                            className="w-10 h-10 object-contain"
                                            onError={(e) => {
                                                const target = e.target as HTMLImageElement;
                                                target.style.display = 'none';
                                            }}
                                        />
                                    </div>
                                </div>

                                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                                    <div>
                                        <h3 className="text-3xl md:text-4xl font-bold text-black dark:text-white mb-2 group-hover:underline decoration-1 underline-offset-4">
                                            {project.name}
                                        </h3>
                                        <p className="text-gray-500 dark:text-gray-400 text-lg md:text-xl max-w-2xl">
                                            {project.description}
                                        </p>
                                    </div>
                                    <div className="flex gap-4">
                                        <span className="px-6 py-3 bg-black dark:bg-white text-white dark:text-black rounded-full text-sm font-medium hover:opacity-90 transition-opacity">
                                            {project.buttonText}
                                        </span>
                                    </div>
                                </div>
                            </a>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
