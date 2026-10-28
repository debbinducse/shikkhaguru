import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { AdSlot } from "@/components/ad-slot";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { CategorySection } from "@/components/chapter/category-section";
import { ChapterNav } from "@/components/chapter/chapter-nav";
import { ChapterToc } from "@/components/chapter/chapter-toc";
import { ChapterToolbar } from "@/components/chapter/chapter-toolbar";
import { ReadingProgress } from "@/components/chapter/reading-progress";
import {
  IconArrowLeft,
  IconClock,
  IconLayers,
} from "@/components/ui/icons";
import { getAllChapters, getAdjacentChapters, getChapterBySlug, categoryOrder, countTopics } from "@/lib/content";
import { formatBengaliDate, padBengali, toBengaliNumber } from "@/lib/bengali";
import { absoluteUrl, JsonLd } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

interface ChapterPageProps {
  params: { bookSlug: string; chapterSlug: string };
}

export function generateStaticParams() {
  return getAllChapters().map(({ book, chapter }) => ({
    bookSlug: book.slug,
    chapterSlug: chapter.slug,
  }));
}

export function generateMetadata({ params }: ChapterPageProps): Metadata {
  const result = getChapterBySlug(params.bookSlug, params.chapterSlug);

  if (!result) {
    return { title: "অধ্যায় পাওয়া যায়নি" };
  }

  const { book, chapter } = result;
  const title = `${chapter.title} — ${book.title} নোট`;

  return {
    title,
    description: chapter.description,
    alternates: {
      canonical: `/books/${book.slug}/${chapter.slug}`,
    },
    openGraph: {
      type: "article",
      title: `${title} | ${siteConfig.name}`,
      description: chapter.description,
      url: absoluteUrl(`/books/${book.slug}/${chapter.slug}`),
      publishedTime: chapter.updatedAt,
      modifiedTime: chapter.updatedAt,
    },
    twitter: {
      card: "summary",
      title,
      description: chapter.description,
    },
  };
}

