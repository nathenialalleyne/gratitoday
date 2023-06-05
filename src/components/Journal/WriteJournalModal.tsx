import React, { useState } from "react";
import { api } from "~/utils/api";
import Modal from "~/components/general/ModalBackground";

export default function JournalModal({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");

  const createJournalMutation = api.journalRouter.createPost.useMutation();

  return (
    <div>
      {" "}
      <Modal
        showing={isOpen}
        isShowing={setIsOpen}
        backgroundClasses={styles.modalBackground}
      >
        <div className={styles.modalTextBackground}>
          <div>Write below</div>
          <ol>
            <label>Title</label>
            <input
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            ></input>
          </ol>
          <textarea
            onChange={(e) => {
              setContent(e.target.value);
            }}
          />
          <button
            onClick={() => {
              createJournalMutation.mutateAsync({
                journalTitle: title,
                journalText: content,
              });
              setIsOpen(false);
            }}
          >
            send
          </button>
        </div>
      </Modal>
    </div>
  );
}

const styles = {
  modalBackground: "flex justify-center items-center",
  modalTextBackground: "w-50 h-50 bg-white rounded-md",
};
