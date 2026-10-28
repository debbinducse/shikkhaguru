import { Fragment } from "react";

export function RichText({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);

  return (
    <>
      {parts.map((part, index) => {
        if (part.startsWith("**") && part.endsWith("**")) {
          return <mark key={index}>{part.slice(2, -2)}</mark>;
        }

        return <Fragment key={index}>{part}</Fragment>;
      })}
    </>
  );
}