export default function ChapterPage({ params }: ChapterPageProps) {
  const result = getChapterBySlug(params.bookSlug, params.chapterSlug);
  if (!result) notFound();

  const { book, chapter, chapterIndex } = result;
  const { previous, next } = getAdjacentChapters(book, chapterIndex);
  const topicCount = countTopics(chapter);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: `${chapter.title} — ${book.title} নোট`,
    description: chapter.description,
    inLanguage: "bn-BD",
    datePublished: chapter.updatedAt,
    dateModified: chapter.updatedAt,
    mainEntityOfPage: absoluteUrl(`/books/${book.slug}/${chapter.slug}`),
    author: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    publisher: {
      "@type": "EducationalOrganization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    isPartOf: {
      "@type": "Book",
      name: book.title,
      url: absoluteUrl(`/books/${book.slug}`),
    },
    educationalLevel: book.classLevel,
    about: [book.title, "সরকারি চাকরি প্রস্তুতি", "ক্লাস ৯–১০"],
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "হোম",
        item: absoluteUrl("/"),
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "সব বই",
        item: absoluteUrl("/books"),
      },
      {
        "@type": "ListItem",
        position: 3,
        name: book.title,
        item: absoluteUrl(`/books/${book.slug}`),
      },
      {
        "@type": "ListItem",
        position: 4,
        name: chapter.title,
        item: absoluteUrl(`/books/${book.slug}/${chapter.slug}`),
      },
    ],
  };

  return (
    <>
      <ReadingProgress />

      <article>
        <header className="chapter-hero border-b border-line">
          <div className="container-page pb-8 pt-6 md:pb-10 md:pt-8">
            <div className="reading-hide">
              <Breadcrumbs
                items={[
                  { label: "সব বই", href: "/books" },
                  { label: book.title, href: `/books/${book.slug}` },
                  { label: chapter.title },
                ]}
              />
            </div>

            <div className="reading-hide flex flex-wrap items-center gap-2 text-[0.72rem] font-semibold text-muted">
              <Link
                href={`/books/${book.slug}`}
                className="inline-flex items-center gap-1.5 border border-line px-2.5 py-1 transition-colors hover:border-ink hover:text-ink"
              >
                <span className="flex h-4 w-4 items-center justify-center border border-current text-[0.6rem]">
                  {book.monogram}
                </span>
                {book.title}
              </Link>
              <span aria-hidden="true">•</span>
              <span>অধ্যায় {padBengali(chapterIndex + 1)}</span>
              <span aria-hidden="true">•</span>
              <span>{book.classLevel}</span>
            </div>

            <h1 className="chapter-title display-title mt-4 text-[2.35rem] sm:text-5xl">
              {chapter.title}
            </h1>

            <p className="lead-text mt-4 max-w-3xl">{chapter.description}</p>

            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-muted">
              <span className="inline-flex items-center gap-1.5">
                <IconClock className="h-3.5 w-3.5 text-ink" />
                পড়ার সময় {toBengaliNumber(chapter.readingTime)} মিনিট
              </span>
              <span className="inline-flex items-center gap-1.5">
                <IconLayers className="h-3.5 w-3.5 text-ink" />
                {toBengaliNumber(topicCount)}টি টপিক
              </span>
              <span>হালনাগাদ: {formatBengaliDate(chapter.updatedAt)}</span>
            </div>
          </div>
        </header>

        <ChapterToolbar book={book} chapter={chapter} />

        <div className="chapter-shell">
          <div className="chapter-layout">
            <aside
              className="chapter-sidebar reading-hide"
              aria-label="অধ্যায়ের পার্শ্বনেভিগেশন"
            >
              <div className="chapter-sidebar-inner">
                <ChapterToc book={book} chapter={chapter} />

                <div className="border border-line p-4">
                  <p className="text-xs font-bold">দ্রুত তথ্য</p>
                  <dl className="mt-3 space-y-2.5 text-xs">
                    <div className="flex justify-between gap-3">
                      <dt className="text-muted">বই</dt>
                      <dd className="font-semibold">{book.title}</dd>
                    </div>
                    <div className="flex justify-between gap-3">
                      <dt className="text-muted">অধ্যায়</dt>
                      <dd className="font-semibold">
                        {padBengali(chapterIndex + 1)} /{" "}
                        {padBengali(book.chapters.length)}
                      </dd>
                    </div>
                    <div className="flex justify-between gap-3">
                      <dt className="text-muted">পড়ার সময়</dt>
                      <dd className="font-semibold">
                        {toBengaliNumber(chapter.readingTime)} মিনিট
                      </dd>
                    </div>
                  </dl>

                  <p className="mt-4 border-t border-line pt-3 text-[0.7rem] leading-5 text-muted">
                    PDF ডাউনলোড করতে উপরের টুলবার ব্যবহার করুন। মোবাইলে
                    সূচিপত্র বাটনে সব টপিক পাবেন।
                  </p>
                </div>

                <Link
                  href={`/books/${book.slug}`}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-ink underline decoration-neutral-400 underline-offset-4 hover:decoration-ink"
                >
                  <IconArrowLeft className="h-4 w-4" />
                  {book.title} বইয়ে ফিরে যান
                </Link>
              </div>
            </aside>

            <div className="chapter-content-column" data-reading-content>
              <div className="mb-10 border-l-4 border-ink bg-soft px-5 py-4">
                <h2 className="text-base font-bold">এই অধ্যায়ে যা শিখবেন</h2>
                <p className="mt-1.5 text-sm leading-7 text-muted">
                  অধ্যায়টিতে {toBengaliNumber(topicCount)}টি টপিক রয়েছে। গুরুত্ব
                  অনুযায়ী সাজানো এই নোটে মূল ধারণা, সংজ্ঞা, উদাহরণ ও পরীক্ষার
                  জন্য প্রয়োজনীয় তথ্য এক জায়গায় পাবেন।
                </p>
              </div>

              {categoryOrder.map((importance) => (
                <CategorySection
                  key={importance}
                  chapter={chapter}
                  chapterSlug={chapter.slug}
                  importance={importance}
                />
              ))}

              <ChapterNav book={book} previous={previous} next={next} />

              <div className="reading-hide mt-10">
                <AdSlot slot={process.env.NEXT_PUBLIC_ADSENSE_CHAPTER_SLOT} />
              </div>

              <div className="reading-hide mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-6">
                <Link href={`/books/${book.slug}`} className="text-link text-sm">
                  ← {book.title} বইয়ের সব অধ্যায়
                </Link>
                <Link href="/books" className="text-link text-sm">
                  সব বই দেখুন →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </article>

      <JsonLd data={articleSchema} />
      <JsonLd data={breadcrumbSchema} />
    </>
  );
}
