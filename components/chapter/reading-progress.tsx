"use client";

import { useEffect, useState } from "react";

export function ReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      const target = document.querySelector<HTMLElement>(
        "[data-reading-content]",
      );

      if (!target) return;

      const rect = target.getBoundingClientRect();
      const total = rect.height - window.innerHeight;

      if (total <= 0) {
        setProgress(0);
        return;
      }

      const passed = Math.min(Math.max(-rect.top, 0), total);
      setProgress((passed / total) * 100);
    };

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div
      className="pointer-events-none fixed inset-x-0 top-0 z-[70] h-[3px] bg-transparent"
      aria-hidden="true"
    >
      <div
        className="h-full origin-left bg-ink transition-transform duration-75"
        style={{ transform: `scaleX(${progress / 100})` }}
      />
    </div>
  );
}
