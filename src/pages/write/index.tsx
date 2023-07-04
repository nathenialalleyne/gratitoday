import React, { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'
import { api } from '~/utils/api'
import LoaderCircle from '~/components/icons/LoaderCircle'
import { query } from 'winston'

type Props = {
    editContent?: string
    editTitle?: string
    id?: string
}



export default function WritePage({ editContent, editTitle, id }: Props) {
    const router = useRouter()
    const writeRef = useRef<HTMLDivElement>(null)
    const containerRef = useRef<HTMLDivElement>(null)

    const { data, refetch } = api.journalRouter.getSpecificEntry.useQuery({ id: id as string }, { enabled: false })
    const createRouter = api.journalRouter.createJournal.useMutation()
    const editRouter = api.journalRouter.editSpecificEntry.useMutation()

    const [focus, setFocus] = useState(false)

    const [editting, setEditting] = useState<boolean>(false)
    const [text, setText] = useState<string>('')
    const [title, setTitle] = useState<string>(data?.title ?? '')
    const [creating, setCreating] = useState<boolean>(false)




    useEffect(() => {
        async function getQuote() {
            if (!id) return
            const response = await refetch()
            setText(response.data?.content as string)
            setTitle(response.data?.title as string)
        }

        getQuote()
    }, [id])

    const createJournal = async () => {
        if (text === '' || title === '') return
        setCreating(true)
        await createRouter.mutateAsync({ journalTitle: title, journalText: text })
        setCreating(false)
        router.push({ pathname: '/dashboard', query: { journalName: title } })
    }

    const editJournal = async () => {
        console.log('editting')
        if (!id) return
        if (text === '' || title === '') return
        setCreating(true)
        await editRouter.mutateAsync({ id: id, journalTitle: title, journalText: text })
        setCreating(false)
        router.push({ pathname: '/dashboard' })
    }


    return (
        <div className={styles.wholeContainer}>
            {creating ? <LoaderCircle w={60} h={60} /> :
                <div className={styles.container}>
                    <button onClick={() => router.push('/dashboard')}>Go to dashboard</button>
                    <input value={title} onChange={(e) => setTitle(e.target.value)} className={styles.title}></input>
                    <ul className={styles.buttonContainer}>
                        <button className={styles.textButton}><strong>B</strong></button>
                        <button className={styles.textButton}><em>I</em></button>
                        <button className={styles.textButton}>Quote</button>
                        <button className={styles.textButton}>UL</button>
                        <button className={styles.textButton}>OL</button>
                        <button className={styles.textButton}>Link</button>

                    </ul>
                    <div
                        className={styles.writeContainer}
                        onFocus={() => setFocus(true)}
                        onBlur={() => setFocus(false)}

                    >
                        <div
                            className={styles.writeDiv}
                            contentEditable
                            suppressContentEditableWarning={true}
                            ref={writeRef}
                            onKeyDown={(e) => {
                                setText(e.currentTarget.innerText)
                            }}
                            data-write
                        >
                            {data ? data.content : null}
                        </div>
                    </div>

                    <div className={styles.submitWrapper}>
                        {editting ?
                            <button
                                onClick={createJournal}
                                className={styles.submitButton}
                            >
                                Create Journal
                            </button>
                            :
                            <button
                                onClick={editJournal}
                                className={styles.submitButton}
                            >
                                Edit Journal
                            </button>}
                    </div>
                </div>
            }
        </div>
    )
}

const styles = {
    wholeContainer: 'w-screen h-screen overflow-hidden p-4 flex flex-col justify-center items-center',
    container: 'w-full h-full flex flex-col pl-60 pr-60 gap-2',
    title: 'w-full h-8 border-[1px] border-black',
    buttonContainer: 'w-full flex items-center justify-end gap-2',
    textButton: 'w-8 h-8 flex items-center justify-center',
    writeContainer: 'border-[1px] border-black h-full focus:border-transparent focus:ring-0',
    writeDiv: 'w-full h-full p-4',
    submitButton: 'w-fit p-2 bg-black text-white',
    submitWrapper: 'w-full flex justify-end',
}
