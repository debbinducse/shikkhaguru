import { books } from "@/data/books";
import type {
  Book,
  Chapter,
  Importance,
  SubjectSummary,
} from "@/types/content";

export {
  categoryOrder,
  chapterCategories,
  countTopics,
  getCategoryHref,
  getTopicHref,
  getTopics,
} from "./categories";

import { categoryOrder, countTopics } from "./categories";

export function getBookBySlug(slug: string): Book | undefined {
  return books.find((book) => book.slug === slug);
}

export function getChapterBySlug(
  bookSlug: string,
  chapterSlug: string,
): { book: Book; chapter: Chapter; chapterIndex: number } | undefined {
  const book = getBookBySlug(bookSlug);
  if (!book) return undefined;

  const chapterIndex = book.chapters.findIndex(
    (chapter) => chapter.slug === chapterSlug,
  );

  if (chapterIndex === -1) return undefined;

  return { book, chapter: book.chapters[chapterIndex], chapterIndex };
}

export function getAllChapters(): Array<{
  book: Book;
  chapter: Chapter;
  chapterIndex: number;
}> {
  return books.flatMap((book) =>
    book.chapters.map((chapter, chapterIndex) => ({
      book,
      chapter,
      chapterIndex,
    })),
  );
}

export function getAdjacentChapters(book: Book, chapterIndex: number) {
  return {
    previous: chapterIndex > 0 ? book.chapters[chapterIndex - 1] : null,
    next:
      chapterIndex < book.chapters.length - 1
        ? book.chapters[chapterIndex + 1]
        : null,
  };
}

export function getSubjectSummaries(): SubjectSummary[] {
  return books.map(({ title, slug, monogram, description, featured }) => ({
    title,
    slug,
    monogram,
    description,
    featured: Boolean(featured),
  }));
}

export function getFeaturedBook(): Book {
  return books.find((book) => book.featured) ?? books[0];
}

export function getSiteStats() {
  const chapterCount = books.reduce(
    (total, book) => total + book.chapters.length,
    0,
  );
  const topicCount = books.reduce(
    (total, book) =>
      total +
      book.chapters.reduce(
        (chapterTotal, chapter) => chapterTotal + countTopics(chapter),
        0,
      ),
    0,
  );

  return {
    books: books.length,
    chapters: chapterCount,
    topics: topicCount,
  };
}

export type { Importance };
