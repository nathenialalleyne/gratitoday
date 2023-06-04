import { useState } from "react";
import { api } from "~/utils/api";
import Modal from "~/components/ModalBackground";

type Props = {
  isOpen: boolean;
};

export default function JournalModal({ isOpen }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const createJournalMutation = api.journalRouter.createJournal.useMutation({
    title: title,
    content: content,
  });
  return (
    <div>
      {" "}
      <Modal showing={isOpen} backgroundClasses={styles.modalBackground}>
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
          <button>send</button>
        </div>
      </Modal>
    </div>
  );
}

const styles = {
  modalBackground: "flex justify-center items-center",
  modalTextBackground: "w-50 h-50 bg-white rounded-md",
};
