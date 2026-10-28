"use client";

import { formatBengaliDate, padBengali, toBengaliNumber } from "@/lib/bengali";
import {
  categoryOrder,
  chapterCategories,
  countTopics,
} from "@/lib/categories";
import { siteConfig } from "@/lib/site";
import type {
  Book,
  CalloutTone,
  Chapter,
  ContentBlock,
  Importance,
  Topic,
} from "@/types/content";

/* -------------------------------------------------------------------------- */
/*  পৃষ্ঠা ও টাইপোগ্রাফির মাপ                                                  */
/* -------------------------------------------------------------------------- */

const PAGE_WIDTH = 595.28;
const PAGE_HEIGHT = 841.89;
const MARGIN_X = 50;
const CONTENT_WIDTH = PAGE_WIDTH - MARGIN_X * 2;
const MARGIN_TOP = 64;
const MARGIN_BOTTOM = 68;
const CONTENT_BOTTOM = PAGE_HEIGHT - MARGIN_BOTTOM;
const SCALE = 2;
const FONT_STACK = '"Noto Sans Bengali", "Hind Siliguri", sans-serif';

const COLORS = {
  ink: "#0a0a0a",
  paper: "#ffffff",
  muted: "#525252",
  line: "#d4d4d4",
  soft: "#f5f5f5",
  mid: "#e7e7e7",
} as const;

const BODY_SIZE = 11.4;
const BODY_LINE = 20;
const SMALL_SIZE = 10.4;
const SMALL_LINE = 18;

const calloutLabels: Record<CalloutTone, string> = {
  note: "মনে রাখুন",
  tip: "পড়ার টিপস",
  warning: "সতর্ক থাকুন",
  exam: "পরীক্ষা-টিপ",
};

/* -------------------------------------------------------------------------- */
/*  সমৃদ্ধ লেখা (bold) ভেঙে সাজানো                                             */
/* -------------------------------------------------------------------------- */

interface RichToken {
  text: string;
  bold: boolean;
  space: boolean;
}

type RichLine = RichToken[];

interface SegmenterLike {
  segment(input: string): Iterable<{ segment: string }>;
}

function getGraphemeSegmenter(): SegmenterLike | null {
  const intl = Intl as unknown as {
    Segmenter?: new (
      locale?: string,
      options?: { granularity: "grapheme" },
    ) => SegmenterLike;
  };

  if (!intl.Segmenter) return null;

  try {
    return new intl.Segmenter("bn", { granularity: "grapheme" });
  } catch {
    return null;
  }
}

const graphemeSegmenter = getGraphemeSegmenter();

function splitGraphemes(text: string): string[] {
  if (graphemeSegmenter) {
    return Array.from(
      graphemeSegmenter.segment(text),
      (part) => part.segment,
    );
  }

  return Array.from(text);
}

function parseBoldRuns(text: string): Array<{ text: string; bold: boolean }> {
  return text
    .split(/(\*\*[^*]+\*\*)/g)
    .filter(Boolean)
    .map((part) =>
      part.startsWith("**") && part.endsWith("**")
        ? { text: part.slice(2, -2), bold: true }
        : { text: part, bold: false },
    );
}

function tokenize(text: string): RichToken[] {
  const tokens: RichToken[] = [];

  for (const run of parseBoldRuns(text)) {
    for (const chunk of run.text.split(/(\s+)/)) {
      if (!chunk) continue;

      const isSpace = /^\s+$/.test(chunk);
      tokens.push({
        text: isSpace ? " " : chunk,
        bold: run.bold,
        space: isSpace,
      });
    }
  }

  return tokens;
}

function setFont(
  ctx: CanvasRenderingContext2D,
  weight: 400 | 600 | 700,
  size: number,
) {
  ctx.font = `${weight} ${size}px ${FONT_STACK}`;
}

function tokenWidth(
  ctx: CanvasRenderingContext2D,
  token: RichToken,
  size: number,
  baseWeight: 400 | 600 | 700 = 400,
): number {
  setFont(ctx, token.bold ? 700 : baseWeight, size);
  return ctx.measureText(token.space ? " " : token.text).width;
}

function textWidth(
  ctx: CanvasRenderingContext2D,
  text: string,
  size: number,
  weight: 400 | 600 | 700 = 400,
): number {
  setFont(ctx, weight, size);
  return ctx.measureText(text).width;
}

