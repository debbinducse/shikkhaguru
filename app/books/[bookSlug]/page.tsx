import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Breadcrumbs } from "@/components/breadcrumbs";
import {
  IconArrowRight,
  IconBookOpen,
  IconClock,
  IconDownload,
  IconLayers,
} from "@/components/ui/icons";
import { books } from "@/data/books";
import { formatBengaliDate, padBengali, toBengaliNumber } from "@/lib/bengali";
import {
  chapterCategories,
  countTopics,
  getBookBySlug,
} from "@/lib/content";
import { absoluteUrl, JsonLd } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

interface BookPageProps {
  params: { bookSlug: string };
}

export function generateStaticParams() {
  return books.map((book) => ({ bookSlug: book.slug }));
}

export function generateMetadata({ params }: BookPageProps): Metadata {
  const book = getBookBySlug(params.bookSlug);

  if (!book) {
    return { title: "বই পাওয়া যায়নি" };
  }

  const title = `${book.title} — অধ্যায়ভিত্তিক নোট`;
  const description = `${book.description} ${book.classLevel} ভিত্তিক ${toBengaliNumber(book.chapters.length)}টি অধ্যায়ের নোট, গুরুত্ব বিভাজন ও PDF ডাউনলোড।`;

  return {
    title,
    description,
    alternates: { canonical: `/books/${book.slug}` },
    openGraph: {
      type: "article",
      title: `${title} | ${siteConfig.name}`,
      description,
      url: absoluteUrl(`/books/${book.slug}`),
    },
    twitter: {
      card: "summary",
      title,
      description,
    },
  };
}

