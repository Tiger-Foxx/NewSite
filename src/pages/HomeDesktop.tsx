import React, { useEffect, useRef } from 'react';
import { HeroDesktop } from '../components/HomeDesktop/HeroDesktop';
import { ProjectsDesktop } from '../components/HomeDesktop/ProjectsDesktop';
import { ServicesDesktop } from '../components/HomeDesktop/ServicesDesktop';
import { OpenSourceDesktop } from '../components/HomeDesktop/OpenSourceDesktop';
import { BlogDesktop } from '../components/HomeDesktop/BlogDesktop';
import { CtaSection } from '../components/Home/CtaSection';
import { motion, useScroll, useTransform } from 'framer-motion';
import Lottie from 'lottie-react';
import foxZen from '../assets/lotties/fox-zen.json';

export const HomeDesktop: React.FC = () => {
    useEffect(() => {
        document.title = 'Fox Engineering - The Avant-Garde of Software';
    }, []);

    const containerRef = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll();

    // The Fox stays strictly on the right side and shrinks to half its size when scrolling down
    const lottieScale = useTransform(scrollYProgress, [0, 1], [1, 0.2]);

    return (
        <main ref={containerRef} className="bg-white dark:bg-[#050505] text-black dark:text-white min-h-screen relative overflow-x-clip">
            
            {/* The Fox Animation - Strictly bound to right, large base size, halves on scroll */}
            <motion.div 
                className="fixed right-0 top-[10vh] w-[45vw] md:w-[35vw] max-w-[500px] pointer-events-none z-30 origin-top-right"
                style={{ scale: lottieScale }}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1.5, ease: "easeOut", delay: 1 }}
            >
                <div className="absolute inset-0 bg-white/10 dark:bg-black/10 blur-[50px] rounded-full" />
                <Lottie animationData={foxZen} loop={true} className="relative z-10 filter drop-shadow-2xl" />
            </motion.div>

            <HeroDesktop />
            <OpenSourceDesktop />
            <ServicesDesktop />
            <BlogDesktop />
            <ProjectsDesktop />
            <CtaSection />
        </main>
    );
};

export default HomeDesktop;