/** একটি অনুচ্ছেদকে নির্দিষ্ট প্রস্থে ভেঙে লাইনে সাজায়। */
function wrapText(
  ctx: CanvasRenderingContext2D,
  text: string,
  maxWidth: number,
  size: number,
  baseWeight: 400 | 600 | 700 = 400,
): RichLine[] {
  const lines: RichLine[] = [];
  let current: RichToken[] = [];
  let currentWidth = 0;

  const flush = () => {
    while (current.length > 0 && current[current.length - 1].space) {
      current.pop();
    }

    if (current.length > 0) lines.push(current);

    current = [];
    currentWidth = 0;
  };

  for (const token of tokenize(text)) {
    if (token.space && current.length === 0) continue;

    let pieces: RichToken[] = [token];

    if (!token.space && tokenWidth(ctx, token, size, baseWeight) > maxWidth) {
      pieces = splitGraphemes(token.text).map((piece) => ({
        text: piece,
        bold: token.bold,
        space: false,
      }));
    }

    for (const piece of pieces) {
      const width = tokenWidth(ctx, piece, size, baseWeight);

      if (current.length > 0 && currentWidth + width > maxWidth) {
        flush();
      }

      if (piece.space && current.length === 0) continue;

      current.push(piece);
      currentWidth += width;
    }
  }

  flush();

  return lines.length > 0 ? lines : [[{ text: "", bold: false, space: false }]];
}

function lineWidth(
  ctx: CanvasRenderingContext2D,
  line: RichLine,
  size: number,
  baseWeight: 400 | 600 | 700 = 400,
): number {
  return line.reduce(
    (total, token) => total + tokenWidth(ctx, token, size, baseWeight),
    0,
  );
}

function drawRichLine(
  ctx: CanvasRenderingContext2D,
  line: RichLine,
  x: number,
  top: number,
  size: number,
  color: string,
  baseWeight: 400 | 600 | 700 = 400,
) {
  ctx.fillStyle = color;
  ctx.textBaseline = "top";

  let cursor = x;

  for (const token of line) {
    if (!token.space) {
      setFont(ctx, token.bold ? 700 : baseWeight, size);
      ctx.fillText(token.text, cursor, top);
    }

    cursor += tokenWidth(ctx, token, size, baseWeight);
  }
}

function fitLine(
  ctx: CanvasRenderingContext2D,
  text: string,
  maxWidth: number,
  size: number,
  weight: 400 | 600 | 700 = 400,
): string {
  if (textWidth(ctx, text, size, weight) <= maxWidth) return text;

  const characters = splitGraphemes(text);
  let result = "";

  for (const character of characters) {
    const next = result + character;
    if (textWidth(ctx, `${next}…`, size, weight) > maxWidth) break;
    result = next;
  }

  return `${result.trimEnd()}…`;
}

/* -------------------------------------------------------------------------- */
/*  PDF রেন্ডারার                                                              */
/* -------------------------------------------------------------------------- */

class ChapterPdfRenderer {
  private readonly book: Book;
  private readonly chapter: Chapter;
  private readonly chapterNumber: number;
  private readonly chapterTotal: number;

  private pageImages: string[] = [];
  private canvas!: HTMLCanvasElement;
  private ctx!: CanvasRenderingContext2D;
  private y = MARGIN_TOP;
  private pageNumber = 1;
  private cover = false;

  constructor(book: Book, chapter: Chapter, chapterNumber: number) {
    this.book = book;
    this.chapter = chapter;
    this.chapterNumber = chapterNumber;
    this.chapterTotal = book.chapters.length;
  }

  render(): string[] {
    this.addPage({ cover: true });
    this.renderCover();

    this.addPage();
    this.renderToc();

    this.addPage();
    for (const importance of categoryOrder) {
      this.renderCategory(importance);
    }

    this.renderClosingNote();
    this.finishPage();

    return this.pageImages;
  }

  /* ---------------------------- পৃষ্ঠা ব্যবস্থাপনা --------------------------- */

  private addPage(options: { cover?: boolean } = {}) {
    if (this.canvas) this.finishPage();

    const canvas = document.createElement("canvas");
    canvas.width = Math.round(PAGE_WIDTH * SCALE);
    canvas.height = Math.round(PAGE_HEIGHT * SCALE);

    const ctx = canvas.getContext("2d");
    if (!ctx) {
      throw new Error("PDF তৈরি করা যাচ্ছে না—ব্রাউজার ক্যানভাস সমর্থন করছে না।");
    }

    ctx.scale(SCALE, SCALE);
    ctx.fillStyle = COLORS.paper;
    ctx.fillRect(0, 0, PAGE_WIDTH, PAGE_HEIGHT);
    ctx.textBaseline = "top";
    ctx.direction = "ltr";

    this.canvas = canvas;
    this.ctx = ctx;
    this.y = MARGIN_TOP;
    this.pageNumber = this.pageImages.length + 1;
    this.cover = Boolean(options.cover);
  }

  private finishPage() {
    if (!this.cover) this.drawRunningHeaderAndFooter();

    this.pageImages.push(this.canvas.toDataURL("image/png"));

    // মেমোরি ছাড়ার জন্য ক্যানভাস খালি করা হয়।
    this.canvas.width = 0;
    this.canvas.height = 0;
  }

  private ensureSpace(height: number): boolean {
    if (this.y + height <= CONTENT_BOTTOM) return false;
    this.addPage();
    return true;
  }

  /* ------------------------------- প্রাথমিক লেখা ----------------------------- */

