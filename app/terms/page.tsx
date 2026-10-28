import type { Metadata } from "next";
import Link from "next/link";

import { Breadcrumbs } from "@/components/breadcrumbs";
import { formatBengaliDate, toBengaliNumber } from "@/lib/bengali";
import { absoluteUrl } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "শর্তাবলি",
  description:
    "শিক্ষাগুরুর নোট ব্যবহারের শর্ত, মেধাস্বত্ব, PDF ব্যবহারের নিয়ম ও দায়সীমা—সহজ বাংলায়।",
  alternates: { canonical: "/terms" },
  openGraph: {
    title: `শর্তাবলি | ${siteConfig.name}`,
    description:
      "নোট ব্যবহার, PDF ডাউনলোড ও মেধাস্বত্ব সম্পর্কিত শর্তাবলি।",
    url: absoluteUrl("/terms"),
  },
};

const updatedAt = formatBengaliDate("2026-10-01");

const sections = [
  {
    id: "acceptance",
    title: "শর্তাবলি গ্রহণ",
    body: "এই ওয়েবসাইট ব্যবহার করে আপনি এই শর্তাবলি মেনে নিচ্ছেন। শর্তাবলি পছন্দ না হলে ওয়েবসাইট ব্যবহার বন্ধ করুন।",
  },
  {
    id: "purpose",
    title: "কনটেন্টের উদ্দেশ্য",
    body: "এখানে প্রকাশিত নোট কেবল শিক্ষামূলক সহায়তার জন্য। এটি কোনো সরকারি প্রতিষ্ঠান, বোর্ড বা পরীক্ষা কর্তৃপক্ষের অনুমোদিত প্রকাশনা নয়। পরীক্ষার নিয়ম, সিলেবাস ও তথ্যের চূড়ান্ত উৎস হলো সংশ্লিষ্ট সরকারি বিজ্ঞপ্তি ও পাঠ্যবই।",
  },
  {
    id: "accuracy",
    title: "তথ্যের নির্ভুলতা",
    body: "নোট যতটা সম্ভব নির্ভুল ও হালনাগাদ রাখার চেষ্টা করা হয়, তবে কোনো তথ্য সম্পূর্ণ বা ত্রুটিমুক্ত হওয়ার নিশ্চয়তা দেওয়া হয় না। তথ্য ব্যবহারের সিদ্ধান্ত ও তার ফলাফলের দায় ব্যবহারকারীর।",
  },
  {
    id: "copyright",
    title: "মেধাস্বত্ব",
    body: "এই ওয়েবসাইটের মূল লেখা, বিন্যাস, নকশা ও PDF ফাইল শিক্ষাগুরুর সম্পত্তি। ব্যক্তিগত পড়াশোনার জন্য ব্যবহার করা যাবে; বাণিজ্যিকভাবে পুনঃপ্রকাশ, বিক্রি বা বড় পরিসরে বিতরণ করা যাবে না। উদ্ধৃতি দিলে সূত্র হিসেবে এই সাইটের নাম উল্লেখ করুন।",
  },
  {
    id: "pdf",
    title: "PDF ব্যবহারের নিয়ম",
    body: "ডাউনলোড করা PDF নিজের পড়ার জন্য ব্যবহার করুন। ফাইলের মালিকানা দাবি করা, লোগো বা সূত্র মুছে দিয়ে নিজের নামে প্রকাশ করা, বা পেইড কোর্সে বিক্রি করা নিষিদ্ধ।",
  },
  {
    id: "prohibited",
    title: "নিষিদ্ধ ব্যবহার",
    body: "ওয়েবসাইটের ক্ষতি করা, স্বয়ংক্রিয়ভাবে বেশি পরিমাণে অনুরোধ পাঠানো, অন্য ব্যবহারকারীর অভিজ্ঞতা ব্যাহত করা, বা অন্যের মেধাস্বত্ব লঙ্ঘন করে কনটেন্ট ব্যবহার করা যাবে না।",
  },
  {
    id: "links",
    title: "বাহ্যিক লিংক",
    body: "সুবিধার জন্য বাইরের কিছু সাইটের লিংক থাকতে পারে। সেই সাইটের কনটেন্ট, নিরাপত্তা বা নীতির জন্য আমরা দায়ী নই। লিংকে ক্লিক করার আগে সংশ্লিষ্ট সাইটের শর্ত দেখে নিন।",
  },
  {
    id: "ads",
    title: "বিজ্ঞাপন",
    body: "ওয়েবসাইটে তৃতীয় পক্ষের বিজ্ঞাপন দেখানো হতে পারে। বিজ্ঞাপনের কনটেন্ট বা তাতে উল্লেখিত পণ্য-সেবার জন্য বিজ্ঞাপনদাতা দায়ী। কোনো বিজ্ঞাপন আমাদের সুপারিশ হিসেবে ধরে নেবেন না।",
  },
  {
    id: "liability",
    title: "দায়সীমা",
    body: "ওয়েবসাইট ব্যবহারের ফলে সরাসরি বা পরোক্ষভাবে কোনো ক্ষতি হলে, প্রযোজ্য আইনের সীমার মধ্যে, শিক্ষাগুরু দায়ী থাকবে না। ওয়েবসাইট ‘যেমন আছে’ ভিত্তিতে পরিবেশিত হয়।",
  },
  {
    id: "changes",
    title: "শর্ত পরিবর্তন",
    body: "প্রয়োজনে যেকোনো সময় এই শর্তাবলি পরিবর্তন করা হতে পারে। পরিবর্তিত শর্ত এই পাতায় প্রকাশের পর থেকে কার্যকর হবে। নিয়মিত এই পাতা দেখে নেওয়ার অনুরোধ রইল।",
  },
  {
    id: "law",
    title: "প্রযোজ্য আইন",
    body: "এই শর্তাবলি বাংলাদেশের প্রযোজ্য আইন অনুসারে পরিচালিত হবে।",
  },
];

