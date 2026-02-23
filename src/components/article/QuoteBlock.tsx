import React from 'react';
import { motion } from 'framer-motion';

interface QuoteBlockProps {
    text: string;
    author?: string;
}

/**
 * Renders a visually striking blockquote with an oversized
 * opening-quote glyph and optional attribution.
 */
const QuoteBlock: React.FC<QuoteBlockProps> = ({ text, author }) => {
    if (!text) return null;

    return (
        <motion.blockquote
            className="relative my-10 sm:my-14 py-8 px-6 sm:px-10"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
        >
            {/* Left accent bar */}
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-black via-gray-400 to-transparent dark:from-white dark:via-gray-600 dark:to-transparent rounded-full" />

            {/* Oversized quote glyph */}
            <span
                className="absolute -top-4 -left-2 text-[120px] leading-none font-serif text-gray-100 dark:text-zinc-800 select-none pointer-events-none"
                aria-hidden="true"
            >
                "
            </span>

            <p className="relative text-xl sm:text-2xl font-light italic text-gray-800 dark:text-gray-200 leading-relaxed tracking-tight">
                {text}
            </p>

            {author && (
                <footer className="relative mt-4 text-sm font-medium text-gray-500 dark:text-gray-400 tracking-wide uppercase">
                    — {author}
                </footer>
            )}
        </motion.blockquote>
    );
};

export default QuoteBlock;
