import {Project} from "@/types/projects.types.ts";
import {Post} from "@/types/blog.types.ts";

export * from './api.types';
export * from './blog.types';
export * from './projects.types';

export interface Profile {
    id: number;
    nom: string;
    sousTitre: string;
    photo: string;
    descriptionP1: string;
    descriptionP2: string;
    signature: string;
    email: string;
    telephone: string;
    cv?: string;
    facebook?: string;
    github?: string;
    instagram?: string;
    linkedIn?: string;
    gmail?: string;
    youtube?: string;
}

export interface Timeline {
    id: number;
    titre: string;
    periode: string;
    description: string;
    ordre: number;
}

export interface Temoignage {
    id: number;
    texte: string;
    auteur: string;
    fonction: string;
}

export interface DashboardStats {
    totalProjects: number;
    totalPosts: number;
    totalTestimonials: number;
    recentPosts: Post[];
    recentProjects: Project[];
    testimonials: Temoignage[];
}

export interface ContactPayload {
    email: string;
    nom: string;
    objet: string;
    contenu: string;
}

export interface SubscribePayload {
    email: string;
    nom?: string;
}