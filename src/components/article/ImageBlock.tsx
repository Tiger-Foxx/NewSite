import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useImageViewer } from '../../context/ImageViewerContext';

interface ImageBlockProps {
    src: string | null;
    caption?: string;
    alt?: string;
}

/**
 * Renders an image block with smooth loading, optional caption,
 * and a subtle zoom-on-hover effect.
 */
const ImageBlock: React.FC<ImageBlockProps> = ({ src, caption, alt }) => {
    const [loaded, setLoaded] = useState(false);
    const [error, setError] = useState(false);
    const { openImage } = useImageViewer();

    if (!src || error) return null;

    return (
        <figure className="my-8 sm:my-12">
            <motion.div
                className="relative overflow-hidden rounded-2xl bg-gray-100 dark:bg-zinc-900"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
            >
                {/* Loading skeleton */}
                {!loaded && (
                    <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 dark:from-zinc-800 dark:via-zinc-700 dark:to-zinc-800" />
                )}
                <img
                    src={src}
                    alt={alt || caption || 'Article image'}
                    loading="lazy"
                    onLoad={() => setLoaded(true)}
                    onError={() => setError(true)}
                    className={`w-full h-auto object-cover transition-all duration-700 ${
                        loaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
                    } hover:scale-[1.02] cursor-zoom-in`}
                    onClick={() => openImage(src, alt || caption)}
                />
            </motion.div>
            {caption && (
                <figcaption className="mt-3 text-center text-sm text-gray-500 dark:text-gray-400 italic font-light">
                    {caption}
                </figcaption>
            )}
        </figure>
    );
};

export default ImageBlock;
