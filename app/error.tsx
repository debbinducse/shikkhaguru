"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="container-page flex min-h-[62vh] items-center py-16 md:py-24">
      <div className="mx-auto w-full max-w-2xl text-center">
        <p className="eyebrow justify-center">সমস্যা হয়েছে</p>

        <h1 className="mt-4 text-3xl font-bold sm:text-4xl">
          কিছু একটা ভুল হয়েছে
        </h1>

        <p className="mx-auto mt-4 max-w-lg text-base leading-8 text-muted">
          পাতাটি লোড করার সময় অপ্রত্যাশিত সমস্যা হয়েছে। আবার চেষ্টা করুন;
          সমস্যা থাকলে হোমপেজ থেকে নতুন করে শুরু করতে পারেন।
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <button type="button" onClick={reset} className="btn btn-primary">
            আবার চেষ্টা করুন
          </button>
          <Link href="/" className="btn btn-outline">
            হোমপেজে যান
          </Link>
        </div>

        {error.digest ? (
          <p className="mt-8 text-[0.68rem] text-neutral-400">
            ত্রুটি কোড: {error.digest}
          </p>
        ) : null}
      </div>
    </section>
  );
}
