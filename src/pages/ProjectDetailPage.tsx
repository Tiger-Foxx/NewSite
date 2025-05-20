import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useApi } from '../hooks/useApi';
import { Project } from '../types';
import DOMPurify from 'dompurify';

export const ProjectDetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [project, setProject] = useState<Project | null>(null);
    const [relatedProjects, setRelatedProjects] = useState<Project[]>([]);
    const [activeImageIndex, setActiveImageIndex] = useState<number>(0);

    // Récupérer le projet par son ID
    const {
        data: projectData,
        loading: projectLoading,
        error: projectError
    } = useApi<Project>({
        endpoint: `/api/projects/${id}/`,
        loadOnMount: true
    });

    // Fonction pour déterminer si la description est du HTML
    const isHTML = (str: string): boolean => {
        return /<[a-z][\s\S]*>/i.test(str);
    };

    // Mettre à jour les données quand le projet est chargé
    useEffect(() => {
        if (projectData) {
            setProject(projectData);
            document.title = `${projectData.nom} - Fox Engineering`;

            // Mettre à jour les méta-tags
            const metaDescription = document.querySelector('meta[name="description"]');
            if (metaDescription && projectData.description) {
                metaDescription.setAttribute('content', projectData.description);
            }

            // Charger des projets liés par catégorie
            const relatedEndpoint = `/api/projects/?categorie=${projectData.categorie}&limit=3&exclude=${projectData.id}`;
            fetchRelatedProjects(relatedEndpoint);
        }
    }, [projectData]);

    // Fonction pour charger les projets liés
    const fetchRelatedProjects = async (endpoint: string) => {
        try {
            const response = await fetch(endpoint);
            if (response.ok) {
                const data = await response.json();
                setRelatedProjects(data.results || []);
            }
        } catch (error) {
            console.error('Erreur lors du chargement des projets liés:', error);
        }
    };

    // Gérer les erreurs
    useEffect(() => {
        if (projectError) {
            // Rediriger vers 404 si le projet n'existe pas
            navigate('/404', { replace: true });
        }
    }, [projectError, navigate]);

    // Formatter la date
    const formatDate = (dateString: string | undefined): string => {
        if (!dateString) return 'Date inconnue';
        return new Date(dateString).toLocaleDateString('fr-FR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    // Extraire les technologies à partir de la chaîne
    // const getTechnologies = (techString?: string): string[] => {
    //     if (!techString) return [];
    //     return techString.split(',').map(tech => tech.trim()).filter(Boolean);
    // };

    // Obtenir toutes les images du projet en un tableau
    const getProjectImages = (project: Project): string[] => {
        const images: string[] = [];

        if (project.photo1_800_x_550) images.push(project.photo1_800_x_550);
        if (project.photo2_800_x_550) images.push(project.photo2_800_x_550);
        if (project.photo3_800_x_550) images.push(project.photo3_800_x_550);


        return images;
    };

    // Animation variants
    const fadeInUp = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: "easeOut" }
        }
    };

    // Afficher le loader pendant le chargement
    if (projectLoading) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-white dark:bg-black">
                <div className="flex flex-col items-center">
                    <div className="w-16 h-16 border-t-4 border-b-4 border-black dark:border-white rounded-full animate-spin"></div>
                    <p className="mt-4 text-black dark:text-white">Chargement du projet...</p>
                </div>
            </div>
        );
    }

    // Gérer le cas où le projet n'est pas trouvé
    if (!project && !projectLoading) {
        return null; // La redirection sera gérée par l'effet ci-dessus
    }

    return (
        <main className="bg-white dark:bg-black min-h-screen">
            {project && (
                <>
                    {/* Header du projet */}
                    <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden">
                        <div className="absolute inset-0 opacity-[0.03] bg-[url('/noise.png')] dark:opacity-[0.02]"></div>

                        {/* Image d'en-tête en arrière-plan */}
                        {project.photo1_800_x_550 && (
                            <div className="absolute inset-0 opacity-20 dark:opacity-10">
                                <img
                                    src={project.photo1_800_x_550}
                                    alt={project.nom}
                                    className="w-full h-full object-cover filter blur-sm"
                                />
                                <div className="absolute inset-0 bg-gradient-to-b from-white via-white to-transparent dark:from-black dark:via-black dark:to-transparent"></div>
                            </div>
                        )}

                        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                            <motion.div
                                className="text-center"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                            >
                <span className="inline-block px-3 py-1 text-xs font-medium uppercase tracking-wider bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full mb-4">
                  {project.categorie}
                </span>
                                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-black dark:text-white mb-6 leading-tight">
                                    {project.nom}
                                </h1>

                                <div className="flex flex-wrap justify-center items-center text-sm text-gray-600 dark:text-gray-400 mb-8 gap-4">


                                    {project.date && (
                                        <div className="flex items-center">
                                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                            <span>{formatDate(project.date)}</span>
                                        </div>
                                    )}


                                </div>
                            </motion.div>
                        </div>
                    </section>

                    {/* Galerie d'images */}
                    <section className="py-6 bg-white dark:bg-black">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <motion.div
                                className="bg-gray-50 dark:bg-gray-900/70 rounded-xl overflow-hidden shadow-lg"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                            >
                                {/* Image principale */}
                                <div className="aspect-[16/9] relative overflow-hidden">
                                    {getProjectImages(project).map((image, index) => (
                                        <div
                                            key={index}
                                            className={`absolute inset-0 transition-opacity duration-500 ${
                                                index === activeImageIndex ? 'opacity-100' : 'opacity-0'
                                            }`}
                                        >
                                            <img
                                                src={image}
                                                alt={`${project.nom} - Vue ${index + 1}`}
                                                className="w-full h-full object-cover"
                                                onError={(e) => {
                                                    const target = e.target as HTMLImageElement;
                                                    target.onerror = null;
                                                    target.src = '/images/fallback-project.jpg';
                                                }}
                                            />
                                        </div>
                                    ))}

                                    {/* Boutons de navigation */}
                                    {getProjectImages(project).length > 1 && (
                                        <>
                                            <button
                                                className="absolute left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 hover:bg-black/70 text-white flex items-center justify-center focus:outline-none"
                                                onClick={() => setActiveImageIndex(prev =>
                                                    prev === 0 ? getProjectImages(project).length - 1 : prev - 1
                                                )}
                                            >
                                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
                                                </svg>
                                            </button>
                                            <button
                                                className="absolute right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 hover:bg-black/70 text-white flex items-center justify-center focus:outline-none"
                                                onClick={() => setActiveImageIndex(prev =>
                                                    prev === getProjectImages(project).length - 1 ? 0 : prev + 1
                                                )}
                                            >
                                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                                                </svg>
                                            </button>
                                        </>
                                    )}
                                </div>

                                {/* Miniatures */}
                                {getProjectImages(project).length > 1 && (
                                    <div className="flex overflow-x-auto py-4 px-2 space-x-2 scrollbar-hide">
                                        {getProjectImages(project).map((image, index) => (
                                            <button
                                                key={index}
                                                className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden focus:outline-none ${
                                                    index === activeImageIndex
                                                        ? 'ring-2 ring-black dark:ring-white'
                                                        : 'opacity-70 hover:opacity-100'
                                                }`}
                                                onClick={() => setActiveImageIndex(index)}
                                            >
                                                <img
                                                    src={image}
                                                    alt={`Miniature ${index + 1}`}
                                                    className="w-full h-full object-cover"
                                                />
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </motion.div>
                        </div>
                    </section>

                    {/* Contenu du projet */}
                    <section className="py-12 bg-white dark:bg-black">
                        <div className="max-w-7xl mx-auto">
                            <div className="flex flex-col lg:flex-row">
                                {/* Description du projet - Occupe toute la largeur sur mobile et 2/3 sur desktop */}
                                <motion.div
                                    className="lg:w-2/3 px-0 sm:px-0 lg:px-8" // Pas de padding sur mobile pour le contenu HTML
                                    variants={fadeInUp}
                                    initial="hidden"
                                    animate="visible"
                                >
                                    <h2 className="text-2xl font-bold text-black dark:text-white mb-6 px-4 sm:px-6 lg:px-0">
                                        Présentation du projet
                                    </h2>

                                    {/* Description du projet - Peut être HTML ou texte */}
                                    {project.description && (
                                        isHTML(project.description) ? (
                                            <div
                                                className="project-content w-full" // Classe pour styliser au besoin
                                                dangerouslySetInnerHTML={{
                                                    __html: DOMPurify.sanitize(project.description)
                                                }}
                                            />
                                        ) : (
                                            <div className="project-content prose prose-lg dark:prose-invert max-w-none mb-8 px-4 sm:px-6 lg:px-0">
                                                <p>{project.description}</p>
                                            </div>
                                        )
                                    )}





                                    {/* Liens du projet */}
                                    <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800 px-4 sm:px-6 lg:px-0">
                                        <h3 className="text-xl font-bold text-black dark:text-white mb-6">
                                            Liens du projet
                                        </h3>
                                        <div className="flex flex-wrap gap-4">




                                            {project.demo && (
                                                <a
                                                    href={project.demo}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center px-6 py-3 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                                                >
                                                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                                    </svg>
                                                    Voir la démo
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                </motion.div>

                                {/* Sidebar */}
                                <motion.div
                                    className="lg:w-1/3 px-4 sm:px-6 lg:px-8 mt-10 lg:mt-0"
                                    variants={fadeInUp}
                                    initial="hidden"
                                    animate="visible"
                                    transition={{ delay: 0.2 }}
                                >
                                    {/* Détails du projet */}
                                    <div className="bg-gray-50 dark:bg-gray-900/50 rounded-xl p-6 mb-8 sticky top-24">
                                        <h3 className="text-lg font-bold text-black dark:text-white mb-4">
                                            Détails du projet
                                        </h3>

                                        <div className="space-y-4">
                                            {/* Catégorie */}
                                            <div>
                                                <h4 className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                                    Catégorie
                                                </h4>
                                                <p className="text-black dark:text-white">{project.categorie}</p>
                                            </div>

                                            {/* Sujet */}
                                            {project.sujet && (
                                                <div>
                                                    <h4 className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                                        Sujet
                                                    </h4>
                                                    <p className="text-black dark:text-white">{project.sujet}</p>
                                                </div>
                                            )}



                                            {/* Date */}
                                            {project.date && (
                                                <div>
                                                    <h4 className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                                        Date
                                                    </h4>
                                                    <p className="text-black dark:text-white">{formatDate(project.date)}</p>
                                                </div>
                                            )}




                                        </div>
                                    </div>

                                    {/* Projets liés */}
                                    {relatedProjects.length > 0 && (
                                        <div className="bg-gray-50 dark:bg-gray-900/50 rounded-xl p-6">
                                            <h3 className="text-lg font-bold text-black dark:text-white mb-4">
                                                Projets similaires
                                            </h3>
                                            <div className="space-y-4">
                                                {relatedProjects.map(relatedProject => (
                                                    <Link
                                                        key={relatedProject.id}
                                                        to={`/projects/${relatedProject.id}`}
                                                        className="flex items-start space-x-3 group"
                                                    >
                                                        {relatedProject.photo1_800_x_550 && (
                                                            <div className="flex-shrink-0 w-16 h-16 rounded-md overflow-hidden">
                                                                <img
                                                                    src={relatedProject.photo1_800_x_550}
                                                                    alt={relatedProject.nom}
                                                                    className="w-full h-full object-cover"
                                                                    onError={(e) => {
                                                                        const target = e.target as HTMLImageElement;
                                                                        target.onerror = null;
                                                                        target.src = '/images/fallback-project.jpg';
                                                                    }}
                                                                />
                                                            </div>
                                                        )}
                                                        <div>
                                                            <h4 className="text-sm font-medium text-black dark:text-white group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors">
                                                                {relatedProject.nom}
                                                            </h4>
                                                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                                                {relatedProject.categorie}
                                                            </p>
                                                        </div>
                                                    </Link>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </motion.div>
                            </div>
                        </div>
                    </section>

                    {/* Section CTA */}
                    <section className="py-16 bg-black dark:bg-white text-white dark:text-black">
                        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                            <h2 className="text-2xl md:text-3xl font-bold mb-6">
                                Vous avez un projet similaire ?
                            </h2>
                            <p className="text-lg text-gray-300 dark:text-gray-700 max-w-2xl mx-auto mb-8">
                                Je peux vous aider à concrétiser votre vision. Contactez-moi pour en discuter.
                            </p>
                            <div className="flex flex-col sm:flex-row justify-center gap-4">
                                <Link
                                    to="/contact"
                                    className="px-8 py-4 bg-white dark:bg-black text-black dark:text-white rounded-lg font-medium hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors"
                                >
                                    Discuter de mon projet
                                </Link>
                                <Link
                                    to="/projects"
                                    className="px-8 py-4 border border-white dark:border-black rounded-lg font-medium hover:bg-white/10 dark:hover:bg-black/10 transition-colors"
                                >
                                    Voir d'autres projets
                                </Link>
                            </div>
                        </div>
                    </section>
                </>
            )}
        </main>
    );
};

export default ProjectDetailPage;