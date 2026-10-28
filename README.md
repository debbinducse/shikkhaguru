# শিক্ষাগুরু — ভূগোল ও পরিবেশ

NCTB-র **“ভূগোল ও পরিবেশ” (নবম–দশম শ্রেণি, ২০২৬)** বইয়ের ১৫টি অধ্যায়ের বাংলা নোট, গুরুত্ব অনুযায়ী সাজানো টপিক, রিডিং মোড ও অফলাইন PDF ডাউনলোডসহ একটি স্ট্যাটিক শিক্ষা সাইট।

## প্রযুক্তি

- Next.js 14 (App Router) + TypeScript
- Tailwind CSS
- jsPDF + Canvas (বাংলা যুক্তাক্ষর ঠিক রাখতে পৃষ্ঠা ক্যানভাসে এঁকে PDF-এ বসানো হয়)
- Noto Sans Bengali (লোকাল ফন্ট)

## চালু করা

```bash
npm install
npm run dev
```

উৎপাদনের জন্য:

```bash
npm run build
npm start
```

## পরিবেশ ভেরিয়েবল

`.env.example` দেখুন। প্রধানগুলো:

| ভেরিয়েবল | কাজ |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | ক্যানোনিকাল, sitemap ও OG URL-এর বেস (শেষে slash ছাড়া) |
| `NEXT_PUBLIC_CONTACT_EMAIL` | যোগাযোগের ইমেইল |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | Search Console যাচাই (ঐচ্ছিক) |
| `NEXT_PUBLIC_ADSENSE_CLIENT` | AdSense পাবলিশার আইডি (ঐচ্ছিক) |
| `NEXT_PUBLIC_ADSENSE_CHAPTER_SLOT` | অধ্যায় পেজের বিজ্ঞাপন স্লট (ঐচ্ছিক) |

> `NEXT_PUBLIC_SITE_URL` সেট না করলে বিল্ডে `http://localhost:3000` ব্যবহার হয়—উৎপাদনে অবশ্যই সেট করুন এবং আবার বিল্ড করুন।

## কনটেন্ট যোগ করা

- প্রতিটি বই: `data/books/<book>.ts` → `Book` টাইপ (`types/content.ts`)।
- বইয়ের তালিকা ও ক্রম: `data/books/index.ts`। প্রথম বইটি নেভিগেশনে প্রধান হিসেবে দেখানো হয়; `featured: true` দিলে “প্রধান বই” ব্যাজ ও হাইলাইট যোগ হয়।
- অধ্যায়ের টপিক তিন ভাগে: `veryImportant`, `important`, `lessImportant`।
- ব্লক টাইপ: `paragraph`, `list`, `definition`, `callout`, `formula`, `table`। `**লেখা**` দিলে হাইলাইট হয়।

ভূগোল বইয়ের ফাইল: `data/books/geography.ts` (১৫ অধ্যায়, ১০৫ টপিক)। প্রতিটি অধ্যায়ে আলাদা চাকরির-নোট ফ্যাক্ট টেবিল ও প্রশ্নোত্তর রয়েছে—`data/books/geography-job-notes.ts`।

## রুট

| রুট | বিবরণ |
|---|---|
| `/` | হোম, ভূগোল স্পটলাইট |
| `/books` | সব বই |
| `/books/bhugol` | ভূগোল বই ও ১৫ অধ্যায়ের তালিকা |
| `/books/bhugol/[chapter]` | অধ্যায়ের নোট, সূচিপত্র, PDF |
| `/about`, `/contact`, `/privacy`, `/terms` | তথ্য পাতা |
| `/sitemap.xml`, `/robots.txt`, `/ads.txt` | SEO/AdSense |

## যাচাই

```bash
npm run typecheck
npm run lint
npm run build
```

শেষ বিল্ডে ৪৮টি স্ট্যাটিক পেজ তৈরি হয়: ৭টি বই, ২৭টি অধ্যায় ও তথ্য পাতা।
