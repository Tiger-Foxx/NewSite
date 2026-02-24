import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { useApi } from '@/hooks/useApi';
import { apiService } from '@/services/api';
import {
    ArticleV2,
    CommentaireV2,
    CommentairePayload,
    PaginatedResponse,
    SubscribePayload,
    UnifiedPostItem,
} from '@/types';
import BlockRenderer from '@/components/article/BlockRenderer';
import Lottie from 'lottie-react';
import foxLoaderAnimation from '@/assets/lotties/fox-loader.json';

// highlight.js theme (GitHub Dark)
import 'highlight.js/styles/github-dark.css';

export const ArticleV2Page: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();
    const navigate = useNavigate();

    const [article, setArticle] = useState<ArticleV2 | null>(null);
    const [comments, setComments] = useState<CommentaireV2[]>([]);
    const [relatedArticles, setRelatedArticles] = useState<UnifiedPostItem[]>([]);
    const [commentFormData, setCommentFormData] = useState<CommentairePayload>({
        nom: '',
        email: '',
        contenu: '',
    });
    const [commentFormStatus, setCommentFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
    const [subscribeEmail, setSubscribeEmail] = useState('');
    const [subscribeStatus, setSubscribeStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState('');

    const siteUrl = 'https://site.myfox.tech';

    // --- Fetch article ---
    const {
        data: articleData,
        loading: articleLoading,
        error: articleError,
    } = useApi<ArticleV2>({
        endpoint: `/api/articles/${slug}/`,
        loadOnMount: true,
    });

    // --- Fetch comments ---
    const {
        data: commentsData,
        loading: commentsLoading,
        refetch: refetchComments,
    } = useApi<PaginatedResponse<CommentaireV2>>({
        endpoint: slug ? `/api/articles/${slug}/comments/?limit=100` : '',
        loadOnMount: !!slug,
    });

    useEffect(() => {
        if (articleData) {
            setArticle(articleData);
            fetchRelatedArticles(articleData.categorie, articleData.id, slug || '');
            console.log(navigate)
        }
    }, [articleData]);

    useEffect(() => {
        if (commentsData?.results) {
            setComments(commentsData.results);
        }
    }, [commentsData]);

    // Supression de la redirection brutale vers 404 en cas d'erreur API passagère

    const fetchRelatedArticles = async (categorie: string, _articleId: number, currentSlug: string) => {
        try {
            const response = await apiService.get<{ results: UnifiedPostItem[] }>(
                `/api/all-posts/?categorie=${encodeURIComponent(categorie)}&limit=3&exclude_slug=${currentSlug}`
            );
            setRelatedArticles(response.data.results as any || []);
        } catch (err) {
            console.error('Error loading related articles:', err);
        }
    };

    // --- Handlers ---
    const handleCommentChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setCommentFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleCommentSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!slug) return;
        setCommentFormStatus('submitting');
        setErrorMessage('');
        try {
            await apiService.post(`/api/articles/${slug}/comments/`, commentFormData);
            setCommentFormStatus('success');
            setCommentFormData({ nom: '', email: '', contenu: '' });
            if (refetchComments) refetchComments();
            setTimeout(() => setCommentFormStatus('idle'), 3000);
        } catch (error: any) {
            setCommentFormStatus('error');
            setErrorMessage(error?.data?.detail || error?.data?.error || error?.message || 'Une erreur est survenue.');
            setTimeout(() => { setCommentFormStatus('idle'); setErrorMessage(''); }, 5000);
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
            setSubscribeStatus('error');
            setErrorMessage(error?.data?.detail || error?.data?.error || error?.message || 'Une erreur est survenue.');
            setTimeout(() => { setSubscribeStatus('idle'); setErrorMessage(''); }, 5000);
        }
    };

    // --- Utils ---
    const formatDate = (dateString: string | undefined): string => {
        if (!dateString) return 'Date inconnue';
        return new Date(dateString).toLocaleDateString('fr-FR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    const calculateReadingTime = (blocks: ArticleV2['blocks']): number => {
        if (!blocks || blocks.length === 0) return 1;
        let totalWords = 0;
        for (const block of blocks) {
            let text = '';
            if (block.block_type === 'text') text = block.text_content;
            else if (block.block_type === 'quote') text = block.quote_text;
            else if (block.block_type === 'code') text = block.code_content;
            totalWords += text.replace(/<[^>]*>/g, '').split(/\s+/).filter(Boolean).length;
        }
        return Math.ceil(totalWords / 200) || 1;
    };

    const currentPageUrl = typeof window !== 'undefined' ? window.location.href : '';

    // --- Loading state ---
    if (articleLoading) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-white dark:bg-black">
                <Helmet>
                    <title>Chargement... - Fox Engineering</title>
                    <meta name="robots" content="noindex" />
                </Helmet>
                <div className="fixed inset-0 flex flex-col items-center justify-center bg-white dark:bg-black z-50">
                    <div className="w-32 h-32 mb-4">
                        <Lottie animationData={foxLoaderAnimation} loop={true} />
                    </div>
                    <motion.div
                        className="text-sm text-gray-500 dark:text-gray-400 mt-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                    >
                        Chargement de l'article...
                    </motion.div>
                </div>
            </div>
        );
    }

    if (articleError || !article) {
        return (
            <div className="min-h-screen pt-16 md:pt-20 flex flex-col items-center justify-center text-center px-4 bg-white dark:bg-black text-black dark:text-white">
                <div className="w-32 h-32 mx-auto mb-6 opacity-80 mix-blend-luminosity grayscale">
                    <Lottie animationData={foxLoaderAnimation} loop={false} />
                </div>
                <h2 className="text-3xl font-bold mb-4">L'article n'a pas pu être chargé</h2>
                <p className="text-lg text-gray-600 dark:text-gray-400 max-w-lg mb-8">
                    Le serveur rencontre peut-être un léger ralentissement ou l'article a été déplacé.
                </p>
                <button
                    onClick={() => window.location.reload()}
                    className="px-8 py-3 bg-black dark:bg-white text-white dark:text-black rounded-xl font-bold hover:scale-105 active:scale-95 transition-all"
                >
                    Réessayer
                </button>
            </div>
        );
    }

    // --- Not found ---
    if (!article && !articleLoading) {
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

    // --- Meta ---
    const postTitle = article ? `${article.titre} - Fox Engineering` : 'Article - Fox Engineering';
    const metaDescription = article?.description || 'Lisez cet article détaillé sur Fox Engineering.';
    const metaImage = article?.photo_cover_url || article?.photo_banner_url || `${siteUrl}/favicon.png`;

    const jsonLd = article ? {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": article.titre,
        "image": [metaImage],
        "datePublished": article.date ? new Date(article.date).toISOString() : undefined,
        "author": [{
            "@type": "Person",
            "name": article.auteur || "Fox",
            "url": "https://site.myfox.tech"
        }],
        "publisher": {
            "@type": "Organization",
            "name": "Fox Engineering",
            "logo": {
                "@type": "ImageObject",
                "url": "https://site.myfox.tech/favicon.png"
            }
        },
        "description": metaDescription
    } : null;

    return (
        <main className="bg-white dark:bg-black min-h-screen">
            {article && (
                <>
                    <Helmet>
                        <title>{postTitle}</title>
                        <meta name="description" content={metaDescription} />
                        <link rel="canonical" href={currentPageUrl} />
                        <meta property="og:title" content={postTitle} />
                        <meta property="og:description" content={metaDescription} />
                        <meta property="og:image" content={metaImage} />
                        <meta property="og:url" content={currentPageUrl} />
                        <meta property="og:type" content="article" />
                        <meta property="og:site_name" content="Fox Engineering" />
                        {article.date && <meta property="article:published_time" content={new Date(article.date).toISOString()} />}
                        {article.auteur && <meta property="article:author" content={article.auteur} />}
                        {article.categorie && <meta property="article:section" content={article.categorie} />}
                        <meta name="twitter:card" content="summary_large_image" />
                        <meta name="twitter:title" content={postTitle} />
                        <meta name="twitter:description" content={metaDescription} />
                        <meta name="twitter:image" content={metaImage} />
                        {jsonLd && (
                            <script type="application/ld+json">
                                {JSON.stringify(jsonLd)}
                            </script>
                        )}
                    </Helmet>

                    {/* ═══════════════════════════════════════════════ */}
                    {/* HERO — Immersive header                        */}
                    {/* ═══════════════════════════════════════════════ */}
                    <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden">
                        {/* Subtle noise overlay */}
                        <div className="absolute inset-0 opacity-[0.03] bg-[url('/noise.png')] dark:opacity-[0.02]" />

                        {/* Background blurred image */}
                        {(article.photo_banner_url || article.photo_cover_url) && (
                            <div className="absolute inset-0 opacity-15 dark:opacity-10">
                                <img
                                    src={article.photo_banner_url || article.photo_cover_url || ''}
                                    alt=""
                                    className="w-full h-full object-cover filter blur-md"
                                    aria-hidden="true"
                                />
                                <div className="absolute inset-0 bg-gradient-to-b from-white via-white to-transparent dark:from-black dark:via-black dark:to-transparent" />
                            </div>
                        )}

                        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                            <motion.div
                                className="text-center"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                            >
                                <span className="inline-block px-4 py-1.5 text-xs font-bold uppercase tracking-widest bg-black/5 dark:bg-white/10 text-gray-700 dark:text-gray-300 rounded-full mb-5 backdrop-blur-md">
                                    {article.categorie}
                                </span>
                                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-black dark:text-white mb-6 leading-[1.1] tracking-tight">
                                    {article.titre}
                                </h1>
                                <div className="flex flex-wrap justify-center items-center text-sm text-gray-500 dark:text-gray-400 mb-8 gap-4 font-mono">
                                    <div className="flex items-center gap-1.5">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                        <span>{article.auteur || 'Fox'}</span>
                                    </div>
                                    <span className="text-gray-300 dark:text-gray-700">·</span>
                                    <div className="flex items-center gap-1.5">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                        <span>{formatDate(article.date)}</span>
                                    </div>
                                    <span className="text-gray-300 dark:text-gray-700">·</span>
                                    <div className="flex items-center gap-1.5">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        <span>{calculateReadingTime(article.blocks)} min de lecture</span>
                                    </div>
                                </div>
                                {article.description && (
                                    <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto italic leading-relaxed">
                                        {article.description}
                                    </p>
                                )}
                            </motion.div>
                        </div>
                    </section>

                    {/* ═══════════════════════════════════════════════ */}
                    {/* Banner image                                   */}
                    {/* ═══════════════════════════════════════════════ */}
                    {article.photo_banner_url && (
                        <section className="py-4 bg-white dark:bg-black">
                            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                                <motion.div
                                    className="rounded-2xl overflow-hidden shadow-xl"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: 0.2 }}
                                >
                                    <img
                                        src={article.photo_banner_url}
                                        alt={article.titre}
                                        className="w-full h-auto object-cover"
                                    />
                                </motion.div>
                            </div>
                        </section>
                    )}

                    {/* ═══════════════════════════════════════════════ */}
                    {/* Article body — Block-based rendering           */}
                    {/* ═══════════════════════════════════════════════ */}
                    <section className="py-12 bg-white dark:bg-black">
                        <div className="max-w-7xl mx-auto">
                            <div className="flex flex-col lg:flex-row">
                                {/* Main content */}
                                <motion.article
                                    className="lg:w-2/3 px-4 sm:px-6 lg:px-8"
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, ease: 'easeOut' }}
                                >
                                    {/* Render each block */}
                                    <div className="space-y-2">
                                        {article.blocks
                                            .sort((a, b) => a.order - b.order)
                                            .map((block) => (
                                                <BlockRenderer key={block.id} block={block} />
                                            ))}
                                    </div>

                                    {/* Share bar */}
                                    <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
                                        <h3 className="text-lg font-bold text-black dark:text-white mb-4">Partager cet article</h3>
                                        <div className="flex space-x-3">
                                            <a href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(currentPageUrl)}&text=${encodeURIComponent(article.titre)}`} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-300" aria-label="Twitter">
                                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" /></svg>
                                            </a>
                                            <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentPageUrl)}`} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-300" aria-label="LinkedIn">
                                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                                            </a>
                                            <button onClick={() => { navigator.clipboard.writeText(currentPageUrl); }} className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-300" aria-label="Copier le lien">
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" /></svg>
                                            </button>
                                        </div>
                                    </div>

                                    {/* Author card (Moved here) */}
                                    <div className="mt-16 bg-gray-50 dark:bg-zinc-900/50 rounded-2xl p-6 md:p-8 flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left border border-gray-200 dark:border-zinc-800">
                                        <div className="flex-shrink-0 mb-4 sm:mb-0 sm:mr-6">
                                            <img
                                                src={article.auteur_avatar_url || 'https://avatars.githubusercontent.com/u/118616410?v=4'}
                                                alt={article.auteur || 'Fox'}
                                                className="w-24 h-24 rounded-full object-cover shadow-xl mx-auto"
                                            />
                                        </div>
                                        <div>
                                            <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-1">
                                                À propos de l'auteur
                                            </h3>
                                            <h4 className="text-2xl font-bold text-black dark:text-white mb-1">
                                                {article.auteur || 'Fox'}
                                            </h4>
                                            <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3 font-mono">
                                                {article.auteur_title || 'Computer Engineering Scientist'}
                                            </p>
                                            <p className="text-gray-600 dark:text-gray-300 text-base leading-relaxed">
                                                Passionné d'ingénierie informatique.
                                            </p>
                                        </div>
                                    </div>

                                    {/* ═══ Comments section ═══ */}
                                    <div className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-800">
                                        <h3 className="text-2xl font-bold text-black dark:text-white mb-8">
                                            Commentaires ({comments.length})
                                        </h3>

                                        {commentsLoading ? (
                                            <div className="space-y-4">
                                                {[...Array(2)].map((_, i) => (
                                                    <div key={i} className="animate-pulse bg-gray-50 dark:bg-gray-900/50 rounded-xl p-6">
                                                        <div className="flex items-center space-x-4 mb-4">
                                                            <div className="rounded-full bg-gray-200 dark:bg-gray-700 h-12 w-12" />
                                                            <div className="flex-1 space-y-2">
                                                                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4" />
                                                                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        ) : comments.length > 0 ? (
                                            <div className="space-y-5">
                                                {comments.map((comment) => (
                                                    <div
                                                        key={comment.id}
                                                        className="bg-gray-50 dark:bg-zinc-900/60 rounded-xl p-5 border border-gray-100 dark:border-zinc-800"
                                                    >
                                                        <div className="flex items-start">
                                                            <div className="flex-shrink-0 mr-4">
                                                                <div className="w-10 h-10 rounded-full bg-black dark:bg-white flex items-center justify-center text-white dark:text-black font-bold text-sm">
                                                                    {comment.visiteur_nom?.[0]?.toUpperCase() || 'A'}
                                                                </div>
                                                            </div>
                                                            <div>
                                                                <h4 className="text-sm font-bold text-black dark:text-white">
                                                                    {comment.visiteur_nom || 'Anonyme'}
                                                                </h4>
                                                                <p className="text-xs text-gray-400 dark:text-gray-500 mb-2 font-mono">
                                                                    {formatDate(comment.date)}
                                                                </p>
                                                                <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                                                                    {comment.contenu}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        ) : (
                                            <div className="bg-gray-50 dark:bg-zinc-900/50 rounded-xl p-8 text-center border border-gray-100 dark:border-zinc-800">
                                                <p className="text-gray-500 dark:text-gray-400 text-sm">
                                                    Aucun commentaire pour le moment. Soyez le premier !
                                                </p>
                                            </div>
                                        )}

                                        {/* Comment form */}
                                        <div className="mt-10">
                                            <h4 className="text-xl font-bold text-black dark:text-white mb-6">
                                                Laisser un commentaire
                                            </h4>
                                            {commentFormStatus === 'success' ? (
                                                <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-6 text-center">
                                                    <h3 className="text-lg font-medium text-green-800 dark:text-green-300 mb-2">Commentaire envoyé !</h3>
                                                    <p className="text-green-600 dark:text-green-400 text-sm">
                                                        Merci pour votre commentaire.
                                                    </p>
                                                </div>
                                            ) : commentFormStatus === 'error' ? (
                                                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-6 text-center">
                                                    <h3 className="text-lg font-medium text-red-800 dark:text-red-300 mb-2">Erreur</h3>
                                                    <p className="text-red-600 dark:text-red-400 text-sm">
                                                        {errorMessage || 'Une erreur est survenue. Veuillez réessayer.'}
                                                    </p>
                                                </div>
                                            ) : (
                                                <form onSubmit={handleCommentSubmit} className="space-y-5">
                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                                        <div>
                                                            <label htmlFor="nom-v2" className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2">
                                                                Nom <span className="text-red-500">*</span>
                                                            </label>
                                                            <input id="nom-v2" name="nom" type="text" required value={commentFormData.nom} onChange={handleCommentChange}
                                                                className="w-full px-4 py-3 border border-gray-200 dark:border-zinc-800 rounded-xl bg-white dark:bg-zinc-900 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-transparent text-sm transition-all"
                                                                placeholder="Votre nom" />
                                                        </div>
                                                        <div>
                                                            <label htmlFor="email-v2" className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2">
                                                                Email <span className="text-red-500">*</span>
                                                            </label>
                                                            <input id="email-v2" name="email" type="email" required value={commentFormData.email} onChange={handleCommentChange}
                                                                className="w-full px-4 py-3 border border-gray-200 dark:border-zinc-800 rounded-xl bg-white dark:bg-zinc-900 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-transparent text-sm transition-all"
                                                                placeholder="votre@email.com" />
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <label htmlFor="contenu-v2" className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2">
                                                            Commentaire <span className="text-red-500">*</span>
                                                        </label>
                                                        <textarea id="contenu-v2" name="contenu" rows={4} required value={commentFormData.contenu} onChange={handleCommentChange}
                                                            className="w-full px-4 py-3 border border-gray-200 dark:border-zinc-800 rounded-xl bg-white dark:bg-zinc-900 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-transparent resize-none text-sm transition-all"
                                                            placeholder="Votre commentaire..." />
                                                    </div>
                                                    <div className="text-right">
                                                        <button type="submit" disabled={commentFormStatus === 'submitting'}
                                                            className={`inline-flex items-center px-6 py-3 bg-black dark:bg-white text-white dark:text-black rounded-xl font-bold text-sm tracking-wide transition-all ${
                                                                commentFormStatus === 'submitting' ? 'opacity-70 cursor-not-allowed' : 'hover:bg-gray-800 dark:hover:bg-gray-200 hover:scale-[1.02] active:scale-[0.98]'
                                                            }`}>
                                                            {commentFormStatus === 'submitting' ? (
                                                                <>
                                                                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                                                    </svg>
                                                                    Envoi...
                                                                </>
                                                            ) : 'Publier'}
                                                        </button>
                                                    </div>
                                                </form>
                                            )}
                                        </div>
                                    </div>
                                </motion.article>

                                {/* ═══ Sidebar ═══ */}
                                <motion.aside
                                    className="lg:w-1/3 px-4 sm:px-6 lg:px-8 mt-10 lg:mt-0"
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: 0.2 }}
                                >
                                    {/* Related articles */}
                                    {relatedArticles.length > 0 && (
                                        <div className="bg-gray-50 dark:bg-zinc-900/50 rounded-2xl p-6 mb-6 border border-gray-100 dark:border-zinc-800">
                                            <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">
                                                Articles liés
                                            </h3>
                                            <div className="space-y-4">
                                                {relatedArticles.map(related => (
                                                    <Link
                                                        key={related.id || related.slug}
                                                        to={related.article_type === 'v2' ? `/article/${related.slug}` : `/blog/${related.id}`}
                                                        className="flex items-start space-x-3 group"
                                                    >
                                                        {related.photo_cover_url && (
                                                            <div className="flex-shrink-0 w-14 h-14 rounded-lg overflow-hidden">
                                                                <img
                                                                    src={related.photo_cover_url}
                                                                    alt={related.titre}
                                                                    className="w-full h-full object-cover"
                                                                />
                                                            </div>
                                                        )}
                                                        <div>
                                                            <h4 className="text-sm font-medium text-black dark:text-white group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors leading-tight">
                                                                {related.titre}
                                                            </h4>
                                                            <p className="text-xs text-gray-400 dark:text-gray-500 mt-1 font-mono">
                                                                {formatDate(related.date)}
                                                            </p>
                                                        </div>
                                                    </Link>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* Categories */}
                                    <div className="bg-gray-50 dark:bg-zinc-900/50 rounded-2xl p-6 border border-gray-100 dark:border-zinc-800">
                                        <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">
                                            Catégories
                                        </h3>
                                        <div className="space-y-1">
                                            <Link to="/blog?category=development" className="block px-3 py-2 text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-zinc-800 rounded-lg transition-colors">Développement</Link>
                                            <Link to="/blog?category=cybersecurity" className="block px-3 py-2 text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-zinc-800 rounded-lg transition-colors">Cybersécurité</Link>
                                            <Link to="/blog?category=ai" className="block px-3 py-2 text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-zinc-800 rounded-lg transition-colors">Intelligence Artificielle</Link>
                                            <Link to="/blog?category=tutorial" className="block px-3 py-2 text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-zinc-800 rounded-lg transition-colors">Tutoriels</Link>
                                        </div>
                                    </div>
                                </motion.aside>
                            </div>
                        </div>
                    </section>

                    {/* ═══════════════════════════════════════════════ */}
                    {/* Newsletter CTA                                 */}
                    {/* ═══════════════════════════════════════════════ */}
                    <section className="py-16 bg-black dark:bg-white text-white dark:text-black">
                        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                            <h2 className="text-2xl md:text-3xl font-black mb-6 tracking-tight">
                                Vous avez aimé cet article ?
                            </h2>
                            <p className="text-lg text-gray-400 dark:text-gray-600 max-w-2xl mx-auto mb-8 leading-relaxed">
                                Abonnez-vous à la newsletter pour recevoir les prochains articles directement dans votre boîte mail.
                            </p>
                            {subscribeStatus === 'success' ? (
                                <div className="bg-green-500/20 border border-green-500/30 rounded-xl p-6 text-center max-w-md mx-auto">
                                    <h3 className="text-lg font-medium text-green-400 mb-2">Inscription réussie !</h3>
                                    <p className="text-gray-300 dark:text-gray-600 text-sm">
                                        Merci de vous être abonné.
                                    </p>
                                </div>
                            ) : subscribeStatus === 'error' ? (
                                <div className="bg-red-500/20 border border-red-500/30 rounded-xl p-6 text-center max-w-md mx-auto">
                                    <h3 className="text-lg font-medium text-red-400 mb-2">Erreur</h3>
                                    <p className="text-gray-300 dark:text-gray-600 text-sm">
                                        {errorMessage || 'Une erreur est survenue.'}
                                    </p>
                                </div>
                            ) : (
                                <form onSubmit={handleSubscribeSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                                    <input
                                        type="email"
                                        value={subscribeEmail}
                                        onChange={(e) => setSubscribeEmail(e.target.value)}
                                        placeholder="votre@email.com"
                                        className="flex-grow px-5 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-white dark:focus:ring-black text-black dark:text-white bg-white/90 dark:bg-black/90 text-sm"
                                        required
                                    />
                                    <button
                                        type="submit"
                                        disabled={subscribeStatus === 'submitting'}
                                        className={`px-6 py-3 bg-white dark:bg-black text-black dark:text-white rounded-xl font-bold text-sm transition-all ${
                                            subscribeStatus === 'submitting'
                                                ? 'opacity-70 cursor-not-allowed'
                                                : 'hover:bg-gray-100 dark:hover:bg-gray-900 hover:scale-[1.02] active:scale-[0.98]'
                                        }`}
                                    >
                                        {subscribeStatus === 'submitting' ? 'Inscription...' : "S'abonner"}
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

export default ArticleV2Page;
