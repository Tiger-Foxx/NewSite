import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ProjectDetail, ProjectGallery } from '../sections/Projects';
import { Project } from '../types';
import { useApi } from '../hooks';
import { updateMetaTags } from '../utils';
import { Loader } from '../sections/Shared';

export const ProjectDetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [project, setProject] = useState<Project | null>(null);

    // Charger le projet
    const {
        data: projectData,
        loading: projectLoading,
        error: projectError
    } = useApi<Project>({
        endpoint: `/api/projects/${id}/`,
        loadOnMount: true
    });

    // Mettre à jour l'état local quand les données sont chargées
    useEffect(() => {
        if (projectData) {
            setProject(projectData);

            // Mettre à jour les meta tags avec les infos du projet
            updateMetaTags({
                title: projectData.nom,
                description: projectData.description,
                image: projectData.photo1_800_x_550,
                keywords: [projectData.categorie, 'projet', 'portfolio', 'fox'],
                author: 'Arthur Donfack',
                type: 'website'
            });
        }
    }, [projectData]);

    // Gérer les erreurs
    useEffect(() => {
        if (projectError) {
            // Rediriger vers 404 si le projet n'existe pas
            navigate('/404', { replace: true });
        }
    }, [projectError, navigate]);

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

    // Afficher le loader pendant le chargement du projet
    if (projectLoading) {
        return <Loader message="Chargement du projet..." />;
    }

    // Si pas de projet, ne rien afficher (la redirection sera gérée par l'effet ci-dessus)
    if (!project) {
        return null;
    }

    // Déterminer si la description contient du HTML
    const isHtmlDescription = project.description.startsWith('<') || project.description.includes('<div') || project.description.includes('<p');

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
                    <div className="max-w-4xl mx-auto text-center">
            <span className="inline-block px-4 py-1 bg-primary/20 text-primary rounded-full text-sm font-medium mb-4">
              {project.categorie}
            </span>

                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                            {project.nom}
                        </h1>

                        {!isHtmlDescription && (
                            <p className="text-xl text-gray-300">
                                {project.description}
                            </p>
                        )}
                    </div>
                </div>
            </header>

            {/* Image principale */}
            <div className="relative -mt-8 mb-12 px-4 sm:px-6 lg:px-8">
                <div className="container mx-auto">
                    <div className="max-w-4xl mx-auto">
                        <div className="relative rounded-xl overflow-hidden shadow-2xl border border-fox-light/20">
                            <img
                                src={project.photo1_800_x_550}
                                alt={project.nom}
                                className="w-full h-auto object-cover"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Contenu du projet */}
            {isHtmlDescription ? (
                <section className="py-16 px-4 sm:px-6 lg:px-8">
                    <div className="container mx-auto">
                        <div className="max-w-4xl mx-auto">
                            {/* Si la description contient du HTML, l'injecter directement */}
                            <div
                                className="prose prose-lg prose-invert max-w-none"
                                dangerouslySetInnerHTML={{ __html: project.description }}
                            />

                            {/* Lien de démo si disponible */}
                            {project.demo && (
                                <div className="mt-12 text-center">
                                    <a
                                        href={project.demo}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center px-6 py-3 bg-primary hover:bg-primary-light text-white font-medium rounded-md transition-colors"
                                    >
                                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                                        </svg>
                                        Voir la démonstration
                                    </a>
                                </div>
                            )}
                        </div>
                    </div>
                </section>
            ) : (
                <ProjectDetail project={project} />
            )}

            {/* Galerie de photos */}
            <ProjectGallery project={project} />
        </motion.div>
    );
};