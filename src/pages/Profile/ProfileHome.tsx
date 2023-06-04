import { signOut } from "next-auth/react";
import React, { useState } from "react";
import Modal from "~/components/ModalBackground";
import JournalModal from "../Journal/WriteJournalModal";

type ProfileHomeProps = {
  username: string;
};

function ProfileHome({ username }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleSend = () => {};
  return (
    <div>
      <JournalModal isOpen={isOpen} />
      <header className={styles.header}>
        {" "}
        <button
          onClick={(e) => {
            e.preventDefault();
            signOut();
          }}
        >
          sign out
        </button>
        <button onClick={() => setIsOpen(!isOpen)}>write journal</button>
      </header>
      <div>Hello, {username}!</div>
    </div>
  );
}

const styles = {
  header: "flex w-full items-center justify-between bg-gray-200",
};

export default ProfileHome;
