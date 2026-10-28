import Link from "next/link";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav aria-label="ব্রেডক্রাম্ব" className="mb-6">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[0.78rem] text-muted">
        <li>
          <Link href="/" className="transition-colors hover:text-ink">
            হোম
          </Link>
        </li>

        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={`${item.label}-${index}`} className="flex items-center gap-2">
              <span aria-hidden="true" className="text-neutral-400">
                /
              </span>
              {item.href && !isLast ? (
                <Link
                  href={item.href}
                  className="transition-colors hover:text-ink"
                >
                  {item.label}
                </Link>
              ) : (
                <span
                  className={isLast ? "font-medium text-ink" : undefined}
                  aria-current={isLast ? "page" : undefined}
                >
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
