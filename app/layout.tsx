import type { Metadata, Viewport } from "next";
import Script from "next/script";

import { ReadingModeController } from "@/components/reading-mode-controller";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getSubjectSummaries } from "@/lib/content";
import { JsonLd, absoluteUrl } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

import "./globals.css";

const adsenseClient = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;
const googleVerification = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION;

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — ভূগোল ও পরিবেশ নোট`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  category: "education",
  keywords: [
    "ভূগোল ও পরিবেশ",
    "ভূগোল নোট",
    "ক্লাস ৯-১০ ভূগোল",
    "সরকারি চাকরি প্রস্তুতি",
    "ক্লাস ৯-১০ নোট",
    "বাংলা শিক্ষা",
    "বাংলাদেশ সরকারি চাকরি",
    "অধ্যায়ভিত্তিক নোট",
    "SSC প্রস্তুতি",
    "job preparation Bangladesh",
  ],
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: `${siteConfig.name} — ভূগোল ও পরিবেশ নোট`,
    description: siteConfig.description,
  },
  twitter: {
    card: "summary",
    title: `${siteConfig.name} — ভূগোল ও পরিবেশ নোট`,
    description: siteConfig.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  ...(googleVerification
    ? { verification: { google: googleVerification } }
    : {}),
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#ffffff",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const subjects = getSubjectSummaries();

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    alternateName: siteConfig.englishName,
    url: siteConfig.url,
    description: siteConfig.description,
    inLanguage: "bn-BD",
    publisher: {
      "@type": "EducationalOrganization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
  };

  return (
    <html lang="bn" suppressHydrationWarning>
      <body>
        <script
          dangerouslySetInnerHTML={{
            __html:
              "(function(){try{var p=location.pathname;if(/^\\/books\\/[^/]+\\/[^/]+\\/?$/.test(p)&&localStorage.getItem('shikkhaghor-reading-mode')==='true'){document.documentElement.dataset.readingMode='true';}}catch(e){}})();",
          }}
        />
        <a
          href="#main-content"
          className="fixed left-4 top-4 z-[100] -translate-y-24 bg-ink px-4 py-2 text-sm font-semibold text-paper transition-transform focus:translate-y-0"
        >
          মূল বিষয়বস্তুতে যান
        </a>

        <SiteHeader subjects={subjects} />

        <main id="main-content" className="global-main">
          {children}
        </main>

        <SiteFooter subjects={subjects} />

        <ReadingModeController />
        <JsonLd data={websiteSchema} />

        {adsenseClient ? (
          <Script
            id="adsense-script"
            async
            strategy="afterInteractive"
            crossOrigin="anonymous"
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseClient}`}
          />
        ) : null}
      </body>
    </html>
  );
}
