import { TopicDetails } from "@/components/chapter/topic-details";
import { toBengaliNumber } from "@/lib/bengali";
import { chapterCategories, getCategoryHref } from "@/lib/content";
import type { Chapter, Importance } from "@/types/content";

interface CategorySectionProps {
  chapter: Chapter;
  chapterSlug: string;
  importance: Importance;
}

export function CategorySection({
  chapter,
  chapterSlug,
  importance,
}: CategorySectionProps) {
  const category = chapterCategories[importance];
  const topics = chapter[importance];
  const headingId = `${chapterSlug}-${importance}-heading`;
  const sectionId = getCategoryHref(chapterSlug, importance).replace("#", "");

  return (
    <section
      id={sectionId}
      className={`category-section category-${importance}`}
      aria-labelledby={headingId}
    >
      <div className="category-head">
        <h2 id={headingId} className="category-title">
          {category.label}
        </h2>
        <span className="category-count">
          {toBengaliNumber(topics.length)}টি টপিক
        </span>
      </div>

      <p className="mb-5 mt-3 text-sm leading-7 text-muted sm:px-1">
        {category.description}
      </p>

      <div>
        {topics.map((topic, index) => (
          <TopicDetails
            key={topic.title}
            topic={topic}
            chapterSlug={chapterSlug}
            importance={importance}
            index={index}
          />
        ))}
      </div>
    </section>
  );
}
