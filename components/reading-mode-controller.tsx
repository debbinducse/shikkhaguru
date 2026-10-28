"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

import {
  READING_MODE_KEY,
  applyReadingMode,
  isChapterPath,
} from "@/lib/reading-mode";

/** রিডিং মোড কেবল অধ্যায় পেজে সক্রিয় থাকে, অন্য পেজে স্বাভাবিক নেভিগেশন ফিরে আসে। */
export function ReadingModeController() {
  const pathname = usePathname();

  useEffect(() => {
    if (!isChapterPath(pathname)) {
      applyReadingMode(false);
      return;
    }

    try {
      const saved = localStorage.getItem(READING_MODE_KEY) === "true";
      applyReadingMode(saved);
    } catch {
      applyReadingMode(false);
    }
  }, [pathname]);

  return null;
}
