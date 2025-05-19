import React from 'react';

export const ContactPage: React.FC = () => {
    React.useEffect(() => {
        document.title = 'Contact - Fox Engineering';
    }, []);

    return (
        <div className="min-h-screen pt-16 md:pt-20 flex flex-col items-center justify-center bg-white dark:bg-black text-black dark:text-white">
            <h1 className="text-4xl font-bold">Page Contact</h1>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
                Formulaire de contact et informations à venir...
            </p>
        </div>
    );
};

export default ContactPage;