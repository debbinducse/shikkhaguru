export type Importance = "veryImportant" | "important" | "lessImportant";

export type CalloutTone = "note" | "tip" | "warning" | "exam";

export type ContentBlock =
  | {
      type: "paragraph";
      text: string;
    }
  | {
      type: "list";
      items: string[];
      ordered?: boolean;
    }
  | {
      type: "definition";
      term: string;
      text: string;
    }
  | {
      type: "callout";
      tone: CalloutTone;
      title?: string;
      text: string;
    }
  | {
      type: "formula";
      expression: string;
      explanation?: string;
    }
  | {
      type: "table";
      caption?: string;
      headers: string[];
      rows: string[][];
      /** দুই কলামের সংক্ষিপ্ত টেবিল—মোবাইলে অনুভূমিক স্ক্রল ছাড়াই মিলবে। */
      compact?: boolean;
    };

export interface Topic {
  title: string;
  summary?: string;
  blocks: ContentBlock[];
}

export interface Chapter {
  title: string;
  slug: string;
  description: string;
  readingTime: number;
  updatedAt: string;
  veryImportant: Topic[];
  important: Topic[];
  lessImportant: Topic[];
}

export interface Book {
  title: string;
  slug: string;
  subtitle: string;
  monogram: string;
  description: string;
  classLevel: string;
  /** প্রধান বই হিসেবে হাইলাইট ও নেভিগেশনে আগে দেখানো হয়। */
  featured?: boolean;
  chapters: Chapter[];
}

export interface SubjectSummary {
  title: string;
  slug: string;
  monogram: string;
  description: string;
  featured: boolean;
}

export interface ChapterCategory {
  id: Importance;
  label: string;
  shortLabel: string;
  description: string;
}
