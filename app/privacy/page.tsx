import type { Metadata } from "next";
import Link from "next/link";

import { Breadcrumbs } from "@/components/breadcrumbs";
import { formatBengaliDate } from "@/lib/bengali";
import { absoluteUrl } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "গোপনীয়তা নীতি",
  description:
    "শিক্ষাগুরু কীভাবে তথ্য ব্যবহার করে, কুকিজ ও বিজ্ঞাপনের বিষয়ে নীতি, আপনার অধিকার এবং যোগাযোগের উপায়—সবকিছু সহজ বাংলায়।",
  alternates: { canonical: "/privacy" },
  openGraph: {
    title: `গোপনীয়তা নীতি | ${siteConfig.name}`,
    description:
      "কুকিজ, বিজ্ঞাপন, স্থানীয় স্টোরেজ ও আপনার অধিকার সম্পর্কে স্পষ্ট ব্যাখ্যা।",
    url: absoluteUrl("/privacy"),
  },
};

const updatedAt = formatBengaliDate("2026-10-01");

export default function PrivacyPage() {
  return (
    <>
      <section className="border-b border-line bg-soft">
        <div className="container-page py-10 md:py-14">
          <Breadcrumbs items={[{ label: "গোপনীয়তা নীতি" }]} />
          <p className="eyebrow">স্বচ্ছতা</p>
          <h1 className="display-title mt-4 text-4xl sm:text-5xl">
            গোপনীয়তা নীতি
          </h1>
          <p className="mt-4 text-sm text-muted">
            সর্বশেষ হালনাগাদ: {updatedAt}
          </p>
        </div>
      </section>

      <div className="container-page py-12 md:py-16">
        <div className="mx-auto max-w-3xl">
          <p className="lead-text">
            আপনার গোপনীয়তা আমাদের কাছে গুরুত্বপূর্ণ। এই নীতিতে ব্যাখ্যা করা
            হয়েছে—{siteConfig.name} কী তথ্য সংগ্রহ করে, কেন করে, কীভাবে
            ব্যবহার করে এবং আপনার কী অধিকার আছে।
          </p>

          <nav
            aria-label="এই পাতার সূচিপত্র"
            className="mt-8 border-y border-line py-5"
          >
            <p className="text-xs font-bold">এই পাতায়</p>
            <ul className="mt-3 grid gap-2 text-sm sm:grid-cols-2">
              {[
                ["#information", "আমরা কী তথ্য পাই"],
                ["#cookies", "কুকিজ ও স্থানীয় স্টোরেজ"],
                ["#ads", "বিজ্ঞাপন ও তৃতীয় পক্ষ"],
                ["#use", "তথ্যের ব্যবহার"],
                ["#security", "নিরাপত্তা ও সংরক্ষণ"],
                ["#rights", "আপনার অধিকার"],
                ["#children", "শিশুদের গোপনীয়তা"],
                ["#changes", "নীতির পরিবর্তন"],
              ].map(([href, label]) => (
                <li key={href}>
                  <a
                    href={href}
                    className="text-muted underline decoration-neutral-300 underline-offset-4 hover:text-ink hover:decoration-ink"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <article className="prose-bn mt-10 space-y-10">
            <section id="information" className="scroll-mt-32">
              <h2 className="text-2xl font-bold">আমরা কী তথ্য পাই</h2>
              <div className="mt-3 space-y-3 text-[1.02rem] leading-[1.95] text-neutral-800">
                <p>
                  সাধারণভাবে পড়ার জন্য অ্যাকাউন্ট বা লগইন লাগে না। আমরা নাম,
                  মোবাইল নম্বর বা ঠিকানা চাওয়া হয় এমন কোনো ফর্ম রাখি না।
                </p>
                <p>
                  আপনি যদি স্বেচ্ছায় ইমেইল করেন, তবে আপনার ইমেইল ঠিকানা ও
                  বার্তার বিষয়বস্তু আমাদের কাছে পৌঁছায়। শুধু উত্তর দেওয়া ও
                  সমস্যা সংশোধনের জন্যই তা ব্যবহার করা হয়।
                </p>
                <p>
                  ওয়েবসাইট পরিচালনার সময় সার্ভার স্বয়ংক্রিয়ভাবে কিছু কৌশলগত
                  তথ্য (যেমন ব্রাউজারের ধরন, পেজ দেখার সময়) সংরক্ষণ করতে পারে।
                  এগুলো কোনো ব্যক্তিকে সরাসরি চিহ্নিত করে না।
                </p>
              </div>
            </section>

            <section id="cookies" className="scroll-mt-32">
              <h2 className="text-2xl font-bold">কুকিজ ও স্থানীয় স্টোরেজ</h2>
              <div className="mt-3 space-y-3 text-[1.02rem] leading-[1.95] text-neutral-800">
                <p>
                  ওয়েবসাইটে কুকিজ বা ব্রাউজারের স্থানীয় স্টোরেজ ব্যবহার হতে
                  পারে। এর মধ্যে রয়েছে:
                </p>
                <ul className="space-y-2.5">
                  <li className="flex gap-3">
                    <span className="mt-2.5 block h-1.5 w-1.5 shrink-0 bg-ink" />
                    <span>
                      <strong className="font-semibold">রিডিং মোড:</strong>{" "}
                      আপনি রিডিং মোড চালু করেছেন কিনা, তা ব্রাউজারে সংরক্ষিত
                      থাকে। এটি আপনার ডিভাইসেই থাকে, আমাদের সার্ভারে যায় না।
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="mt-2.5 block h-1.5 w-1.5 shrink-0 bg-ink" />
                    <span>
                      <strong className="font-semibold">বিজ্ঞাপন:</strong>{" "}
                      অনুমোদিত হলে Google AdSense কুকিজ ব্যবহার করতে পারে।
                      বিস্তারিত নিচে।
                    </span>
                  </li>
                </ul>
                <p>
                  ব্রাউজারের সেটিংস থেকে যেকোনো সময় কুকিজ ও স্থানীয় স্টোরেজ
                  মুছে ফেলতে পারেন। তবে রিডিং মোডের পছন্দ আর সংরক্ষিত থাকবে না।
                </p>
              </div>
            </section>

            <section id="ads" className="scroll-mt-32">
              <h2 className="text-2xl font-bold">বিজ্ঞাপন ও তৃতীয় পক্ষ</h2>
              <div className="mt-3 space-y-3 text-[1.02rem] leading-[1.95] text-neutral-800">
                <p>
                  ওয়েবসাইট চালু রাখতে ভবিষ্যতে Google AdSense বা অনুরূপ
                  বিজ্ঞাপন সেবা ব্যবহার করা হতে পারে। অনুমোদিত হলে Google ও তার
                  সহযোগীরা আপনার ব্রাউজারে কুকিজ ব্যবহার করে বিজ্ঞাপন দেখাতে
                  পারে।
                </p>
                <p>
                  Google কীভাবে বিজ্ঞাপনে তথ্য ব্যবহার করে, তা জানতে{" "}
                  <a
                    href="https://policies.google.com/technologies/ads"
                    target="_blank"
                    rel="noreferrer noopener"
                    className="text-link"
                  >
                    Google-এর বিজ্ঞাপন নীতি
                  </a>{" "}
                  পড়ুন। ব্যক্তিগতকৃত বিজ্ঞাপন বন্ধ করতে{" "}
                  <a
                    href="https://adssettings.google.com"
                    target="_blank"
                    rel="noreferrer noopener"
                    className="text-link"
                  >
                    Google Ads Settings
                  </a>{" "}
                  ব্যবহার করতে পারেন।
                </p>
                <p>
                  ওয়েবসাইটে বাইরের কোনো সাইটের লিংক থাকলে সেখানে তাদের নিজস্ব
                  গোপনীয়তা নীতি প্রযোজ্য হবে। সেই সাইটের বিষয়বস্তু বা নীতির
                  জন্য আমরা দায়ী নই।
                </p>
              </div>
            </section>

            <section id="use" className="scroll-mt-32">
              <h2 className="text-2xl font-bold">তথ্যের ব্যবহার</h2>
              <div className="mt-3 space-y-3 text-[1.02rem] leading-[1.95] text-neutral-800">
                <p>আমরা যেসব উদ্দেশ্যে তথ্য ব্যবহার করতে পারি:</p>
                <ul className="space-y-2.5">
                  <li className="flex gap-3">
                    <span className="mt-2.5 block h-1.5 w-1.5 shrink-0 bg-ink" />
                    <span>আপনার প্রশ্ন বা মতামতের উত্তর দিতে।</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="mt-2.5 block h-1.5 w-1.5 shrink-0 bg-ink" />
                    <span>নোটের ভুল সংশোধন ও কনটেন্ট উন্নত করতে।</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="mt-2.5 block h-1.5 w-1.5 shrink-0 bg-ink" />
                    <span>ওয়েবসাইটের কারিগরি সমস্যা খুঁজে বের করতে।</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="mt-2.5 block h-1.5 w-1.5 shrink-0 bg-ink" />
                    <span>প্রযোজ্য আইন ও নীতিমালা মেনে চলতে।</span>
                  </li>
                </ul>
                <p>
                  আমরা আপনার ব্যক্তিগত তথ্য বিক্রি করি না বা বিজ্ঞাপনদাতার কাছে
                  আলাদাভাবে হস্তান্তর করি না।
                </p>
              </div>
            </section>

            <section id="security" className="scroll-mt-32">
              <h2 className="text-2xl font-bold">নিরাপত্তা ও সংরক্ষণ</h2>
              <div className="mt-3 space-y-3 text-[1.02rem] leading-[1.95] text-neutral-800">
                <p>
                  ইমেইল শুধু প্রয়োজনীয় সময়ের জন্য সংরক্ষণ করা হয়। তবে
                  ইন্টারনেটে কোনো যোগাযোগই শতভাগ নিরাপদ নয়—তাই অত্যন্ত
                  সংবেদনশীল তথ্য (পাসওয়ার্ড, পরিচয়পত্রের কপি) পাঠাবেন না।
                </p>
              </div>
            </section>

            <section id="rights" className="scroll-mt-32">
              <h2 className="text-2xl font-bold">আপনার অধিকার</h2>
              <div className="mt-3 space-y-3 text-[1.02rem] leading-[1.95] text-neutral-800">
                <p>
                  আপনার পাঠানো ইমেইল সম্পর্কে জানতে, সংশোধন করতে বা মুছে ফেলার
                  অনুরোধ করতে পারেন। অনুরোধের সঙ্গে প্রাসঙ্গিক ইমেইলের তথ্য
                  উল্লেখ করুন, যাতে সহজে খুঁজে পাওয়া যায়।
                </p>
                <p>
                  ব্রাউজারের কুকিজ ও স্থানীয় স্টোরেজ আপনি নিজেই নিয়ন্ত্রণ করতে
                  পারেন—সেটিংস থেকে মুছে ফেলা বা ব্লক করা যায়।
                </p>
              </div>
            </section>

            <section id="children" className="scroll-mt-32">
              <h2 className="text-2xl font-bold">শিশুদের গোপনীয়তা</h2>
              <div className="mt-3 space-y-3 text-[1.02rem] leading-[1.95] text-neutral-800">
                <p>
                  এই সাইট ক্লাস ৯–১০ শিক্ষার্থীদের জন্যও উপযোগী। আমরা জেনেশুনে
                  শিশুদের কাছ থেকে ব্যক্তিগত তথ্য সংগ্রহ করি না। অভিভাবকের
                  অনুমতি ছাড়া শিশুদের ব্যক্তিগত তথ্য ইমেইলে পাঠানো উচিত নয়।
                </p>
              </div>
            </section>

            <section id="changes" className="scroll-mt-32">
              <h2 className="text-2xl font-bold">নীতির পরিবর্তন</h2>
              <div className="mt-3 space-y-3 text-[1.02rem] leading-[1.95] text-neutral-800">
                <p>
                  সেবা বা আইনি প্রয়োজনে এই নীতি সময় সময় হালনাগাদ হতে পারে।
                  গুরুত্বপূর্ণ পরিবর্তন হলে এই পাতায় তারিখসহ জানানো হবে।
                </p>
              </div>
            </section>

            <section className="border-l-4 border-ink bg-soft p-5" aria-labelledby="privacy-contact">
              <h2 id="privacy-contact" className="text-base font-bold">
                যোগাযোগ
              </h2>
              <p className="mt-2 text-sm leading-7 text-muted">
                গোপনীয়তা সম্পর্কে প্রশ্ন থাকলে ইমেইল করুন:{" "}
                <a href={`mailto:${siteConfig.email}`} className="text-link">
                  {siteConfig.email}
                </a>
                । অথবা{" "}
                <Link href="/contact" className="text-link">
                  যোগাযোগের পাতা
                </Link>{" "}
                দেখুন।
              </p>
            </section>
          </article>
        </div>
      </div>
    </>
  );
}
