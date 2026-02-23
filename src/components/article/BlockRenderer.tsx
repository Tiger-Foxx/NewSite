import React from 'react';
import { ArticleBlock as ArticleBlockType } from '@/types';
import TextBlock from './TextBlock';
import ImageBlock from './ImageBlock';
import QuoteBlock from './QuoteBlock';
import CodeBlock from './CodeBlock';
import VideoBlock from './VideoBlock';
import EquationBlock from './EquationBlock';
import GalleryBlock from './GalleryBlock';
import CarouselBlock from './CarouselBlock';

interface BlockRendererProps {
    block: ArticleBlockType;
}

/**
 * Maps a block's type to the appropriate visual component.
 * This is the single switching point — add new block types here.
 */
const BlockRenderer: React.FC<BlockRendererProps> = ({ block }) => {
    switch (block.block_type) {
        case 'text':
            return <TextBlock content={block.text_content} />;

        case 'image':
            return (
                <ImageBlock
                    src={block.image_url_resolved || block.image_url || block.image}
                    caption={block.image_caption}
                    alt={block.image_alt}
                />
            );

        case 'quote':
            return (
                <QuoteBlock
                    text={block.quote_text}
                    author={block.quote_author}
                />
            );

        case 'code':
            return (
                <CodeBlock
                    code={block.code_content}
                    language={block.code_language}
                />
            );

        case 'video':
            return (
                <VideoBlock
                    url={block.video_url}
                    caption={block.video_caption}
                />
            );

        case 'equation':
            return <EquationBlock content={block.equation_content} />;
        case 'gallery':
            return <GalleryBlock data={block.gallery_data} />;
        case 'carousel':
            return <CarouselBlock data={block.gallery_data} />;

        default:
            console.warn(`Unknown block type: ${block.block_type}`);
            return null;
    }
};

export default BlockRenderer;
