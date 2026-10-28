"use client";

import { useEffect } from "react";

interface AdSlotProps {
  slot?: string;
  className?: string;
}

declare global {
  interface Window {
    adsbygoogle?: Array<Record<string, unknown>>;
  }
}

/**
 * AdSense অনুমোদনের পর NEXT_PUBLIC_ADSENSE_CLIENT ও স্লট আইডি দিলে
 * বিজ্ঞাপন দেখাবে। আইডি না থাকলে কোনো খালি জায়গা তৈরি হবে না।
 */
export function AdSlot({ slot, className = "" }: AdSlotProps) {
  const client = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;

  useEffect(() => {
    if (!client || !slot) return;

    try {
      window.adsbygoogle = window.adsbygoogle || [];
      window.adsbygoogle.push({});
    } catch {
      // AdSense ব্লক করা থাকলেও পেজের বাকি অংশ স্বাভাবিকভাবে চলবে।
    }
  }, [client, slot]);

  if (!client || !slot) return null;

  return (
    <aside className={`ad-slot ${className}`} aria-label="বিজ্ঞাপন">
      <p className="mb-2 text-[0.65rem] font-medium text-neutral-500">
        বিজ্ঞাপন
      </p>
      <ins
        className="adsbygoogle block"
        style={{ display: "block" }}
        data-ad-client={client}
        data-ad-slot={slot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </aside>
  );
}
