import React from 'react';
import { useParams } from 'react-router-dom';

export const ProjectDetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();

    React.useEffect(() => {
        document.title = `Projet ${id} - Fox Engineering`;
        // Ici, tu pourrais charger les détails du projet basé sur l'ID
    }, [id]);

    return (
        <div className="min-h-screen pt-16 md:pt-20 flex flex-col items-center justify-center bg-white dark:bg-black text-black dark:text-white">
            <h1 className="text-4xl font-bold">Détail du Projet</h1>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
                Affichage des détails pour le projet ID: {id}
            </p>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
                Contenu à venir...
            </p>
        </div>
    );
};

export default ProjectDetailPage;