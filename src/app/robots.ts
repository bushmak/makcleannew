import { MetadataRoute } from "next";

// Export statique pour robots.txt avec `output: "export"`
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [],
    },
    sitemap: "https://www.makclean.be/sitemap.xml",
    host: "https://www.makclean.be",
  };
}