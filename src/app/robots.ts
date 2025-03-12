import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    // The rules for web crawlers, specifying which parts of the site they can and cannot access
    rules: {
      userAgent: "*", // Applies to all web crawlers
      allow: "/", // Allow access to all pages
      disallow: "/private/", // Disallow access to private pages
    },
    // The URL of the sitemap, which helps web crawlers find and index your site's pages
    sitemap: "https://acme.com/sitemap.xml",
  };
}
