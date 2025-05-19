import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export const Footer: React.FC = () => {
    const currentYear = new Date().getFullYear();

    // Variants pour les animations
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5
            }
        }
    };

    // Liens de navigation
    const navLinks = [
        { text: 'Accueil', path: '/' },
        { text: 'Projets', path: '/projects' },
        { text: 'Blog', path: '/blog' },
        { text: 'À propos', path: '/about' },
        { text: 'Contact', path: '/contact' }
    ];

    // Liens sociaux
    const socialLinks = [
        { name: 'GitHub', url: 'https://github.com/theTigerFox', icon: 'github' },
        { name: 'LinkedIn', url: 'https://linkedin.com/in/arthur-donfack', icon: 'linkedin' },
        { name: 'Instagram', url: 'https://instagram.com/thetigerfox', icon: 'instagram' },
        { name: 'Facebook', url: 'https://facebook.com/thetigerfox', icon: 'facebook' }
    ];

    // Fonction pour rendre les icônes sociales
    const renderSocialIcon = (icon: string) => {
        switch (icon) {
            case 'github':
                return (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd"></path>
                    </svg>
                );
            case 'linkedin':
                return (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                );
            case 'instagram':
                return (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd"></path>
                    </svg>
                );
            case 'facebook':
                return (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd"></path>
                    </svg>
                );
            default:
                return null;
        }
    };

    return (
        <footer className="bg-fox-dark border-t border-fox-light/10">
            <div className="fox-gradient-bg relative">
                <div className="fox-noise"></div>
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <motion.div
                        className="grid grid-cols-1 md:grid-cols-4 gap-8"
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                    >
                        {/* Logo et tagline */}
                        <motion.div variants={itemVariants} className="md:col-span-1">
                            <Link to="/" className="inline-block mb-4">
                                <span className="text-3xl font-bold gradient-text">FOX</span>
                            </Link>
                            <p className="text-gray-400 mb-4">
                                Service d'ingénierie informatique
                            </p>
                            <p className="text-sm text-gray-500 italic">
                                "The genius at the disposal of all your dreams."
                            </p>
                        </motion.div>

                        {/* Liens rapides */}
                        <motion.div variants={itemVariants} className="md:col-span-1">
                            <h3 className="text-white text-lg font-semibold mb-4">Navigation</h3>
                            <ul className="space-y-2">
                                {navLinks.map((link) => (
                                    <li key={link.path}>
                                        <Link
                                            to={link.path}
                                            className="text-gray-400 hover:text-primary transition-colors"
                                        >
                                            {link.text}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>

                        {/* Contact */}
                        <motion.div variants={itemVariants} className="md:col-span-1">
                            <h3 className="text-white text-lg font-semibold mb-4">Contact</h3>
                            <ul className="space-y-2 text-gray-400">
                                <li className="flex items-center">
                                    <svg className="w-5 h-5 mr-2 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                                    </svg>
                                    <a href="mailto:donfackarthur750@gmail.com" className="hover:text-primary transition-colors">
                                        donfackarthur750@gmail.com
                                    </a>
                                </li>
                                <li className="flex items-center">
                                    <svg className="w-5 h-5 mr-2 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                                    </svg>
                                    <a href="tel:+237658866639" className="hover:text-primary transition-colors">
                                        +237 658 866 639
                                    </a>
                                </li>
                                <li className="flex items-center">
                                    <svg className="w-5 h-5 mr-2 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                    </svg>
                                    <span>École Polytechnique – Yaoundé, Melen</span>
                                </li>
                            </ul>
                        </motion.div>

                        {/* Call-to-action */}
                        <motion.div variants={itemVariants} className="md:col-span-1">
                            <h3 className="text-white text-lg font-semibold mb-4">Restons en contact</h3>
                            <p className="text-gray-400 mb-4">
                                Abonnez-vous à notre newsletter pour recevoir nos derniers articles et actualités.
                            </p>
                            <form className="flex flex-col space-y-3">
                                <input
                                    type="email"
                                    placeholder="Votre email"
                                    className="px-4 py-2 bg-fox-light/10 border border-fox-light/20 rounded-md text-white placeholder-gray-500 focus:outline-none focus:border-primary"
                                />
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-primary hover:bg-primary-light text-white rounded-md transition-colors"
                                >
                                    S'abonner
                                </button>
                            </form>
                        </motion.div>
                    </motion.div>

                    {/* Séparateur */}
                    <motion.div
                        className="border-t border-fox-light/10 my-8"
                        variants={itemVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    />

                    {/* Copyright et réseaux sociaux */}
                    <motion.div
                        className="flex flex-col sm:flex-row justify-between items-center"
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        <motion.div variants={itemVariants} className="text-gray-500 text-sm mb-4 sm:mb-0">
                            © {currentYear} Fox. Tous droits réservés.
                        </motion.div>

                        <motion.div variants={itemVariants} className="flex space-x-4">
                            {socialLinks.map((link) => (
                                <a
                                    key={link.name}
                                    href={link.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-gray-400 hover:text-primary transition-colors"
                                    aria-label={link.name}
                                >
                                    {renderSocialIcon(link.icon)}
                                </a>
                            ))}
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </footer>
    );
};