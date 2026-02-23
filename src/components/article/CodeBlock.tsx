import React, { useEffect, useRef, useState } from 'react';
import hljs from 'highlight.js/lib/core';
// Import only common languages to keep bundle small
import javascript from 'highlight.js/lib/languages/javascript';
import typescript from 'highlight.js/lib/languages/typescript';
import python from 'highlight.js/lib/languages/python';
import bash from 'highlight.js/lib/languages/bash';
import css from 'highlight.js/lib/languages/css';
import json from 'highlight.js/lib/languages/json';
import xml from 'highlight.js/lib/languages/xml';
import sql from 'highlight.js/lib/languages/sql';
import java from 'highlight.js/lib/languages/java';
import cpp from 'highlight.js/lib/languages/cpp';
import go from 'highlight.js/lib/languages/go';
import rust from 'highlight.js/lib/languages/rust';
import php from 'highlight.js/lib/languages/php';
import markdown from 'highlight.js/lib/languages/markdown';
import yaml from 'highlight.js/lib/languages/yaml';
import dockerfile from 'highlight.js/lib/languages/dockerfile';

// Register languages
hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('js', javascript);
hljs.registerLanguage('typescript', typescript);
hljs.registerLanguage('ts', typescript);
hljs.registerLanguage('python', python);
hljs.registerLanguage('py', python);
hljs.registerLanguage('bash', bash);
hljs.registerLanguage('shell', bash);
hljs.registerLanguage('sh', bash);
hljs.registerLanguage('css', css);
hljs.registerLanguage('json', json);
hljs.registerLanguage('xml', xml);
hljs.registerLanguage('html', xml);
hljs.registerLanguage('sql', sql);
hljs.registerLanguage('java', java);
hljs.registerLanguage('cpp', cpp);
hljs.registerLanguage('c', cpp);
hljs.registerLanguage('go', go);
hljs.registerLanguage('rust', rust);
hljs.registerLanguage('php', php);
hljs.registerLanguage('markdown', markdown);
hljs.registerLanguage('md', markdown);
hljs.registerLanguage('yaml', yaml);
hljs.registerLanguage('yml', yaml);
hljs.registerLanguage('dockerfile', dockerfile);

interface CodeBlockProps {
    code: string;
    language?: string;
}

/**
 * Renders a code snippet with syntax highlighting (highlight.js),
 * line numbers, and a one-click copy button.
 */
const CodeBlock: React.FC<CodeBlockProps> = ({ code, language = 'plaintext' }) => {
    const codeRef = useRef<HTMLElement>(null);
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        if (codeRef.current && code) {
            // Reset and re-highlight
            codeRef.current.removeAttribute('data-highlighted');
            try {
                hljs.highlightElement(codeRef.current);
            } catch {
                // Language not registered — fallback to plain
            }
        }
    }, [code, language]);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(code);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch { /* clipboard API might fail in insecure contexts */ }
    };

    if (!code) return null;

    const displayLang = language === 'plaintext' ? '' : language.toUpperCase();

    return (
        <div className="my-8 sm:my-10 rounded-2xl overflow-hidden border border-gray-200 dark:border-zinc-800 bg-[#0d1117] shadow-lg">
            {/* Header bar */}
            <div className="flex items-center justify-between px-4 py-2.5 bg-[#161b22] border-b border-gray-800">
                <div className="flex items-center gap-2">
                    {/* macOS-style dots */}
                    <div className="flex gap-1.5">
                        <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                        <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                        <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
                    </div>
                    {displayLang && (
                        <span className="ml-3 text-xs font-mono text-gray-500 select-none">
                            {displayLang}
                        </span>
                    )}
                </div>
                <button
                    onClick={handleCopy}
                    className="flex items-center gap-1.5 px-3 py-1 text-xs font-medium text-gray-400 
                        hover:text-white rounded-md hover:bg-white/10 transition-all duration-200"
                    aria-label="Copier le code"
                >
                    {copied ? (
                        <>
                            <svg className="w-3.5 h-3.5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span className="text-green-400">Copié !</span>
                        </>
                    ) : (
                        <>
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                            </svg>
                            Copier
                        </>
                    )}
                </button>
            </div>

            {/* Code area */}
            <div className="overflow-x-auto">
                <pre className="p-4 sm:p-6 text-sm leading-relaxed !bg-transparent">
                    <code
                        ref={codeRef}
                        className={`language-${language} !bg-transparent`}
                    >
                        {code}
                    </code>
                </pre>
            </div>
        </div>
    );
};

export default CodeBlock;
