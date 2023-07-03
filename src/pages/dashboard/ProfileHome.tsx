import { signOut } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Modal from "~/components/general/ModalBackground";

type ProfileHomeProps = {
  username: string;
  refetch: () => void;
};

function ProfileHome({ username, refetch }: ProfileHomeProps) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (router.query.journalName) {
      setIsOpen(true)
      console.log('test')
    }
  }, [])

  return (
    <div>
      {router.query.journalName && (<Modal isShowing={setIsOpen} showing={isOpen}>
        <div>
          <div>Journal created!</div>
          <div>Click <a href={`/journal/${router.query.journalName}`}>here</a> to view it.</div>
        </div>
      </Modal>)}
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
        <button onClick={() => {
          router.push('/write')
        }}>write journal</button>
      </header>
      <div>Hello, {username}!</div>
    </div>
  );
}

const styles = {
  header: "flex w-full items-center justify-between bg-gray-200",
};

export default ProfileHome;
