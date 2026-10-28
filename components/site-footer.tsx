import Link from "next/link";

import { footerNav, siteConfig } from "@/lib/site";
import type { SubjectSummary } from "@/types/content";

interface SiteFooterProps {
  subjects: SubjectSummary[];
}

export function SiteFooter({ subjects }: SiteFooterProps) {
  return (
    <footer className="global-footer border-t-2 border-ink bg-paper">
      <div className="container-page py-12 md:py-16">
        <div className="grid gap-10 md:grid-cols-[1.25fr_1fr_1fr]">
          <div>
            <Link href="/" className="inline-flex items-center gap-3">
              <span className="brand-mark" aria-hidden="true">
                শ
              </span>
              <span>
                <span className="block text-xl font-bold leading-tight">
                  {siteConfig.name}
                </span>
                <span className="text-xs text-muted">{siteConfig.tagline}</span>
              </span>
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-7 text-muted">
              ভূগোল ও পরিবেশ বইয়ের ১৫টি অধ্যায়সহ ক্লাস ৯–১০ পাঠ্যক্রমের
              সরকারি চাকরির প্রস্তুতির জন্য বাংলায় গোছানো নোট। পড়ুন, বোঝুন
              এবং নিজের গতিতে প্রস্তুতি নিন।
            </p>
            <p className="mt-4 text-xs text-neutral-500">
              সংস্করণ: {siteConfig.edition} • সম্পূর্ণ বাংলায়
            </p>
          </div>

          <div>
            <h2 className="text-sm font-bold">বিষয়সমূহ</h2>
            <ul className="mt-4 space-y-2.5">
              {subjects.map((subject) => (
                <li key={subject.slug}>
                  <Link
                    href={`/books/${subject.slug}`}
                    className="text-sm text-muted transition-colors hover:text-ink hover:underline"
                  >
                    {subject.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-sm font-bold">প্রয়োজনীয় লিংক</h2>
            <ul className="mt-4 space-y-2.5">
              {footerNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-muted transition-colors hover:text-ink hover:underline"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-line pt-6 text-xs leading-6 text-muted sm:flex-row sm:items-start sm:justify-between">
          <p>
            © {siteConfig.edition} {siteConfig.name}। সর্বস্বত্ব সংরক্ষিত।
          </p>
          <p className="max-w-xl sm:text-right">
            এটি একটি শিক্ষামূলক সহায়ক ওয়েবসাইট। পরীক্ষার চূড়ান্ত প্রস্তুতির
            জন্য পাঠ্যবই ও সরকারি সিলেবাস অনুসরণ করুন।
          </p>
        </div>
      </div>
    </footer>
  );
}