export default function BookPage({ params }: BookPageProps) {
  const book = getBookBySlug(params.bookSlug);
  if (!book) notFound();

  const topicCount = book.chapters.reduce(
    (total, chapter) => total + countTopics(chapter),
    0,
  );

  const latestUpdate = book.chapters
    .map((chapter) => chapter.updatedAt)
    .sort()
    .at(-1);
  const bookSchema = {
    "@context": "https://schema.org",
    "@type": "Book",
    name: book.title,
    description: book.description,
    inLanguage: "bn-BD",
    url: absoluteUrl(`/books/${book.slug}`),
    bookEdition: book.classLevel,
    publisher: {
      "@type": "EducationalOrganization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    hasPart: book.chapters.map((chapter) => ({
      "@type": "Chapter",
      name: chapter.title,
      description: chapter.description,
      url: absoluteUrl(`/books/${book.slug}/${chapter.slug}`),
    })),
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
    ],
  };

  return (
    <>
      <section className="border-b border-line bg-soft">
        <div className="container-page py-10 md:py-14">
          <Breadcrumbs
            items={[
              { label: "সব বই", href: "/books" },
              { label: book.title },
            ]}
          />

          <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
            <span
              className="flex h-16 w-16 shrink-0 items-center justify-center border-2 border-ink bg-paper text-3xl font-bold"
              aria-hidden="true"
            >
              {book.monogram}
            </span>

            <div className="min-w-0">
              <p className="eyebrow">
                {book.classLevel} •{" "}
                {book.featured ? "প্রধান বই • সম্পূর্ণ ১৫ অধ্যায়" : "বিষয়ভিত্তিক নোট"}
              </p>
              <h1 className="display-title mt-3 text-4xl sm:text-5xl">
                {book.title}
              </h1>
              <p className="mt-2 text-lg font-medium text-muted">
                {book.subtitle}
              </p>
            </div>
          </div>

          <p className="lead-text mt-6 max-w-3xl">{book.description}</p>

          <dl className="mt-8 grid max-w-2xl grid-cols-2 gap-x-8 gap-y-4 border-t border-line pt-5 sm:grid-cols-3">
            <div>
              <dt className="text-[0.68rem] text-muted">অধ্যায়</dt>
              <dd className="mt-0.5 text-xl font-bold">
                {toBengaliNumber(book.chapters.length)}টি
              </dd>
            </div>
            <div>
              <dt className="text-[0.68rem] text-muted">মোট টপিক</dt>
              <dd className="mt-0.5 text-xl font-bold">
                {toBengaliNumber(topicCount)}টি
              </dd>
            </div>
            <div>
              <dt className="text-[0.68rem] text-muted">হালনাগাদ</dt>
              <dd className="mt-0.5 text-sm font-semibold">
                {latestUpdate ? formatBengaliDate(latestUpdate) : "—"}
              </dd>
            </div>
          </dl>
        </div>
      </section>

      <div className="container-page py-10 md:py-14">
        <div className="grid gap-12 lg:grid-cols-[16.5rem_minmax(0,1fr)] lg:gap-16">
          <aside aria-label="বইয়ের সারসংক্ষেপ" className="space-y-8">
            <div className="border border-line p-5">
              <p className="text-xs font-bold">এই বই সম্পর্কে</p>
              <p className="mt-2 text-sm leading-7 text-muted">
                প্রতিটি অধ্যায়ে গুরুত্ব অনুযায়ী সাজানো টপিক, সংজ্ঞা, টেবিল ও
                পরীক্ষা-টিপস। চাইলে সম্পূর্ণ অধ্যায় PDF আকারে ডাউনলোড করতে
                পারবেন।
              </p>

              <ul className="mt-4 space-y-2.5 border-t border-line pt-4 text-xs text-muted">
                <li className="flex items-center gap-2">
                  <IconLayers className="h-4 w-4 text-ink" />
                  তিন স্তরের গুরুত্ব বিভাজন
                </li>
                <li className="flex items-center gap-2">
                  <IconDownload className="h-4 w-4 text-ink" />
                  পরিচ্ছন্ন PDF ডাউনলোড
                </li>
                <li className="flex items-center gap-2">
                  <IconBookOpen className="h-4 w-4 text-ink" />
                  রিডিং মোডে মনোযোগী পড়া
                </li>
              </ul>
            </div>

            <Link
              href="/books"
              className="inline-flex items-center gap-2 text-sm font-semibold text-ink underline decoration-neutral-400 underline-offset-4 hover:decoration-ink"
            >
              ← সব বইয়ে ফিরে যান
            </Link>
          </aside>

          <section aria-labelledby="chapter-list-heading">
            <div className="flex flex-wrap items-end justify-between gap-3 border-b-2 border-ink pb-4">
              <h2 id="chapter-list-heading" className="text-2xl font-bold">
                অধ্যায়সমূহ
              </h2>
              <span className="text-xs text-muted">
                {toBengaliNumber(book.chapters.length)}টি অধ্যায়
              </span>
            </div>

            <ol className="mt-2">
              {book.chapters.map((chapter, index) => (
                <li key={chapter.slug}>
                  <Link
                    href={`/books/${book.slug}/${chapter.slug}`}
                    className="group grid gap-3 border-b border-line py-6 transition-colors hover:bg-soft sm:grid-cols-[3rem_minmax(0,1fr)_auto] sm:items-start sm:gap-5 sm:px-3"
                  >
                    <span className="chapter-number text-lg">
                      {padBengali(index + 1)}
                    </span>

                    <span className="min-w-0">
                      <span className="block text-xl font-semibold leading-snug group-hover:underline group-hover:decoration-1 group-hover:underline-offset-4">
                        {chapter.title}
                      </span>
                      <span className="mt-1.5 block text-sm leading-7 text-muted">
                        {chapter.description}
                      </span>

                      <span className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-[0.7rem] text-muted">
                        <span className="inline-flex items-center gap-1.5">
                          <IconClock className="h-3.5 w-3.5" />
                          {toBengaliNumber(chapter.readingTime)} মিনিট
                        </span>
                        <span>
                          {chapterCategories.veryImportant.shortLabel}{" "}
                          {toBengaliNumber(chapter.veryImportant.length)}
                        </span>
                        <span>
                          {chapterCategories.important.shortLabel}{" "}
                          {toBengaliNumber(chapter.important.length)}
                        </span>
                        <span>
                          {chapterCategories.lessImportant.shortLabel}{" "}
                          {toBengaliNumber(chapter.lessImportant.length)}
                        </span>
                      </span>
                    </span>

                    <span className="flex items-center gap-2 text-xs font-semibold sm:pt-1">
                      পড়ুন
                      <IconArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </Link>
                </li>
              ))}
            </ol>
          </section>
        </div>
      </div>

      <JsonLd data={bookSchema} />
      <JsonLd data={breadcrumbSchema} />
    </>
  );
}
