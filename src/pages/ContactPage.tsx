import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useApi } from '../hooks/useApi';
import { Profile } from '../types';

export const ContactPage: React.FC = () => {
    // État du formulaire
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState('');
    const [profile, setProfile] = useState<Profile | null>(null);

    // Récupérer les données du profil pour les informations de contact
    const { data: profileData } = useApi<Profile>({
        endpoint: '/api/profile/',
        loadOnMount: true
    });

    useEffect(() => {
        if (profileData) {
            setProfile(profileData.results[0]);
            document.title = `Contact - ${profileData.results[0].nom || 'Fox Engineering'}`;
        } else {
            document.title = 'Contact - Fox Engineering';
        }
    }, [profileData]);

    // Gérer les changements de formulaire
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    // Gérer la soumission du formulaire
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setFormStatus('submitting');

        try {
            // Simulation d'appel API - remplacer par un vrai appel API

            const response = await fetch('127.0.0.1:8000/api/send-message/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error('Erreur lors de l\'envoi du message');
            }

            setFormStatus('success');
            setFormData({ name: '', email: '', subject: '', message: '' });

            // Réinitialiser l'état après 5 secondes
            setTimeout(() => {
                setFormStatus('idle');
            }, 5000);

        } catch (error) {
            console.error('Erreur de soumission du formulaire:', error);
            setFormStatus('error');
            setErrorMessage(error instanceof Error ? error.message : 'Une erreur est survenue');

            // Réinitialiser l'état d'erreur après 5 secondes
            setTimeout(() => {
                setFormStatus('idle');
                setErrorMessage('');
            }, 5000);
        }
    };

    // Options de services
    const serviceOptions = [
        { value: '', label: 'Sélectionnez un sujet' },
        { value: 'development', label: 'Développement Web' },
        { value: 'mobile', label: 'Application Mobile' },
        { value: 'security', label: 'Cybersécurité' },
        { value: 'ai', label: 'Intelligence Artificielle' },
        { value: 'consulting', label: 'Conseil' },
        { value: 'other', label: 'Autre' }
    ];

    // Animation variants
    const fadeInUp = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: "easeOut" }
        }
    };

    return (
        <main className="bg-white dark:bg-black min-h-screen">
            {/* Header Section */}
            <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden">
                <div className="absolute inset-0 opacity-[0.03] bg-[url('/noise.png')] dark:opacity-[0.02]"></div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                    <motion.div
                        className="text-center mb-16"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <span className="inline-block px-3 py-1 text-xs font-medium uppercase tracking-wider bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full mb-4">Contact</span>
                        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-black dark:text-white mb-6 leading-tight">
                            Parlons de <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-600 via-black to-black dark:from-gray-400 dark:via-gray-100 dark:to-white">votre projet</span>
                        </h1>
                        <div className="w-24 h-1 bg-gray-200 dark:bg-gray-800 mx-auto mb-8"></div>
                        <p className="max-w-2xl mx-auto text-xl text-gray-600 dark:text-gray-400">
                            Une question, un projet ou simplement envie d'échanger ? N'hésitez pas à me contacter !
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Contact Form and Info Section */}
            <section className="py-16 bg-gray-50 dark:bg-gray-900/50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col lg:flex-row gap-16">
                        {/* Contact Form */}
                        <motion.div
                            className="lg:w-2/3"
                            variants={fadeInUp}
                            initial="hidden"
                            animate="visible"
                        >
                            <div className="bg-white dark:bg-black rounded-2xl shadow-lg p-8 border border-gray-200 dark:border-gray-800">
                                <h2 className="text-2xl font-bold text-black dark:text-white mb-6">
                                    Envoyez-moi un message
                                </h2>

                                {formStatus === 'success' ? (
                                    <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-6 text-center">
                                        <svg className="w-12 h-12 text-green-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                        </svg>
                                        <h3 className="text-lg font-medium text-green-800 dark:text-green-300 mb-2">Message envoyé !</h3>
                                        <p className="text-green-600 dark:text-green-400">
                                            Merci pour votre message. Je vous répondrai dans les plus brefs délais.
                                        </p>
                                    </div>
                                ) : formStatus === 'error' ? (
                                    <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6 text-center">
                                        <svg className="w-12 h-12 text-red-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                        </svg>
                                        <h3 className="text-lg font-medium text-red-800 dark:text-red-300 mb-2">Erreur</h3>
                                        <p className="text-red-600 dark:text-red-400 mb-4">
                                            {errorMessage || "Une erreur est survenue lors de l'envoi du message. Veuillez réessayer."}
                                        </p>
                                        <button
                                            onClick={() => setFormStatus('idle')}
                                            className="inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                                        >
                                            Réessayer
                                        </button>
                                    </div>
                                ) : (
                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div>
                                                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                                    Votre nom <span className="text-red-500">*</span>
                                                </label>
                                                <input
                                                    id="name"
                                                    name="name"
                                                    type="text"
                                                    required
                                                    value={formData.name}
                                                    onChange={handleChange}
                                                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-black text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-transparent"
                                                    placeholder="Entrez votre nom"
                                                />
                                            </div>

                                            <div>
                                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                                    Votre email <span className="text-red-500">*</span>
                                                </label>
                                                <input
                                                    id="email"
                                                    name="email"
                                                    type="email"
                                                    required
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-black text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-transparent"
                                                    placeholder="Entrez votre email"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                                Sujet <span className="text-red-500">*</span>
                                            </label>
                                            <select
                                                id="subject"
                                                name="subject"
                                                required
                                                value={formData.subject}
                                                onChange={handleChange}
                                                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-black text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-transparent"
                                            >
                                                {serviceOptions.map(option => (
                                                    <option key={option.value} value={option.value}>
                                                        {option.label}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>

                                        <div>
                                            <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                                Message <span className="text-red-500">*</span>
                                            </label>
                                            <textarea
                                                id="message"
                                                name="message"
                                                rows={6}
                                                required
                                                value={formData.message}
                                                onChange={handleChange}
                                                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-black text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-transparent resize-none"
                                                placeholder="Décrivez votre projet ou votre demande..."
                                            ></textarea>
                                        </div>

                                        <div className="text-right">
                                            <button
                                                type="submit"
                                                disabled={formStatus === 'submitting'}
                                                className={`inline-flex items-center px-6 py-3 bg-black dark:bg-white text-white dark:text-black rounded-lg font-medium transition-colors ${
                                                    formStatus === 'submitting'
                                                        ? 'opacity-70 cursor-not-allowed'
                                                        : 'hover:bg-gray-800 dark:hover:bg-gray-200'
                                                }`}
                                            >
                                                {formStatus === 'submitting' ? (
                                                    <>
                                                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white dark:text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                        </svg>
                                                        Envoi en cours...
                                                    </>
                                                ) : (
                                                    <>
                                                        Envoyer le message
                                                        <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                                                        </svg>
                                                    </>
                                                )}
                                            </button>
                                        </div>
                                    </form>
                                )}
                            </div>
                        </motion.div>

                        {/* Contact Info */}
                        <motion.div
                            className="lg:w-1/3"
                            variants={fadeInUp}
                            initial="hidden"
                            animate="visible"
                            transition={{ delay: 0.2 }}
                        >
                            <div className="bg-black dark:bg-white text-white dark:text-black rounded-2xl shadow-lg p-8 h-full flex flex-col">
                                <h2 className="text-2xl font-bold mb-6">
                                    Informations de contact
                                </h2>

                                <div className="space-y-6 flex-grow">
                                    {profile && (
                                        <>
                                            <div className="flex items-start">
                                                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gray-800 dark:bg-gray-200 flex items-center justify-center">
                                                    <svg className="w-5 h-5 text-white dark:text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                                                    </svg>
                                                </div>
                                                <div className="ml-4">
                                                    <h3 className="text-sm font-medium text-gray-300 dark:text-gray-700 uppercase">Email</h3>
                                                    <a href={`mailto:${profile.email}`} className="text-lg text-white dark:text-black hover:underline">
                                                        {profile.email}
                                                    </a>
                                                </div>
                                            </div>

                                            {profile.telephone && (
                                                <div className="flex items-start">
                                                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gray-800 dark:bg-gray-200 flex items-center justify-center">
                                                        <svg className="w-5 h-5 text-white dark:text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                                                        </svg>
                                                    </div>
                                                    <div className="ml-4">
                                                        <h3 className="text-sm font-medium text-gray-300 dark:text-gray-700 uppercase">Téléphone</h3>
                                                        <a href={`tel:${profile.telephone}`} className="text-lg text-white dark:text-black hover:underline">
                                                            {profile.telephone}
                                                        </a>
                                                    </div>
                                                </div>
                                            )}
                                        </>
                                    )}

                                    <div className="flex items-start">
                                        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gray-800 dark:bg-gray-200 flex items-center justify-center">
                                            <svg className="w-5 h-5 text-white dark:text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                            </svg>
                                        </div>
                                        <div className="ml-4">
                                            <h3 className="text-sm font-medium text-gray-300 dark:text-gray-700 uppercase">Localisation</h3>
                                            <p className="text-lg text-white dark:text-black">Yaoundé, Cameroun</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Social Media Links */}
                                <div className="mt-10">
                                    <h3 className="text-sm font-medium text-gray-300 dark:text-gray-700 uppercase mb-4">
                                        Retrouvez-moi sur
                                    </h3>
                                    <div className="flex space-x-4">
                                        {profile?.linkedIn && (
                                            <a
                                                href={profile.linkedIn}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="w-10 h-10 rounded-full bg-gray-800 dark:bg-gray-200 flex items-center justify-center text-white dark:text-black hover:bg-gray-700 dark:hover:bg-gray-300 transition-colors"
                                                aria-label="LinkedIn"
                                            >
                                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                                                </svg>
                                            </a>
                                        )}

                                        {profile?.github && (
                                            <a
                                                href={profile.github}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="w-10 h-10 rounded-full bg-gray-800 dark:bg-gray-200 flex items-center justify-center text-white dark:text-black hover:bg-gray-700 dark:hover:bg-gray-300 transition-colors"
                                                aria-label="GitHub"
                                            >
                                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd"/>
                                                </svg>
                                            </a>
                                        )}

                                        {profile?.facebook && (
                                            <a
                                                href={profile.facebook}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="w-10 h-10 rounded-full bg-gray-800 dark:bg-gray-200 flex items-center justify-center text-white dark:text-black hover:bg-gray-700 dark:hover:bg-gray-300 transition-colors"
                                                aria-label="Facebook"
                                            >
                                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/>
                                                </svg>
                                            </a>
                                        )}

                                        {profile?.instagram && (
                                            <a
                                                href={profile.instagram}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="w-10 h-10 rounded-full bg-gray-800 dark:bg-gray-200 flex items-center justify-center text-white dark:text-black hover:bg-gray-700 dark:hover:bg-gray-300 transition-colors"
                                                aria-label="Instagram"
                                            >
                                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd"/>
                                                </svg>
                                            </a>
                                        )}

                                        {profile?.youtube && (
                                            <a
                                                href={profile.youtube}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="w-10 h-10 rounded-full bg-gray-800 dark:bg-gray-200 flex items-center justify-center text-white dark:text-black hover:bg-gray-700 dark:hover:bg-gray-300 transition-colors"
                                                aria-label="YouTube"
                                            >
                                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                                                </svg>
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Map Section */}
            <section className="py-16 bg-white dark:bg-black">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        className="rounded-2xl overflow-hidden shadow-lg h-[400px] border border-gray-200 dark:border-gray-800"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                    >
                        <iframe
                            title="Notre localisation"
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d83998.76457410877!2d2.2769947577463574!3d48.85894658138323!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66e1f06e2b70f%3A0x40b82c3688c9460!2sParis%2C%20France!5e0!3m2!1sfr!2sfr!4v1621342995913!5m2!1sfr!2sfr"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen={false}
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                    </motion.div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-16 bg-gray-50 dark:bg-gray-900/50">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        className="text-center mb-12"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <span className="inline-block px-3 py-1 text-xs font-medium uppercase tracking-wider bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full mb-4">FAQ</span>
                        <h2 className="text-3xl font-bold text-black dark:text-white mb-4">
                            Questions fréquentes
                        </h2>
                        <p className="text-gray-600 dark:text-gray-400">
                            Vous trouverez ici les réponses aux questions les plus courantes
                        </p>
                    </motion.div>

                    <motion.div
                        className="space-y-6"
                        variants={{
                            hidden: { opacity: 0 },
                            visible: {
                                opacity: 1,
                                transition: {
                                    staggerChildren: 0.1,
                                    delayChildren: 0.2
                                }
                            }
                        }}
                        initial="hidden"
                        animate="visible"
                    >
                        {/* FAQ Item 1 */}
                        <motion.div
                            className="bg-white dark:bg-black rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 p-6"
                            variants={fadeInUp}
                        >
                            <h3 className="text-lg font-bold text-black dark:text-white mb-3">
                                Quels sont vos délais de réalisation pour un site web ?
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400">
                                Les délais varient en fonction de la complexité du projet. Pour un site vitrine simple, comptez environ 2 à 3 semaines. Pour une application web avec des fonctionnalités avancées, le délai peut s'étendre de 1 à 3 mois. Je vous fournis toujours un planning détaillé lors de notre première consultation.
                            </p>
                        </motion.div>

                        {/* FAQ Item 2 */}
                        <motion.div
                            className="bg-white dark:bg-black rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 p-6"
                            variants={fadeInUp}
                        >
                            <h3 className="text-lg font-bold text-black dark:text-white mb-3">
                                Comment se déroule notre collaboration ?
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400">
                                Notre collaboration commence par une consultation gratuite pour comprendre vos besoins. Je vous propose ensuite un devis détaillé. Après validation, nous définissons ensemble les étapes clés du projet avec des livrables réguliers. Je reste disponible tout au long du processus pour des ajustements et vous accompagne également après la livraison finale.
                            </p>
                        </motion.div>

                        {/* FAQ Item 3 */}
                        <motion.div
                            className="bg-white dark:bg-black rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 p-6"
                            variants={fadeInUp}
                        >
                            <h3 className="text-lg font-bold text-black dark:text-white mb-3">
                                Proposez-vous des services de maintenance ?
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400">
                                Oui, je propose différentes formules de maintenance pour assurer le bon fonctionnement et la sécurité de votre site ou application. Ces services incluent les mises à jour techniques, les correctifs de sécurité, les sauvegardes régulières et l'assistance technique. Des forfaits mensuels ou annuels sont disponibles selon vos besoins.
                            </p>
                        </motion.div>

                        {/* FAQ Item 4 */}
                        <motion.div
                            className="bg-white dark:bg-black rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 p-6"
                            variants={fadeInUp}
                        >
                            <h3 className="text-lg font-bold text-black dark:text-white mb-3">
                                Quelles technologies utilisez-vous principalement ?
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400">
                                Je travaille principalement avec React, Vue.js et Node.js pour le développement web. Pour les applications mobiles, j'utilise React Native ou Flutter. Côté backend, j'utilise Django, Spring, Express ou Laravel selon les besoins. J'adapte toujours mes choix technologiques aux spécificités de chaque projet pour garantir performance et évolutivité.
                            </p>
                        </motion.div>
                    </motion.div>
                </div>
            </section>
        </main>
    );
};

export default ContactPage;