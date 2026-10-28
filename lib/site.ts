export const siteConfig = {
  name: "শিক্ষাগুরু",
  englishName: "Shikkhaguru",
  tagline: "ভূগোল ও পরিবেশ, বাংলায়",
  description:
    "ভূগোল ও পরিবেশ (নবম–দশম শ্রেণি) বইয়ের ১৫টি অধ্যায়ের গোছানো বাংলা নোট—সরকারি চাকরির প্রস্তুতির জন্য। সাথে বাংলা, ইংরেজি, গণিত, বিজ্ঞান, সামাজিক বিজ্ঞান ও সাধারণ জ্ঞানের অধ্যায়ভিত্তিক নোট, গুরুত্ব বিভাজন ও PDF ডাউনলোড সুবিধা।",
  url: (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(
    /\/$/,
    "",
  ),
  locale: "bn_BD",
  email:
    process.env.NEXT_PUBLIC_CONTACT_EMAIL || "hello@shikkhaghor.example",
  edition: "২০২৬",
} as const;

export const mainNav = [
  { href: "/", label: "হোম" },
  { href: "/books/bhugol", label: "ভূগোল" },
  { href: "/books", label: "বইসমূহ" },
  { href: "/about", label: "আমাদের সম্পর্কে" },
  { href: "/contact", label: "যোগাযোগ" },
] as const;

export const footerNav = [
  { href: "/books/bhugol", label: "ভূগোল ও পরিবেশ" },
  { href: "/books", label: "সব বই" },
  { href: "/about", label: "আমাদের সম্পর্কে" },
  { href: "/contact", label: "যোগাযোগ" },
  { href: "/privacy", label: "গোপনীয়তা নীতি" },
  { href: "/terms", label: "শর্তাবলি" },
] as const;
