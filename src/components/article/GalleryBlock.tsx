import React from 'react';
import { ImageWithSkeleton } from '../ui/ImageWithSkeleton';

interface GalleryBlockProps {
    data: { url: string; caption?: string; alt?: string }[] | null;
}

const GalleryBlock: React.FC<GalleryBlockProps> = ({ data }) => {
    if (!data || data.length === 0) return null;

    const gridCols = data.length === 1 ? 'grid-cols-1' : data.length === 2 ? 'grid-cols-2' : data.length === 3 ? 'grid-cols-1 sm:grid-cols-3' : 'grid-cols-2 lg:grid-cols-3';

    return (
        <figure className="my-12">
            <div className={`grid gap-4 ${gridCols}`}>
                {data.map((item, index) => (
                    <div key={index} className="relative group overflow-hidden rounded-2xl bg-gray-100 dark:bg-zinc-900 aspect-square sm:aspect-auto sm:h-64 lg:h-80">
                        <ImageWithSkeleton
                            src={item.url}
                            alt={item.alt || `Gallery image ${index + 1}`}
                            className="w-full h-full object-cover rounded-2xl transition-transform duration-700 group-hover:scale-105"
                        />
                        {item.caption && (
                            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <p className="text-white text-xs sm:text-sm font-medium">{item.caption}</p>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </figure>
    );
};

export default GalleryBlock;
