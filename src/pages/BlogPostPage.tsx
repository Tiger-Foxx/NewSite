import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BlogPostHeader, BlogPostContent, BlogPostComments } from '../sections/Blog';
import { Post, Commentaire, PaginatedResponse } from '../types';
import { useApi } from '../hooks';
import { updateMetaTags } from '../utils';
import { Loader } from '../sections/Shared';

export const BlogPostPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [post, setPost] = useState<Post | null>(null);
    const [comments, setComments] = useState<Commentaire[]>([]);

    // Charger l'article
    const {
        data: postData,
        loading: postLoading,
        error: postError
    } = useApi<Post>({
        endpoint: `/api/posts/${id}/`,
        loadOnMount: true
    });

    // Charger les commentaires
    const {
        data: commentsData,
        loading: commentsLoading,
        error: commentsError,
        refetch: refetchComments
    } = useApi<PaginatedResponse<Commentaire>>({
        endpoint: `/api/posts/${id}/comments/`,
        loadOnMount: true
    });

    // Mettre à jour les états locaux quand les données sont chargées
    useEffect(() => {
        if (postData) {
            setPost(postData);
            console.log(commentsLoading,commentsError)

            // Mettre à jour les meta tags avec les infos de l'article
            updateMetaTags({
                title: postData.titre,
                description: postData.description,
                image: postData.photo800_x_533,
                keywords: [postData.categorie, 'article', 'blog', 'fox'],
                author: postData.auteur || 'Arthur Donfack',
                type: 'article',
                datePublished: postData.date
            });
        }
    }, [postData]);

    useEffect(() => {
        if (commentsData) {
            setComments(commentsData.results);
        }
    }, [commentsData]);

    // Gérer les erreurs
    useEffect(() => {
        if (postError) {
            // Rediriger vers 404 si l'article n'existe pas
            navigate('/404', { replace: true });
        }
    }, [postError, navigate]);

    // Animation de la page
    const pageVariants = {
        initial: { opacity: 0 },
        animate: {
            opacity: 1,
            transition: { duration: 0.5 }
        },
        exit: {
            opacity: 0,
            transition: { duration: 0.3 }
        }
    };

    // Afficher le loader pendant le chargement de l'article
    if (postLoading) {
        return <Loader message="Chargement de l'article..." />;
    }

    // Si pas d'article, ne rien afficher (la redirection sera gérée par l'effet ci-dessus)
    if (!post) {
        return null;
    }

    return (
        <motion.div
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
        >
            {/* En-tête de l'article */}
            <BlogPostHeader post={post} />

            {/* Contenu de l'article */}
            <BlogPostContent post={post} />

            {/* Commentaires */}
            <BlogPostComments
                comments={comments}
                postId={parseInt(id || '0')}
                onCommentAdded={refetchComments}
            />
        </motion.div>
    );
};