const ADSENSE_ACCOUNT_ID = "f08c47fec0942fa0";

export const dynamic = "force-static";

/**
 * AdSense অনুমোদনের পর NEXT_PUBLIC_ADSENSE_CLIENT (ca-pub-…) দিলে
 * সঠিক ads.txt তৈরি হয়। কনফিগার না থাকলে একটি নির্দেশনা-মন্তব্য ফেরত যায়।
 */
export function GET() {
  const client = process.env.NEXT_PUBLIC_ADSENSE_CLIENT?.trim();
  const publisherId = client?.startsWith("ca-")
    ? client.slice(3)
    : client || "";

  const body = /^pub-\d{10,}$/.test(publisherId)
    ? `google.com, ${publisherId}, DIRECT, ${ADSENSE_ACCOUNT_ID}\n`
    : "# AdSense কনফিগার করা হয়নি। NEXT_PUBLIC_ADSENSE_CLIENT সেট করুন।\n";

  return new Response(body, {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
