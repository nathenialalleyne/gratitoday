import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Modal from "~/components/general/ModalBackground";
import CreatedJournalModal from "./CreatedJournalModal";

type ProfileHomeProps = {
  refetch: () => void;
};

function ProfileHome({ refetch }: ProfileHomeProps) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const session = useSession();

  useEffect(() => {
    console.log(router.query)
    if (router.query.journalName) {
      setIsOpen(true)
      console.log('test')

    }
  }, [])

  return (
    <div>
      {router.query && (
        <CreatedJournalModal isShowing={setIsOpen} showing={isOpen} query={router.query.journalName as string} />
      )}
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
      <div>Hello, {session.data?.user.name}!</div>
    </div>
  );
}

const styles = {
  header: "flex w-full items-center justify-between bg-gray-200",

};

export default ProfileHome;
