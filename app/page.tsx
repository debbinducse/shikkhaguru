import type { Metadata } from "next";
import Link from "next/link";

import { BookCard } from "@/components/books/book-card";
import { books } from "@/data/books";
import {
  IconArrowRight,
  IconBookOpen,
  IconClock,
  IconLayers,
} from "@/components/ui/icons";
import { toBengaliNumber, padBengali } from "@/lib/bengali";
import { getSiteStats } from "@/lib/content";
import { absoluteUrl } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "ভূগোল ও পরিবেশ — অধ্যায়ভিত্তিক নোট | শিক্ষাগুরু",
  description:
    "ভূগোল ও পরিবেশ (নবম–দশম শ্রেণি) বইয়ের ১৫টি অধ্যায়ের গোছানো বাংলা নোট—সরকারি চাকরির প্রস্তুতির জন্য। সাথে বাংলা, ইংরেজি, গণিত, বিজ্ঞান, সামাজিক বিজ্ঞান ও সাধারণ জ্ঞানের নোট, গুরুত্ব বিভাজন ও PDF ডাউনলোড।",
  alternates: { canonical: "/" },
  openGraph: {
    title: `${siteConfig.name} — ভূগোল ও পরিবেশ নোট`,
    description:
      "ভূগোল ও পরিবেশসহ সাতটি বিষয়ের অধ্যায়ভিত্তিক বাংলা নোট, গুরুত্ব বিভাজন ও PDF ডাউনলোড সুবিধা।",
    url: absoluteUrl("/"),
  },
};

const steps = [
  {
    title: "অধ্যায় বেছে নিন",
    description:
      "বিষয় অনুযায়ী বই খুলে যে অধ্যায়টি পড়তে চান, সেটি নির্বাচন করুন। প্রতিটি অধ্যায়ের সূচিপত্রে সব টপিক এক জায়গায় পাওয়া যাবে।",
  },
  {
    title: "গুরুত্ব অনুযায়ী পড়ুন",
    description:
      "‘অতি গুরুত্বপূর্ণ’ অংশ দিয়ে শুরু করুন, তারপর ‘গুরুত্বপূর্ণ’। সময় থাকলে ‘কম গুরুত্বপূর্ণ’ অংশে চোখ বুলিয়ে নিন।",
  },
  {
    title: "নোট ডাউনলোড করুন",
    description:
      "প্রয়োজনে রিডিং মোডে মনোযোগ দিয়ে পড়ুন, অথবা সম্পূর্ণ অধ্যায়ের পরিচ্ছন্ন PDF ডাউনলোড করে অফলাইনে পড়ুন।",
  },
];

