import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApi } from '../hooks/useApi';
import { apiService } from '../services/api';
import { Profile, ContactPayload } from '../types';
import { 
    Mail, 
    Phone, 
    MapPin, 
    Github, 
    Linkedin, 
    Youtube, 
    Instagram, 
    Facebook,
    Plus,
    Minus,
    ArrowRight
} from 'lucide-react';
import Lottie from 'lottie-react';
import foxTyping from '../assets/lotties/fox-loader.json';
import foxZen from '../assets/lotties/fox-zen.json';

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
    const [focusedInput, setFocusedInput] = useState<string | null>(null);

    // --- API Calls ---
    const { data: profileData } = useApi<Profile>({
        endpoint: '/api/profile/?limit=1',
        loadOnMount: true
    });

    useEffect(() => {
        if (profileData && profileData.results && profileData.results.length > 0) {
            setProfile(profileData.results[0]);
            document.title = `Lancer un projet - ${profileData.results[0].nom || 'Fox Engineering'}`;
        }
        console.log(errorMessage);
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
            a: "L'excellence prend du temps. Un site vitrine premium s'établit sur 1 semaine. Les architectures SaaS ou mobiles demandent 2 semaines à 1 mois. Une roadmap chirurgicale vous est fournie post-audit."
        },
        {
            q: "Comment se déroule le workflow ?",
            a: "1. Appel stratégique (30min). 2. Proposition architecturale. 3. Sprints de développement transparents. 4. QA & Déploiement. 5. Maintenance proactive."
        },
       
    ];

    return (
        <main className="bg-white dark:bg-[#050505] min-h-screen relative selection:bg-black selection:text-white dark:selection:bg-white dark:selection:text-black font-sans overflow-x-hidden">
            
            <div className="flex flex-col lg:flex-row min-h-screen">
                
                {/* --- Left Panel: The Grand Form & FAQ --- */}
                <section className="w-full lg:w-[55%] bg-white dark:bg-[#050505] min-h-screen p-8 pt-32 md:p-16 lg:px-24 xl:px-32 lg:pb-32 lg:pt-40 z-10">
                    
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="mb-20"
                    >
                        <h1 className="text-6xl md:text-7xl lg:text-[7vw] font-black tracking-tighter uppercase leading-[0.85] text-black dark:text-white mb-8">
                            LANCER <br/>
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-400 to-gray-200 dark:from-gray-600 dark:to-gray-800">L'OFFENSIVE.</span>
                        </h1>
                        <p className="text-xl md:text-2xl font-light text-gray-500 dark:text-gray-400 max-w-xl border-l-[1px] border-black dark:border-white pl-6">
                            Vous avez une vision ambitieuse ? Transformons-la en une architecture numérique implacable. Remplissez ce formulaire et préparez-vous au déploiement.
                        </p>
                    </motion.div>
                    
                    {/* The Form */}
                    <div className="max-w-xl mb-32 relative">
                        {formStatus === 'success' && (
                            <motion.div 
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                className="mb-8 p-6 bg-black text-white dark:bg-white dark:text-black border border-transparent font-bold tracking-widest uppercase text-sm"
                            >
                                TRANSMISSION RÉUSSIE. NOUS ANALYSONS VOS DONNÉES.
                            </motion.div>
                        )}
                        {formStatus === 'error' && (
                            <motion.div 
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                className="mb-8 p-6 bg-red-600 text-white font-bold tracking-widest uppercase text-sm"
                            >
                                ERREUR DE TRANSMISSION. VEUILLEZ RÉESSAYER.
                            </motion.div>
                        )}
                        
                        <form onSubmit={handleSubmit} className="space-y-12">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                                <MinimalInput 
                                    label="Votre Nom" 
                                    name="nom" 
                                    value={formData.nom} 
                                    onChange={handleChange} 
                                    onFocus={() => setFocusedInput('nom')}
                                    onBlur={() => setFocusedInput(null)}
                                    focused={focusedInput === 'nom'}
                                />
                                <MinimalInput 
                                    label="Email Professionnel" 
                                    name="email" 
                                    type="email"
                                    value={formData.email} 
                                    onChange={handleChange} 
                                    onFocus={() => setFocusedInput('email')}
                                    onBlur={() => setFocusedInput(null)}
                                    focused={focusedInput === 'email'}
                                />
                            </div>

                            <div className="space-y-4">
                                <label className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 flex items-center justify-between">
                                    <span>Nature de la Mission</span>
                                </label>
                                <div className="relative">
                                    <select
                                        name="objet"
                                        value={formData.objet}
                                        onChange={handleChange}
                                        onFocus={() => setFocusedInput('objet')}
                                        onBlur={() => setFocusedInput(null)}
                                        className="w-full bg-transparent border-b-[2px] border-gray-200 dark:border-zinc-800 py-4 text-xl md:text-2xl font-light focus:outline-none focus:border-black dark:focus:border-white transition-colors appearance-none cursor-pointer text-black dark:text-white"
                                        required
                                    >
                                        {serviceOptions.map(opt => (
                                            <option key={opt.value} value={opt.value} className="bg-white dark:bg-[#050505] text-lg">
                                                {opt.label}
                                            </option>
                                        ))}
                                    </select>
                                    <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none">
                                        <Plus className={`w-6 h-6 transition-colors duration-500 ${focusedInput === 'objet' ? 'text-black dark:text-white' : 'text-gray-300 dark:text-zinc-700'}`} />
                                    </div>
                                    <motion.div 
                                        className="absolute bottom-0 left-0 h-[2px] bg-black dark:bg-white"
                                        initial={{ width: 0 }}
                                        animate={{ width: focusedInput === 'objet' ? '100%' : '0%' }}
                                        transition={{ duration: 0.3 }}
                                    />
                                </div>
                            </div>

                            <div className="space-y-4">
                                <label className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400">
                                    Exigences du projet
                                </label>
                                <div className="relative">
                                    <textarea
                                        name="contenu"
                                        value={formData.contenu}
                                        onChange={handleChange}
                                        onFocus={() => setFocusedInput('contenu')}
                                        onBlur={() => setFocusedInput(null)}
                                        rows={4}
                                        className="w-full bg-transparent border-b-[2px] border-gray-200 dark:border-zinc-800 py-4 text-xl md:text-2xl font-light focus:outline-none focus:border-black dark:focus:border-white transition-colors resize-none text-black dark:text-white placeholder-gray-200 dark:placeholder-zinc-800"
                                        required
                                    />
                                    <motion.div 
                                        className="absolute bottom-0 left-0 h-[2px] bg-black dark:bg-white"
                                        initial={{ width: 0 }}
                                        animate={{ width: focusedInput === 'contenu' ? '100%' : '0%' }}
                                        transition={{ duration: 0.3 }}
                                    />
                                </div>
                            </div>

                            <div className="pt-8">
                                <button
                                    type="submit"
                                    disabled={formStatus === 'submitting'}
                                    className="group relative inline-flex items-center justify-center w-full lg:w-auto overflow-hidden bg-black dark:bg-white text-white dark:text-black py-6 px-12 transition-transform active:scale-95 disabled:opacity-50"
                                >
                                    <div className="absolute inset-0 w-0 bg-white dark:bg-black group-hover:w-full transition-all duration-700 ease-out z-0" />
                                    <span className="relative z-10 flex items-center gap-4 text-sm md:text-base font-bold uppercase tracking-[0.2em] group-hover:text-black dark:group-hover:text-white transition-colors duration-700">
                                        {formStatus === 'submitting' ? 'Initialisation...' : 'Confirmer le lancement'}
                                        <ArrowRight className="w-5 h-5 transform group-hover:translate-x-2 transition-transform" />
                                    </span>
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* FAQ and Fox Section */}
                    <div className="max-w-xl xl:max-w-2xl mt-32 relative z-20">
                        {/* The Typing Fox Animation placed next to FAQ */}
                        <motion.div 
                            className="hidden md:block absolute left-[85%] lg:left-[95%] bottom-[-10%] w-[400px] lg:w-[550px] xl:w-[700px] pointer-events-none z-[-1] filter drop-shadow-2xl origin-bottom-left"
                            initial={{ opacity: 0, scale: 0.8, x: 50 }}
                            animate={{ opacity: 1, scale: 1, x: 0 }}
                            transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
                        >
                            <Lottie animationData={foxTyping} loop={true} />
                        </motion.div>

                        <div className="relative z-10">
                            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 block mb-12">Renseignements Stratégiques</span>
                        <div className="space-y-0 border-t border-black dark:border-white">
                            {faqs.map((faq, idx) => (
                                <div key={idx} className="border-b border-black dark:border-white group">
                                    <button 
                                        onClick={() => toggleAccordion(idx)}
                                        className="w-full py-8 flex justify-between items-center text-left"
                                    >
                                        <span className="font-bold text-xl md:text-2xl tracking-tight text-black dark:text-white group-hover:pr-4 transition-all duration-300">
                                            {faq.q}
                                        </span>
                                        <div className="relative w-6 h-6 flex items-center justify-center border border-black dark:border-white rounded-full transition-transform duration-500 shrink-0">
                                            {activeAccordion === idx ? <Minus className="w-3 h-3" /> : <Plus className="w-3 h-3" />}
                                        </div>
                                    </button>
                                    <AnimatePresence>
                                        {activeAccordion === idx && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: 'auto', opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                className="overflow-hidden"
                                            >
                                                <p className="pb-8 text-xl font-light text-gray-600 dark:text-gray-400 leading-relaxed pr-8">
                                                    {faq.a}
                                                </p>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            ))}
                        </div>
                        </div>
                    </div>
                </section>

                {/* --- Right Panel: The Visual & Contact Details --- */}
                <section className="w-full lg:w-[45%] h-[60vh] lg:h-screen lg:sticky lg:top-0 relative overflow-hidden group border-l-[1px] border-black/10 dark:border-white/10 bg-black">
                    
                    {/* The Heroic Background Lottie */}
                    <div className="absolute inset-0 flex items-center justify-center z-0 overflow-hidden">
                        <motion.div 
                            className="w-[150%] h-[150%] md:w-[130%] md:h-[130%] pointer-events-none filter drop-shadow-2xl opacity-60 flex items-center justify-center"
                            initial={{ scale: 0.8 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 1.5, ease: "easeOut" }}
                        >
                            <Lottie animationData={foxZen} loop={true} className="w-full max-w-[800px] h-auto object-contain" />
                        </motion.div>
                    </div>
                    {/* Dark gradient to ensure text readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent z-0" />
                    

                    {/* The Contact Data Overlay */}
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5, duration: 1 }}
                        className="absolute bottom-0 left-0 w-full p-8 md:p-16 lg:p-20 z-10 flex flex-col justify-end h-full"
                    >
                        {profile && (
                            <div className="space-y-12">
                                <div>
                                    <span className="text-xs font-black uppercase tracking-[0.4em] text-gray-500 block mb-2 drop-shadow-md">Quartier Général</span>
                                    <div className="flex items-center gap-3 text-white hover:text-gray-300 transition-colors">
                                        <MapPin className="w-5 h-5 shrink-0" />
                                        <span className="text-xl md:text-2xl font-semibold tracking-wide text-white">Yaoundé, Cameroun</span>
                                    </div>
                                </div>

                                <div className="space-y-8">
                                    <a href={`mailto:${profile.email}`} className="block group/link">
                                        <span className="text-xs font-black uppercase tracking-[0.4em] text-gray-500 block mb-2 drop-shadow-md">Canal Principal</span>
                                        <div className="flex items-center gap-3 text-white">
                                            <Mail className="w-5 h-5 shrink-0" />
                                            <span className="text-xl md:text-2xl font-semibold tracking-wide group-hover/link:underline decoration-2 underline-offset-4 transition-all break-all text-white">
                                                {profile.email}
                                            </span>
                                        </div>
                                    </a>

                                    {profile.telephone && (
                                        <a href={`tel:${profile.telephone}`} className="block group/link">
                                            <span className="text-xs font-black uppercase tracking-[0.4em] text-gray-500 block mb-2 drop-shadow-md">Signal Vocal</span>
                                            <div className="flex items-center gap-3 text-white">
                                                <Phone className="w-5 h-5 shrink-0" />
                                                <span className="text-xl md:text-2xl font-semibold tracking-wide group-hover/link:underline decoration-2 underline-offset-4 transition-all text-white">
                                                    {profile.telephone}
                                                </span>
                                            </div>
                                        </a>
                                    )}
                                </div>

                                {/* Networks */}
                                <div className="pt-12 border-t-[2px] border-white/20">
                                    <span className="text-xs font-black uppercase tracking-[0.4em] text-gray-500 block mb-6 drop-shadow-md">Réseaux</span>
                                    <div className="flex gap-6">
                                        {profile?.github && <SocialLink href={profile.github} icon={<Github className="w-6 h-6" />} />}
                                        {profile?.linkedIn && <SocialLink href={profile.linkedIn} icon={<Linkedin className="w-6 h-6" />} />}
                                        {profile?.instagram && <SocialLink href={profile.instagram} icon={<Instagram className="w-6 h-6" />} />}
                                        {profile?.youtube && <SocialLink href={profile.youtube} icon={<Youtube className="w-6 h-6" />} />}
                                        {profile?.facebook && <SocialLink href={profile.facebook} icon={<Facebook className="w-6 h-6" />} />}
                                    </div>
                                </div>
                            </div>
                        )}
                    </motion.div>
                </section>
            </div>
        </main>
    );
};