  private text(
    text: string,
    x: number,
    y: number,
    size: number,
    weight: 400 | 600 | 700 = 400,
    color: string = COLORS.ink,
  ) {
    setFont(this.ctx, weight, size);
    this.ctx.fillStyle = color;
    this.ctx.textBaseline = "top";
    this.ctx.fillText(text, x, y);
  }

  private centeredText(
    text: string,
    centerX: number,
    y: number,
    size: number,
    weight: 400 | 600 | 700 = 400,
    color: string = COLORS.ink,
  ) {
    const width = textWidth(this.ctx, text, size, weight);
    this.text(text, centerX - width / 2, y, size, weight, color);
  }

  private rule(y: number, color: string = COLORS.line, width = 0.75) {
    this.ctx.strokeStyle = color;
    this.ctx.lineWidth = width;
    this.ctx.beginPath();
    this.ctx.moveTo(MARGIN_X, y);
    this.ctx.lineTo(PAGE_WIDTH - MARGIN_X, y);
    this.ctx.stroke();
  }

  /* --------------------------------- প্রচ্ছদ --------------------------------- */

  private renderCover() {
    const ctx = this.ctx;

    ctx.fillStyle = COLORS.ink;
    ctx.fillRect(0, 0, PAGE_WIDTH, 10);

    // লোগো
    ctx.fillRect(MARGIN_X, 54, 34, 34);
    this.centeredText("শ", MARGIN_X + 17, 60, 20, 700, COLORS.paper);

    this.text(siteConfig.name, MARGIN_X + 46, 58, 19, 700);
    this.text(
      siteConfig.tagline,
      MARGIN_X + 46,
      83,
      9.5,
      400,
      COLORS.muted,
    );

    // অধ্যায় নম্বর
    const badge = `অধ্যায় ${padBengali(this.chapterNumber)}`;
    const badgeWidth = textWidth(ctx, badge, 9.5, 600) + 22;
    ctx.strokeStyle = COLORS.ink;
    ctx.lineWidth = 1;
    ctx.strokeRect(PAGE_WIDTH - MARGIN_X - badgeWidth, 56, badgeWidth, 26);
    this.centeredText(
      badge,
      PAGE_WIDTH - MARGIN_X - badgeWidth / 2,
      63,
      9.5,
      600,
    );

    // উপশিরোনাম
    let y = 150;
    ctx.fillStyle = COLORS.ink;
    ctx.fillRect(MARGIN_X, y + 4, 5, 5);
    this.text("PDF নোট • ক্লাস ৯–১০", MARGIN_X + 13, y, 9.5, 600, COLORS.muted);

    y = 182;
    this.text(this.book.title, MARGIN_X, y, 14, 600, COLORS.muted);

    y += 30;
    const titleLines = wrapText(
      ctx,
      this.chapter.title,
      CONTENT_WIDTH,
      36,
      700,
    );

    for (const line of titleLines) {
      drawRichLine(ctx, line, MARGIN_X, y, 36, COLORS.ink, 700);
      y += 48;
    }

    y += 12;
    this.rule(y, COLORS.ink, 1.25);
    y += 22;

    const descriptionLines = wrapText(
      ctx,
      this.chapter.description,
      CONTENT_WIDTH - 10,
      12.5,
    );

    for (const line of descriptionLines) {
      drawRichLine(ctx, line, MARGIN_X, y, 12.5, COLORS.muted);
      y += 23;
    }

    // তথ্যচিত্র
    const metaTop = PAGE_HEIGHT - 242;
    this.rule(metaTop, COLORS.line);

    const meta = [
      {
        label: "পড়ার সময়",
        value: `${toBengaliNumber(this.chapter.readingTime)} মিনিট`,
      },
      {
        label: "মোট টপিক",
        value: `${toBengaliNumber(countTopics(this.chapter))}টি`,
      },
      {
        label: "হালনাগাদ",
        value: formatBengaliDate(this.chapter.updatedAt),
      },
    ];

    const columnWidth = CONTENT_WIDTH / meta.length;

    meta.forEach((item, index) => {
      const x = MARGIN_X + columnWidth * index;
      this.text(item.label, x, metaTop + 18, 9, 400, COLORS.muted);
      this.text(item.value, x, metaTop + 38, 12, 600, COLORS.ink);
    });

    // নিচের কালো অংশ
    ctx.fillStyle = COLORS.ink;
    ctx.fillRect(0, PAGE_HEIGHT - 122, PAGE_WIDTH, 122);

    this.text(
      "সরকারি চাকরির প্রস্তুতি, বাংলায়",
      MARGIN_X,
      PAGE_HEIGHT - 84,
      17,
      700,
      COLORS.paper,
    );
    this.text(
      `${siteConfig.name} • অধ্যায়ভিত্তিক নোট • ${siteConfig.edition}`,
      MARGIN_X,
      PAGE_HEIGHT - 54,
      9.5,
      400,
      "#d4d4d4",
    );
  }

  /* --------------------------------- সূচিপত্র -------------------------------- */

