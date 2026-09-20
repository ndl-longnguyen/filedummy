import type { MDXComponents } from "mdx/types";
import Image, { ImageProps } from "next/image";
import { BlogDownloadCTA } from "@/components/BlogDownloadCTA";
import { CodeBlock } from "@/components/CodeBlock";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    BlogDownloadCTA,
    pre: CodeBlock,
    h2: ({ children, ...props }) => {
      const id = String(children)
        .toLowerCase()
        .replace(/[^a-z0-9\s]/g, "")
        .replace(/\s+/g, "-");
      return (
        <h2
          id={id}
          {...props}
          className="scroll-mt-24 text-xl sm:text-2xl font-bold text-white mt-12 mb-4 pb-2.5 border-b border-slate-800/80 flex items-center gap-2.5 group"
        >
          <span className="w-1.5 h-5 rounded-full bg-blue-500 inline-block" />
          <span className="flex-1">{children}</span>
        </h2>
      );
    },
    h3: ({ children, ...props }) => {
      const id = String(children)
        .toLowerCase()
        .replace(/[^a-z0-9\s]/g, "")
        .replace(/\s+/g, "-");
      return (
        <h3
          id={id}
          {...props}
          className="scroll-mt-24 text-lg font-semibold text-slate-100 mt-8 mb-3 flex items-center gap-2"
        >
          <span className="w-1 h-3.5 rounded-full bg-indigo-500/80 inline-block" />
          <span>{children}</span>
        </h3>
      );
    },
    table: ({ children, ...props }) => (
      <div className="my-8 overflow-x-auto rounded-xl border border-slate-800 bg-slate-900/40 shadow-xl">
        <table className="w-full text-left text-sm border-collapse" {...props}>
          {children}
        </table>
      </div>
    ),
    thead: ({ children, ...props }) => (
      <thead className="bg-slate-800/75 border-b border-slate-700/80" {...props}>
        {children}
      </thead>
    ),
    th: ({ children, ...props }) => (
      <th
        className="px-5 py-3.5 text-xs font-bold uppercase tracking-wider text-slate-200"
        {...props}
      >
        {children}
      </th>
    ),
    td: ({ children, ...props }) => (
      <td
        className="px-5 py-3.5 text-slate-300 border-b border-slate-800/60 font-normal leading-relaxed"
        {...props}
      >
        {children}
      </td>
    ),
    tr: ({ children, ...props }) => (
      <tr className="hover:bg-slate-800/30 transition-colors" {...props}>
        {children}
      </tr>
    ),
    blockquote: ({ children, ...props }) => (
      <blockquote
        className="my-6 rounded-r-xl border-l-4 border-blue-500 bg-gradient-to-r from-blue-950/30 via-slate-900/40 to-slate-900/20 p-4.5 sm:p-5 text-slate-300 shadow-lg border-y border-r border-slate-800/40"
        {...props}
      >
        {children}
      </blockquote>
    ),
    ul: ({ children, ...props }) => (
      <ul className="my-5 space-y-2.5 pl-2 list-none" {...props}>
        {children}
      </ul>
    ),
    li: ({ children, ...props }) => (
      <li
        className="flex items-start gap-2.5 text-slate-300 leading-relaxed text-sm sm:text-base"
        {...props}
      >
        <span className="mt-2 w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
        <span className="flex-1">{children}</span>
      </li>
    ),
    hr: (props) => <hr className="my-10 border-slate-800/80" {...props} />,
    img: (props) => (
      <Image
        sizes="100vw"
        style={{ width: "100%", height: "auto" }}
        {...(props as ImageProps)}
        alt={props.alt || ""}
      />
    ),
    ...components,
  };
}
