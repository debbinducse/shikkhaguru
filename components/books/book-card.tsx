import Link from "next/link";

import { IconArrowRight } from "@/components/ui/icons";
import { toBengaliNumber } from "@/lib/bengali";
import { countTopics } from "@/lib/categories";
import type { Book } from "@/types/content";

interface BookCardProps {
  book: Book;
}

export function BookCard({ book }: BookCardProps) {
  const topicCount = book.chapters.reduce(
    (total, chapter) => total + countTopics(chapter),
    0,
  );

  return (
    <Link
      href={`/books/${book.slug}`}
      className={`book-card group ${book.featured ? "book-card-featured" : ""}`}
    >
      <div className="flex items-start justify-between gap-4">
        <span
          className="flex h-12 w-12 shrink-0 items-center justify-center border border-ink text-xl font-bold transition-colors group-hover:bg-ink group-hover:text-paper"
          aria-hidden="true"
        >
          {book.monogram}
        </span>
        <span className="text-right">
          <span className="block text-[0.68rem] font-medium text-muted">
            {book.classLevel}
          </span>
          {book.featured ? (
            <span className="mt-2 inline-block bg-ink px-2 py-0.5 text-[0.62rem] font-semibold text-paper">
              প্রধান বই
            </span>
          ) : null}
        </span>
      </div>

      <h3 className="mt-5 text-2xl font-bold leading-tight">{book.title}</h3>
      <p className="mt-1 text-sm font-medium text-muted">{book.subtitle}</p>

      <p className="mt-4 flex-1 text-sm leading-7 text-muted">
        {book.description}
      </p>

      <div className="mt-6 flex items-end justify-between gap-4 border-t border-line pt-4">
        <dl className="flex gap-5 text-xs text-muted">
          <div>
            <dt className="text-[0.65rem]">অধ্যায়</dt>
            <dd className="mt-0.5 text-sm font-semibold text-ink">
              {toBengaliNumber(book.chapters.length)}টি
            </dd>
          </div>
          <div>
            <dt className="text-[0.65rem]">টপিক</dt>
            <dd className="mt-0.5 text-sm font-semibold text-ink">
              {toBengaliNumber(topicCount)}টি
            </dd>
          </div>
        </dl>

        <span className="inline-flex items-center gap-1.5 text-xs font-semibold">
          পড়ুন
          <IconArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}
