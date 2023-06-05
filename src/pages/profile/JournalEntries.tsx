import { JournalEntry as journal } from "~/utils/types";

type Props = { journals: journal[] };

export default function JournalEntries({ journals }) {
  return (
    <div>
      {journals.map((x, i) => {
        return <div key={i}>{x.id}</div>;
      })}
    </div>
  );
}
