import React from 'react';
import { motion } from 'framer-motion';

interface Service {
    icon: React.ReactNode;
    title: string;
    description: string;
}

export const ServicesSection: React.FC = () => {
    const services: Service[] = [
        {
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
            ),
            title: "Développement Web",
            description: "Création de sites et applications web modernes, performants et accessibles avec les technologies les plus récentes. React, Vue.js, Node.js."
        },
        {
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
            ),
            title: "Applications Mobiles",
            description: "Développement d'applications mobiles natives et cross-platform pour iOS et Android avec Flutter, React Native et Swift UI."
        },
        {
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
            ),
            title: "Sécurité Informatique",
            description: "Audits de sécurité, tests d'intrusion et mise en place de solutions de protection pour vos infrastructures et applications."
        },
        {
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
            ),
            title: "Applications Desktop",
            description: "Développement d'applications de bureau cross-platform pour Windows, macOS et Linux avec Electron, .NET et technologies natives."
        },
        {
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                </svg>
            ),
            title: "Intelligence Artificielle",
            description: "Intégration d'IA et de Machine Learning dans vos produits pour automatiser les tâches et améliorer la prise de décision."
        },
        {
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
            ),
            title: "Conseil & Formation",
            description: "Accompagnement technique, architecture logicielle et formations personnalisées pour vos équipes techniques et décisionnelles."
        }
    ];

    return (
        <section className="py-32 bg-gray-50 dark:bg-black border-t border-gray-200 dark:border-gray-900">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="mb-20">
                    <h2 className="text-4xl md:text-6xl font-bold tracking-tighter text-black dark:text-white mb-6">
                        Expertise
                    </h2>
                    <div className="w-full h-px bg-gray-200 dark:bg-gray-800" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16">
                    {services.map((service, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="group"
                        >
                            <div className="mb-6 text-black dark:text-white opacity-80 group-hover:opacity-100 transition-opacity duration-300 transform group-hover:scale-110 origin-left">
                                {service.icon}
                            </div>
                            <h3 className="text-2xl font-semibold text-black dark:text-white mb-4 flex items-center">
                                {service.title}
                            </h3>
                            <p className="text-lg text-gray-600 dark:text-gray-400 pl-6 border-l border-gray-200 dark:border-gray-800 group-hover:border-black dark:group-hover:border-white transition-colors duration-300">
                                {service.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};