  private renderToc() {
    let ctx = this.ctx;

    this.text("এই অধ্যায়ে যা থাকছে", MARGIN_X, MARGIN_TOP, 23, 700);
    this.text(
      `${this.book.title} • ${this.chapter.title}`,
      MARGIN_X,
      MARGIN_TOP + 36,
      10.5,
      400,
      COLORS.muted,
    );
    this.rule(MARGIN_TOP + 60, COLORS.ink, 1.5);

    this.y = MARGIN_TOP + 84;

    categoryOrder.forEach((importance, categoryIndex) => {
      const topics = this.chapter[importance];
      if (topics.length === 0) return;

      const category = chapterCategories[importance];
      if (this.ensureSpace(62)) ctx = this.ctx;

      ctx.fillStyle = COLORS.ink;
      ctx.fillRect(MARGIN_X, this.y + 4, 4, 4);
      this.text(
        padBengali(categoryIndex + 1),
        MARGIN_X + 12,
        this.y,
        9,
        600,
        COLORS.muted,
      );
      this.text(category.label, MARGIN_X + 34, this.y - 3, 14, 700);

      const countLabel = `${toBengaliNumber(topics.length)}টি টপিক`;
      const countWidth = textWidth(this.ctx, countLabel, 9, 400);
      this.text(
        countLabel,
        PAGE_WIDTH - MARGIN_X - countWidth,
        this.y + 1,
        9,
        400,
        COLORS.muted,
      );

      this.y += 26;

      const descriptionLines = wrapText(
        ctx,
        category.description,
        CONTENT_WIDTH - 34,
        10,
      );

      for (const line of descriptionLines) {
        drawRichLine(ctx, line, MARGIN_X + 34, this.y, 10, COLORS.muted);
        this.y += 16;
      }

      this.y += 8;

      topics.forEach((topic, topicIndex) => {
        const indent = MARGIN_X + 34;
        const titleLines = wrapText(
          ctx,
          topic.title,
          CONTENT_WIDTH - 34 - 26,
          11.2,
        );
        const height = Math.max(20, titleLines.length * 18);
        if (this.ensureSpace(height + 4)) ctx = this.ctx;

        // ছোট বর্গাকার চিহ্ন
        ctx.fillStyle = COLORS.ink;
        ctx.fillRect(indent, this.y + 6, 4, 4);

        this.text(
          padBengali(topicIndex + 1),
          indent + 12,
          this.y + 1,
          8.5,
          400,
          COLORS.muted,
        );

        let lineTop = this.y;
        for (const line of titleLines) {
          drawRichLine(ctx, line, indent + 26, lineTop, 11.2, COLORS.ink);
          lineTop += 18;
        }

        this.y += height + 4;
      });

      this.y += 16;
    });

    this.y += 10;
    this.rule(this.y, COLORS.line);
    this.y += 14;
    this.text(
      "প্রতিটি বিভাগের টপিক ক্রমানুসারে পড়া চালিয়ে যেতে পারেন।",
      MARGIN_X,
      this.y,
      8.8,
      400,
      COLORS.muted,
    );
  }

  /* ------------------------------- ক্যাটাগরি অংশ ----------------------------- */

  private renderCategory(importance: Importance) {
    const topics = this.chapter[importance];
    if (topics.length === 0) return;

    let ctx = this.ctx;
    const category = chapterCategories[importance];

    if (this.ensureSpace(96)) ctx = this.ctx;

    const headerTop = this.y;
    const headerHeight = 42;

    if (importance === "veryImportant") {
      ctx.fillStyle = COLORS.ink;
      ctx.fillRect(MARGIN_X - 12, headerTop, CONTENT_WIDTH + 24, headerHeight);
      this.text(
        category.label,
        MARGIN_X,
        headerTop + 11,
        16.5,
        700,
        COLORS.paper,
      );
      const count = `${toBengaliNumber(topics.length)}টি টপিক`;
      const width = textWidth(ctx, count, 9, 400);
      this.text(
        count,
        PAGE_WIDTH - MARGIN_X - width,
        headerTop + 15,
        9,
        400,
        COLORS.paper,
      );
    } else if (importance === "important") {
      this.rule(headerTop, COLORS.ink, 2);
      this.rule(headerTop + headerHeight - 1, COLORS.ink, 1);
      this.text(
        category.label,
        MARGIN_X,
        headerTop + 12,
        16.5,
        700,
        COLORS.ink,
      );
      const count = `${toBengaliNumber(topics.length)}টি টপিক`;
      const countWidth = textWidth(ctx, count, 9, 400) + 14;
      ctx.strokeStyle = COLORS.ink;
      ctx.lineWidth = 0.8;
      ctx.strokeRect(
        PAGE_WIDTH - MARGIN_X - countWidth,
        headerTop + 12,
        countWidth,
        18,
      );
      this.centeredText(
        count,
        PAGE_WIDTH - MARGIN_X - countWidth / 2,
        headerTop + 16,
        9,
        400,
        COLORS.ink,
      );
    } else {
      ctx.fillStyle = COLORS.soft;
      ctx.fillRect(MARGIN_X - 12, headerTop, CONTENT_WIDTH + 24, headerHeight);
      ctx.strokeStyle = COLORS.line;
      ctx.lineWidth = 0.8;
      ctx.setLineDash([4, 3]);
      ctx.beginPath();
      ctx.moveTo(MARGIN_X - 12, headerTop + headerHeight);
      ctx.lineTo(PAGE_WIDTH - MARGIN_X + 12, headerTop + headerHeight);
      ctx.stroke();
      ctx.setLineDash([]);
      this.text(
        category.label,
        MARGIN_X,
        headerTop + 12,
        16.5,
        700,
        COLORS.ink,
      );
      const count = `${toBengaliNumber(topics.length)}টি টপিক`;
      const width = textWidth(ctx, count, 9, 400);
      this.text(
        count,
        PAGE_WIDTH - MARGIN_X - width,
        headerTop + 16,
        9,
        400,
        COLORS.muted,
      );
    }

    this.y = headerTop + headerHeight + 14;

    const descriptionLines = wrapText(
      ctx,
      category.description,
      CONTENT_WIDTH - 24,
      10,
    );

    for (const line of descriptionLines) {
      drawRichLine(ctx, line, MARGIN_X + 12, this.y, 10, COLORS.muted);
      this.y += 16;
    }

    this.y += 14;

    topics.forEach((topic, index) => {
      this.renderTopic(topic, index);
    });

    this.y += 18;
  }

