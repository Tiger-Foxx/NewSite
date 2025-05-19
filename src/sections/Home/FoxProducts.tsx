import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FoxProduct } from '../../types';

export const FoxProducts: React.FC = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(sectionRef, { once: false, amount: 0.1 });
    const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);

    // Données des produits open source de Fox
    const foxProducts: FoxProduct[] = [
        {
            id: 'mood-music',
            name: 'Mood-Music',
            description: 'Votre playlist Spotify générée automatiquement en fonction de votre humeur du moment.',
            icon: 'https://mood-music.the-fox.tech/icons/mood-192.png',
            tags: ['IA', 'Spotify', 'Web App'],
            liveUrl: 'https://mood-music.the-fox.tech/',
            githubUrl: 'https://github.com/Tiger-Foxx/mood-music-v1',
            buttonText: 'Tester',
            secondaryButtonText: 'Voir le code',
            featured: true
        },
        {
            id: 'nan-cv',
            name: 'NAN-CV',
            description: 'Créateur de CV alimenté par IA qui génère des designs professionnels en quelques minutes.',
            icon: 'https://nancy-cv.vercel.app/assets/nancy-D_KPpY8c.jpg',
            tags: ['IA', 'PDF', 'Gratuit'],
            liveUrl: 'https://nancy-cv.vercel.app/',
            githubUrl: 'https://github.com/theTigerFox/nancy-cv',
            buttonText: 'Créer mon CV',
            secondaryButtonText: 'Voir le code',
            featured: true
        },
        {
            id: 'yt-learn',
            name: 'YT-Learn',
            description: 'Transformez les vidéos YouTube et PDF en jeux éducatifs interactifs avec notre IA.',
            icon: 'https://yt-learn-eight.vercel.app/assets/logo-CUh3ZhgP.png',
            tags: ['IA', 'PWA', 'Windows'],
            liveUrl: 'https://yt-learn.the-fox.tech/',
            githubUrl: 'https://github.com/Tiger-Foxx/yt-learn',
            buttonText: 'Essayer',
            secondaryButtonText: 'Tester maintenant',
            featured: true
        },
        {
            id: 'foxybluelight',
            name: 'FoxyBlueLight',
            description: 'Filtre de lumière bleue intelligent pour Windows, avec réglages automatiques selon l\'heure.',
            icon: 'https://github.com/Tiger-Foxx/BlueLightFox/raw/main/FoxyBlueLight/Resources/logo.png',
            tags: ['Windows', 'Open-Source', 'Santé'],
            liveUrl: 'https://foxy-blue-light.the-fox.tech',
            githubUrl: 'https://github.com/Tiger-Foxx/BlueLightFox',
            buttonText: 'Télécharger',
            secondaryButtonText: 'GitHub',
            featured: true
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

    const titleVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.7,
                ease: [0.6, 0.05, -0.01, 0.9]
            }
        }
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.7,
                ease: [0.6, 0.05, -0.01, 0.9]
            }
        },
        hover: {
            y: -10,
            boxShadow: "0 20px 35px rgba(255, 123, 37, 0.2)",
            transition: {
                duration: 0.3,
                ease: "easeOut"
            }
        }
    };

    return (
        <section
            id="products"
            className="py-20 px-4 sm:px-6 lg:px-8"
            ref={sectionRef}
        >
            <div className="container mx-auto">
                {/* Titre de section */}
                <motion.div
                    className="text-center mb-16"
                    variants={titleVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        Projets en Vedette
                    </h2>
                    <p className="text-lg text-gray-400 max-w-3xl mx-auto">
                        Découvrez des outils innovants déjà utilisés par des milliers d'utilisateurs
                    </p>
                </motion.div>

                {/* Grille de produits */}
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 gap-8"
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                >
                    {foxProducts.map((product) => (
                        <motion.div
                            key={product.id}
                            className="card rounded-xl overflow-hidden product-card"
                            variants={cardVariants}
                            whileHover="hover"
                            onMouseEnter={() => setHoveredProduct(product.id)}
                            onMouseLeave={() => setHoveredProduct(null)}
                        >
                            <div className="md:flex">
                                <div className="md:w-1/3 bg-primary/10 flex items-center justify-center p-6">
                                    <img
                                        src={product.icon}
                                        alt={`${product.name} Icon`}
                                        className="w-20 h-20"
                                    />
                                </div>
                                <div className="md:w-2/3 p-6">
                                    <h3 className="text-xl font-bold text-white mb-2">
                                        {product.name}
                                    </h3>
                                    <p className="text-gray-400 mb-4">
                                        {product.description}
                                    </p>
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {product.tags.map((tag, i) => (
                                            <span
                                                key={i}
                                                className="px-3 py-1 bg-fox-dark text-primary text-xs font-medium rounded-full"
                                            >
                        {tag}
                      </span>
                                        ))}
                                    </div>
                                    <div className="flex space-x-3">
                                        <a
                                            href={product.liveUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="btn btn-primary text-sm"
                                        >
                                            {product.buttonText}
                                        </a>
                                        <a
                                            href={product.githubUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="btn btn-outline text-sm"
                                        >
                                            {product.secondaryButtonText}
                                        </a>
                                    </div>
                                </div>
                            </div>

                            {/* Effet de brillance au survol */}
                            {hoveredProduct === product.id && (
                                <motion.div
                                    className="absolute inset-0 pointer-events-none"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <div
                                        className="absolute inset-0 bg-gradient-to-tr from-transparent via-primary/5 to-transparent"
                                        style={{
                                            backgroundSize: '200% 200%',
                                            animation: 'gradient-animation 3s ease infinite'
                                        }}
                                    />
                                </motion.div>
                            )}
                        </motion.div>
                    ))}
                </motion.div>

                {/* Bouton pour voir tous les projets */}
                <motion.div
                    className="mt-12 text-center"
                    variants={titleVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    transition={{ delay: 0.6 }}
                >
                    <Link
                        to="/projects"
                        className="btn btn-outline px-8 py-3"
                    >
                        Voir tous les projets
                    </Link>
                </motion.div>
            </div>
        </section>
    );
};