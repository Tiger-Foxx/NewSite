import React, { useEffect } from 'react';
import { HeroSection } from "../components/Home/HeroSection.tsx";
import { FeaturedProjects } from "../components/Home/FeaturedProjects.tsx";
import { OpenSourceTools } from "../components/Home/OpenSourceTools.tsx";
import { ServicesSection } from "../components/Home/ServicesSection.tsx";
import { RecentBlogPostsSection } from "../components/Home/RecentBlogPostsSection.tsx";
import { CtaSection } from "../components/Home/CtaSection.tsx";

export const HomeMobile: React.FC = () => {
    // Mise à jour du titre de la page
    useEffect(() => {
        document.title = 'Fox Engineering - Conception & Développement Logiciel Innovant';

        // Animation de fade-in pour la page entière
        const mainContent = document.querySelector('main');
        if (mainContent) {
            mainContent.classList.add('animate-fade-in');
        }

        // Récupération de la section à afficher depuis l'URL si présente
        const hash = window.location.hash;
        if (hash) {
            setTimeout(() => {
                const element = document.querySelector(hash);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                }
            }, 500);
        }

        // Nettoyage
        return () => {
            if (mainContent) {
                mainContent.classList.remove('animate-fade-in');
            }
        };
    }, []);

    return (
        <main className="bg-white dark:bg-black text-black dark:text-white">
            <HeroSection />

            <OpenSourceTools />
            <ServicesSection />
            <RecentBlogPostsSection />
            <FeaturedProjects />
            <CtaSection />
        </main>
    );
};

export default HomeMobile;