  private renderTopic(topic: Topic, index: number) {
    let ctx = this.ctx;

    const titleLines = wrapText(
      ctx,
      topic.title,
      CONTENT_WIDTH - 34,
      14.2,
      600,
    );

    const summaryLines = topic.summary
      ? wrapText(ctx, topic.summary, CONTENT_WIDTH - 34, 10.2)
      : [];

    const headingHeight =
      titleLines.length * 22 + summaryLines.length * 16 + 30;

    if (this.ensureSpace(headingHeight + 54)) ctx = this.ctx;

    const headingTop = this.y;

    ctx.strokeStyle = COLORS.ink;
    ctx.lineWidth = 1;
    ctx.strokeRect(MARGIN_X, headingTop + 1, 21, 21);
    this.centeredText(
      padBengali(index + 1),
      MARGIN_X + 10.5,
      headingTop + 6,
      8.8,
      600,
      COLORS.ink,
    );

    let titleTop = headingTop;
    for (const line of titleLines) {
      drawRichLine(
        ctx,
        line,
        MARGIN_X + 34,
        titleTop,
        14.2,
        COLORS.ink,
        600,
      );
      titleTop += 22;
    }

    this.y = titleTop + 2;

    for (const line of summaryLines) {
      drawRichLine(ctx, line, MARGIN_X + 34, this.y, 10.2, COLORS.muted);
      this.y += 16;
    }

    this.y += 10;

    for (const block of topic.blocks) {
      this.renderBlock(block);
    }

    this.y += 20;
  }

  /* ---------------------------------- ব্লক ---------------------------------- */

  private renderBlock(block: ContentBlock) {
    switch (block.type) {
      case "paragraph":
        this.renderParagraph(block.text);
        break;
      case "list":
        this.renderList(block.items, Boolean(block.ordered));
        break;
      case "definition":
        this.renderDefinition(block.term, block.text);
        break;
      case "callout":
        this.renderCallout(block.tone, block.title, block.text);
        break;
      case "formula":
        this.renderFormula(block.expression, block.explanation);
        break;
      case "table":
        this.renderTable(block.caption, block.headers, block.rows);
        break;
    }
  }

  private renderParagraph(text: string) {
    const lines = wrapText(this.ctx, text, CONTENT_WIDTH, BODY_SIZE);

    for (const line of lines) {
      if (this.y + BODY_LINE > CONTENT_BOTTOM) this.addPage();

      drawRichLine(
        this.ctx,
        line,
        MARGIN_X,
        this.y + (BODY_LINE - BODY_SIZE) / 2,
        BODY_SIZE,
        COLORS.ink,
      );

      this.y += BODY_LINE;
    }

    this.y += 8;
  }

  private renderList(items: string[], ordered: boolean) {
    const markerWidth = 22;
    const textLeft = MARGIN_X + markerWidth;

    items.forEach((item, index) => {
      const lines = wrapText(
        this.ctx,
        item,
        CONTENT_WIDTH - markerWidth,
        BODY_SIZE,
      );

      const itemHeight = lines.length * BODY_LINE;

      if (this.y + itemHeight > CONTENT_BOTTOM) this.addPage();

      if (ordered) {
        this.text(
          `${toBengaliNumber(index + 1)}.`,
          MARGIN_X,
          this.y + 2,
          10,
          600,
          COLORS.ink,
        );
      } else {
        this.ctx.fillStyle = COLORS.ink;
        this.ctx.fillRect(
          MARGIN_X + 2,
          this.y + (BODY_LINE - 3.5) / 2,
          3.5,
          3.5,
        );
      }

      let top = this.y;

      for (const line of lines) {
        drawRichLine(
          this.ctx,
          line,
          textLeft,
          top + (BODY_LINE - BODY_SIZE) / 2,
          BODY_SIZE,
          COLORS.ink,
        );
        top += BODY_LINE;
      }

      this.y += itemHeight + 4;
    });

    this.y += 8;
  }

