"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { IconClose, IconMenu } from "@/components/ui/icons";
import { mainNav, siteConfig } from "@/lib/site";
import type { SubjectSummary } from "@/types/content";

interface SiteHeaderProps {
  subjects: SubjectSummary[];
}

export function SiteHeader({ subjects }: SiteHeaderProps) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!menuOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen]);

  const isSubjectActive = (slug: string) =>
    pathname === `/books/${slug}` || pathname.startsWith(`/books/${slug}/`);

  return (
    <header className="global-header">
      <div className="container-page">
        <div className="flex h-16 items-center justify-between gap-4 md:h-20">
          <Link
            href="/"
            className="flex min-w-0 items-center gap-3"
            aria-label={`${siteConfig.name} — হোমপেজ`}
          >
            <span className="brand-mark" aria-hidden="true">
              শ
            </span>
            <span className="min-w-0">
              <span className="block text-xl font-bold leading-tight tracking-tight">
                {siteConfig.name}
              </span>
              <span className="hidden text-[0.7rem] font-medium text-muted sm:block">
                {siteConfig.tagline}
              </span>
            </span>
          </Link>

          <nav aria-label="প্রধান নেভিগেশন" className="hidden md:block">
            <ul className="flex items-center gap-7">
              {mainNav.map((item) => {
                const isActive =
                  item.href === "/"
                    ? pathname === "/"
                    : item.href === "/books"
                      ? pathname === "/books"
                      : pathname === item.href ||
                        pathname.startsWith(`${item.href}/`);

                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={isActive ? "page" : undefined}
                      className="border-b-2 border-transparent py-2 text-sm font-medium text-muted transition-colors hover:border-ink hover:text-ink aria-[current=page]:border-ink aria-[current=page]:text-ink"
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center border border-line text-ink transition-colors hover:border-ink md:hidden"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? "মেনু বন্ধ করুন" : "মেনু খুলুন"}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? (
              <IconClose className="h-5 w-5" />
            ) : (
              <IconMenu className="h-5 w-5" />
            )}
          </button>
        </div>

        <nav aria-label="বিষয়সমূহ" className="subject-nav">
          <span className="shrink-0 text-[0.68rem] font-semibold text-neutral-500">
            বিষয়সমূহ
          </span>
          {subjects.map((subject) => (
            <Link
              key={subject.slug}
              href={`/books/${subject.slug}`}
              className="subject-nav-link"
              data-featured={subject.featured ? "true" : undefined}
              aria-current={isSubjectActive(subject.slug) ? "page" : undefined}
            >
              {subject.title}
            </Link>
          ))}
        </nav>
      </div>

      {menuOpen ? (
        <div
          id="mobile-menu"
          className="absolute inset-x-0 top-full max-h-[calc(100vh-var(--header-height))] overflow-y-auto border-b-2 border-ink bg-paper px-4 pb-8 pt-6 shadow-[0_16px_30px_rgba(0,0,0,0.08)] md:hidden"
        >
          <p className="mb-3 text-xs font-semibold text-muted">বই ও বিষয়</p>
          <ul className="grid grid-cols-2 gap-2">
            {subjects.map((subject) => (
              <li key={subject.slug}>
                <Link
                  href={`/books/${subject.slug}`}
                  className="flex items-center gap-2 border border-line px-3 py-3 text-sm font-semibold transition-colors hover:border-ink aria-[current=page]:bg-ink aria-[current=page]:text-paper"
                  aria-current={
                    isSubjectActive(subject.slug) ? "page" : undefined
                  }
                >
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center border border-current text-xs">
                    {subject.monogram}
                  </span>
                  <span className="min-w-0">
                    {subject.title}
                    {subject.featured ? (
                      <span className="mt-0.5 block text-[0.62rem] font-medium text-muted">
                        প্রধান বই
                      </span>
                    ) : null}
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          <p className="mb-3 mt-7 text-xs font-semibold text-muted">
            প্রধান পাতা
          </p>
          <ul className="divide-y divide-line border-y border-line">
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="flex items-center justify-between py-3.5 text-sm font-medium"
                >
                  {item.label}
                  <span aria-hidden="true">→</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </header>
  );
}
