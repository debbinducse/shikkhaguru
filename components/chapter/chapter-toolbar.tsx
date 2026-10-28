"use client";

import { useEffect, useRef, useState } from "react";

import { ChapterToc } from "@/components/chapter/chapter-toc";
import { ExpandAllTopics } from "@/components/chapter/expand-all-topics";
import {
  IconChevronDown,
  IconDownload,
  IconEye,
  IconList,
} from "@/components/ui/icons";
import { useReadingMode } from "@/lib/reading-mode";
import type { Book, Chapter } from "@/types/content";

type PdfState = "idle" | "working" | "error";

interface ChapterToolbarProps {
  book: Book;
  chapter: Chapter;
}

export function ChapterToolbar({ book, chapter }: ChapterToolbarProps) {
  const { enabled: readingMode, toggle: toggleReadingMode } = useReadingMode();
  const [pdfState, setPdfState] = useState<PdfState>("idle");
  const [tocOpen, setTocOpen] = useState(false);
  const tocRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!tocOpen) return;

    const onPointerDown = (event: PointerEvent) => {
      if (!tocRef.current?.contains(event.target as Node)) {
        setTocOpen(false);
      }
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setTocOpen(false);
    };

    const onPanelClick = (event: MouseEvent) => {
      if ((event.target as HTMLElement | null)?.closest("a")) {
        setTocOpen(false);
      }
    };

    const panel = tocRef.current;
    panel?.addEventListener("click", onPanelClick);
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);

    return () => {
      panel?.removeEventListener("click", onPanelClick);
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [tocOpen]);

  const downloadPdf = async () => {
    if (pdfState === "working") return;

    setPdfState("working");

    try {
      const { generateChapterPdf } = await import(
        "@/lib/pdf/generate-chapter-pdf"
      );

      await generateChapterPdf({
        book,
        chapter,
        chapterNumber: book.chapters.findIndex(
          (item) => item.slug === chapter.slug,
        ) + 1,
      });

      setPdfState("idle");
    } catch (error) {
      console.error(error);
      setPdfState("error");
    }
  };

  return (
    <div className="chapter-toolbar">
      <div className="chapter-shell">
        <div className="flex min-h-[3.75rem] flex-wrap items-center gap-x-4 gap-y-2 py-2">
          <div className="relative" ref={tocRef}>
            <button
              type="button"
              onClick={() => setTocOpen((open) => !open)}
              className="inline-flex min-h-9 items-center gap-2 border border-line px-3 text-[0.8rem] font-semibold text-ink transition-colors hover:border-ink"
              aria-expanded={tocOpen}
              aria-controls="toolbar-toc"
            >
              <IconList className="h-4 w-4" />
              সূচিপত্র
              <IconChevronDown
                className={`h-3.5 w-3.5 transition-transform ${
                  tocOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {tocOpen ? (
              <div
                id="toolbar-toc"
                className="absolute left-0 top-[calc(100%+0.6rem)] z-50 max-h-[70vh] w-[min(22rem,calc(100vw-2rem))] overflow-y-auto border border-ink bg-paper p-5 shadow-[0_18px_40px_rgba(0,0,0,0.14)]"
              >
                <ChapterToc book={book} chapter={chapter} />

                <div className="mt-5 border-t border-line pt-4 sm:hidden">
                  <ExpandAllTopics />
                </div>
              </div>
            ) : null}
          </div>

          <div className="hidden sm:block">
            <ExpandAllTopics />
          </div>

          <div className="ml-auto flex items-center gap-2">
            <button
              type="button"
              onClick={toggleReadingMode}
              aria-pressed={readingMode}
              className={`inline-flex min-h-9 items-center gap-2 border px-3 text-[0.8rem] font-semibold transition-colors ${
                readingMode
                  ? "border-ink bg-ink text-paper"
                  : "border-line text-ink hover:border-ink"
              }`}
              title="বিজ্ঞাপন ও অতিরিক্ত অংশ লুকিয়ে পড়ায় মনোযোগ দিন"
            >
              <IconEye className="h-4 w-4" />
              রিডিং মোড
            </button>

            <button
              type="button"
              onClick={downloadPdf}
              disabled={pdfState === "working"}
              className="btn btn-primary min-h-9 px-3 text-[0.8rem] sm:px-4"
              aria-describedby="pdf-status"
            >
              <IconDownload className="h-4 w-4" />
              {pdfState === "working" ? "PDF তৈরি হচ্ছে…" : "PDF ডাউনলোড"}
            </button>
          </div>
        </div>

        <div
          id="pdf-status"
          role="status"
          aria-live="polite"
          className={
            pdfState === "error"
              ? "border-t border-line py-2 text-xs font-medium text-ink"
              : "sr-only"
          }
        >
          {pdfState === "error"
            ? "PDF তৈরি করা যায়নি। ইন্টারনেট সংযোগ ঠিক আছে কিনা দেখে আবার চেষ্টা করুন।"
            : pdfState === "working"
              ? "PDF তৈরি হচ্ছে, অনুগ্রহ করে অপেক্ষা করুন।"
              : ""}
        </div>
      </div>
    </div>
  );
}
