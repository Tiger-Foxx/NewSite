// ═══════════════════════════════════════════════════════════════
// ArticleV2 — Block-based article types
// ═══════════════════════════════════════════════════════════════

export type BlockType = "text" | "image" | "quote" | "code" | "video" | "equation" | "gallery" | "carousel";

export interface ArticleBlock {
  id: number;
  block_type: BlockType;
  order: number;
  // Text
  text_content: string;
  // Image
  image: string | null;
  image_url: string;
  image_url_resolved: string | null;
  image_caption: string;
  image_alt: string;
  // Quote
  quote_text: string;
  quote_author: string;
  // Code
  code_content: string;
  code_language: string;
  // Video
  video_url: string;
  video_caption: string;
  // Equation
  equation_content: string;
  // Gallery & Carousel JSON
  gallery_data: { url: string; caption?: string; alt?: string }[] | null;
}

export interface ArticleV2 {
  id: number;
  titre: string;
  slug: string;
  description: string;
  photo_cover: string;
  photo_cover_url: string | null;
  photo_banner: string | null;
  photo_banner_url: string | null;
  categorie: string;
  auteur: string;
  auteur_title: string;
  auteur_avatar_url: string | null;
  date: string;
  created_at: string;
  updated_at: string;
  is_published: boolean;
  blocks: ArticleBlock[];
  article_type: "v2";
}

export interface ArticleV2ListItem {
  id: number;
  titre: string;
  slug: string;
  description: string;
  photo_cover: string;
  photo_cover_url: string | null;
  categorie: string;
  auteur: string;
  auteur_title: string;
  auteur_avatar_url: string | null;
  date: string;
  is_published: boolean;
  article_type: "v2";
}

/**
 * Unified post item returned by the /api/all-posts/ endpoint.
 * Legacy posts have article_type='legacy', V2 have article_type='v2'.
 */
export interface UnifiedPostItem {
  id: number;
  titre: string;
  slug: string;
  description: string;
  photo_cover_url: string;
  categorie: string;
  auteur: string;
  date: string;
  article_type: "legacy" | "v2";
}

export interface CommentaireV2 {
  id: number;
  contenu: string;
  visiteur: number;
  article: number;
  date: string;
  visiteur_email: string;
  visiteur_nom: string;
}
