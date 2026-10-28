import type { Metadata } from "next";
import Link from "next/link";

import { Breadcrumbs } from "@/components/breadcrumbs";
import { IconArrowRight } from "@/components/ui/icons";
import { absoluteUrl } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "যোগাযোগ",
  description:
    "শিক্ষাগুরুর সঙ্গে যোগাযোগ করুন—নোটের ভুল সংশোধন, নতুন বিষয়ের অনুরোধ বা মতামত জানাতে ইমেইল করুন।",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: `যোগাযোগ | ${siteConfig.name}`,
    description:
      "নোটের ভুল সংশোধন, নতুন বিষয়ের অনুরোধ বা মতামত—আমাদের লিখুন।",
    url: absoluteUrl("/contact"),
  },
};

const reasons = [
  {
    title: "ভুল সংশোধন",
    text: "কোনো তথ্য ভুল মনে হলে অধ্যায়ের নাম, টপিক ও যে অংশে সমস্যা সেটি উল্লেখ করে লিখুন।",
  },
  {
    title: "নতুন বিষয়ের অনুরোধ",
    text: "কোন বই বা অধ্যায়ের নোট দরকার, তা জানান। পাঠকের অনুরোধ অগ্রাধিকার পায়।",
  },
  {
    title: "মতামত ও পরামর্শ",
    text: "পড়ার অভিজ্ঞতা, ফন্টের আকার, PDF-এর গঠন বা যেকোনো উন্নতির পরামর্শ জানাতে পারেন।",
  },
];

