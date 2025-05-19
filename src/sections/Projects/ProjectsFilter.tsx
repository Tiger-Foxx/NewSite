import React from 'react';
import { motion } from 'framer-motion';
import { ProjectCategory } from '../../types';

interface ProjectsFilterProps {
    categories: Array<{ name: string; value: ProjectCategory }>;
    activeCategory: ProjectCategory;
    onCategoryChange: (category: ProjectCategory) => void;
}

export const ProjectsFilter: React.FC<ProjectsFilterProps> = ({
                                                                  categories,
                                                                  activeCategory,
                                                                  onCategoryChange
                                                              }) => {
    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5
            }
        }
    };

    return (
        <motion.div
            className="overflow-x-auto scrollbar-hide mb-10"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <div className="flex space-x-3 pb-1">
                {categories.map((category) => (
                    <motion.button
                        key={category.value}
                        className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                            activeCategory === category.value
                                ? 'bg-primary text-white'
                                : 'bg-fox-light/20 text-gray-300 hover:bg-fox-light/30'
                        }`}
                        onClick={() => onCategoryChange(category.value)}
                        variants={itemVariants}
                    >
                        {category.name}
                    </motion.button>
                ))}
            </div>
        </motion.div>
    );
};