import React from 'react';

export const AboutPage: React.FC = () => {
    React.useEffect(() => {
        document.title = 'À Propos - Fox Engineering';
    }, []);

    return (
        <div className="min-h-screen pt-16 md:pt-20 flex flex-col items-center justify-center bg-white dark:bg-black text-black dark:text-white">
            <h1 className="text-4xl font-bold">Page À Propos</h1>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
                Contenu à venir...
            </p>
        </div>
    );
};

export default AboutPage;