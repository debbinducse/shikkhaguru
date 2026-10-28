import { RichText } from "@/components/chapter/rich-text";
import { toBengaliNumber } from "@/lib/bengali";
import type { CalloutTone, ContentBlock } from "@/types/content";

const calloutLabels: Record<CalloutTone, string> = {
  note: "মনে রাখুন",
  tip: "পড়ার টিপস",
  warning: "সতর্ক থাকুন",
  exam: "পরীক্ষা-টিপ",
};

export function ContentBlocks({ blocks }: { blocks: ContentBlock[] }) {
  return (
    <>
      {blocks.map((block, index) => {
        switch (block.type) {
          case "paragraph":
            return (
              <p key={index}>
                <RichText text={block.text} />
              </p>
            );

          case "list":
            if (block.ordered) {
              return (
                <ol key={index}>
                  {block.items.map((item, itemIndex) => (
                    <li key={itemIndex}>
                      <span className="mt-0.5 w-6 shrink-0 text-sm font-semibold">
                        {toBengaliNumber(itemIndex + 1)}।
                      </span>
                      <span>
                        <RichText text={item} />
                      </span>
                    </li>
                  ))}
                </ol>
              );
            }

            return (
              <ul key={index}>
                {block.items.map((item, itemIndex) => (
                  <li key={itemIndex}>
                    <RichText text={item} />
                  </li>
                ))}
              </ul>
            );

          case "definition":
            return (
              <div key={index} className="definition-box">
                <dl>
                  <dt className="text-sm font-bold">{block.term}</dt>
                  <dd className="mt-1.5 text-[0.98em]">
                    <RichText text={block.text} />
                  </dd>
                </dl>
              </div>
            );

          case "callout":
            return (
              <aside
                key={index}
                className={`callout callout-${block.tone}`}
                aria-label={block.title || calloutLabels[block.tone]}
              >
                <p className="callout-title">
                  {block.title || calloutLabels[block.tone]}
                </p>
                <p className="!my-0 text-[0.97em] leading-[1.9]">
                  <RichText text={block.text} />
                </p>
              </aside>
            );

          case "formula":
            return (
              <div key={index} className="formula-box">
                <p className="formula-expression">{block.expression}</p>
                {block.explanation ? (
                  <p className="formula-note">{block.explanation}</p>
                ) : null}
              </div>
            );

          case "table":
            return (
              <div key={index} className="content-table-wrap">
                <table
                  className={`content-table ${
                    block.compact ? "content-table-compact" : ""
                  }`}
                >
                  {block.caption ? (
                    <caption>{block.caption}</caption>
                  ) : null}
                  <thead>
                    <tr>
                      {block.headers.map((header, headerIndex) => (
                        <th key={headerIndex} scope="col">
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {block.rows.map((row, rowIndex) => (
                      <tr key={rowIndex}>
                        {row.map((cell, cellIndex) => (
                          <td key={cellIndex}>
                            <RichText text={cell} />
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );

          default:
            return null;
        }
      })}
    </>
  );
}
