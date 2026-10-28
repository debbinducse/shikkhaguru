import { banglaBook } from "./bangla";
import { englishBook } from "./english";
import { geographyBook } from "./geography";
import { generalKnowledgeBook } from "./general-knowledge";
import { mathBook } from "./math";
import { scienceBook } from "./science";
import { socialScienceBook } from "./social-science";

/** প্রধান বই সবার আগে, যাতে নেভিগেশন ও হোমপেজে ভূগোল অগ্রাধিকার পায়। */
export const books = [
  geographyBook,
  banglaBook,
  englishBook,
  mathBook,
  scienceBook,
  socialScienceBook,
  generalKnowledgeBook,
];
