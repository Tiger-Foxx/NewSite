import React, { createContext, useContext, useState, ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ImageViewerContextType {
    openImage: (src: string, alt?: string) => void;
    closeImage: () => void;
}

const ImageViewerContext = createContext<ImageViewerContextType | undefined>(undefined);

export const ImageViewerProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [imageSrc, setImageSrc] = useState<string | null>(null);
    const [imageAlt, setImageAlt] = useState<string | undefined>(undefined);

    const openImage = (src: string, alt?: string) => {
        setImageSrc(src);
        setImageAlt(alt);
        document.body.style.overflow = 'hidden';
    };

    const closeImage = () => {
        setImageSrc(null);
        setImageAlt(undefined);
        document.body.style.overflow = 'auto';
    };

    return (
        <ImageViewerContext.Provider value={{ openImage, closeImage }}>
            {children}
            <AnimatePresence>
                {imageSrc && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="fixed inset-0 z-[100] flex justify-center items-center bg-black/95 backdrop-blur-sm cursor-zoom-out touch-none"
                        onClick={closeImage}
                    >
                        <button 
                            className="absolute top-6 right-6 text-white/70 hover:text-white p-3 rounded-full bg-white/5 hover:bg-white/10 transition-colors z-[101]"
                            onClick={closeImage}
                            aria-label="Fermer l'image"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                        
                        <div className="relative max-w-[95vw] max-h-[95vh] flex justify-center items-center overflow-auto scrollbar-hide w-full h-full p-4 touch-pan-x touch-pan-y touch-pinch-zoom">
                             <motion.img
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.95, opacity: 0 }}
                                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                                src={imageSrc}
                                alt={imageAlt || "Vue agrandie"}
                                className="max-w-full max-h-full object-contain cursor-default"
                                onClick={(e) => e.stopPropagation()} 
                            />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </ImageViewerContext.Provider>
    );
};

export const useImageViewer = () => {
    const context = useContext(ImageViewerContext);
    if (context === undefined) {
        throw new Error('useImageViewer must be used within an ImageViewerProvider');
    }
    return context;
};
