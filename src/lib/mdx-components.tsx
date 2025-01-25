import { MDXComponents } from 'mdx/types';
import Link from 'next/link';

export function useMDXComponents(components: MDXComponents): MDXComponents {
    return {
        // Override the default components with our styled ones
        h1: ({ children }) => (
            <h1 className="text-3xl font-bold tracking-tight mt-8 mb-4">{children}</h1>
        ),
        h2: ({ children }) => (
            <h2 className="text-2xl font-semibold tracking-tight mt-8 mb-4">{children}</h2>
        ),
        h3: ({ children }) => (
            <h3 className="text-xl font-semibold tracking-tight mt-6 mb-3">{children}</h3>
        ),
        a: ({ href, children }) => {
            const isExternal = href?.startsWith('http');
            if (isExternal) {
                return (
                    <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary underline underline-offset-4 hover:text-primary/80"
                    >
                        {children}
                    </a>
                );
            }
            return (
                <Link href={href || '/'} className="text-primary underline underline-offset-4 hover:text-primary/80">
                    {children}
                </Link>
            );
        },
        p: ({ children }) => <p className="leading-7 [&:not(:first-child)]:mt-6">{children}</p>,
        ul: ({ children }) => <ul className="my-6 ml-6 list-disc [&>li]:mt-2">{children}</ul>,
        ol: ({ children }) => <ol className="my-6 ml-6 list-decimal [&>li]:mt-2">{children}</ol>,
        li: ({ children }) => <li>{children}</li>,
        blockquote: ({ children }) => (
            <blockquote className="mt-6 border-l-2 pl-6 italic">{children}</blockquote>
        ),
        img: (props) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img alt={props.alt} className="rounded-md" {...props} />
        ),
        hr: () => <hr className="my-4 md:my-8" />,
        table: ({ children }) => (
            <div className="my-6 w-full overflow-y-auto">
                <table className="w-full">{children}</table>
            </div>
        ),
        tr: ({ children }) => <tr className="m-0 border-t p-0 even:bg-muted">{children}</tr>,
        th: ({ children }) => (
            <th className="border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right">
                {children}
            </th>
        ),
        td: ({ children }) => (
            <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                {children}
            </td>
        ),
        pre: ({ children, className }) => (
            <pre className={`${className} mb-4 mt-6 overflow-x-auto rounded-lg bg-muted p-4`}>
                {children}
            </pre>
        ),
        code: ({ children }) => (
            <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">
                {children}
            </code>
        ),
        ...components,
    };
} 