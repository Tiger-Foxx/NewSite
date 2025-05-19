import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ContactForm, ContactInfo, ContactMap } from '../sections/Contact';
import { useApi } from '../hooks';
import { Profile } from '../types';
import { updateMetaTags } from '../utils';

export const ContactPage: React.FC = () => {
    // Charger les informations de profil
    const {
        data: profile,
        loading: profileLoading
    } = useApi<Profile>({
        endpoint: '/api/profile/',
        loadOnMount: true
    });

    // Mettre à jour les meta tags
    useEffect(() => {
        updateMetaTags({
            title: 'Contact',
            description: 'Contactez Fox pour discuter de vos projets de développement, sécurité informatique ou formation.',
            keywords: ['contact', 'développement', 'sécurité informatique', 'formation', 'freelance'],
            type: 'website'
        });
    }, []);

    // Animation de la page
    const pageVariants = {
        initial: { opacity: 0 },
        animate: {
            opacity: 1,
            transition: { duration: 0.5 }
        },
        exit: {
            opacity: 0,
            transition: { duration: 0.3 }
        }
    };

    return (
        <motion.div
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
        >
            {/* En-tête de la page */}
            <header className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 bg-fox-dark relative">
                <div className="fox-gradient-bg absolute inset-0 opacity-30"></div>
                <div className="fox-noise absolute inset-0"></div>

                <div className="container mx-auto relative z-10">
                    <div className="max-w-3xl mx-auto text-center">
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                            Contactez-moi
                        </h1>
                        <p className="text-xl text-gray-300">
                            Vous avez un projet ou une question ? N'hésitez pas à me contacter.
                        </p>
                    </div>
                </div>
            </header>

            {/* Contenu principal */}
            <main className="py-16 px-4 sm:px-6 lg:px-8">
                <div className="container mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Formulaire de contact */}
                        <div className="lg:col-span-2">
                            <ContactForm />
                        </div>

                        {/* Informations de contact */}
                        <div>
                            <ContactInfo profile={profile} loading={profileLoading} />
                        </div>
                    </div>

                    {/* Carte */}
                    <div className="mt-12">
                        <ContactMap />
                    </div>
                </div>
            </main>
        </motion.div>
    );
};