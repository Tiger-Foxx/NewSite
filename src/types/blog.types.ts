export interface Post {
    id: number;
    titre: string;
    description: string;
    photo500_x_800: string;
    photo800_x_533: string;
    categorie: string;
    auteur: string;
    date: string;
    contenuP1: string;
    contenuP2: string | null;
    contenuP3: string | null;
    contenuP4: string | null;
    contenuConclusion: string | null;
    contenuSitation: string | null;
}

export interface Commentaire {
    id: number;
    contenu: string;
    visiteur: number;
    post: number;
    date: string;
    visiteur_email: string;
    visiteur_nom: string;
}

export interface CommentairePayload {
    email: string;
    nom: string;
    contenu: string;
}