export default function HomePage() {
  const stats = getSiteStats();
  const geography = books[0];
  const geographyChapters = geography.chapters;
  const featured = geographyChapters.slice(0, 4);

  return (
    <>
      {/* হিরো */}
      <section className="border-b border-line" aria-labelledby="home-heading">
        <div className="container-page grid gap-12 py-14 md:py-20 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:gap-16">
          <div>
            <p className="eyebrow">ভূগোল ও পরিবেশ • নবম–দশম শ্রেণি • ২০২৬</p>

            <h1
              id="home-heading"
              className="display-title mt-5 text-[2.45rem] sm:text-5xl lg:text-[3.6rem]"
            >
              ভূগোলের প্রতিটি অধ্যায়
              <br />
              এক জায়গায়, গোছানো নোটে
            </h1>

            <p className="lead-text mt-6 max-w-2xl">
              জাতীয় শিক্ষাক্রমের ‘ভূগোল ও পরিবেশ’ বইয়ের ১৫টি অধ্যায়—গুরুত্ব
              অনুযায়ী সাজানো, সহজ বাংলায় লেখা এবং পরীক্ষার প্রস্তুতির জন্য
              প্রস্তুত। সাথে আছে বাংলা, ইংরেজি, গণিতসহ অন্য বিষয়ের নোটও।
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/books/bhugol" className="btn btn-primary">
                <IconBookOpen className="h-4 w-4" />
                ভূগোল পড়া শুরু করুন
              </Link>

              <Link href="/books" className="btn btn-outline">
                সব বই দেখুন
                <IconArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <dl className="mt-10 grid max-w-xl grid-cols-3 border-y border-line">
              <div className="py-4 pr-4">
                <dt className="text-[0.68rem] font-medium text-muted">বিষয়</dt>
                <dd className="mt-1 text-2xl font-bold">
                  {toBengaliNumber(stats.books)}
                </dd>
              </div>
              <div className="border-l border-line px-4 py-4">
                <dt className="text-[0.68rem] font-medium text-muted">অধ্যায়</dt>
                <dd className="mt-1 text-2xl font-bold">
                  {toBengaliNumber(stats.chapters)}
                </dd>
              </div>
              <div className="border-l border-line px-4 py-4">
                <dt className="text-[0.68rem] font-medium text-muted">টপিক</dt>
                <dd className="mt-1 text-2xl font-bold">
                  {toBengaliNumber(stats.topics)}
                </dd>
              </div>
            </dl>
          </div>

          {/* আজকের পড়ার কার্ড */}
          <aside
            className="grid-pattern border border-line p-4 sm:p-6"
            aria-label="আজকের পড়ার পরামর্শ"
          >
            <div className="border-2 border-ink bg-paper">
              <div className="flex items-center justify-between gap-4 bg-ink px-5 py-4 text-paper">
                <p className="text-sm font-bold">আজকের পড়া</p>
                <span className="text-[0.68rem] text-neutral-300">
                  {toBengaliNumber(1)} / {toBengaliNumber(stats.chapters)}
                </span>
              </div>

              <div className="p-5 sm:p-6">
                <p className="text-[0.68rem] font-semibold text-muted">
                  {geography.title} • {geography.classLevel}
                </p>
                <h2 className="mt-2 text-2xl font-bold leading-snug">
                  {featured[0]?.title ?? "ভূগোল ও পরিবেশ"}
                </h2>
                <p className="mt-3 line-clamp-3 text-sm leading-7 text-muted">
                  {featured[0]?.description ??
                    "ভূগোলের মূল ধারণা, টেবিল ও পরীক্ষা-টিপস সহজ বাংলায়।"}
                </p>

                <ul className="mt-5 space-y-2 border-t border-line pt-4 text-xs text-muted">
                  <li className="flex items-center gap-2">
                    <IconClock className="h-3.5 w-3.5 text-ink" />
                    পড়ার সময়{" "}
                    {toBengaliNumber(featured[0]?.readingTime ?? 20)} মিনিট
                  </li>
                  <li className="flex items-center gap-2">
                    <IconLayers className="h-3.5 w-3.5 text-ink" />
                    তিন স্তরে সাজানো টপিক
                  </li>
                </ul>

                {featured[0] ? (
                  <Link
                    href={`/books/${geography.slug}/${featured[0].slug}`}
                    className="btn btn-primary mt-6 w-full"
                  >
                    অধ্যায়টি খুলুন
                    <IconArrowRight className="h-4 w-4" />
                  </Link>
                ) : null}
              </div>
            </div>

            <p className="mt-3 text-center text-[0.65rem] text-neutral-500">
              প্রতিদিন এক অধ্যায়—ছোট অভ্যাস, বড় পরিবর্তন
            </p>
          </aside>
        </div>
      </section>

      {/* ভূগোল স্পটলাইট */}
      <section className="section-block" aria-labelledby="geography-heading">
        <div className="container-page">
          <div className="flex flex-wrap items-end justify-between gap-4 border-b-2 border-ink pb-5">
            <div>
              <p className="eyebrow">প্রধান বই • ১৫ অধ্যায়</p>
              <h2
                id="geography-heading"
                className="display-title mt-3 text-3xl sm:text-4xl"
              >
                ভূগোল ও পরিবেশ
              </h2>
            </div>
            <Link href="/books/bhugol" className="text-link text-sm">
              বইটি খুলুন
            </Link>
          </div>

          <ol className="mt-6 grid gap-x-10 sm:grid-cols-2">
            {geographyChapters.map((chapter, index) => (
              <li key={chapter.slug}>
                <Link
                  href={`/books/${geography.slug}/${chapter.slug}`}
                  className="group flex items-start gap-4 border-b border-line py-3.5"
                >
                  <span className="chapter-number mt-0.5 text-sm">
                    {padBengali(index + 1)}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-base font-semibold leading-snug group-hover:underline group-hover:decoration-1 group-hover:underline-offset-4">
                      {chapter.title}
                    </span>
                    <span className="mt-0.5 block text-[0.7rem] text-muted">
                      {toBengaliNumber(chapter.readingTime)} মিনিট
                    </span>
                  </span>
                  <IconArrowRight className="mt-1 h-4 w-4 shrink-0 text-muted transition-transform group-hover:translate-x-1" />
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* বিষয়সমূহ */}
      <section className="section-block" aria-labelledby="subjects-heading">
        <div className="container-page">
          <div className="flex flex-wrap items-end justify-between gap-4 border-b-2 border-ink pb-5">
            <div>
              <p className="eyebrow">আরও বই</p>
              <h2 id="subjects-heading" className="display-title mt-3 text-3xl sm:text-4xl">
                সব বিষয়, এক জায়গায়
              </h2>
            </div>
            <Link href="/books" className="text-link text-sm">
              সব বই দেখুন
            </Link>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {books.map((book) => (
              <BookCard key={book.slug} book={book} />
            ))}
          </div>
        </div>
      </section>

      {/* পড়ার পদ্ধতি */}
      <section className="border-y border-line bg-soft" aria-labelledby="method-heading">
        <div className="container-page section-block">
          <div className="max-w-2xl">
            <p className="eyebrow">যেভাবে পড়বেন</p>
            <h2 id="method-heading" className="display-title mt-3 text-3xl sm:text-4xl">
              প্রস্তুতি এগিয়ে রাখার তিন ধাপ
            </h2>
            <p className="lead-text mt-4">
              বেশি পড়ার চেয়ে গোছানো পড়া গুরুত্বপূর্ণ। প্রতিটি অধ্যায়ে গুরুত্ব
              অনুযায়ী ভাগ করা আছে, তাই সময় কাজে লাগানো সহজ।
            </p>
          </div>

          <ol className="mt-10 grid gap-4 md:grid-cols-3">
            {steps.map((step, index) => (
              <li
                key={step.title}
                className="border border-line bg-paper p-6"
              >
                <span className="inline-flex h-9 w-9 items-center justify-center bg-ink text-sm font-bold text-paper">
                  {toBengaliNumber(index + 1)}
                </span>
                <h3 className="mt-5 text-lg font-bold">{step.title}</h3>
                <p className="mt-2 text-sm leading-7 text-muted">
                  {step.description}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* নির্বাচিত অধ্যায় */}
      <section className="section-block" aria-labelledby="featured-heading">
        <div className="container-page">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="eyebrow">শুরু করার জন্য</p>
              <h2
                id="featured-heading"
                className="display-title mt-3 text-3xl sm:text-4xl"
              >
                নির্বাচিত অধ্যায়
              </h2>
            </div>
            <p className="max-w-md text-sm leading-7 text-muted">
              প্রথমে এই অধ্যায়গুলো পড়ে দেখুন—প্রতিটি নোটে মূল ধারণা, টেবিল,
              পরীক্ষা-টিপস ও ডাউনলোডযোগ্য PDF আছে।
            </p>
          </div>

          <ul className="mt-8 border-t border-line">
            {featured.map((chapter) => (
              <li key={chapter.slug}>
                <Link
                  href={`/books/${geography.slug}/${chapter.slug}`}
                  className="chapter-row group"
                >
                  <span className="text-[0.68rem] font-semibold text-muted">
                    {geography.title}
                  </span>
                  <span>
                    <span className="block text-lg font-semibold leading-snug">
                      {chapter.title}
                    </span>
                    <span className="mt-1 block text-sm leading-7 text-muted">
                      {chapter.description}
                    </span>
                  </span>
                  <span className="flex items-center gap-4 text-xs text-muted">
                    <span className="flex items-center gap-1.5">
                      <IconClock className="h-3.5 w-3.5" />
                      {toBengaliNumber(chapter.readingTime)} মিনিট
                    </span>
                    <IconArrowRight className="h-4 w-4 text-ink" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* শেষের আহ্বান */}
      <section className="bg-ink text-paper">
        <div className="container-page flex flex-col gap-6 py-14 sm:flex-row sm:items-center sm:justify-between md:py-16">
          <div>
            <p className="text-[0.7rem] font-semibold text-neutral-400">
              আজ থেকেই শুরু করুন
            </p>
            <h2 className="mt-2 text-3xl font-bold leading-tight sm:text-4xl">
              প্রতিদিন একটু পড়ুন,
              <br className="hidden sm:block" /> প্রস্তুতি এগিয়ে রাখুন।
            </h2>
          </div>
          <Link
            href="/books/bhugol"
            className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 border border-paper bg-paper px-6 text-sm font-semibold text-ink transition-colors hover:bg-ink hover:text-paper"
          >
            ভূগোল পড়া শুরু করুন
            <IconArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
