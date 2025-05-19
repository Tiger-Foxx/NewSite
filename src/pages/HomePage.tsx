import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    HeroSection,
    ServicesSection,
    FeaturedProjects,
    FoxProducts,
    TimelinePreview,
    TestimonialsSection,
    CtaSection
} from '../sections/Home';
import { Project, PaginatedResponse } from '../types';
import { useApi } from '../hooks';
import { updateMetaTags } from '../utils';

export const HomePage: React.FC = () => {
    // Charger les projets en vedette
    const { data: projectsData } = useApi<PaginatedResponse<Project>>({
        endpoint: '/api/projects/?featured=true&limit=3',
        loadOnMount: true
    });

    // Mettre à jour les meta tags pour la page d'accueil
    useEffect(() => {
        updateMetaTags({
            title: "Service d'ingénierie Informatique",
            description: "Fox - Développement web, mobile, desktop, sécurité informatique et formation par Arthur Donfack. Solutions sur mesure pour vos projets technologiques.",
            keywords: ['développement web', 'développement mobile', 'sécurité informatique', 'formation', 'ingénierie logicielle'],
            author: 'Fox',
            type: 'website'
        });
        console.log(projectsData)

    }, []);

    // Animation pour la page
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
            {/* Section Hero avec présentation principale */}
            <HeroSection />

            {/* Section Services avec domaines d'expertise */}
            <ServicesSection />

            {/* Section des projets en vedette */}
            <FeaturedProjects />

            {/* Section des produits Fox (outils open source) */}
            <FoxProducts />

            {/* Aperçu de la timeline */}
            <TimelinePreview />

            {/* Témoignages clients */}
            <TestimonialsSection />

            {/* Call to Action */}
            <CtaSection />
        </motion.div>
    );
};