export default function TermsPage() {
  return (
    <>
      <section className="border-b border-line bg-soft">
        <div className="container-page py-10 md:py-14">
          <Breadcrumbs items={[{ label: "শর্তাবলি" }]} />
          <p className="eyebrow">ব্যবহারের নিয়ম</p>
          <h1 className="display-title mt-4 text-4xl sm:text-5xl">শর্তাবলি</h1>
          <p className="mt-4 text-sm text-muted">
            সর্বশেষ হালনাগাদ: {updatedAt}
          </p>
        </div>
      </section>

      <div className="container-page py-12 md:py-16">
        <div className="mx-auto max-w-3xl">
          <p className="lead-text">
            {siteConfig.name} ব্যবহার করার আগে নিচের শর্তগুলো পড়ে নিন। এগুলো
            সহজ ভাষায় লেখা হয়েছে, যাতে আপনার অধিকার ও দায়িত্ব স্পষ্ট থাকে।
          </p>

          <article className="mt-10 space-y-8">
            {sections.map((section, index) => (
              <section key={section.id} id={section.id} className="scroll-mt-32">
                <h2 className="flex items-baseline gap-3 text-xl font-bold sm:text-2xl">
                  <span className="text-xs font-medium text-neutral-500">
                    {toBengaliNumber(index + 1)}
                  </span>
                  {section.title}
                </h2>
                <p className="mt-2 text-[1.02rem] leading-[1.95] text-neutral-800">
                  {section.body}
                </p>
              </section>
            ))}
          </article>

          <aside className="mt-12 border-l-4 border-ink bg-soft p-5">
            <h2 className="text-base font-bold">প্রশ্ন থাকলে</h2>
            <p className="mt-2 text-sm leading-7 text-muted">
              শর্তাবলি নিয়ে কিছু অস্পষ্ট মনে হলে{" "}
              <Link href="/contact" className="text-link">
                যোগাযোগ করুন
              </Link>{" "}
              বা ইমেইল করুন:{" "}
              <a href={`mailto:${siteConfig.email}`} className="text-link">
                {siteConfig.email}
              </a>
              ।
            </p>
          </aside>
        </div>
      </div>
    </>
  );
}
