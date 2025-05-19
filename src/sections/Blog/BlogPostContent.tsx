import React from 'react';
import { motion } from 'framer-motion';
import { Post } from '../../types';

interface BlogPostContentProps {
    post: Post;
}

export const BlogPostContent: React.FC<BlogPostContentProps> = ({ post }) => {
    return (
        <motion.article
            className="py-16 px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.8 } }}
        >
            <div className="container mx-auto">
                <div className="max-w-3xl mx-auto">
                    {/* Contenu principal de l'article */}
                    {post.contenuP1 && (
                        <div
                            className="prose prose-lg prose-invert max-w-none"
                            dangerouslySetInnerHTML={{ __html: post.contenuP1 }}
                        />
                    )}

                    {/* Si les autres champs sont remplis, les afficher aussi */}
                    {post.contenuP2 && (
                        <div
                            className="prose prose-lg prose-invert max-w-none mt-8"
                            dangerouslySetInnerHTML={{ __html: post.contenuP2 }}
                        />
                    )}

                    {post.contenuP3 && (
                        <div
                            className="prose prose-lg prose-invert max-w-none mt-8"
                            dangerouslySetInnerHTML={{ __html: post.contenuP3 }}
                        />
                    )}

                    {post.contenuP4 && (
                        <div
                            className="prose prose-lg prose-invert max-w-none mt-8"
                            dangerouslySetInnerHTML={{ __html: post.contenuP4 }}
                        />
                    )}

                    {/* Citation mise en avant */}
                    {post.contenuSitation && (
                        <blockquote className="my-12 pl-6 border-l-4 border-primary">
                            <p className="italic text-xl text-gray-300 leading-relaxed">
                                "{post.contenuSitation}"
                            </p>
                        </blockquote>
                    )}

                    {/* Conclusion */}
                    {post.contenuConclusion && (
                        <div className="mt-12 p-6 bg-fox-light/5 rounded-xl border border-fox-light/10">
                            <h3 className="text-xl font-bold text-white mb-4">Conclusion</h3>
                            <div
                                className="prose prose-lg prose-invert max-w-none"
                                dangerouslySetInnerHTML={{ __html: post.contenuConclusion }}
                            />
                        </div>
                    )}

                    {/* Tags et informations supplémentaires */}
                    <div className="mt-12 pt-6 border-t border-fox-light/10">
                        <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-fox-light/20 text-gray-300 text-sm font-medium rounded-full">
                {post.categorie}
              </span>
                            <span className="px-3 py-1 bg-fox-light/20 text-gray-300 text-sm font-medium rounded-full">
                développement
              </span>
                            <span className="px-3 py-1 bg-fox-light/20 text-gray-300 text-sm font-medium rounded-full">
                fox
              </span>
                        </div>
                    </div>
                </div>
            </div>
        </motion.article>
    );
};