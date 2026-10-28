"use client";

export function ExpandAllTopics() {
  const setAll = (open: boolean) => {
    document
      .querySelectorAll<HTMLDetailsElement>("details[data-topic]")
      .forEach((details) => {
        details.open = open;
      });
  };

  return (
    <div
      className="flex items-center gap-2 text-xs"
      role="group"
      aria-label="সব টপিক খোলা বা বন্ধ করা"
    >
      <button
        type="button"
        onClick={() => setAll(true)}
        className="border-b border-ink py-0.5 font-semibold text-ink hover:bg-soft"
      >
        সব খুলুন
      </button>
      <span className="text-neutral-400" aria-hidden="true">
        /
      </span>
      <button
        type="button"
        onClick={() => setAll(false)}
        className="border-b border-transparent py-0.5 font-medium text-muted hover:border-ink hover:text-ink"
      >
        সব বন্ধ করুন
      </button>
    </div>
  );
}
