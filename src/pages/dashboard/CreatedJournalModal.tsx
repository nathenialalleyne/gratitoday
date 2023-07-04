import React from 'react'
import Modal from "~/components/general/ModalBackground";
import { useRouter } from 'next/router';
import Link from 'next/link';

type Props = {
    isShowing: React.Dispatch<React.SetStateAction<boolean>>;
    showing: boolean;
    query: string;
}

function CreatedJournalModal({ isShowing, showing, query }: Props) {
    const router = useRouter()
    return (
        <Modal
            isShowing={isShowing}
            showing={showing}
            backgroundClasses={styles.center}
            onClose={() => {
                router.push('/dashboard')
            }}
        >
            <div className={styles.backgroundContainer}>
                <div>Journal created!</div>
                <div>Click <Link href={`/journal/${query}`}>here</Link> to view it.</div>
            </div>
        </Modal>
    )
}

const styles = {
    center: 'flex justify-center items-center',
    backgroundContainer: 'absolute -left-50 w-8/12 h-6/12 bg-white rounded-xl z-10',
}

export default CreatedJournalModal