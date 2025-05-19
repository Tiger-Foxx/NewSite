import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { AboutHero, AboutSkills, AboutTimeline } from '../sections/About';
import { TestimonialsSection } from '../sections/Home';
import { Profile, Timeline} from '../types';
import { useApi } from '../hooks';
import { updateMetaTags } from '../utils';

export const AboutPage: React.FC = () => {
    // Charger le profil
    const {
        data: profile,
        loading: profileLoading
    } = useApi<Profile>({
        endpoint: '/api/profile/',
        loadOnMount: true
    });

    // Charger la timeline
    const {
        data: timelineData,
        loading: timelineLoading
    } = useApi<Timeline[]>({
        endpoint: '/api/timeline/',
        loadOnMount: true
    });

    // Mettre à jour les meta tags
    useEffect(() => {
        updateMetaTags({
            title: 'À propos',
            description: 'Découvrez mon parcours, mes compétences en développement et en sécurité informatique, et ma philosophie de travail.',
            keywords: ['à propos', 'parcours', 'compétences', 'développement', 'sécurité informatique'],
            author: 'Arthur Donfack',
            type: 'profile'
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
            {/* Hero section avec photo et description */}
            <AboutHero profile={profile} loading={profileLoading} />

            {/* Compétences */}
            <AboutSkills />

            {/* Timeline du parcours */}
            <AboutTimeline
                timeline={timelineData || []}
                loading={timelineLoading}
            />

            {/* Témoignages */}
            <TestimonialsSection />
        </motion.div>
    );
};