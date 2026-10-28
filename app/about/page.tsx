import type { Metadata } from "next";
import Link from "next/link";

import { Breadcrumbs } from "@/components/breadcrumbs";
import { IconArrowRight } from "@/components/ui/icons";
import { getSiteStats } from "@/lib/content";
import { toBengaliNumber } from "@/lib/bengali";
import { absoluteUrl } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "আমাদের সম্পর্কে",
  description:
    "শিক্ষাগুরু একটি বাংলা শিক্ষা প্ল্যাটফর্ম—ক্লাস ৯–১০ পাঠ্যক্রমের ভিত্তিতে সরকারি চাকরির প্রস্তুতির জন্য অধ্যায়ভিত্তিক নোট, গুরুত্ব বিভাজন ও PDF সুবিধা।",
  alternates: { canonical: "/about" },
  openGraph: {
    title: `আমাদের সম্পর্কে | ${siteConfig.name}`,
    description:
      "সহজ বাংলায় গোছানো নোট, গুরুত্ব অনুযায়ী পড়ার ব্যবস্থা এবং অফলাইনে পড়ার PDF—এই তিনটি ধারণা নিয়ে শিক্ষাগুরু।",
    url: absoluteUrl("/about"),
  },
};

const principles = [
  {
    title: "সহজ ভাষা, স্পষ্ট ব্যাখ্যা",
    text: "জটিল ধারণাগুলোও ছোট বাক্যে, উদাহরণ দিয়ে এবং প্রয়োজনীয় টেবিলসহ লেখা হয়। লক্ষ্য মুখস্থ করানো নয়—বোঝানো।",
  },
  {
    title: "গুরুত্ব অনুযায়ী সাজানো",
    text: "প্রতিটি অধ্যায়ের টপিক তিন স্তরে ভাগ করা: অতি গুরুত্বপূর্ণ, গুরুত্বপূর্ণ ও কম গুরুত্বপূর্ণ। সময় কম থাকলে আগে দরকারি অংশ শেষ করা যায়।",
  },
  {
    title: "পড়ার আরাম",
    text: "লম্বা লেখার জন্য পর্যাপ্ত লাইন-স্পেস, উচ্চ কনট্রাস্ট এবং রিডিং মোড। মোবাইল, ট্যাবলেট ও ডেস্কটপে একই রকম স্বচ্ছন্দ অভিজ্ঞতা।",
  },
  {
    title: "অফলাইনে পড়ার সুবিধা",
    text: "প্রতিটি অধ্যায়ের পরিচ্ছন্ন PDF ডাউনলোড করা যায়। বাংলা যুক্তাক্ষর ঠিক রেখে তৈরি PDF ইন্টারনেট ছাড়াই পড়া যায়।",
  },
];

