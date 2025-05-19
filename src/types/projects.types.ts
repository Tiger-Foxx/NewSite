export interface Project {
    id: number;
    nom: string;
    description: string;
    photo1_800_x_550: string;
    photo2_800_x_550?: string;
    photo3_800_x_550?: string;
    categorie: string;
    sujet: string;
    date: string;
    demo?: string;
}

export type ProjectCategory = 'dev' | 'security' | 'ia' | 'all';

export interface FoxProduct {
    id: string;
    name: string;
    description: string;
    icon: string;
    tags: string[];
    liveUrl: string;
    githubUrl: string;
    buttonText: string;
    secondaryButtonText: string;
    featured: boolean;
}