  private renderDefinition(term: string, text: string) {
    const padding = 12;
    const innerWidth = CONTENT_WIDTH - padding * 2;

    const termLines = wrapText(this.ctx, term, innerWidth, 11, 700);
    const bodyLines = wrapText(this.ctx, text, innerWidth, 11);

    const height =
      padding * 2 + termLines.length * 18 + 5 + bodyLines.length * 19;

    if (this.y + height > CONTENT_BOTTOM) this.addPage();

    const top = this.y;

    this.ctx.fillStyle = COLORS.soft;
    this.ctx.fillRect(MARGIN_X, top, CONTENT_WIDTH, height);
    this.rule(top, COLORS.line);
    this.rule(top + height, COLORS.line);

    let cursor = top + padding;

    for (const line of termLines) {
      drawRichLine(
        this.ctx,
        line,
        MARGIN_X + padding,
        cursor,
        11,
        COLORS.ink,
        700,
      );
      cursor += 18;
    }

    cursor += 5;

    for (const line of bodyLines) {
      drawRichLine(
        this.ctx,
        line,
        MARGIN_X + padding,
        cursor,
        11,
        COLORS.muted,
      );
      cursor += 19;
    }

    this.y = top + height + 12;
  }

  private renderCallout(
    tone: CalloutTone,
    title: string | undefined,
    text: string,
  ) {
    const padding = 13;
    const isExam = tone === "exam";
    const titleText = title || calloutLabels[tone];
    const bodyColor = isExam ? COLORS.paper : COLORS.ink;

    const titleLines = wrapText(
      this.ctx,
      titleText,
      CONTENT_WIDTH - padding * 2 - 4,
      10.4,
      700,
    );
    const bodyLines = wrapText(
      this.ctx,
      text,
      CONTENT_WIDTH - padding * 2 - 4,
      10.8,
    );

    const height =
      padding * 2 +
      titleLines.length * 17 +
      6 +
      bodyLines.length * 18.5;

    if (this.y + height > CONTENT_BOTTOM) this.addPage();

    const top = this.y;

    this.ctx.fillStyle = isExam ? COLORS.ink : COLORS.soft;
    this.ctx.fillRect(MARGIN_X, top, CONTENT_WIDTH, height);

    if (!isExam) {
      this.ctx.fillStyle = COLORS.ink;
      this.ctx.fillRect(MARGIN_X, top, 3, height);
    }

    let cursor = top + padding;

    for (const line of titleLines) {
      drawRichLine(
        this.ctx,
        line,
        MARGIN_X + padding + 4,
        cursor,
        10.4,
        bodyColor,
        700,
      );
      cursor += 17;
    }

    cursor += 6;

    for (const line of bodyLines) {
      drawRichLine(
        this.ctx,
        line,
        MARGIN_X + padding + 4,
        cursor,
        10.8,
        bodyColor,
      );
      cursor += 18.5;
    }

    this.y = top + height + 12;
  }

  private renderFormula(expression: string, explanation?: string) {
    const innerWidth = CONTENT_WIDTH - 32;
    const lines = wrapText(this.ctx, expression, innerWidth, 14, 600);
    const noteLines = explanation
      ? wrapText(this.ctx, explanation, innerWidth, 9.8)
      : [];

    const height =
      16 + lines.length * 24 + (noteLines.length ? 6 + noteLines.length * 15 : 0) + 16;

    if (this.y + height > CONTENT_BOTTOM) this.addPage();

    const top = this.y;

    this.rule(top, COLORS.ink, 1.5);
    this.rule(top + height, COLORS.ink, 1.5);

    let cursor = top + 16;

    for (const line of lines) {
      const width = lineWidth(this.ctx, line, 14, 600);
      drawRichLine(
        this.ctx,
        line,
        MARGIN_X + (CONTENT_WIDTH - width) / 2,
        cursor,
        14,
        COLORS.ink,
        600,
      );
      cursor += 24;
    }

    if (noteLines.length) {
      cursor += 6;

      for (const line of noteLines) {
        const width = lineWidth(this.ctx, line, 9.8);
        drawRichLine(
          this.ctx,
          line,
          MARGIN_X + (CONTENT_WIDTH - width) / 2,
          cursor,
          9.8,
          COLORS.muted,
        );
        cursor += 15;
      }
    }

    this.y = top + height + 14;
  }

