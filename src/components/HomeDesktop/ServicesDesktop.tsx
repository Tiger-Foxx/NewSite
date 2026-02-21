import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Expanded with actual tech logo items
const services = [
    { 
        title: "Développement Web", 
        desc: "Création d'expériences web interactives et performantes.", 
        img: "https://images.unsplash.com/photo-1547658719-da2b51169166?q=80&w=2664&auto=format&fit=crop", 
        techs: [
            "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg",
            "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg",
            "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg",
            "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg",
            "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vuejs/vuejs-original.svg",
            "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/angular/angular-original.svg",
            "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/graphql/graphql-plain.svg"
        ] 
    },
    { 
        title: "Applications Mobiles", 
        desc: "Le natif et cross-platform repoussés dans leurs retranchements pour une expérience premium.", 
        img: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=2670&auto=format&fit=crop", 
        techs: [
            "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/flutter/flutter-original.svg",
            "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/swift/swift-original.svg",
            "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/kotlin/kotlin-original.svg",
            "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/android/android-original.svg",
            "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/apple/apple-original.svg",
            "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg"
        ] 
    },
    { 
        title: "Sécurité Informatique", 
        desc: "Des architectures blindées contre toute compromission. Audit strict et rigoureux.", 
        img: "https://www.kaspersky.fr/content/fr-fr/images/repository/isc/2020/cyber-security-article.jpg", 
        techs: [
            "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/linux/linux-original.svg",
            "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/bash/bash-original.svg",
            "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg",
            "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/ubuntu/ubuntu-original.svg",
            "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nginx/nginx-original.svg",
            "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg",
            "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cloudflare/cloudflare-original.svg"
        ] 
    },
    { 
        title: "Applications Desktop", 
        desc: "La puissance brute au service des professionnels. Mac, Windows, Linux.", 
        img: "https://static0.makeuseofimages.com/wordpress/wp-content/uploads/2018/08/turn-website-into-mac-app.jpg?q=70&fit=crop&w=1200&h=628&dpr=1", 
        techs: [
            "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/electron/electron-original.svg",
            "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg",
            "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/rust/rust-original.svg",
            "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg",
            "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/csharp/csharp-original.svg",
            "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/windows8/windows8-original.svg"
        ] 
    },
    { 
        title: "Intelligence Artificielle", 
        desc: "L'intégration pragmatique d'algorithmes qui pensent plus vite que vous.", 
        img: "https://media.lesechos.com/api/v1/images/view/653a4cfe51a0607f6f18420f/1280x720/352689-intelligence-artificielle-vers-l-entreprise-augmentee-web-tete-0901733887588.jpg", 
        techs: [
            "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg",
            "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tensorflow/tensorflow-original.svg",
            "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/pytorch/pytorch-original.svg",
            "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/pandas/pandas-original.svg",
            "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/numpy/numpy-original.svg",
            "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/scikitlearn/scikitlearn-original.svg"
        ] 
    },
    { 
        title: "Conseil & Formation", 
        desc: "Transfert d'excellence architecturale pour renforcer vos équipes.", 
        img: "https://www.moncompteformation.gouv.fr/espace-public/sites/mcf/files/2025-11/Conseiller%20en%20%C3%A9volution%20professionnel.jpg", 
        techs: [
            "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/jira/jira-original.svg",
            "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg",
            "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/gitlab/gitlab-original.svg",
            "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/confluence/confluence-original.svg",
            "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/trello/trello-original.svg",
            "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/slack/slack-original.svg"
        ] 
    }
];

