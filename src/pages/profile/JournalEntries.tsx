import { JournalEntry as journal } from "~/utils/types";
import { api } from "~/utils/api";

type Props = {
  journals: journal[],
  refetch: () => void
};

export default function JournalEntries({ journals, refetch }: Props) {
  const deleteJournalMutation = api.journalRouter.deletePost.useMutation();
  return (
    <div>
      {journals.map((x, i) => {
        return <div key={i}>{x.content}
          <button
            className={styles.deleteButton}
            onClick={async () => {
              await deleteJournalMutation.mutateAsync({ id: x.id }).then(() => {
                refetch();
              })
            }
            }>delete post</button></div>;
      })}
    </div >
  );
}

const styles = {
  deleteButton: "text-red-500",
}
