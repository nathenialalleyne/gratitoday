import { signOut } from "next-auth/react";
import React, { useState } from "react";
import JournalModal from "~/components/Journal/WriteJournalModal";

type ProfileHomeProps = {
  username: string;
  refetch: () => void;
};

function ProfileHome({ username, refetch }: ProfileHomeProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <JournalModal isOpen={isOpen} setIsOpen={setIsOpen} refetch={refetch} />
      <header className={styles.header}>
        {" "}
        <button
          onClick={async (e) => {
            e.preventDefault();
            await signOut();
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
