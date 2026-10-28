import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

const baseProps = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

export function IconBookOpen(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...baseProps} {...props}>
      <path d="M12 6.5C10 4.9 7.7 4.2 5 4.2v14.1c2.7 0 5 .7 7 2.3 2-1.6 4.3-2.3 7-2.3V4.2c-2.7 0-5 .7-7 2.3Z" />
      <path d="M12 6.5v14.1" />
    </svg>
  );
}

export function IconDownload(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...baseProps} {...props}>
      <path d="M12 3v12" />
      <path d="m7.5 10.5 4.5 4.5 4.5-4.5" />
      <path d="M4 20h16" />
    </svg>
  );
}

export function IconMenu(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...baseProps} {...props}>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

export function IconClose(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...baseProps} {...props}>
      <path d="m6 6 12 12M18 6 6 18" />
    </svg>
  );
}

export function IconChevronDown(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...baseProps} {...props}>
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

export function IconArrowRight(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...baseProps} {...props}>
      <path d="M4 12h16" />
      <path d="m14 6 6 6-6 6" />
    </svg>
  );
}

export function IconArrowLeft(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...baseProps} {...props}>
      <path d="M20 12H4" />
      <path d="m10 6-6 6 6 6" />
    </svg>
  );
}

export function IconClock(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...baseProps} {...props}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" />
    </svg>
  );
}

export function IconLayers(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...baseProps} {...props}>
      <path d="m12 3 9 5-9 5-9-5 9-5Z" />
      <path d="m3 12 9 5 9-5" />
      <path d="m3 16 9 5 9-5" />
    </svg>
  );
}

export function IconEye(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...baseProps} {...props}>
      <path d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6Z" />
      <circle cx="12" cy="12" r="2.5" />
    </svg>
  );
}

export function IconList(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...baseProps} {...props}>
      <path d="M9 6h11M9 12h11M9 18h11" />
      <path d="M4 6h.01M4 12h.01M4 18h.01" strokeWidth="2.4" />
    </svg>
  );
}

export function IconPrint(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...baseProps} {...props}>
      <path d="M7 8V4h10v4" />
      <path d="M6 17H4V9h16v8h-2" />
      <path d="M7 14h10v6H7z" />
    </svg>
  );
}
