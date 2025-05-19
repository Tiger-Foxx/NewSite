import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Commentaire, CommentairePayload } from '../../types';
import { formatDate } from '../../utils';
import { trackingService } from '../../services';

interface BlogPostCommentsProps {
    comments: Commentaire[];
    postId: number;
    onCommentAdded: () => void;
}

export const BlogPostComments: React.FC<BlogPostCommentsProps> = ({
                                                                      comments,
                                                                      postId,
                                                                      onCommentAdded
                                                                  }) => {
    const [formData, setFormData] = useState<CommentairePayload>({
        email: '',
        nom: '',
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
                staggerChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6
            }
        }
    };

    // Gérer les changements dans le formulaire
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    // Soumettre le formulaire
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setFormError(null);

        // Validation simple
        if (!formData.email || !formData.nom || !formData.contenu) {
            setFormError('Tous les champs sont requis');
            setIsSubmitting(false);
            return;
        }

        try {
            // Utiliser le service de tracking pour ajouter un commentaire
            await trackingService.addComment(
                postId,
                formData.email,
                formData.nom,
                formData.contenu
            );

            // Réinitialiser le formulaire après succès
            setFormData({ email: '', nom: '', contenu: '' });
            setFormSuccess(true);

            // Déclencher le callback pour recharger les commentaires
            onCommentAdded();

            // Effacer le message de succès après 5 secondes
            setTimeout(() => {
                setFormSuccess(false);
            }, 5000);
        } catch (error) {
            console.error('Erreur lors de l\'ajout du commentaire:', error);
            setFormError('Une erreur est survenue lors de l\'ajout du commentaire. Veuillez réessayer.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section className="py-16 px-4 bg-fox-light/5">
            <div className="container mx-auto">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-2xl font-bold text-white mb-8">Commentaires ({comments.length})</h2>

                    {/* Liste des commentaires */}
                    <motion.div
                        className="space-y-6 mb-12"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        {comments.length === 0 ? (
                            <motion.p
                                className="text-gray-400 text-center py-6"
                                variants={itemVariants}
                            >
                                Aucun commentaire pour le moment. Soyez le premier à réagir !
                            </motion.p>
                        ) : (
                            comments.map(comment => (
                                <motion.div
                                    key={comment.id}
                                    className="p-6 bg-fox-dark rounded-xl border border-fox-light/10"
                                    variants={itemVariants}
                                >
                                    <div className="flex items-start">
                                        <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold mr-4">
                                            {comment.visiteur_nom ? comment.visiteur_nom.charAt(0) : "A"}
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3">
                                                <h4 className="font-semibold text-white">
                                                    {comment.visiteur_nom}
                                                </h4>
                                                <span className="text-sm text-gray-500">
                          {formatDate(comment.date)}
                        </span>
                                            </div>
                                            <p className="text-gray-300">
                                                {comment.contenu}
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>
                            ))
                        )}
                    </motion.div>

                    {/* Formulaire d'ajout de commentaire */}
                    <motion.div
                        className="bg-fox-dark rounded-xl border border-fox-light/10 p-6"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                    >
                        <h3 className="text-xl font-bold text-white mb-6">Laissez un commentaire</h3>

                        {formSuccess && (
                            <motion.div
                                className="mb-6 p-4 bg-green-900/20 border border-green-700/30 rounded-lg text-green-400"
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                            >
                                Votre commentaire a été ajouté avec succès. Merci pour votre contribution !
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
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
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
                                        className="w-full px-4 py-2 bg-fox-light/10 border border-fox-light/20 rounded-md text-white placeholder-gray-500 focus:outline-none focus:border-primary"
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
                                        className="w-full px-4 py-2 bg-fox-light/10 border border-fox-light/20 rounded-md text-white placeholder-gray-500 focus:outline-none focus:border-primary"
                                        placeholder="votre@email.com"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="mb-6">
                                <label htmlFor="contenu" className="block text-gray-300 mb-2">
                                    Commentaire
                                </label>
                                <textarea
                                    id="contenu"
                                    name="contenu"
                                    value={formData.contenu}
                                    onChange={handleInputChange}
                                    rows={5}
                                    className="w-full px-4 py-2 bg-fox-light/10 border border-fox-light/20 rounded-md text-white placeholder-gray-500 focus:outline-none focus:border-primary"
                                    placeholder="Votre commentaire..."
                                    required
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className={`px-6 py-3 bg-primary hover:bg-primary-light text-white rounded-md transition-colors ${
                                    isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                                }`}
                            >
                                {isSubmitting ? (
                                    <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Envoi...
                  </span>
                                ) : (
                                    'Publier le commentaire'
                                )}
                            </button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};