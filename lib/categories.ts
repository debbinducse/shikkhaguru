import type {
  ChapterCategory,
  Chapter,
  Importance,
  Topic,
} from "@/types/content";

export const categoryOrder: Importance[] = [
  "veryImportant",
  "important",
  "lessImportant",
];

export const chapterCategories: Record<Importance, ChapterCategory> = {
  veryImportant: {
    id: "veryImportant",
    label: "অতি গুরুত্বপূর্ণ",
    shortLabel: "অতি গুরুত্বপূর্ণ",
    description:
      "পরীক্ষায় সবচেয়ে বেশি আসে এবং প্রথমে পড়ে নেওয়া উচিত—এই অংশগুলো।",
  },
  important: {
    id: "important",
    label: "গুরুত্বপূর্ণ",
    shortLabel: "গুরুত্বপূর্ণ",
    description:
      "ভালো নম্বরের জন্য প্রয়োজনীয় ধারণা, উদাহরণ ও প্রয়োগ।",
  },
  lessImportant: {
    id: "lessImportant",
    label: "কম গুরুত্বপূর্ণ",
    shortLabel: "কম গুরুত্বপূর্ণ",
    description:
      "মূল ধারণা আয়ত্তের পর সময় থাকলে পড়ার জন্য সহায়ক অংশ।",
  },
};

export function getTopics(chapter: Chapter, importance: Importance): Topic[] {
  return chapter[importance];
}

export function countTopics(chapter: Chapter): number {
  return categoryOrder.reduce(
    (total, category) => total + chapter[category].length,
    0,
  );
}

export function getCategoryHref(
  chapterSlug: string,
  category: Importance,
): string {
  return `#${chapterSlug}-${category}`;
}

export function getTopicHref(
  chapterSlug: string,
  category: Importance,
  topicIndex: number,
): string {
  return `#${chapterSlug}-${category}-${topicIndex + 1}`;
}
