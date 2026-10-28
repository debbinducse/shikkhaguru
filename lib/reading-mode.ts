"use client";

import { useEffect, useState } from "react";

export const READING_MODE_KEY = "shikkhaghor-reading-mode";

export function isChapterPath(pathname: string): boolean {
  return /^\/books\/[^/]+\/[^/]+\/?$/.test(pathname);
}

export function applyReadingMode(enabled: boolean) {
  if (enabled) {
    document.documentElement.dataset.readingMode = "true";
  } else {
    delete document.documentElement.dataset.readingMode;
  }
}

export function useReadingMode() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(READING_MODE_KEY) === "true";
      setEnabled(saved && isChapterPath(window.location.pathname));
    } catch {
      setEnabled(false);
    }
  }, []);

  const toggle = () => {
    const next = !enabled;
    setEnabled(next);

    try {
      localStorage.setItem(READING_MODE_KEY, String(next));
    } catch {
      // localStorage unavailable হলে শুধু বর্তমান পেজে পরিবর্তন থাকবে।
    }

    applyReadingMode(next && isChapterPath(window.location.pathname));
  };

  return { enabled, toggle };
}
