import React from 'react';
import { Link } from 'react-router-dom';

export const CtaSection: React.FC = () => {
    return (
        <section className="py-20 bg-black dark:bg-white text-white dark:text-black">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-6 max-w-3xl mx-auto">
                    Prêt à transformer votre idée en réalité digitale ?
                </h2>
                <p className="text-lg text-gray-300 dark:text-gray-700 max-w-2xl mx-auto mb-10">
                    Discutons de votre projet et voyons comment je peux vous aider à atteindre vos objectifs.
                </p>
                <Link
                    to="/contact"
                    className="inline-block px-8 py-4 bg-white dark:bg-black text-black dark:text-white rounded-full font-medium hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors"
                >
                    Démarrer la discussion
                </Link>
            </div>
        </section>
    );
};