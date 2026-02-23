import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ImageWithSkeleton } from '../ui/ImageWithSkeleton';

interface CarouselBlockProps {
    data: { url: string; caption?: string; alt?: string }[] | null;
}

const CarouselBlock: React.FC<CarouselBlockProps> = ({ data }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    if (!data || data.length === 0) return null;

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % data.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + data.length) % data.length);
    };

    return (
        <div className="relative my-12 group rounded-2xl overflow-hidden bg-gray-100 dark:bg-zinc-900 aspect-video shadow-lg">
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="absolute inset-0"
                >
                    <ImageWithSkeleton
                        src={data[currentIndex].url}
                        alt={data[currentIndex].alt || `Slide ${currentIndex + 1}`}
                        className="w-full h-full object-cover"
                    />
                    {data[currentIndex].caption && (
                        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6 pb-8">
                            <p className="text-white text-sm sm:text-base font-medium max-w-2xl">
                                {data[currentIndex].caption}
                            </p>
                        </div>
                    )}
                </motion.div>
            </AnimatePresence>

            {data.length > 1 && (
                <>
                    {/* Navigation Buttons */}
                    <button
                        onClick={prevSlide}
                        className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/50 hover:bg-black/70 text-white flex items-center justify-center backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100 focus:opacity-100 disabled:opacity-30"
                        aria-label="Image précédente"
                    >
                        <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                    <button
                        onClick={nextSlide}
                        className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/50 hover:bg-black/70 text-white flex items-center justify-center backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100 focus:opacity-100 disabled:opacity-30"
                        aria-label="Image suivante"
                    >
                        <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>

                    {/* Indicators */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                        {data.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentIndex(index)}
                                className={`w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full transition-all duration-300 ${
                                    index === currentIndex ? 'bg-white scale-125' : 'bg-white/50 hover:bg-white/80'
                                }`}
                                aria-label={`Aller à la diapositive ${index + 1}`}
                            />
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default CarouselBlock;
