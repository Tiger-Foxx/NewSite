import React from 'react';

interface Service {
    icon: React.ReactNode;
    title: string;
    description: string;
}

export const ServicesSection: React.FC = () => {
    const services: Service[] = [
        {
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
            ),
            title: "Développement Web",
            description: "Création de sites et applications web modernes, performants et accessibles avec les technologies les plus récentes. React, Vue.js, Node.js."
        },
        {
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
            ),
            title: "Applications Mobiles",
            description: "Développement d'applications mobiles natives et cross-platform pour iOS et Android avec Flutter, React Native et Swift UI."
        },
        {
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
            ),
            title: "Sécurité Informatique",
            description: "Audits de sécurité, tests d'intrusion et mise en place de solutions de protection pour vos infrastructures et applications."
        },
        {
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
            ),
            title: "Applications Desktop",
            description: "Développement d'applications de bureau cross-platform pour Windows, macOS et Linux avec Electron, .NET et technologies natives."
        },
        {
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                </svg>
            ),
            title: "Intelligence Artificielle",
            description: "Intégration d'IA et de Machine Learning dans vos produits pour automatiser les tâches et améliorer la prise de décision."
        },
        {
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
            ),
            title: "Conseil & Formation",
            description: "Accompagnement technique, architecture logicielle et formations personnalisées pour vos équipes techniques et décisionnelles."
        }
    ];

    return (
        <section id="services" className="py-20 md:py-28 bg-white dark:bg-black">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12 md:mb-16">
          <span className="inline-block mb-2 px-3 py-1 text-xs font-semibold uppercase tracking-wider bg-gray-100 dark:bg-gray-800 text-black dark:text-white rounded-full">
            Services
          </span>
                    <h2 className="text-3xl md:text-4xl font-bold text-black dark:text-white mb-4">
                        Nos Expertises
                    </h2>
                    <p className="max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-400">
                        Des solutions complètes pour tous vos besoins en développement et sécurité informatique.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
                    {services.map((service, index) => (
                        <div
                            key={index}
                            className="group bg-gray-50 dark:bg-gray-900/70 rounded-xl p-8 shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 border border-gray-200/50 dark:border-gray-800/50"
                        >
                            <div className="w-14 h-14 bg-white dark:bg-black rounded-lg flex items-center justify-center mb-6 text-black dark:text-white shadow-sm group-hover:shadow group-hover:-translate-y-1 transition-all duration-300">
                                {service.icon}
                            </div>
                            <h3 className="text-xl font-bold text-black dark:text-white mb-3">
                                {service.title}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400">
                                {service.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};