// src/pages/BlogPostPage.tsx (ou le chemin correct vers votre composant)
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { useApi } from '../hooks/useApi'; // Assurez-vous que le chemin est correct
import { apiService } from '../services/api'; // Assurez-vous que le chemin est correct
import { Post, Commentaire, CommentairePayload, PaginatedResponse, SubscribePayload } from '../types'; // Assurez-vous que le chemin est correct
import DOMPurify from 'dompurify';

export const BlogPostPage: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();
    const navigate = useNavigate();
    const [post, setPost] = useState<Post | null>(null);
    const [comments, setComments] = useState<Commentaire[]>([]);
    const [relatedPosts, setRelatedPosts] = useState<Post[]>([]);
    const [commentFormData, setCommentFormData] = useState<CommentairePayload>({
        nom: '',
        email: '',
        contenu: ''
    });
    const [commentFormStatus, setCommentFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
    const [subscribeEmail, setSubscribeEmail] = useState('');
    const [subscribeStatus, setSubscribeStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState('');

    const siteUrl = "https://site.the-fox.tech"; // Votre URL de base du site

    const {
        data: postData,
        loading: postLoading,
        error: postError
    } = useApi<Post>({
        endpoint: `/api/posts/${slug}/`,
        loadOnMount: true
    });

    const {
        data: commentsData,
        loading: commentsLoading,
        // error: commentsError, // Vous pouvez décommenter et gérer si besoin
        refetch: refetchComments
    } = useApi<PaginatedResponse<Commentaire>>({
        endpoint: postData?.id ? `/api/posts/${postData.id}/comments/?limit=100` : '',
        loadOnMount: !!postData?.id
    });

    useEffect(() => {
        if (postData) {
            setPost(postData);
            // La mise à jour de document.title est maintenant gérée par Helmet
            // const metaDescription = document.querySelector('meta[name="description"]');
            // if (metaDescription) {
            //     metaDescription.setAttribute('content', postData.description || postData.titre);
            // }
            fetchRelatedPosts(postData.categorie, postData.id);
        }
    }, [postData]);

    const fetchRelatedPosts = async (categorie: string, postId: number) => {
        try {
            const response = await apiService.get<{ results: Post[]; count: number }>(
                `/api/posts/?categorie=${encodeURIComponent(categorie)}&limit=3&exclude_id=${postId}`
            );
            setRelatedPosts(response.data.results || []);
        } catch (error) {
            console.error('Erreur lors du chargement des articles liés:', error);
        }
    };

    useEffect(() => {
        if (commentsData && commentsData.results) {
            setComments(commentsData.results);
        }
    }, [commentsData]);

    useEffect(() => {
        if (postError) {
            navigate('/404', { replace: true });
        }
    }, [postError, navigate]);

    const handleCommentChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setCommentFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleCommentSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!post) return;
        setCommentFormStatus('submitting');
        setErrorMessage('');
        try {
            await apiService.post(`/api/posts/${post.id}/comments/?limit=100`, commentFormData);
            setCommentFormStatus('success');
            setCommentFormData({ nom: '', email: '', contenu: '' });
            if (refetchComments) refetchComments();
            setTimeout(() => setCommentFormStatus('idle'), 3000);
        } catch (error: any) {
            console.error('Erreur de soumission du commentaire:', error);
            setCommentFormStatus('error');
            setErrorMessage(error?.data?.detail || error?.data?.error || error?.message || 'Une erreur est survenue.');
            setTimeout(() => {
                setCommentFormStatus('idle');
                setErrorMessage('');
            }, 5000);
        }
    };

    const handleSubscribeSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!subscribeEmail) return;
        setSubscribeStatus('submitting');
        setErrorMessage('');
        try {
            await apiService.post<SubscribePayload>('/api/subscribe/', { email: subscribeEmail });
            setSubscribeStatus('success');
            setSubscribeEmail('');
            setTimeout(() => setSubscribeStatus('idle'), 3000);
        } catch (error: any) {
            console.error('Erreur lors de l\'inscription à la newsletter:', error);
            setSubscribeStatus('error');
            setErrorMessage(error?.data?.detail || error?.data?.error || error?.message || 'Une erreur est survenue.');
            setTimeout(() => {
                setSubscribeStatus('idle');
                setErrorMessage('');
            }, 5000);
        }
    };

    const formatDate = (dateString: string | undefined): string => {
        if (!dateString) return 'Date inconnue';
        return new Date(dateString).toLocaleDateString('fr-FR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    const calculateReadingTime = (content: string | undefined): number => {
        if (!content) return 1;
        const textContent = content.replace(/<[^>]*>/g, '');
        const wordsPerMinute = 200;
        const wordCount = textContent.split(/\s+/).length;
        return Math.ceil(wordCount / wordsPerMinute) || 1;
    };

    const fadeInUp = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
    };

    if (postLoading) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-white dark:bg-black">
                <Helmet>
                    <title>Chargement... - Fox Engineering</title>
                    <meta name="robots" content="noindex" />
                </Helmet>
                <div className="flex flex-col items-center">
                    <div className="w-16 h-16 border-t-4 border-b-4 border-black dark:border-white rounded-full animate-spin"></div>
                    <p className="mt-4 text-black dark:text-white">Chargement de l'article...</p>
                </div>
            </div>
        );
    }

    if (!post && !postLoading) { // S'assure que le chargement est terminé et que post est toujours null
        return (
            <>
                <Helmet>
                    <title>Article non trouvé - Fox Engineering</title>
                    <meta name="robots" content="noindex" />
                </Helmet>
                <div className="flex justify-center items-center min-h-screen bg-white dark:bg-black text-center">
                    <div className="p-8">
                        <h1 className="text-2xl font-bold text-black dark:text-white mb-4">Oops! Article non trouvé.</h1>
                        <p className="text-gray-600 dark:text-gray-400 mb-8">
                            Il semble que l'article que vous cherchez n'existe pas ou a été déplacé.
                        </p>
                        <Link
                            to="/blog"
                            className="px-6 py-3 bg-black dark:bg-white text-white dark:text-black rounded-lg font-medium hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
                        >
                            Retourner au Blog
                        </Link>
                    </div>
                </div>
            </>
        );
    }

    // Construction des valeurs pour les métas. S'assurer que `post` est défini.
    const postTitle = post ? `${post.titre} - Fox Engineering` : "Article - Fox Engineering";

    let metaDescriptionContent = "Lisez cet article détaillé sur Fox Engineering.";
    if (post?.description) {
        metaDescriptionContent = post.description;
    } else if (post?.contenuP1) {
        const cleanText = post.contenuP1.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
        metaDescriptionContent = cleanText.substring(0, 155) + (cleanText.length > 155 ? '...' : '');
    }

    let metaImage = `${siteUrl}/favicon.png`; // Image par défaut
    if (post?.photo800_x_533) { // Utilisation de photo800_x_533
        metaImage = post.photo800_x_533.startsWith('http')
            ? post.photo800_x_533
            : `${siteUrl}${post.photo800_x_533.startsWith('/') ? '' : '/'}${post.photo800_x_533}`;
    }

    const currentPageUrl = window.location.href;

    return (
        <main className="bg-white dark:bg-black min-h-screen">
            {post && (
                <Helmet>
                    <title>{postTitle}</title>
                    <meta name="description" content={metaDescriptionContent} />
                    <link rel="canonical" href={currentPageUrl} />

                    <meta property="og:title" content={postTitle} />
                    <meta property="og:description" content={metaDescriptionContent} />
                    <meta property="og:image" content={metaImage} />
                    <meta property="og:url" content={currentPageUrl} />
                    <meta property="og:type" content="article" />
                    <meta property="og:site_name" content="Fox Engineering" />
                    {post.date && <meta property="article:published_time" content={new Date(post.date).toISOString()} />}
                    {post.auteur && <meta property="article:author" content={post.auteur} />}
                    {post.categorie && <meta property="article:section" content={post.categorie} />}
                    {/* Si vous avez des tags, par exemple: post.tags?.map(tag => <meta property="article:tag" content={tag.name} key={tag.id} />) */}

                    <meta name="twitter:card" content="summary_large_image" />
                    <meta name="twitter:title" content={postTitle} />
                    <meta name="twitter:description" content={metaDescriptionContent} />
                    <meta name="twitter:image" content={metaImage} />
                    {/* <meta name="twitter:site" content="@VotrePseudoTwitter" /> */}
                    {/* <meta name="twitter:creator" content={post.auteur ? `@PseudoTwitterAuteur` : '@VotrePseudoTwitter'} /> */}
                </Helmet>
            )}

            {post && (
                <>
                    <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden">
                        <div className="absolute inset-0 opacity-[0.03] bg-[url('/noise.png')] dark:opacity-[0.02]"></div>
                        {post.photo800_x_533 && (
                            <div className="absolute inset-0 opacity-20 dark:opacity-10">
                                <img
                                    src={post.photo800_x_533}
                                    alt=""
                                    className="w-full h-full object-cover filter blur-sm"
                                />
                                <div className="absolute inset-0 bg-gradient-to-b from-white via-white to-transparent dark:from-black dark:via-black dark:to-transparent"></div>
                            </div>
                        )}
                        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                            <motion.div
                                className="text-center"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                            >
                                <span className="inline-block px-3 py-1 text-xs font-medium uppercase tracking-wider bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full mb-4">
                                  {post.categorie}
                                </span>
                                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-black dark:text-white mb-6 leading-tight">
                                    {post.titre}
                                </h1>
                                <div className="flex flex-wrap justify-center items-center text-sm text-gray-600 dark:text-gray-400 mb-8 gap-4">
                                    <div className="flex items-center">
                                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                        <span>{post.auteur || 'Fox'}</span>
                                    </div>
                                    <div className="flex items-center">
                                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                        <span>{formatDate(post.date)}</span>
                                    </div>
                                    <div className="flex items-center">
                                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        <span>{calculateReadingTime(post.contenuP1)} min de lecture</span>
                                    </div>
                                </div>
                                {post.description && (
                                    <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto italic">
                                        {post.description}
                                    </p>
                                )}
                            </motion.div>
                        </div>
                    </section>

                    {post.photo800_x_533 && (
                        <section className="py-6 bg-white dark:bg-black">
                            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                                <motion.div
                                    className="rounded-xl overflow-hidden shadow-lg"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: 0.2 }}
                                >
                                    <img
                                        src={post.photo800_x_533}
                                        alt={post.titre}
                                        className="w-full h-auto object-cover"
                                    />
                                </motion.div>
                            </div>
                        </section>
                    )}

                    <section className="py-12 bg-white dark:bg-black">
                        <div className="max-w-7xl mx-auto">
                            <div className="flex flex-col lg:flex-row">
                                <motion.div
                                    className="lg:w-2/3 px-4 sm:px-6 lg:px-8"
                                    variants={fadeInUp}
                                    initial="hidden"
                                    animate="visible"
                                >
                                    {post.contenuP1 && (
                                        <div
                                            className="article-content prose dark:prose-invert lg:prose-lg max-w-none"
                                            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.contenuP1) }}
                                        />
                                    )}
                                    {post.contenuP2 && <div className="article-content prose dark:prose-invert lg:prose-lg max-w-none mt-6" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.contenuP2) }} />}
                                    {post.contenuP3 && <div className="article-content prose dark:prose-invert lg:prose-lg max-w-none mt-6" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.contenuP3) }} />}
                                    {post.contenuP4 && <div className="article-content prose dark:prose-invert lg:prose-lg max-w-none mt-6" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.contenuP4) }} />}

                                    {post.contenuSitation && (
                                        <blockquote className="my-8 pl-4 border-l-4 border-gray-300 dark:border-gray-700 italic text-gray-700 dark:text-gray-300 text-xl">
                                            <p>{post.contenuSitation}</p>
                                        </blockquote>
                                    )}

                                    {post.contenuConclusion && (
                                        <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-800">
                                            <h2 className="text-2xl font-bold text-black dark:text-white mb-4">Conclusion</h2>
                                            <div className="article-content prose dark:prose-invert lg:prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.contenuConclusion) }} />
                                        </div>
                                    )}

                                    <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-800">
                                        <h3 className="text-lg font-bold text-black dark:text-white mb-4">Partager cet article</h3>
                                        <div className="flex space-x-4">
                                            <a href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(currentPageUrl)}&text=${encodeURIComponent(post.titre)}`} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-700 dark:text-gray-300 hover:bg-blue-500 hover:text-white dark:hover:bg-blue-600 transition-colors" aria-label="Partager sur Twitter"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" /></svg></a>
                                            <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentPageUrl)}`} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-700 dark:text-gray-300 hover:bg-blue-800 hover:text-white dark:hover:bg-blue-900 transition-colors" aria-label="Partager sur Facebook"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" /></svg></a>
                                            <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentPageUrl)}`} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-700 dark:text-gray-300 hover:bg-blue-700 hover:text-white dark:hover:bg-blue-800 transition-colors" aria-label="Partager sur LinkedIn"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg></a>
                                            <button onClick={() => { navigator.clipboard.writeText(currentPageUrl); alert('Lien copié !'); }} className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors" aria-label="Copier le lien"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" /></svg></button>
                                        </div>
                                    </div>

                                    <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
                                        <h3 className="text-2xl font-bold text-black dark:text-white mb-8">
                                            Commentaires ({comments.length})
                                        </h3>
                                        {commentsLoading ? (
                                            <div className="space-y-4">
                                                {[...Array(3)].map((_, i) => (
                                                    <div key={i} className="animate-pulse bg-gray-50 dark:bg-gray-900/50 rounded-lg p-6">
                                                        <div className="flex items-center space-x-4 mb-4">
                                                            <div className="rounded-full bg-gray-200 dark:bg-gray-700 h-12 w-12"></div>
                                                            <div className="flex-1 space-y-2">
                                                                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
                                                                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                                                            </div>
                                                        </div>
                                                        <div className="space-y-2">
                                                            <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded"></div>
                                                            <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded"></div>
                                                            <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        ) : comments.length > 0 ? (
                                            <div className="space-y-6">
                                                {comments.map((comment) => (
                                                    <div
                                                        key={comment.id}
                                                        className="bg-gray-50 dark:bg-gray-900/50 rounded-lg p-6"
                                                    >
                                                        <div className="flex items-start">
                                                            <div className="flex-shrink-0 mr-4">
                                                                <div className="w-12 h-12 rounded-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center text-gray-700 dark:text-gray-300">
                                                                    {comment.visiteur_nom?.[0]?.toUpperCase() || 'A'}
                                                                </div>
                                                            </div>
                                                            <div>
                                                                <h4 className="text-lg font-medium text-black dark:text-white">
                                                                    {comment.visiteur_nom || 'Anonyme'}
                                                                </h4>
                                                                <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                                                                    {formatDate(comment.date)}
                                                                </p>
                                                                <div className="prose prose-sm dark:prose-invert max-w-none">
                                                                    <p>{comment.contenu}</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        ) : (
                                            <div className="bg-gray-50 dark:bg-gray-900/50 rounded-lg p-8 text-center">
                                                <svg className="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
                                                </svg>
                                                <p className="text-gray-600 dark:text-gray-400 mb-2">
                                                    Aucun commentaire pour le moment
                                                </p>
                                                <p className="text-sm text-gray-500 dark:text-gray-500">
                                                    Soyez le premier à laisser un commentaire !
                                                </p>
                                            </div>
                                        )}
                                        <div className="mt-10">
                                            <h4 className="text-xl font-bold text-black dark:text-white mb-6">
                                                Laisser un commentaire
                                            </h4>
                                            {commentFormStatus === 'success' ? (
                                                <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-6 text-center">
                                                    <svg className="w-12 h-12 text-green-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                                    </svg>
                                                    <h3 className="text-lg font-medium text-green-800 dark:text-green-300 mb-2">Commentaire envoyé !</h3>
                                                    <p className="text-green-600 dark:text-green-400">
                                                        Merci pour votre commentaire. Il sera affiché après modération.
                                                    </p>
                                                </div>
                                            ) : commentFormStatus === 'error' ? (
                                                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6 text-center">
                                                    <svg className="w-12 h-12 text-red-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                                    </svg>
                                                    <h3 className="text-lg font-medium text-red-800 dark:text-red-300 mb-2">Erreur</h3>
                                                    <p className="text-red-600 dark:text-red-400">
                                                        {errorMessage || "Une erreur est survenue. Veuillez réessayer."}
                                                    </p>
                                                </div>
                                            ) : (
                                                <form onSubmit={handleCommentSubmit} className="space-y-6">
                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                        <div>
                                                            <label htmlFor="nom" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                                                Votre nom <span className="text-red-500">*</span>
                                                            </label>
                                                            <input id="nom" name="nom" type="text" required value={commentFormData.nom} onChange={handleCommentChange} className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-black text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-transparent" placeholder="Entrez votre nom" />
                                                        </div>
                                                        <div>
                                                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                                                Votre email <span className="text-red-500">*</span>
                                                            </label>
                                                            <input id="email" name="email" type="email" required value={commentFormData.email} onChange={handleCommentChange} className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-black text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-transparent" placeholder="Entrez votre email" />
                                                            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">Votre email ne sera pas publié.</p>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <label htmlFor="contenu" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                                            Votre commentaire <span className="text-red-500">*</span>
                                                        </label>
                                                        <textarea id="contenu" name="contenu" rows={4} required value={commentFormData.contenu} onChange={handleCommentChange} className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-black text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-transparent resize-none" placeholder="Écrivez votre commentaire ici..."></textarea>
                                                    </div>
                                                    <div className="text-right">
                                                        <button type="submit" disabled={commentFormStatus === 'submitting'} className={`inline-flex items-center px-6 py-3 bg-black dark:bg-white text-white dark:text-black rounded-lg font-medium transition-colors ${commentFormStatus === 'submitting' ? 'opacity-70 cursor-not-allowed' : 'hover:bg-gray-800 dark:hover:bg-gray-200'}`}>
                                                            {commentFormStatus === 'submitting' ? (
                                                                <>
                                                                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white dark:text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                                                                    Envoi en cours...
                                                                </>
                                                            ) : ('Publier le commentaire')}
                                                        </button>
                                                    </div>
                                                </form>
                                            )}
                                        </div>
                                    </div>
                                </motion.div>

                                <motion.div
                                    className="lg:w-1/3 px-4 sm:px-6 lg:px-8 mt-10 lg:mt-0"
                                    variants={fadeInUp}
                                    initial="hidden"
                                    animate="visible"
                                    transition={{ delay: 0.2 }}
                                >
                                    <div className="bg-gray-50 dark:bg-gray-900/50 rounded-xl p-6 mb-8 sticky top-24">
                                        <h3 className="text-lg font-bold text-black dark:text-white mb-4">
                                            À propos de l'auteur
                                        </h3>
                                        <div className="flex items-center mb-4">
                                            <div className="w-16 h-16 rounded-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center text-gray-700 dark:text-gray-300 text-xl font-bold mr-4">
                                                {post.auteur?.[0]?.toUpperCase() || 'F'}
                                            </div>
                                            <div>
                                                <h4 className="text-base font-semibold text-black dark:text-white">
                                                    {post.auteur || 'Fox'}
                                                </h4>
                                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                                    Computer Engineering Scientist
                                                </p>
                                            </div>
                                        </div>
                                        <p className="text-gray-600 dark:text-gray-400 text-sm">
                                            Passionné par le développement web et la cybersécurité, spécialisé dans la création de solutions innovantes et performantes.
                                        </p>
                                    </div>

                                    {relatedPosts.length > 0 && (
                                        <div className="bg-gray-50 dark:bg-gray-900/50 rounded-xl p-6 mb-8">
                                            <h3 className="text-lg font-bold text-black dark:text-white mb-4">
                                                Articles liés
                                            </h3>
                                            <div className="space-y-4">
                                                {relatedPosts.map(relatedPost => (
                                                    <Link
                                                        key={relatedPost.id}
                                                        to={`/blog/${relatedPost.id}`}
                                                        className="flex items-start space-x-3 group"
                                                    >
                                                        {relatedPost.photo500_x_800 && (
                                                            <div className="flex-shrink-0 w-16 h-16 rounded-md overflow-hidden">
                                                                <img
                                                                    src={relatedPost.photo500_x_800}
                                                                    alt={relatedPost.titre}
                                                                    className="w-full h-full object-cover"
                                                                    onError={(e) => {
                                                                        const target = e.target as HTMLImageElement;
                                                                        target.onerror = null;
                                                                        target.src = '/images/fallback-post.jpg';
                                                                    }}
                                                                />
                                                            </div>
                                                        )}
                                                        <div>
                                                            <h4 className="text-sm font-medium text-black dark:text-white group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors">
                                                                {relatedPost.titre}
                                                            </h4>
                                                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                                                {formatDate(relatedPost.date)}
                                                            </p>
                                                        </div>
                                                    </Link>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                    <div className="bg-gray-50 dark:bg-gray-900/50 rounded-xl p-6">
                                        <h3 className="text-lg font-bold text-black dark:text-white mb-4">
                                            Catégories
                                        </h3>
                                        <div className="space-y-2">
                                            <Link to="/blog?category=development" className="block px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-md transition-colors">Développement</Link>
                                            <Link to="/blog?category=cybersecurity" className="block px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-md transition-colors">Cybersécurité</Link>
                                            <Link to="/blog?category=ai" className="block px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-md transition-colors">Intelligence Artificielle</Link>
                                            <Link to="/blog?category=tutorial" className="block px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-md transition-colors">Tutoriels</Link>
                                        </div>
                                    </div>
                                </motion.div>
                            </div>
                        </div>
                    </section>

                    <section className="py-16 bg-black dark:bg-white text-white dark:text-black">
                        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                            <h2 className="text-2xl md:text-3xl font-bold mb-6">
                                Vous avez aimé cet article ?
                            </h2>
                            <p className="text-lg text-gray-300 dark:text-gray-700 max-w-2xl mx-auto mb-8">
                                Abonnez-vous à la newsletter pour recevoir les prochains articles directement dans votre boîte mail.
                            </p>
                            {subscribeStatus === 'success' ? (
                                <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-6 text-center max-w-md mx-auto">
                                    <svg className="w-12 h-12 text-green-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                    </svg>
                                    <h3 className="text-lg font-medium text-green-400 mb-2">Inscription réussie !</h3>
                                    <p className="text-gray-300 dark:text-gray-700">
                                        Merci de vous être abonné. Vous recevrez nos prochains articles par email.
                                    </p>
                                </div>
                            ) : subscribeStatus === 'error' ? (
                                <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-6 text-center max-w-md mx-auto">
                                    <svg className="w-12 h-12 text-red-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                    </svg>
                                    <h3 className="text-lg font-medium text-red-400 mb-2">Erreur</h3>
                                    <p className="text-gray-300 dark:text-gray-700">
                                        {errorMessage || "Une erreur est survenue. Veuillez réessayer."}
                                    </p>
                                </div>
                            ) : (
                                <form onSubmit={handleSubscribeSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                                    <input
                                        type="email"
                                        value={subscribeEmail}
                                        onChange={(e) => setSubscribeEmail(e.target.value)}
                                        placeholder="Votre adresse email"
                                        className="flex-grow px-5 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-white dark:focus:ring-black text-black dark:text-white bg-white/90 dark:bg-black/90"
                                        required
                                    />
                                    <button
                                        type="submit"
                                        disabled={subscribeStatus === 'submitting'}
                                        className={`px-6 py-3 bg-white dark:bg-black text-black dark:text-white rounded-lg font-medium transition-colors ${
                                            subscribeStatus === 'submitting'
                                                ? 'opacity-70 cursor-not-allowed'
                                                : 'hover:bg-gray-100 dark:hover:bg-gray-900'
                                        }`}
                                    >
                                        {subscribeStatus === 'submitting' ? (
                                            <span className="flex items-center">
                                                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-black dark:text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                                Inscription...
                                            </span>
                                        ) : (
                                            "S'abonner"
                                        )}
                                    </button>
                                </form>
                            )}
                        </div>
                    </section>
                </>
            )}
        </main>
    );
};

export default BlogPostPage;