import React from 'react';
import 'katex/dist/katex.min.css';
import { BlockMath } from 'react-katex';

interface EquationBlockProps {
    content: string;
}

/**
 * Renders a LaTeX equation block.
 * Uses KaTeX for fast rendering.
 */
const EquationBlock: React.FC<EquationBlockProps> = ({ content }) => {
    if (!content) return null;

    return (
        <div className="my-10 flex justify-center w-full overflow-x-auto bg-gray-50 dark:bg-zinc-900/50 rounded-2xl p-6 sm:p-8 shadow-inner border border-gray-100 dark:border-zinc-800">
            <div className="text-black dark:text-white text-lg sm:text-xl">
                <BlockMath math={content} />
            </div>
        </div>
    );
};

export default EquationBlock;
