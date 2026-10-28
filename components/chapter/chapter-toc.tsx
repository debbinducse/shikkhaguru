import Link from "next/link";

import { padBengali, toBengaliNumber } from "@/lib/bengali";
import {
  categoryOrder,
  chapterCategories,
  countTopics,
  getCategoryHref,
  getTopicHref,
} from "@/lib/content";
import type { Book, Chapter } from "@/types/content";

interface ChapterTocProps {
  book: Book;
  chapter: Chapter;
}

export function ChapterToc({ book, chapter }: ChapterTocProps) {
  return (
    <nav aria-label={`${chapter.title} অধ্যায়ের সূচিপত্র`}>
      <div className="flex items-end justify-between gap-3 border-b-2 border-ink pb-3">
        <div>
          <p className="text-xs font-semibold text-muted">{book.title}</p>
          <h2 className="mt-0.5 text-lg font-bold">সূচিপত্র</h2>
        </div>
        <span className="text-xs text-muted">
          {toBengaliNumber(countTopics(chapter))} টপিক
        </span>
      </div>

      <div className="mt-4 space-y-5">
        {categoryOrder.map((importance, categoryIndex) => {
          const category = chapterCategories[importance];
          const topics = chapter[importance];

          return (
            <div key={importance}>
              <Link
                href={getCategoryHref(chapter.slug, importance)}
                className="flex items-center gap-2 text-[0.8rem] font-bold text-ink"
              >
                <span className="text-[0.65rem] text-neutral-500">
                  {padBengali(categoryIndex + 1)}
                </span>
                {category.label}
                <span className="ml-auto text-[0.65rem] font-medium text-neutral-500">
                  {toBengaliNumber(topics.length)}
                </span>
              </Link>

              <ul className="mt-1.5 border-l border-line">
                {topics.map((topic, topicIndex) => (
                  <li key={topic.title}>
                    <Link
                      href={getTopicHref(chapter.slug, importance, topicIndex)}
                      className="toc-topic-link"
                    >
                      {topic.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </nav>
  );
}
