import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApi } from '../hooks/useApi';
import { apiService } from '../services/api';
import { Profile, ContactPayload } from '../types';
import { 
    Mail, 
    Phone, 
    MapPin, 
    Send, 
    ArrowRight, 
    Github, 
    Linkedin, 
    Youtube, 
    Instagram, 
    Facebook,
    Plus,
    Minus,
    MessageSquare
} from 'lucide-react';

export const ContactPage: React.FC = () => {
    // --- State ---
    const [formData, setFormData] = useState<ContactPayload>({
        nom: '',
        email: '',
        objet: '',
        contenu: ''
    });
    const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState('');
    const [profile, setProfile] = useState<Profile | null>(null);
    const [activeAccordion, setActiveAccordion] = useState<number | null>(null);

    // --- API Calls ---
    const { data: profileData } = useApi<Profile>({
        endpoint: '/api/profile/?limit=1',
        loadOnMount: true
    });

    useEffect(() => {
        if (profileData && profileData.results && profileData.results.length > 0) {
            setProfile(profileData.results[0]);
            document.title = `Contact - ${profileData.results[0].nom || 'Fox Engineering'}`;
        }
    }, [profileData]);

    // --- Handlers ---
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setFormStatus('submitting');
        try {
            await apiService.post('/api/send-message/', formData);
            setFormStatus('success');
            setFormData({ nom: '', email: '', objet: '', contenu: '' });
            setTimeout(() => setFormStatus('idle'), 5000);
        } catch (error) {
            setFormStatus('error');
            setErrorMessage((error as any)?.response?.data?.error || 'Une erreur est survenue.');
            setTimeout(() => setFormStatus('idle'), 5000);
        }
    };

    const toggleAccordion = (index: number) => {
        setActiveAccordion(activeAccordion === index ? null : index);
    };

    // --- Data ---
    const serviceOptions = [
        { value: '', label: 'Sélectionnez un sujet...' },
        { value: 'development', label: 'Développement Web' },
        { value: 'mobile', label: 'Application Mobile' },
        { value: 'security', label: 'Audit Cybersécurité' },
        { value: 'ai', label: 'Solutions IA' },
        { value: 'consulting', label: 'Conseil Tech' },
        { value: 'other', label: 'Autre' }
    ];

    const faqs = [
        {
            q: "Quels sont vos délais habituels ?",
            a: "Les délais varient selon la complexité. Un site vitrine peut prendre 2 à 3 semaines, tandis qu'une plateforme SaaS complète peut prendre 1 à 3 mois. Je fournis une feuille de route détaillée avant chaque début de projet."
        },
        {
            q: "Comment se déroule la collaboration ?",
            a: "Nous commençons par un appel de découverte. Ensuite, j'envoie une proposition. Une fois approuvée, nous passons à la conception/prototypage, des sprints de développement réguliers avec des points d'étape, et enfin le lancement + support."
        },
        {
            q: "Proposez-vous de la maintenance ?",
            a: "Absolument. Je propose des forfaits mensuels pour les correctifs de sécurité, les mises à jour, les sauvegardes, et pour m'assurer que votre actif numérique reste impeccable."
        },
        {
            q: "Quelle est votre pile technologique ?",
            a: "Mon arsenal comprend React (Next.js/Vite), TypeScript, Node.js, Python (Django/FastAPI), et des infrastructures cloud comme AWS/Vercel. Je choisis le meilleur outil pour chaque mission."
        }
    ];

    return (
        <main className="bg-white dark:bg-black min-h-screen relative overflow-hidden selection:bg-black selection:text-white dark:selection:bg-white dark:selection:text-black">
            {/* Ambient Noise */}
            <div className="fixed inset-0 pointer-events-none z-50 opacity-[0.04] bg-[url('/noise.png')] mix-blend-overlay"></div>
            
            {/* Split Layout Container */}
            <div className="flex flex-col lg:flex-row min-h-screen">
                
                {/* --- Left Panel: Sticky Info --- */}
                <section className="lg:w-5/12 lg:h-screen lg:sticky lg:top-0 bg-gray-50 dark:bg-zinc-900 border-r border-gray-200 dark:border-zinc-800 p-8 md:p-12 flex flex-col justify-between overflow-hidden relative">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/5 dark:bg-blue-400/5 rounded-full blur-3xl pointer-events-none -translate-y-1/2 translate-x-1/2" />
                    
                    {/* Header */}
                    <div className="relative z-10 pt-20 lg:pt-0">
                        <motion.span 
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="inline-block px-3 py-1 mb-6 text-[10px] font-bold tracking-[0.2em] uppercase bg-black text-white dark:bg-white dark:text-black rounded-full"
                        >
                            Contactez-moi
                        </motion.span>
                        <motion.h1 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-6xl md:text-7xl font-black tracking-tighter leading-[0.9] mb-6 text-black dark:text-white"
                        >
                            PARLONS <br/>
                            <span className="text-gray-400 dark:text-gray-600">PROJET.</span>
                        </motion.h1>
                        <p className="text-gray-500 dark:text-gray-400 max-w-sm text-lg leading-relaxed">
                            Prêt à lancer votre prochain projet ambitieux ? Envoyez un message et créons ensemble quelque chose d'exceptionnel.
                        </p>
                    </div>

                    {/* Contact details */}
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="space-y-8 relative z-10 mt-12 lg:mt-0"
                    >
                        {profile && (
                            <div className="space-y-6">
                                <a href={`mailto:${profile.email}`} className="flex items-center gap-4 group">
                                    <div className="p-3 rounded-full bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 group-hover:bg-black group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-black transition-all duration-300">
                                        <Mail className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold uppercase text-gray-400 tracking-wider mb-0.5">Email</p>
                                        <p className="text-lg font-medium text-black dark:text-white">{profile.email}</p>
                                    </div>
                                </a>

                                {profile.telephone && (
                                    <a href={`tel:${profile.telephone}`} className="flex items-center gap-4 group">
                                        <div className="p-3 rounded-full bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 group-hover:bg-black group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-black transition-all duration-300">
                                            <Phone className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <p className="text-xs font-bold uppercase text-gray-400 tracking-wider mb-0.5">Téléphone</p>
                                            <p className="text-lg font-medium text-black dark:text-white">{profile.telephone}</p>
                                        </div>
                                    </a>
                                )}

                                <div className="flex items-center gap-4">
                                    <div className="p-3 rounded-full bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700">
                                        <MapPin className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold uppercase text-gray-400 tracking-wider mb-0.5">Localisation</p>
                                        <p className="text-lg font-medium text-black dark:text-white">Yaoundé, Cameroun</p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Social Row */}
                        <div className="pt-8 border-t border-gray-200 dark:border-zinc-800 flex gap-4">
                            {profile?.github && <SocialLink href={profile.github} icon={<Github className="w-5 h-5" />} />}
                            {profile?.linkedIn && <SocialLink href={profile.linkedIn} icon={<Linkedin className="w-5 h-5" />} />}
                            {profile?.instagram && <SocialLink href={profile.instagram} icon={<Instagram className="w-5 h-5" />} />}
                            {profile?.youtube && <SocialLink href={profile.youtube} icon={<Youtube className="w-5 h-5" />} />}
                            {profile?.facebook && <SocialLink href={profile.facebook} icon={<Facebook className="w-5 h-5" />} />}
                        </div>
                    </motion.div>
                </section>

                {/* --- Right Panel: Form & FAQ --- */}
                <section className="lg:w-7/12 bg-white dark:bg-black min-h-screen p-8 md:p-16 lg:p-24 overflow-y-auto">
                    
                    {/* The Form */}
                    <div className="max-w-xl mx-auto mb-24">
                        <h3 className="text-2xl font-bold mb-8 text-black dark:text-white flex items-center gap-2">
                             <MessageSquare className="w-6 h-6" /> Envoyer un message
                        </h3>
                        
                        <form onSubmit={handleSubmit} className="space-y-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <MinimalInput 
                                    label="Nom" 
                                    name="nom" 
                                    value={formData.nom} 
                                    onChange={handleChange} 
                                    placeholder="Jean Dupont" 
                                />
                                <MinimalInput 
                                    label="Email" 
                                    name="email" 
                                    value={formData.email} 
                                    onChange={handleChange} 
                                    type="email"
                                    placeholder="jean@exemple.com" 
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-wider text-gray-400 ml-1">Sujet</label>
                                <div className="relative">
                                    <select
                                        name="objet"
                                        value={formData.objet}
                                        onChange={handleChange}
                                        className="w-full bg-transparent border-b border-gray-200 dark:border-zinc-800 py-4 text-lg focus:outline-none focus:border-black dark:focus:border-white transition-colors appearance-none cursor-pointer text-black dark:text-white"
                                        required
                                    >
                                        {serviceOptions.map(opt => (
                                            <option key={opt.value} value={opt.value} className="bg-white dark:bg-black">{opt.label}</option>
                                        ))}
                                    </select>
                                    <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none">
                                        <Plus className="w-4 h-4 text-gray-400" />
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-wider text-gray-400 ml-1">Détails</label>
                                <textarea
                                    name="contenu"
                                    value={formData.contenu}
                                    onChange={handleChange}
                                    rows={4}
                                    placeholder="Parlez-moi de votre projet, de vos délais et de vos objectifs..."
                                    className="w-full bg-transparent border-b border-gray-200 dark:border-zinc-800 py-4 text-lg focus:outline-none focus:border-black dark:focus:border-white transition-colors resize-none text-black dark:text-white placeholder-gray-300 dark:placeholder-zinc-700"
                                    required
                                />
                            </div>

                            <div className="pt-8">
                                <button
                                    type="submit"
                                    disabled={formStatus === 'submitting'}
                                    className="group relative inline-flex items-center gap-3 px-8 py-4 bg-black dark:bg-white text-white dark:text-black rounded-full font-bold tracking-wide transition-all hover:pr-10 disabled:opacity-50"
                                >
                                    <span>{formStatus === 'submitting' ? 'Envoi en cours...' : 'Envoyer le message'}</span>
                                    <Send className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                                    
                                    {formStatus === 'success' && (
                                        <span className="absolute -top-12 left-0 w-full text-center text-sm font-bold text-green-500 bg-green-100 dark:bg-green-900/30 py-2 rounded-lg">
                                            Message envoyé !
                                        </span>
                                    )}
                                    {formStatus === 'error' && (
                                        <span className="absolute -top-12 left-0 w-full text-center text-sm font-bold text-red-500 bg-red-100 dark:bg-red-900/30 py-2 rounded-lg">
                                            Erreur d'envoi.
                                        </span>
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* FAQ */}
                    <div className="max-w-xl mx-auto border-t border-gray-200 dark:border-zinc-800 pt-16">
                        <h3 className="text-2xl font-bold mb-8 text-black dark:text-white">Questions Fréquentes</h3>
                        <div className="space-y-2">
                            {faqs.map((faq, idx) => (
                                <div key={idx} className="border-b border-gray-100 dark:border-zinc-800/50">
                                    <button 
                                        onClick={() => toggleAccordion(idx)}
                                        className="w-full py-6 flex justify-between items-center text-left hover:text-black dark:hover:text-white transition-colors"
                                    >
                                        <span className="font-medium text-lg text-gray-800 dark:text-gray-200">{faq.q}</span>
                                        {activeAccordion === idx ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                                    </button>
                                    <AnimatePresence>
                                        {activeAccordion === idx && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: 'auto', opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                className="overflow-hidden"
                                            >
                                                <p className="pb-6 text-gray-500 dark:text-gray-400 leading-relaxed">
                                                    {faq.a}
                                                </p>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </div>
        </main>
    );
};

// --- Sub-components ---

const MinimalInput = ({ label, ...props }: any) => (
    <div className="space-y-2">
        <label className="text-xs font-bold uppercase tracking-wider text-gray-400 ml-1">{label}</label>
        <input 
            {...props}
            className="w-full bg-transparent border-b border-gray-200 dark:border-zinc-800 py-4 text-lg focus:outline-none focus:border-black dark:focus:border-white transition-colors text-black dark:text-white placeholder-gray-300 dark:placeholder-zinc-700" 
        />
    </div>
);

const SocialLink = ({ href, icon }: { href: string; icon: React.ReactNode }) => (
    <a 
        href={href} 
        target="_blank" 
        rel="noopener noreferrer"
        className="p-3 bg-gray-100 dark:bg-zinc-800/50 rounded-full text-gray-600 dark:text-gray-400 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all"
    >
        {icon}
    </a>
);

export default ContactPage;