export default function ContactPage() {
  const mailto = `mailto:${siteConfig.email}?subject=${encodeURIComponent(
    `${siteConfig.name} — মতামত ও জিজ্ঞাসা`,
  )}`;

  return (
    <>
      <section className="border-b border-line bg-soft">
        <div className="container-page py-10 md:py-16">
          <Breadcrumbs items={[{ label: "যোগাযোগ" }]} />
          <p className="eyebrow">আমরা শুনতে চাই</p>
          <h1 className="display-title mt-4 text-4xl sm:text-5xl">যোগাযোগ</h1>
          <p className="lead-text mt-5 max-w-3xl">
            নোটের ভুল, নতুন বিষয়ের অনুরোধ কিংবা সাধারণ মতামত—সবকিছুতেই
            ইমেইল করুন। পাঠকের মতামতই এই প্ল্যাটফর্মকে আরও ভালো করে।
          </p>
        </div>
      </section>

      <div className="container-page py-12 md:py-16">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-16">
          <div>
            <section aria-labelledby="email-heading">
              <h2 id="email-heading" className="text-2xl font-bold sm:text-3xl">
                ইমেইলে যোগাযোগ
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-muted">
                নিচের ঠিকানায় মেইল করুন। বার্তায় অধ্যায় ও টপিকের নাম লিখলে
                দ্রুত খুঁজে দেখা সম্ভব হয়।
              </p>

              <div className="mt-6 border-2 border-ink p-5 sm:p-7">
                <p className="text-xs font-semibold text-muted">ইমেইল</p>
                <a
                  href={mailto}
                  className="mt-2 block break-all text-xl font-bold underline decoration-neutral-400 underline-offset-4 transition-colors hover:decoration-ink sm:text-2xl"
                >
                  {siteConfig.email}
                </a>

                <a href={mailto} className="btn btn-primary mt-5">
                  মেইল লিখুন
                  <IconArrowRight className="h-4 w-4" />
                </a>

                <p className="mt-4 border-t border-line pt-4 text-xs leading-6 text-muted">
                  সাধারণত ৩–৫ কার্যদিবসের মধ্যে উত্তর দেওয়ার চেষ্টা করা হয়।
                  ব্যক্তিগত তথ্য, পাসওয়ার্ড বা সংবেদনশীল কিছু মেইলে পাঠাবেন না।
                </p>
              </div>
            </section>

            <section className="mt-12" aria-labelledby="reasons-heading">
              <h2
                id="reasons-heading"
                className="text-2xl font-bold sm:text-3xl"
              >
                কী নিয়ে লিখতে পারেন
              </h2>

              <div className="mt-6 grid gap-4 sm:grid-cols-3">
                {reasons.map((reason) => (
                  <div key={reason.title} className="border border-line p-5">
                    <h3 className="text-base font-bold">{reason.title}</h3>
                    <p className="mt-2 text-sm leading-7 text-muted">
                      {reason.text}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            <section className="mt-12" aria-labelledby="contact-faq-heading">
              <h2
                id="contact-faq-heading"
                className="text-2xl font-bold sm:text-3xl"
              >
                সাধারণ প্রশ্ন
              </h2>

              <div className="mt-5 divide-y divide-line border-y border-line">
                <details className="group py-4">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-semibold">
                    PDF ডাউনলোড হচ্ছে না কেন?
                    <span
                      aria-hidden="true"
                      className="text-lg text-muted transition-transform group-open:rotate-45"
                    >
                      +
                    </span>
                  </summary>
                  <p className="mt-2 max-w-2xl text-sm leading-7 text-muted">
                    PDF তৈরি করতে কয়েক সেকেন্ড সময় লাগতে পারে। ধীর ইন্টারনেটে
                    প্রথমে ফন্ট লোড হতে দেরি হয়। ব্রাউজার আপডেট করে আবার
                    চেষ্টা করুন; সমস্যা থাকলে কোন অধ্যায়ে হচ্ছে তা জানান।
                  </p>
                </details>

                <details className="group py-4">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-semibold">
                    নোট কি পাঠ্যবইয়ের বদলে ব্যবহার করা যাবে?
                    <span
                      aria-hidden="true"
                      className="text-lg text-muted transition-transform group-open:rotate-45"
                    >
                      +
                    </span>
                  </summary>
                  <p className="mt-2 max-w-2xl text-sm leading-7 text-muted">
                    না। এগুলো সহায়ক নোট—মূল ধারণা দ্রুত বুঝতে ও পুনরালোচনার
                    জন্য। চূড়ান্ত প্রস্তুতির জন্য নির্ধারিত পাঠ্যবই ও সরকারি
                    সিলেবাস অনুসরণ করুন।
                  </p>
                </details>

                <details className="group py-4">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-semibold">
                    কীভাবে নতুন অধ্যায়ের অনুরোধ করব?
                    <span
                      aria-hidden="true"
                      className="text-lg text-muted transition-transform group-open:rotate-45"
                    >
                      +
                    </span>
                  </summary>
                  <p className="mt-2 max-w-2xl text-sm leading-7 text-muted">
                    ইমেইলের বিষয়ের লাইনে “অনুরোধ” লিখে বই, অধ্যায় ও যে অংশটি
                    দরকার তা উল্লেখ করুন। সম্ভব হলে অগ্রাধিকার তালিকায় রাখা
                    হবে।
                  </p>
                </details>
              </div>
            </section>
          </div>

          <aside className="space-y-6">
            <div className="border border-line bg-soft p-5">
              <p className="text-sm font-bold">উত্তর পাওয়ার সময়</p>
              <p className="mt-2 text-sm leading-7 text-muted">
                সোম–শুক্র, সাধারণত ৩–৫ কার্যদিবস। ছুটির দিনে উত্তর দিতে দেরি
                হতে পারে।
              </p>
            </div>

            <div className="border border-line p-5">
              <p className="text-sm font-bold">যা পাঠাবেন না</p>
              <ul className="mt-3 space-y-2 text-sm leading-7 text-muted">
                <li>পাসওয়ার্ড বা অ্যাকাউন্টের তথ্য</li>
                <li>জাতীয় পরিচয়পত্র বা ব্যক্তিগত নথি</li>
                <li>অন্যের ব্যক্তিগত তথ্য</li>
              </ul>
            </div>

            <div className="border border-line p-5">
              <p className="text-sm font-bold">গোপনীয়তা</p>
              <p className="mt-2 text-sm leading-7 text-muted">
                ইমেইল কীভাবে ব্যবহার হয়, তা জানতে গোপনীয়তা নীতি পড়ুন।
              </p>
              <Link href="/privacy" className="text-link mt-3 inline-block text-sm">
                গোপনীয়তা নীতি →
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