  private renderTable(
    caption: string | undefined,
    headers: string[],
    rows: string[][],
  ) {
    if (headers.length === 0) return;

    let ctx = this.ctx;
    const padding = 7;
    const fontSize = 10;
    const lineHeight = 16;

    if (caption) {
      if (this.ensureSpace(26)) ctx = this.ctx;
      this.text(caption, MARGIN_X, this.y, 9.5, 600, COLORS.muted);
      this.y += 19;
    }

    const widths = this.computeColumnWidths(headers, rows);

    const headerCells = headers.map((header, index) =>
      wrapText(ctx, header, widths[index] - padding * 2, fontSize),
    );

    const headerHeight =
      Math.max(...headerCells.map((cell) => cell.length)) * lineHeight +
      padding * 2;

    const drawHeader = () => {
      if (this.ensureSpace(headerHeight + 30)) ctx = this.ctx;
      const top = this.y;

      ctx.fillStyle = COLORS.ink;
      ctx.fillRect(MARGIN_X, top, CONTENT_WIDTH, headerHeight);

      let x = MARGIN_X;

      headerCells.forEach((cell, index) => {
        let cellTop = top + padding + 1;

        for (const line of cell) {
          drawRichLine(
            ctx,
            line,
            x + padding,
            cellTop,
            fontSize,
            COLORS.paper,
          );
          cellTop += lineHeight;
        }

        x += widths[index];
      });

      this.y = top + headerHeight;
    };

    drawHeader();

    rows.forEach((row, rowIndex) => {
      const cells = row.map((cell, index) =>
        wrapText(ctx, cell, widths[index] - padding * 2, fontSize),
      );

      const rowHeight =
        Math.max(...cells.map((cell) => Math.max(cell.length, 1))) *
          lineHeight +
        padding * 2;

      if (this.y + rowHeight > CONTENT_BOTTOM) {
        this.addPage();
        ctx = this.ctx; // update ctx to the new page's canvas context
        drawHeader();
      }

      const top = this.y;

      if (rowIndex % 2 === 1) {
        ctx.fillStyle = COLORS.soft;
        ctx.fillRect(MARGIN_X, top, CONTENT_WIDTH, rowHeight);
      }

      ctx.strokeStyle = COLORS.line;
      ctx.lineWidth = 0.6;

      let x = MARGIN_X;

      cells.forEach((cell, index) => {
        ctx.strokeRect(x, top, widths[index], rowHeight);

        let cellTop = top + padding + 1;

        for (const line of cell) {
          drawRichLine(ctx, line, x + padding, cellTop, fontSize, COLORS.ink);
          cellTop += lineHeight;
        }

        x += widths[index];
      });

      this.y = top + rowHeight;
    });

    this.y += 14;
  }

  private computeColumnWidths(headers: string[], rows: string[][]): number[] {
    const minimum = 58;
    const ideal = headers.map((header, index) => {
      const samples = [header, ...rows.map((row) => row[index] ?? "")];

      const widest = Math.max(
        ...samples.map((sample) =>
          Math.min(
            textWidth(this.ctx, sample.replace(/\*\*/g, ""), 10),
            CONTENT_WIDTH * 0.52,
          ),
        ),
      );

      return Math.max(minimum, widest + 18);
    });

    const total = ideal.reduce((sum, width) => sum + width, 0);

    return ideal.map((width) => (width / total) * CONTENT_WIDTH);
  }

  /* -------------------------------- শেষের নোট -------------------------------- */

  private renderClosingNote() {
    const padding = 18;
    const innerWidth = CONTENT_WIDTH - padding * 2;

    const titleLines = wrapText(
      this.ctx,
      "পড়া শেষে নিজেকে যাচাই করুন",
      innerWidth,
      15,
      700,
    );

    const body = [
      "গুরুত্বপূর্ণ টপিকগুলোর মূল ধারণা নিজের ভাষায় লিখে দেখুন।",
      "টেবিল ও সূত্রগুলো মুখস্থ না করে ব্যবহার বোঝার চেষ্টা করুন।",
      "দুর্বল মনে হওয়া অংশটি আবার পড়ে সংক্ষিপ্ত নোট করুন।",
    ];

    const bodyLines = body.map((item) =>
      wrapText(this.ctx, item, innerWidth - 16, 10.6),
    );

    const height =
      padding * 2 +
      titleLines.length * 22 +
      12 +
      bodyLines.reduce((sum, lines) => sum + lines.length * 18 + 5, 0);

    if (this.y + height > CONTENT_BOTTOM) this.addPage();

    const top = this.y;

    this.ctx.fillStyle = COLORS.ink;
    this.ctx.fillRect(MARGIN_X, top, CONTENT_WIDTH, height);

    let cursor = top + padding;

    for (const line of titleLines) {
      drawRichLine(
        this.ctx,
        line,
        MARGIN_X + padding,
        cursor,
        15,
        COLORS.paper,
        700,
      );
      cursor += 22;
    }

    cursor += 12;

    bodyLines.forEach((lines) => {
      this.ctx.fillStyle = COLORS.paper;
      this.ctx.fillRect(MARGIN_X + padding, cursor + 7, 3, 3);

      for (const line of lines) {
        drawRichLine(
          this.ctx,
          line,
          MARGIN_X + padding + 16,
          cursor,
          10.6,
          "#f0f0f0",
        );
        cursor += 18;
      }

      cursor += 5;
    });

    this.y = top + height + 18;

    this.text(
      "এই নোটটি পাঠ্যবইয়ের সহায়ক সংস্করণ। চূড়ান্ত প্রস্তুতির জন্য পাঠ্যবই ও সরকারি সিলেবাস অনুসরণ করুন।",
      MARGIN_X,
      this.y,
      8.8,
      400,
      COLORS.muted,
    );
    this.y += 20;
  }

