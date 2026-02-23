import React from 'react';
import { motion } from 'framer-motion';

interface VideoBlockProps {
    url: string;
    caption?: string;
}

/**
 * Extracts the embed URL from YouTube/Vimeo links
 * and renders a responsive 16:9 iframe player.
 */
const VideoBlock: React.FC<VideoBlockProps> = ({ url, caption }) => {
    if (!url) return null;

    const getEmbedUrl = (rawUrl: string): string | null => {
        // YouTube
        const ytMatch = rawUrl.match(
            /(?:youtube\.com\/(?:watch\?v=|embed\/|v\/)|youtu\.be\/)([\w-]+)/
        );
        if (ytMatch) return `https://www.youtube.com/embed/${ytMatch[1]}`;

        // Vimeo
        const vimeoMatch = rawUrl.match(/vimeo\.com\/(\d+)/);
        if (vimeoMatch) return `https://player.vimeo.com/video/${vimeoMatch[1]}`;

        // Fallback: return as-is (may already be an embed URL)
        return rawUrl;
    };

    const embedUrl = getEmbedUrl(url);
    if (!embedUrl) return null;

    return (
        <motion.figure
            className="my-8 sm:my-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
        >
            <div className="relative w-full rounded-2xl overflow-hidden bg-black shadow-lg" style={{ paddingBottom: '56.25%' }}>
                <iframe
                    src={embedUrl}
                    title={caption || 'Video'}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute inset-0 w-full h-full"
                    loading="lazy"
                />
            </div>
            {caption && (
                <figcaption className="mt-3 text-center text-sm text-gray-500 dark:text-gray-400 italic font-light">
                    {caption}
                </figcaption>
            )}
        </motion.figure>
    );
};

export default VideoBlock;
