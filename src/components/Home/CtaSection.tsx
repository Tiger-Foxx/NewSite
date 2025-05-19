import React from 'react';
import { Link } from 'react-router-dom';

export const CtaSection: React.FC = () => {
    return (
        <section className="py-20 bg-black dark:bg-white text-white dark:text-black relative overflow-hidden">
            {/* Éléments de design */}
            <div className="absolute top-0 left-0 w-64 h-64 bg-gray-800 dark:bg-gray-200 rounded-full filter blur-3xl opacity-20 -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-gray-800 dark:bg-gray-200 rounded-full filter blur-3xl opacity-20 translate-x-1/2 translate-y-1/2"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="max-w-4xl mx-auto text-center">
          <span className="inline-block mb-4 px-3 py-1 text-xs font-semibold uppercase tracking-wider border border-gray-700 dark:border-gray-300 text-gray-300 dark:text-gray-700 rounded-full">
            Commencez dès maintenant
          </span>

                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                        Prêt à transformer votre idée en réalité digitale ?
                    </h2>

                    <p className="text-lg text-gray-300 dark:text-gray-700 max-w-2xl mx-auto mb-10">
                        Discutons de votre projet et voyons comment nous pouvons vous aider à atteindre vos objectifs. Notre expertise est à votre service.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link
                            to="/contact"
                            className="px-8 py-4 bg-white dark:bg-black text-black dark:text-white rounded-lg font-medium hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors shadow-lg hover:shadow-xl transform hover:scale-105 duration-300"
                        >
              <span className="flex items-center">
                Démarrer la discussion
                <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                </svg>
              </span>
                        </Link>

                        <Link
                            to="/projects"
                            className="px-8 py-4 border border-gray-700 dark:border-gray-300 rounded-lg font-medium text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
                        >
                            Voir nos réalisations
                        </Link>
                    </div>

                    {/* Badges de confiance */}
                    <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 justify-items-center">
                        <div className="text-center">
                            <div className="text-3xl font-bold">120+</div>
                            <div className="text-sm text-gray-400 dark:text-gray-600">Projets réalisés</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold">97%</div>
                            <div className="text-sm text-gray-400 dark:text-gray-600">Clients satisfaits</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold">12+</div>
                            <div className="text-sm text-gray-400 dark:text-gray-600">Expérience</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold">24/7</div>
                            <div className="text-sm text-gray-400 dark:text-gray-600">Support technique</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};