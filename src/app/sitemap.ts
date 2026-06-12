import type { MetadataRoute } from "next";
import { getAllSlugs } from "@/lib/posts";
import { site } from "@/lib/config";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/about", "/contact"].map((p) => ({
    url: `${site.url}${p}`,
    changeFrequency: "weekly" as const,
    priority: p === "" ? 1 : 0.7,
  }));

  const posts = getAllSlugs().map((slug) => ({
    url: `${site.url}/blog/${slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...routes, ...posts];
}
