const BENGALI_DIGITS = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];

/** ইংরেজি সংখ্যাকে বাংলা সংখ্যায় রূপান্তর করে। */
export function toBengaliNumber(value: number | string): string {
  return String(value).replace(/\d/g, (digit) => BENGALI_DIGITS[Number(digit)]);
}

/** বাংলা সংখ্যাকে ইংরেজি সংখ্যায় রূপান্তর করে (প্রয়োজনে)। */
export function toEnglishNumber(value: string): string {
  return value.replace(/[০-৯]/g, (digit) =>
    String(BENGALI_DIGITS.indexOf(digit)),
  );
}

export function padBengali(value: number, length = 2): string {
  return toBengaliNumber(String(value).padStart(length, "0"));
}

const bnDateFormatter = new Intl.DateTimeFormat("bn-BD", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

export function formatBengaliDate(value: string | Date): string {
  return bnDateFormatter.format(new Date(value));
}