export default function AboutPage() {
  const stats = getSiteStats();

  return (
    <>
      <section className="border-b border-line bg-soft">
        <div className="container-page py-10 md:py-16">
          <Breadcrumbs items={[{ label: "আমাদের সম্পর্কে" }]} />
          <p className="eyebrow">আমাদের কথা</p>
          <h1 className="display-title mt-4 max-w-3xl text-4xl sm:text-5xl">
            শেখার পথ সহজ করতে চাই
          </h1>
          <p className="lead-text mt-5 max-w-3xl">
            {siteConfig.name} একটি বাংলা শিক্ষা প্ল্যাটফর্ম। ক্লাস ৯–১০
            পাঠ্যক্রমের ভিত্তিতে সরকারি চাকরির প্রস্তুতির জন্য অধ্যায়ভিত্তিক
            নোট আমরা গুছিয়ে সাজাই—যাতে পড়ার সময় কম, বোঝার পরিমাণ বেশি হয়।
          </p>
        </div>
      </section>

      <div className="container-page py-12 md:py-16">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_18rem] lg:gap-16">
          <div className="max-w-3xl">
            <section aria-labelledby="mission-heading">
              <h2
                id="mission-heading"
                className="text-2xl font-bold sm:text-3xl"
              >
                কেন এই প্ল্যাটফর্ম
              </h2>
              <div className="mt-4 space-y-4 text-[1.02rem] leading-[1.95] text-neutral-800">
                <p>
                  অনেক শিক্ষার্থী সরকারি চাকরির প্রস্তুতি শুরু করেন, কিন্তু
                  কোন বই থেকে কীভাবে পড়বেন তা নিয়ে দ্বিধায় পড়েন। বাংলা
                  মাধ্যমের পাঠ্যবই, নোট ও পরীক্ষার প্রশ্ন—সব এক জায়গায় গোছানো
                  থাকে না। এই ফাঁকটুকু কমাতে আমরা বিষয়ভিত্তিক, অধ্যায়ভিত্তিক
                  নোট তৈরি করছি।
                </p>
                <p>
                  প্রতিটি নোটে মূল ধারণা, সংজ্ঞা, গুরুত্বপূর্ণ তথ্য, তুলনামূলক
                  টেবিল এবং পরীক্ষায় কাজে লাগার মতো টিপস থাকে। কোন অংশ আগে
                  পড়বেন, তা নিয়ে সিদ্ধান্ত নেওয়া সহজ হয় কারণ টপিকগুলো
                  গুরুত্ব অনুযায়ী আলাদা করা।
                </p>
              </div>
            </section>

            <section className="mt-12" aria-labelledby="principles-heading">
              <h2
                id="principles-heading"
                className="text-2xl font-bold sm:text-3xl"
              >
                আমরা যেসব বিষয়ে গুরুত্ব দিই
              </h2>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {principles.map((item, index) => (
                  <div key={item.title} className="border border-line p-5">
                    <span className="text-xs font-semibold text-neutral-500">
                      {toBengaliNumber(index + 1).padStart(2, "০")}
                    </span>
                    <h3 className="mt-2 text-lg font-bold">{item.title}</h3>
                    <p className="mt-2 text-sm leading-7 text-muted">
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            <section className="mt-12" aria-labelledby="standard-heading">
              <h2
                id="standard-heading"
                className="text-2xl font-bold sm:text-3xl"
              >
                কনটেন্ট তৈরির মান
              </h2>
              <div className="mt-4 space-y-4 text-[1.02rem] leading-[1.95] text-neutral-800">
                <p>
                  নোট তৈরির সময় পাঠ্যবইয়ের মূল বিষয়বস্তু, নির্ধারিত সিলেবাস
                  এবং সাধারণ পরীক্ষার ধরন অনুসরণ করা হয়। প্রতিটি অধ্যায় প্রকাশের
                  আগে ভাষা, তথ্যের ধারাবাহিকতা ও বাংলা বানান যাচাই করা হয়।
                </p>
                <p>
                  তারপরও ভুল-ত্রুটি থাকতে পারে। গুরুত্বপূর্ণ সিদ্ধান্তের আগে
                  সর্বশেষ পাঠ্যবই ও সরকারি সিলেবাস মিলিয়ে নেওয়ার অনুরোধ রইল।
                  কোনো ভুল চোখে পড়লে যোগাযোগের পাতায় জানাতে পারেন—আমরা সংশোধন
                  করার চেষ্টা করব।
                </p>
              </div>
            </section>

            <section className="mt-12" aria-labelledby="audience-heading">
              <h2
                id="audience-heading"
                className="text-2xl font-bold sm:text-3xl"
              >
                কাদের জন্য
              </h2>
              <ul className="mt-4 space-y-3 text-[1.02rem] leading-[1.95] text-neutral-800">
                <li className="flex gap-3">
                  <span className="mt-2.5 block h-1.5 w-1.5 shrink-0 bg-ink" />
                  <span>
                    যারা ক্লাস ৯–১০ পাঠ্যক্রমের ভিত্তিতে সরকারি চাকরির মৌলিক
                    প্রস্তুতি নিতে চান।
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-2.5 block h-1.5 w-1.5 shrink-0 bg-ink" />
                  <span>
                    যারা বাংলা মাধ্যমে পড়তে স্বচ্ছন্দ এবং সহজ ভাষায় গোছানো
                    নোট খুঁজছেন।
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-2.5 block h-1.5 w-1.5 shrink-0 bg-ink" />
                  <span>
                    যারা মোবাইল বা কম গতির ইন্টারনেটে পড়েন এবং অফলাইনে পড়ার
                    জন্য PDF সংরক্ষণ করতে চান।
                  </span>
                </li>
              </ul>
            </section>

            <section className="mt-12 border-l-4 border-ink bg-soft p-5 sm:p-6" aria-labelledby="disclaimer-heading">
              <h2 id="disclaimer-heading" className="text-base font-bold">
                স্বচ্ছতা ও সীমাবদ্ধতা
              </h2>
              <p className="mt-2 text-sm leading-7 text-muted">
                এটি একটি স্বাধীন শিক্ষামূলক সহায়ক ওয়েবসাইট। আমরা কোনো সরকারি
                প্রতিষ্ঠান বা পরীক্ষা কর্তৃপক্ষের সঙ্গে সম্পর্কিত নই। ওয়েবসাইটের
                নোট পাঠ্যবইয়ের বিকল্প নয়; চূড়ান্ত প্রস্তুতির জন্য নির্ধারিত
                বই ও সরকারি বিজ্ঞপ্তি অনুসরণ করুন।
              </p>
            </section>
          </div>

          <aside className="space-y-6">
            <div className="border-2 border-ink p-5">
              <p className="text-xs font-semibold text-muted">এক নজরে</p>
              <dl className="mt-4 space-y-3 text-sm">
                <div className="flex items-center justify-between gap-3 border-b border-line pb-3">
                  <dt className="text-muted">বিষয়</dt>
                  <dd className="font-bold">{toBengaliNumber(stats.books)}টি</dd>
                </div>
                <div className="flex items-center justify-between gap-3 border-b border-line pb-3">
                  <dt className="text-muted">অধ্যায়</dt>
                  <dd className="font-bold">
                    {toBengaliNumber(stats.chapters)}টি
                  </dd>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <dt className="text-muted">টপিক</dt>
                  <dd className="font-bold">{toBengaliNumber(stats.topics)}টি</dd>
                </div>
              </dl>
            </div>

            <div className="border border-line bg-soft p-5">
              <p className="text-sm font-bold">পড়া শুরু করতে চান?</p>
              <p className="mt-2 text-sm leading-7 text-muted">
                যেকোনো বই বেছে নিয়ে প্রথম অধ্যায় থেকেই শুরু করতে পারেন।
              </p>
              <Link href="/books" className="btn btn-primary mt-4 w-full">
                বই দেখুন
                <IconArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="border border-line p-5">
              <p className="text-sm font-bold">মতামত জানান</p>
              <p className="mt-2 text-sm leading-7 text-muted">
                কোনো অধ্যায়ে ভুল দেখলে বা নতুন বিষয়ের অনুরোধ থাকলে আমাদের
                লিখুন।
              </p>
              <Link href="/contact" className="text-link mt-3 inline-block text-sm">
                যোগাযোগ করুন →
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
