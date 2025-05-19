import React, { useRef, useState } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';

// Structure pour les compétences
interface SkillCategory {
    name: string;
    description: string;
    skills: Skill[];
}

interface Skill {
    name: string;
    level: number; // 1-5
    color: string;
}

export const AboutSkills: React.FC = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(sectionRef, { once: false, amount: 0.2 });
    const [activeCategory, setActiveCategory] = useState(0);

    // Catégories de compétences
    const skillCategories: SkillCategory[] = [
        {
            name: "Développement Web",
            description: "Création de sites et applications web modernes et performants",
            skills: [
                { name: "React / Next.js", level: 5, color: "#61DAFB" },
                { name: "Vue.js / Nuxt.js", level: 4, color: "#4FC08D" },
                { name: "Node.js / Express", level: 4, color: "#68A063" },
                { name: "Django / Python", level: 5, color: "#092E20" },
                { name: "HTML / CSS / JavaScript", level: 5, color: "#F0DB4F" },
                { name: "TypeScript", level: 4, color: "#007ACC" },
                { name: "Tailwind CSS", level: 5, color: "#38B2AC" },
                { name: "GraphQL", level: 3, color: "#E535AB" }
            ]
        },
        {
            name: "Développement Mobile",
            description: "Applications mobiles natives et cross-platform",
            skills: [
                { name: "Flutter / Dart", level: 5, color: "#0175C2" },
                { name: "React Native", level: 4, color: "#61DAFB" },
                { name: "Android (Java/Kotlin)", level: 3, color: "#3DDC84" },
                { name: "iOS (Swift)", level: 2, color: "#FF2D55" },
                { name: "Firebase", level: 4, color: "#FFCA28" },
                { name: "UI/UX Mobile", level: 4, color: "#FF7B25" }
            ]
        },
        {
            name: "Cybersécurité",
            description: "Protection, audit et sécurisation des systèmes informatiques",
            skills: [
                { name: "Pentesting", level: 4, color: "#FF5252" },
                { name: "Sécurité des applications", level: 5, color: "#69F0AE" },
                { name: "Cryptographie", level: 4, color: "#B388FF" },
                { name: "Analyse de vulnérabilités", level: 5, color: "#EEFF41" },
                { name: "Forensics", level: 3, color: "#FF7B25" },
                { name: "Sécurité réseau", level: 4, color: "#00B0FF" },
                { name: "OSINT", level: 4, color: "#FF6E40" }
            ]
        },
        {
            name: "Intelligence Artificielle",
            description: "Machine learning et traitement automatisé des données",
            skills: [
                { name: "Machine Learning", level: 4, color: "#7B1FA2" },
                { name: "NLP", level: 3, color: "#4FC3F7" },
                { name: "Computer Vision", level: 3, color: "#FF7B25" },
                { name: "TensorFlow / Keras", level: 3, color: "#FF6F00" },
                { name: "PyTorch", level: 3, color: "#EE4C2C" },
                { name: "Data Analysis", level: 4, color: "#3949AB" }
            ]
        }
    ];

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5
            }
        }
    };

    // const tabVariants = {
    //     inactive: { opacity: 0.7, y: 0 },
    //     active: {
    //         opacity: 1,
    //         y: 0,
    //         transition: { duration: 0.5 }
    //     }
    // };

    // Niveau de compétence en texte
    const getLevelText = (level: number): string => {
        switch (level) {
            case 1: return "Débutant";
            case 2: return "Intermédiaire";
            case 3: return "Avancé";
            case 4: return "Expert";
            case 5: return "Maître";
            default: return "N/A";
        }
    };

    return (
        <section
            className="py-20 px-4 sm:px-6 lg:px-8 bg-fox-light/5"
            ref={sectionRef}
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
                        Mes Compétences
                    </h2>
                    <p className="text-lg text-gray-400 max-w-3xl mx-auto">
                        Une expertise variée au service de vos projets technologiques
                    </p>
                </motion.div>

                {/* Onglets de catégories */}
                <motion.div
                    className="flex flex-wrap justify-center gap-4 mb-12"
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                >
                    {skillCategories.map((category, index) => (
                        <motion.button
                            key={category.name}
                            className={`px-6 py-3 rounded-full text-sm font-medium transition-colors ${
                                activeCategory === index
                                    ? 'bg-primary text-white shadow-lg shadow-primary/20'
                                    : 'bg-fox-light/20 text-gray-300 hover:bg-fox-light/30'
                            }`}
                            onClick={() => setActiveCategory(index)}
                            variants={itemVariants}
                            animate={activeCategory === index ? 'active' : 'inactive'}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            {category.name}
                        </motion.button>
                    ))}
                </motion.div>

                {/* Contenu de la catégorie active */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeCategory}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.5 }}
                        className="max-w-4xl mx-auto"
                    >
                        <div className="text-center mb-8">
                            <h3 className="text-2xl font-bold text-white mb-2">
                                {skillCategories[activeCategory].name}
                            </h3>
                            <p className="text-gray-400">
                                {skillCategories[activeCategory].description}
                            </p>
                        </div>

                        <div className="space-y-6">
                            {skillCategories[activeCategory].skills.map((skill, index) => (
                                <div key={skill.name} className="bg-fox-dark rounded-lg p-4 border border-fox-light/10">
                                    <div className="flex justify-between items-center mb-2">
                                        <h4 className="text-white font-medium">{skill.name}</h4>
                                        <span className="text-gray-400 text-sm">{getLevelText(skill.level)}</span>
                                    </div>

                                    <div className="h-2 bg-fox-light/20 rounded-full overflow-hidden">
                                        <motion.div
                                            className="h-full rounded-full"
                                            style={{ backgroundColor: skill.color || '#FF7B25' }}
                                            initial={{ width: 0 }}
                                            animate={{ width: `${skill.level * 20}%` }}
                                            transition={{ duration: 1, delay: index * 0.1 }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>
        </section>
    );
};