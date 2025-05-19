import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface Service {
    icon: string;
    title: string;
    description: string;
    features: string[];
}

export const ServicesSection: React.FC = () => {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: false, amount: 0.2 });

    // Liste des services
    const services: Service[] = [
        {
            icon: 'shield-alt',
            title: 'Sécurité Informatique',
            description: 'Audit de sécurité, pentesting, architecture sécurisée et formation pour protéger vos actifs numériques.',
            features: [
                'Tests d\'intrusion',
                'Sécurité des applications',
                'Formation des équipes',
                'Analyse de vulnérabilités'
            ]
        },
        {
            icon: 'code',
            title: 'Développement Logiciel',
            description: 'Applications sur mesure, architecture cloud-native et solutions évolutives pour votre entreprise.',
            features: [
                'Web & Mobile',
                'Desktop & Embedded',
                'API & Microservices',
                'UI/UX Design'
            ]
        },
        {
            icon: 'brain',
            title: 'Intelligence Artificielle',
            description: 'Solutions IA intégrées, machine learning et traitement automatique pour automatiser et optimiser.',
            features: [
                'NLP & Computer Vision',
                'Modèles prédictifs',
                'Automatisation intelligente',
                'Data Mining'
            ]
        }
    ];

    // Variants d'animation
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.3
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.7,
                ease: [0.6, 0.05, -0.01, 0.9]
            }
        }
    };

    // Fonction pour rendre les icônes
    const renderIcon = (icon: string) => {
        switch(icon) {
            case 'shield-alt':
                return (
                    <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                    </svg>
                );
            case 'code':
                return (
                    <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
                    </svg>
                );
            case 'brain':
                return (
                    <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z"></path>
                    </svg>
                );
            default:
                return null;
        }
    };

    return (
        <section
            id="services"
            className="py-20 px-4 sm:px-6 lg:px-8 bg-fox-light/5"
            ref={ref}
        >
            <div className="container mx-auto">
                {/* Titre de section */}
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                    transition={{ duration: 0.7, ease: [0.6, 0.05, -0.01, 0.9] }}
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        Nos Domaines d'Expertise
                    </h2>
                    <p className="text-lg text-gray-400 max-w-3xl mx-auto">
                        Des solutions techniques complètes, de la conception à la mise en production
                    </p>
                </motion.div>

                {/* Cartes de services */}
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                >
                    {services.map((service, index) => (
                        <motion.div
                            key={index}
                            className="card p-8 rounded-xl"
                            variants={itemVariants}
                            whileHover={{ y: -10, transition: { duration: 0.3 } }}
                        >
                            <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mb-6 text-primary">
                                {renderIcon(service.icon)}
                            </div>

                            <h3 className="text-xl font-bold text-white mb-3">
                                {service.title}
                            </h3>

                            <p className="text-gray-400 mb-4">
                                {service.description}
                            </p>

                            <ul className="space-y-2 text-gray-400">
                                {service.features.map((feature, featureIndex) => (
                                    <li key={featureIndex} className="flex items-center">
                                        <svg className="w-5 h-5 text-primary mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                        </svg>
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};