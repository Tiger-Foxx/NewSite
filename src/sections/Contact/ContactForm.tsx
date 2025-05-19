import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ContactPayload } from '@/types';
import { trackingService } from '@/services';

export const ContactForm: React.FC = () => {
    const [formData, setFormData] = useState<ContactPayload>({
        email: '',
        nom: '',
        objet: '',
        contenu: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formError, setFormError] = useState<string | null>(null);
    const [formSuccess, setFormSuccess] = useState(false);

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.3
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                ease: [0.6, 0.05, -0.01, 0.9]
            }
        }
    };

    // Gérer les changements de champs
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    // Soumettre le formulaire
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setFormError(null);

        try {
            // Utiliser le service de tracking pour envoyer le message
            const response = await trackingService.sendMessage(
                formData.email,
                formData.nom,
                formData.objet,
                formData.contenu
            );
            console.log(response)

            // Réinitialiser le formulaire
            setFormData({
                email: '',
                nom: '',
                objet: '',
                contenu: ''
            });

            setFormSuccess(true);

            // Effacer le message de succès après un certain temps
            setTimeout(() => {
                setFormSuccess(false);
            }, 6000);
        } catch (error) {
            console.error('Erreur lors de l\'envoi du message:', error);
            setFormError('Une erreur est survenue lors de l\'envoi de votre message. Veuillez réessayer.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <motion.div
            className="bg-fox-dark rounded-xl border border-fox-light/10 shadow-lg overflow-hidden"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <div className="p-8">
                <motion.h2
                    className="text-2xl font-bold text-white mb-6"
                    variants={itemVariants}
                >
                    Envoyez-moi un message
                </motion.h2>

                {formSuccess && (
                    <motion.div
                        className="mb-6 p-4 bg-green-900/20 border border-green-700/30 rounded-lg text-green-400"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                    >
                        Votre message a été envoyé avec succès ! Je vous répondrai dans les plus brefs délais.
                    </motion.div>
                )}

                {formError && (
                    <motion.div
                        className="mb-6 p-4 bg-red-900/20 border border-red-700/30 rounded-lg text-red-400"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                    >
                        {formError}
                    </motion.div>
                )}

                <form onSubmit={handleSubmit}>
                    <motion.div
                        className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6"
                        variants={itemVariants}
                    >
                        <div>
                            <label htmlFor="nom" className="block text-gray-300 mb-2">
                                Nom
                            </label>
                            <input
                                type="text"
                                id="nom"
                                name="nom"
                                value={formData.nom}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 bg-fox-light/10 border border-fox-light/20 rounded-md text-white placeholder-gray-500 focus:outline-none focus:border-primary"
                                placeholder="Votre nom"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-gray-300 mb-2">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 bg-fox-light/10 border border-fox-light/20 rounded-md text-white placeholder-gray-500 focus:outline-none focus:border-primary"
                                placeholder="votre@email.com"
                                required
                            />
                        </div>
                    </motion.div>

                    <motion.div
                        className="mb-6"
                        variants={itemVariants}
                    >
                        <label htmlFor="objet" className="block text-gray-300 mb-2">
                            Objet
                        </label>
                        <input
                            type="text"
                            id="objet"
                            name="objet"
                            value={formData.objet}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 bg-fox-light/10 border border-fox-light/20 rounded-md text-white placeholder-gray-500 focus:outline-none focus:border-primary"
                            placeholder="Sujet de votre message"
                            required
                        />
                    </motion.div>

                    <motion.div
                        className="mb-6"
                        variants={itemVariants}
                    >
                        <label htmlFor="contenu" className="block text-gray-300 mb-2">
                            Message
                        </label>
                        <textarea
                            id="contenu"
                            name="contenu"
                            value={formData.contenu}
                            onChange={handleInputChange}
                            rows={6}
                            className="w-full px-4 py-3 bg-fox-light/10 border border-fox-light/20 rounded-md text-white placeholder-gray-500 focus:outline-none focus:border-primary"
                            placeholder="Détaillez votre projet ou votre demande..."
                            required
                        ></textarea>
                    </motion.div>

                    <motion.div
                        variants={itemVariants}
                    >
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`w-full px-6 py-3 bg-primary hover:bg-primary-light text-white font-medium rounded-md transition-colors ${
                                isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                            }`}
                        >
                            {isSubmitting ? (
                                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Envoi en cours...
                </span>
                            ) : (
                                'Envoyer le message'
                            )}
                        </button>
                    </motion.div>
                </form>
            </div>
        </motion.div>
    );
};