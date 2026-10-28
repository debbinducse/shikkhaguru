import type { Metadata } from "next";

import { BookCard } from "@/components/books/book-card";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { books } from "@/data/books";
import { toBengaliNumber } from "@/lib/bengali";
import { getSiteStats } from "@/lib/content";
import { absoluteUrl, JsonLd } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "সব বই",
  description:
    "ভূগোল ও পরিবেশসহ সাতটি বিষয়ের অধ্যায়ভিত্তিক নোট। ভূগোল, বাংলা, ইংরেজি, গণিত, বিজ্ঞান, সামাজিক বিজ্ঞান ও সাধারণ জ্ঞান—সরকারি চাকরির প্রস্তুতির জন্য ক্লাস ৯–১০ ভিত্তিক বাংলা নোট।",
  alternates: { canonical: "/books" },
  openGraph: {
    title: `সব বই | ${siteConfig.name}`,
    description:
      "ভূগোল ও পরিবেশসহ সাতটি বিষয়ের অধ্যায়ভিত্তিক বাংলা নোট—গুরুত্ব অনুযায়ী সাজানো ও PDF ডাউনলোডসহ।",
    url: absoluteUrl("/books"),
  },
};

export default function BooksPage() {
  const stats = getSiteStats();

  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "সব বই",
    description: "সরকারি চাকরির প্রস্তুতির জন্য ক্লাস ৯–১০ ভিত্তিক বাংলা নোট।",
    url: absoluteUrl("/books"),
    inLanguage: "bn-BD",
    isPartOf: { "@type": "WebSite", name: siteConfig.name, url: siteConfig.url },
    hasPart: books.map((book) => ({
      "@type": "Book",
      name: book.title,
      description: book.description,
      url: absoluteUrl(`/books/${book.slug}`),
      inLanguage: "bn-BD",
    })),
  };

  return (
    <>
      <section className="border-b border-line bg-soft">
        <div className="container-page py-10 md:py-14">
          <Breadcrumbs items={[{ label: "সব বই" }]} />
          <p className="eyebrow">গ্রন্থাগার</p>
          <h1 className="display-title mt-4 text-4xl sm:text-5xl">সব বই</h1>
          <p className="lead-text mt-5 max-w-3xl">
            ভূগোল ও পরিবেশ বইটি প্রথমে সম্পূর্ণ সাজানো হয়েছে—১৫টি অধ্যায়,
            গুরুত্ব অনুযায়ী ভাগ করা টপিক ও PDF ডাউনলোডসহ। এর সঙ্গে ক্লাস ৯–১০
            পাঠ্যক্রমের {toBengaliNumber(stats.books)}টি বিষয়ের বইও রয়েছে।
            প্রতিটি বইয়ে অধ্যায়ভিত্তিক নোট, গুরুত্ব বিভাজন এবং ডাউনলোডযোগ্য
            PDF আছে।
          </p>

          <dl className="mt-8 flex flex-wrap gap-x-10 gap-y-4 border-t border-line pt-5">
            <div>
              <dt className="text-[0.68rem] text-muted">মোট বই</dt>
              <dd className="mt-0.5 text-xl font-bold">
                {toBengaliNumber(stats.books)}
              </dd>
            </div>
            <div>
              <dt className="text-[0.68rem] text-muted">মোট অধ্যায়</dt>
              <dd className="mt-0.5 text-xl font-bold">
                {toBengaliNumber(stats.chapters)}
              </dd>
            </div>
            <div>
              <dt className="text-[0.68rem] text-muted">মোট টপিক</dt>
              <dd className="mt-0.5 text-xl font-bold">
                {toBengaliNumber(stats.topics)}
              </dd>
            </div>
          </dl>
        </div>
      </section>

      <section className="section-block" aria-labelledby="books-heading">
        <div className="container-page">
          <div className="flex flex-wrap items-end justify-between gap-4 border-b-2 border-ink pb-4">
            <h2 id="books-heading" className="text-2xl font-bold">
              বিষয় অনুযায়ী বই
            </h2>
            <p className="text-xs text-muted">
              যেকোনো বইয়ে ঢুকে অধ্যায় নির্বাচন করুন
            </p>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {books.map((book) => (
              <BookCard key={book.slug} book={book} />
            ))}
          </div>

          <aside className="mt-12 border-l-4 border-ink bg-soft p-5 sm:p-6">
            <h2 className="text-base font-bold">পড়ার পরামর্শ</h2>
            <p className="mt-2 max-w-3xl text-sm leading-7 text-muted">
              প্রতিটি অধ্যায়ে টপিকগুলো তিনটি ভাগে সাজানো: অতি গুরুত্বপূর্ণ,
              গুরুত্বপূর্ণ ও কম গুরুত্বপূর্ণ। অতি গুরুত্বপূর্ণ অংশ আগে শেষ করে
              তারপর বাকি অংশে যাওয়া সুবিধাজনক। সময় কম থাকলে শুধু প্রথম দুটি
              ভাগ পড়ুন।
            </p>
          </aside>
        </div>
      </section>

      <JsonLd data={collectionSchema} />
    </>
  );
}