export const ServicesDesktop: React.FC = () => {
    const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

    return (
        <section className="py-20 lg:py-40 bg-[#050505] text-white border-t-[1px] border-white/10 relative">
            <div className="container mx-auto px-8 lg:px-16 flex flex-col md:flex-row gap-20 lg:gap-32 relative z-10 w-full">
                
                {/* Left Column (Wrapper is flexible, allowing inner content to stick) */}
                <div className="md:w-5/12 relative">
                    {/* Inner sticky content */}
                    <div className="sticky top-32 h-[calc(100vh-10rem)] flex flex-col justify-center">
                        <motion.div 
                            className="flex flex-col gap-10"
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 1, ease: 'easeOut' }}
                        >
                            <div>
                                <h2 className="text-[6vw] lg:text-[5vw] font-black uppercase tracking-tighter leading-none mb-6">
                                    Xpertise.
                                </h2>
                                <div className="w-16 h-[2px] bg-white mb-8" />
                                <p className="text-xl font-light text-gray-400 max-w-sm">
                                    Une maîtrise technique absolue, forgée par des années d'ingénierie stricte et d'innovation.
                                </p>
                            </div>
                            
                            {/* Dynamic Image Container - Fixed perfectly aspect ratio and sticky layout */}
                            <div className="relative w-full aspect-square max-h-[50vh] mt-10 overflow-hidden shadow-2xl">
                                <AnimatePresence mode="wait">
                                    {hoveredIdx !== null ? (
                                        <motion.img
                                            key={hoveredIdx}
                                            src={services[hoveredIdx].img}
                                            alt={services[hoveredIdx].title}
                                            initial={{ opacity: 0, scale: 1.1 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0 }}
                                            transition={{ duration: 0.5 }}
                                            className="absolute inset-0 w-full h-full object-cover filter grayscale-85 hover:grayscale-0 transition-all duration-700"
                                        />
                                    ) : (
                                        <motion.div 
                                            key="empty"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            className="absolute inset-0 flex items-center justify-center overflow-hidden bg-[#0A0A0A]"
                                        >
                                            <img 
                                                // Using the actual profile image as requested by the user.
                                                src="/profile.webp" 
                                                alt="Profile" 
                                                className="absolute inset-0 w-full h-full object-cover opacity-80 filter grayscale transition-all duration-700 hover:grayscale-0"
                                                onError={(e) => {
                                                    const target = e.target as HTMLImageElement;
                                                    target.onerror = null;
                                                    target.src = 'https://images.unsplash.com/photo-1550439062-609e1531270e?q=80&w=2670&auto=format&fit=crop';
                                                }}
                                            />
                                            <div className="absolute inset-0 bg-black/20" />
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* Right Column (Scrolls naturally) */}
                <div className="md:w-7/12 flex flex-col py-10 w-full">
                    {services.map((service, idx) => (
                        <motion.div 
                            className="group border-b-[1px] border-white/10 py-16 flex flex-col justify-center relative hover:bg-white transition-colors duration-700 px-6 sm:px-10 lg:-mx-10 cursor-pointer"
                            key={idx}
                            onMouseEnter={() => setHoveredIdx(idx)}
                            onMouseLeave={() => setHoveredIdx(null)}
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.8, delay: idx * 0.1 }}
                        >
                            <span className="text-sm font-bold tracking-[0.2em] text-gray-500 mb-6 block group-hover:text-black transition-colors duration-700">0{idx + 1}</span>
                            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6 gap-6">
                                <h3 className="text-3xl lg:text-4xl xl:text-5xl font-black uppercase tracking-tighter group-hover:text-black transition-colors duration-700 w-full lg:w-8/12 break-words">
                                    {service.title}
                                </h3>
                                {/* Used actual tech logos as requested */}
                                <div className="flex flex-wrap items-center justify-end gap-3 opacity-50 group-hover:opacity-100 transition-opacity duration-700 bg-white/5 p-3 rounded-lg group-hover:bg-black/5 lg:w-4/12">
                                    {service.techs.map((techImg, i) => (
                                        <img key={i} src={techImg} alt="tech logo" className="w-5 h-5 lg:w-6 lg:h-6 object-contain" />
                                    ))}
                                </div>
                            </div>
                            <p className="text-lg lg:text-xl font-light text-gray-400 group-hover:text-gray-800 transition-colors duration-700 w-full lg:w-4/5">
                                {service.desc}
                            </p>
                        </motion.div>
                    ))}
                </div>

            </div>
        </section>
    );
};
