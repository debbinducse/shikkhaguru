import type { MetadataRoute } from "next";

import { books } from "@/data/books";
import { absoluteUrl } from "@/lib/seo";

const lastModified = new Date("2026-10-01");

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: absoluteUrl("/"),
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: absoluteUrl("/books"),
      lastModified,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: absoluteUrl("/about"),
      lastModified,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: absoluteUrl("/contact"),
      lastModified,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: absoluteUrl("/privacy"),
      lastModified,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: absoluteUrl("/terms"),
      lastModified,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  const bookRoutes: MetadataRoute.Sitemap = books.map((book) => ({
    url: absoluteUrl(`/books/${book.slug}`),
    lastModified,
    changeFrequency: "monthly",
    priority: book.featured ? 0.95 : 0.8,
  }));

  const chapterRoutes: MetadataRoute.Sitemap = books.flatMap((book) =>
    book.chapters.map((chapter) => ({
      url: absoluteUrl(`/books/${book.slug}/${chapter.slug}`),
      lastModified: new Date(chapter.updatedAt),
      changeFrequency: "monthly" as const,
      priority: book.featured ? 0.85 : 0.7,
    })),
  );

  return [...staticRoutes, ...bookRoutes, ...chapterRoutes];
}
