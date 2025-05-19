import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Lottie from 'lottie-react';
import { AnimatePresence, motion } from 'framer-motion';
import foxLoaderAnimation from './assets/lotties/fox-loader.json';

// Composants partagés
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { ProtectedRoute } from './components/ProtectedRoute';

// Pages publiques
import { HomePage } from './pages/HomePage';
import { ProjectsPage } from './pages/ProjectsPage';
import { ProjectDetailPage } from './pages/ProjectDetailPage';
import { AboutPage } from './pages/AboutPage';
import { BlogPage } from './pages/BlogPage';
import { BlogPostPage } from './pages/BlogPostPage';
import { ContactPage } from './pages/ContactPage';
import { ErrorPage } from './pages/ErrorPage';
import { LoginPage } from './pages/LoginPage';

// Pages d'administration (protégées)

// Contexte d'authentification
import { AuthProvider } from './context/AuthContext';
import AdminNewsletterPage from "@/pages/AdminNewsletterPage.tsx";

const App: React.FC = () => {
    const [loading, setLoading] = useState(true);
    const location = useLocation();

    // Simuler un temps de chargement minimum pour montrer l'animation
    useEffect(() => {
        const minLoadTime = setTimeout(() => {
            setLoading(false);
        }, 1800); // 1.8 secondes minimum pour montrer l'animation

        return () => clearTimeout(minLoadTime);
    }, []);

    // Réinitialiser la position de défilement lors des changements de page
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location.pathname]);

    if (loading) {
        return (
            <div className="fixed inset-0 flex flex-col items-center justify-center bg-white dark:bg-black z-50">
                <div className="w-32 h-32 mb-4">
                    <Lottie
                        animationData={foxLoaderAnimation}
                        loop={true}
                    />
                </div>
                <motion.div
                    className="text-sm text-gray-500 dark:text-gray-400 mt-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                >
                    Préparation de votre expérience...
                </motion.div>
            </div>
        );
    }

    return (
        <AuthProvider>
            <div className="min-h-screen flex flex-col bg-white dark:bg-black text-black dark:text-white">
                <Header />

                <AnimatePresence mode="wait">
                    <motion.div
                        key={location.pathname}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="flex-grow"
                    >
                        <Routes location={location}>
                            {/* Routes publiques */}
                            <Route path="/" element={<HomePage />} />
                            <Route path="/projects" element={<ProjectsPage />} />
                            <Route path="/projects/:id" element={<ProjectDetailPage />} />
                            <Route path="/about" element={<AboutPage />} />
                            <Route path="/blog" element={<BlogPage />} />
                            <Route path="/blog/:slug" element={<BlogPostPage />} />
                            <Route path="/contact" element={<ContactPage />} />
                            <Route path="/login" element={<LoginPage />} />

                            {/* Routes protégées (administration) */}
                            <Route path="/admin/newsletter" element={
                                <ProtectedRoute>
                                    <AdminNewsletterPage />
                                </ProtectedRoute>
                            } />

                            {/* Route 404 */}
                            <Route path="*" element={<ErrorPage />} />
                        </Routes>
                    </motion.div>
                </AnimatePresence>

                <Footer />
            </div>
        </AuthProvider>
    );
};

export default App;