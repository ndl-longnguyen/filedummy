import type { MDXComponents } from "mdx/types";
import Image, { ImageProps } from "next/image";
import { BlogDownloadCTA } from "@/components/BlogDownloadCTA";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    BlogDownloadCTA,
    h2: ({ children, ...props }) => {
      const id = String(children)
        .toLowerCase()
        .replace(/[^a-z0-9\s]/g, "")
        .replace(/\s+/g, "-");
      return (
        <h2 id={id} {...props} className="scroll-mt-20">
          {children}
        </h2>
      );
    },
    h3: ({ children, ...props }) => {
      const id = String(children)
        .toLowerCase()
        .replace(/[^a-z0-9\s]/g, "")
        .replace(/\s+/g, "-");
      return (
        <h3 id={id} {...props} className="scroll-mt-20">
          {children}
        </h3>
      );
    },
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

