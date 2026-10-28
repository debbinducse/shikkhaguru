import type { Metadata } from "next";
import Link from "next/link";

import { IconArrowRight } from "@/components/ui/icons";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "পাতা পাওয়া যায়নি",
  description:
    "আপনি যে صفحাটি খুঁজছেন সেটি পাওয়া যায়নি। শিক্ষাগুরুর বই ও অধ্যায় থেকে নতুন করে শুরু করুন।",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section className="container-page flex min-h-[62vh] items-center py-16 md:py-24">
      <div className="mx-auto w-full max-w-2xl text-center">
        <p
          className="text-[5.5rem] font-bold leading-none tracking-tight text-ink sm:text-[7rem]"
          aria-hidden="true"
        >
          ৪০৪
        </p>

        <h1 className="mt-4 text-3xl font-bold sm:text-4xl">
          পাতাটি খুঁজে পাওয়া যায়নি
        </h1>

        <p className="mx-auto mt-4 max-w-lg text-base leading-8 text-muted">
          লিংকটি ভুল হতে পারে, অথবা পাতাটি সরানো হয়েছে। বইয়ের তালিকা থেকে
          নতুন করে শুরু করুন—সব অধ্যায় সেখানেই আছে।
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/books" className="btn btn-primary">
            বই দেখুন
            <IconArrowRight className="h-4 w-4" />
          </Link>
          <Link href="/" className="btn btn-outline">
            হোমপেজে যান
          </Link>
        </div>

        <p className="mt-10 text-xs text-neutral-500">
          সহায়তা দরকার?{" "}
          <Link href="/contact" className="text-link">
            যোগাযোগ করুন
          </Link>
          ।
        </p>

        <p className="mt-2 text-[0.68rem] text-neutral-400">
          {siteConfig.name} • {siteConfig.tagline}
        </p>
      </div>
    </section>
  );
}
