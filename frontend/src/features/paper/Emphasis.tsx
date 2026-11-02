/** Highlights measured results (85%+, 40%, 10k+, 100 ms) in a sentence. */
const measure = /(\d[\d.,]*(?:k\+|%\+|%|\+| ms))/g;

export function Emphasis({ text }: { text: string }) {
  return (
    <>
      {text.split(measure).map((part, index) =>
        index % 2 ? (
          <mark className="figure" key={index}>
            {part}
          </mark>
        ) : (
          part
        ),
      )}
    </>
  );
}
