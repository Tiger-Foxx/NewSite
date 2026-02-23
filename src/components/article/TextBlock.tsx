import React from 'react';
import DOMPurify from 'dompurify';

interface TextBlockProps {
    content: string;
}

/**
 * Renders a text block with sanitized HTML support.
 * The text_content field can contain:
 * - Plain paragraphs (auto-wrapped)
 * - Sanitized HTML with prose styling
 */
const TextBlock: React.FC<TextBlockProps> = ({ content }) => {
    if (!content) return null;

    // Check if content contains HTML tags
    const containsHtml = /<[a-z][\s\S]*>/i.test(content);

    if (containsHtml) {
        return (
            <div
                className="
                    text-lg sm:text-xl leading-relaxed text-gray-800 dark:text-gray-300 font-light
                    [&_h2]:text-3xl [&_h2]:sm:text-5xl [&_h2]:font-bold [&_h2]:text-black [&_h2]:dark:text-white [&_h2]:mt-16 [&_h2]:mb-8 [&_h2]:tracking-tighter [&_h2]:leading-tight
                    [&_h3]:text-2xl [&_h3]:sm:text-3xl [&_h3]:font-bold [&_h3]:text-black [&_h3]:dark:text-white [&_h3]:mt-12 [&_h3]:mb-6 [&_h3]:tracking-tight
                    [&_p]:mb-6
                    [&_a]:text-black [&_a]:dark:text-white [&_a]:underline [&_a]:underline-offset-4 [&_a]:font-medium hover:[&_a]:opacity-70 [&_a]:transition-opacity
                    [&_strong]:font-bold [&_strong]:text-black [&_strong]:dark:text-white
                    [&_ul]:list-none [&_ul]:pl-0 [&_ul]:mb-8 [&_ul>li]:relative [&_ul>li]:pl-6 [&_ul>li]:mb-3
                    [&_ul>li::before]:content-[''] [&_ul>li::before]:absolute [&_ul>li::before]:left-0 [&_ul>li::before]:top-[0.6em] [&_ul>li::before]:w-2 [&_ul>li::before]:h-2 [&_ul>li::before]:bg-black [&_ul>li::before]:dark:bg-white [&_ul>li::before]:rounded-full
                    [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:mb-8 [&_ol>li]:mb-3 [&_ol>li]:pl-2
                    [&_img]:rounded-2xl [&_img]:my-10 [&_img]:shadow-2xl [&_img]:w-full
                    [&_blockquote]:border-l-[4px] [&_blockquote]:border-black [&_blockquote]:dark:border-white [&_blockquote]:pl-6 [&_blockquote]:sm:pl-10 [&_blockquote]:italic [&_blockquote]:text-xl [&_blockquote]:sm:text-2xl [&_blockquote]:font-medium [&_blockquote]:text-gray-900 [&_blockquote]:dark:text-gray-100 [&_blockquote]:my-12
                    [&_code]:bg-gray-100 [&_code]:dark:bg-zinc-800 [&_code]:text-black [&_code]:dark:text-white [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded-md [&_code]:font-mono [&_code]:text-sm
                "
                dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(content) }}
            />
        );
    }

    // Plain text: split by double newlines into paragraphs
    const paragraphs = content.split(/\n\n+/);

    return (
        <div className="space-y-5">
            {paragraphs.map((para, i) => (
                <p
                    key={i}
                    className="text-base sm:text-lg leading-relaxed text-gray-700 dark:text-gray-300 font-normal"
                >
                    {para.split('\n').map((line, j) => (
                        <React.Fragment key={j}>
                            {j > 0 && <br />}
                            {line}
                        </React.Fragment>
                    ))}
                </p>
            ))}
        </div>
    );
};

export default TextBlock;
