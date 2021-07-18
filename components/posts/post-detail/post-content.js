import ReactMarkdown from 'react-markdown';
import Image from 'next/image';
// light build should be imported to reduce js file size for production
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import atomDark from 'react-syntax-highlighter/dist/cjs/styles/prism/atom-dark';
import js from 'react-syntax-highlighter/dist/cjs/languages/prism/javascript';
import jsx from 'react-syntax-highlighter/dist/cjs/languages/prism/jsx';
import css from 'react-syntax-highlighter/dist/cjs/languages/prism/css';

import PostHeader from './post-header';
import classes from './post-content.module.css';

SyntaxHighlighter.registerLanguage('js', js);
SyntaxHighlighter.registerLanguage('jsx', jsx);
SyntaxHighlighter.registerLanguage('css', css);

export default function PostContent({ post }) {
    const imagePath = `/images/posts/${post.slug}/${post.image}`;

    const components = {
        p: p => {
            const { node } = p;

            if (node.children[0].tagName === 'img') {
                const image = node.children[0];

                return (
                    <div className={classes.image}>
                        <Image
                            src={`/images/posts/${post.slug}/${image.properties.src}`}
                            alt={image.properties.alt}
                            width={600}
                            height={300}
                        />
                    </div>
                );
            }

            return <p>{p.children}</p>;
        },

        code: code => {
            const { className, children } = code;
            
            const language = className.split('-')[1]; // className is something like language-js => We need the "js" part here
            
            return (
                <SyntaxHighlighter
                    style={atomDark}
                    language={language}
                    children={children}
                />
            );
        } 
    };

    return (
        <article className={classes.content}>
            <PostHeader title={post.title} image={imagePath} />
            <ReactMarkdown components={components}>
                {post.content}
            </ReactMarkdown>
        </article>
    );
}