import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ImageWithSkeletonProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    containerClassName?: string;
    skeletonClassName?: string;
}

export const ImageWithSkeleton: React.FC<ImageWithSkeletonProps> = ({ 
    src, 
    alt, 
    className, 
    containerClassName = '', 
    skeletonClassName = 'bg-gray-200 dark:bg-[#111] animate-pulse',
    ...props 
}) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [hasError, setHasError] = useState(false);

    return (
        <div className={`relative overflow-hidden ${containerClassName} ${className?.includes('absolute') ? 'absolute inset-0' : 'w-full h-full'}`}>
            <AnimatePresence>
                {!isLoaded && !hasError && (
                    <motion.div 
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        className={`absolute inset-0 ${skeletonClassName} z-0`} 
                    />
                )}
            </AnimatePresence>
            
            <img 
                src={src} 
                alt={alt}
                className={`${className} ${isLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-700 relative z-10`}
                onLoad={() => setIsLoaded(true)}
                onError={(e) => {
                    setHasError(true);
                    if (props.onError) {
                        props.onError(e);
                    } else {
                        (e.target as HTMLImageElement).style.display = 'none';
                    }
                }}
                {...props}
            />
        </div>
    );
};
