import  { Suspense, lazy, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Footer, Header, Loader, ScrollToTop } from './sections/Shared';
import { trackingService } from './services';
import { updateMetaTags } from './utils';

// Chargement paresseux des pages
const HomePage = lazy(() => import('./pages/HomePage').then(module => ({ default: module.HomePage })));
const ProjectsPage = lazy(() => import('./pages/ProjectsPage').then(module => ({ default: module.ProjectsPage })));
const ProjectDetailPage = lazy(() => import('./pages/ProjectDetailPage').then(module => ({ default: module.ProjectDetailPage })));
const BlogPage = lazy(() => import('./pages/BlogPage').then(module => ({ default: module.BlogPage })));
const BlogPostPage = lazy(() => import('./pages/BlogPostPage').then(module => ({ default: module.BlogPostPage })));
const AboutPage = lazy(() => import('./pages/AboutPage').then(module => ({ default: module.AboutPage })));
const ContactPage = lazy(() => import('./pages/ContactPage').then(module => ({ default: module.ContactPage })));
const LoginPage = lazy(() => import('./pages/LoginPage').then(module => ({ default: module.LoginPage })));
const ErrorPage = lazy(() => import('./pages/ErrorPage').then(module => ({ default: module.ErrorPage })));

function App() {
    const location = useLocation();

    // Suivi des pages vues
    useEffect(() => {
        trackingService.trackPageView(location.pathname);
    }, [location]);

    // Mettre à jour les méta-tags par défaut
    useEffect(() => {
        updateMetaTags({
            title: 'Service d\'ingénierie Informatique',
            description: 'Fox - Développement web, mobile, desktop, sécurité informatique et formation par Arthur Donfack.',
            keywords: ['développement web', 'développement mobile', 'sécurité informatique', 'formation', 'ingénierie logicielle'],
            author: 'Arthur Donfack'
        });
    }, []);

    return (
        <>
            <ScrollToTop />
            <Header />

            <main className="flex-grow pt-16 md:pt-20">
                <AnimatePresence mode="wait">
                    <Suspense fallback={<Loader fullScreen={true} />}>
                        <Routes location={location} key={location.pathname}>
                            <Route path="/" element={<HomePage />} />
                            <Route path="/projects" element={<ProjectsPage />} />
                            <Route path="/projects/:id" element={<ProjectDetailPage />} />
                            <Route path="/blog" element={<BlogPage />} />
                            <Route path="/blog/:id" element={<BlogPostPage />} />
                            <Route path="/about" element={<AboutPage />} />
                            <Route path="/contact" element={<ContactPage />} />
                            <Route path="/login" element={<LoginPage />} />
                            <Route path="*" element={<ErrorPage />} />
                        </Routes>
                    </Suspense>
                </AnimatePresence>
            </main>

            <Footer />
        </>
    );
}

export default App;