  /* ----------------------------- হেডার ও ফুটার ------------------------------ */

  private drawRunningHeaderAndFooter() {
    const ctx = this.ctx;
    const small = 8.6;

    ctx.save();
    ctx.textBaseline = "top";
    ctx.fillStyle = COLORS.muted;
    setFont(ctx, 600, small);
    ctx.fillText(siteConfig.name, MARGIN_X, 28);

    const rightText = fitLine(
      ctx,
      `${this.book.title} • ${this.chapter.title}`,
      320,
      small,
      400,
    );
    setFont(ctx, 400, small);
    const rightWidth = ctx.measureText(rightText).width;
    ctx.fillText(rightText, PAGE_WIDTH - MARGIN_X - rightWidth, 28);

    this.rule(46, COLORS.line);

    ctx.fillStyle = COLORS.muted;
    setFont(ctx, 400, small);
    const footerLeft = fitLine(
      ctx,
      `${this.chapter.title} • অধ্যায় ${padBengali(this.chapterNumber)}/${padBengali(this.chapterTotal)}`,
      300,
      small,
    );
    ctx.fillText(footerLeft, MARGIN_X, PAGE_HEIGHT - 36);

    const footerRight = `পৃষ্ঠা ${toBengaliNumber(this.pageNumber)}`;
    setFont(ctx, 600, small);
    const footerRightWidth = ctx.measureText(footerRight).width;
    ctx.fillText(
      footerRight,
      PAGE_WIDTH - MARGIN_X - footerRightWidth,
      PAGE_HEIGHT - 36,
    );

    this.rule(PAGE_HEIGHT - 46, COLORS.line);
    ctx.restore();
  }
}

/* -------------------------------------------------------------------------- */
/*  ফন্ট প্রস্তুতি ও সর্বজনীন এন্ট্রি                                          */
/* -------------------------------------------------------------------------- */

async function ensureBengaliFonts() {
  if (typeof document === "undefined" || !document.fonts) return;

  const specimens = "অআকখগঘসুভা১২৩ pdf";

  const loads = [
    document.fonts.load(`400 16px "Noto Sans Bengali"`, specimens),
    document.fonts.load(`600 16px "Noto Sans Bengali"`, specimens),
    document.fonts.load(`700 16px "Noto Sans Bengali"`, specimens),
  ];

  try {
    await Promise.all(loads);
    await document.fonts.ready;
  } catch {
    // ফন্ট লোড ব্যর্থ হলেও সিস্টেম ফন্ট দিয়ে চেষ্টা চলবে।
  }
}

export interface GenerateChapterPdfOptions {
  book: Book;
  chapter: Chapter;
  chapterNumber?: number;
}

/**
 * ক্যানভাসে A4 পৃষ্ঠা তৈরি করে PNG হিসেবে jsPDF-এ বসানো হয়।
 * এতে ব্রাউজারের নিজস্ব বাংলা টেক্সট শেপিং ব্যবহার হয়, ফলে
 * যুক্তাক্ষর ও কার-চিহ্ন সম্পূর্ণ সঠিকভাবে দেখা যায়।
 */
export async function generateChapterPdf({
  book,
  chapter,
  chapterNumber,
}: GenerateChapterPdfOptions): Promise<void> {
  if (typeof window === "undefined") {
    throw new Error("PDF কেবল ব্রাউজারে তৈরি করা যায়।");
  }

  await ensureBengaliFonts();

  const index = Math.max(
    chapterNumber ?? book.chapters.findIndex((item) => item.slug === chapter.slug) + 1,
    1,
  );

  const renderer = new ChapterPdfRenderer(book, chapter, index);
  const pages = renderer.render();

  const { jsPDF } = await import("jspdf");

  const pdf = new jsPDF({
    orientation: "portrait",
    unit: "pt",
    format: "a4",
    compress: true,
  });

  pages.forEach((image, pageIndex) => {
    if (pageIndex > 0) pdf.addPage();
    pdf.addImage(
      image,
      "PNG",
      0,
      0,
      PAGE_WIDTH,
      PAGE_HEIGHT,
      undefined,
      "FAST",
    );
  });

  pdf.setProperties({
    title: `${chapter.title} — ${book.title}`,
    subject: chapter.description,
    author: siteConfig.name,
    creator: siteConfig.name,
    keywords: `বাংলা নোট, ${book.title}, ${chapter.title}, সরকারি চাকরি প্রস্তুতি`,
  });

  pdf.save(`shikkhaguru-${book.slug}-${chapter.slug}.pdf`);
}
