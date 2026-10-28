import Link from "next/link";

import { IconArrowLeft, IconArrowRight } from "@/components/ui/icons";
import type { Book, Chapter } from "@/types/content";

interface ChapterNavProps {
  book: Book;
  previous: Chapter | null;
  next: Chapter | null;
}

export function ChapterNav({ book, previous, next }: ChapterNavProps) {
  if (!previous && !next) return null;

  return (
    <nav
      aria-label="অধ্যায় নেভিগেশন"
      className="mt-12 grid gap-3 border-t-2 border-ink pt-6 sm:grid-cols-2"
    >
      {previous ? (
        <Link
          href={`/books/${book.slug}/${previous.slug}`}
          className="group flex flex-col border border-line p-4 transition-colors hover:border-ink"
        >
          <span className="flex items-center gap-2 text-[0.7rem] font-semibold text-muted">
            <IconArrowLeft className="h-3.5 w-3.5" />
            পূর্ববর্তী অধ্যায়
          </span>
          <span className="mt-1.5 text-base font-semibold leading-snug group-hover:underline group-hover:decoration-1 group-hover:underline-offset-4">
            {previous.title}
          </span>
        </Link>
      ) : (
        <div className="hidden sm:block" aria-hidden="true" />
      )}

      {next ? (
        <Link
          href={`/books/${book.slug}/${next.slug}`}
          className="group flex flex-col border border-line p-4 text-left transition-colors hover:border-ink sm:text-right"
        >
          <span className="flex items-center gap-2 text-[0.7rem] font-semibold text-muted sm:justify-end">
            পরবর্তী অধ্যায়
            <IconArrowRight className="h-3.5 w-3.5" />
          </span>
          <span className="mt-1.5 text-base font-semibold leading-snug group-hover:underline group-hover:decoration-1 group-hover:underline-offset-4">
            {next.title}
          </span>
        </Link>
      ) : null}
    </nav>
  );
}