// --- Sub-components ---

const MinimalInput = ({ label, focused, ...props }: any) => (
    <div className="relative space-y-4">
        <label className={`text-xs font-bold uppercase tracking-[0.2em] transition-colors duration-500 ${focused ? 'text-black dark:text-white' : 'text-gray-400'}`}>
            {label}
        </label>
        <div className="relative">
            <input 
                {...props}
                className="w-full bg-transparent border-b-[2px] border-gray-200 dark:border-zinc-800 py-4 text-xl md:text-2xl font-light focus:outline-none focus:border-transparent transition-colors text-black dark:text-white placeholder-transparent" 
            />
            {/* Animated Bottom Border */}
            <motion.div 
                className="absolute bottom-0 left-0 h-[2px] bg-black dark:bg-white"
                initial={{ width: 0 }}
                animate={{ width: focused ? '100%' : '0%' }}
                transition={{ duration: 0.3 }}
            />
        </div>
    </div>
);

const SocialLink = ({ href, icon }: { href: string; icon: React.ReactNode }) => (
    <a 
        href={href} 
        target="_blank" 
        rel="noopener noreferrer"
        className="text-white/60 hover:text-white hover:-translate-y-1 transform transition-all duration-300"
    >
        {icon}
    </a>
);

export default ContactPage;