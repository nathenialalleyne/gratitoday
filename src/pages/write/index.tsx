import React, { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'
import { api } from '~/utils/api'
import LoaderCircle from '~/components/icons/LoaderCircle'
import { query } from 'winston'

export default function WritePage() {
    const router = useRouter()
    const writeRef = useRef<HTMLDivElement>(null)
    const containerRef = useRef<HTMLDivElement>(null)

    const [focus, setFocus] = useState(false)
    const [text, setText] = useState<string>('')
    const [title, setTitle] = useState<string>('')
    const [creating, setCreating] = useState<boolean>(false)

    const createRouter = api.journalRouter.createJournal.useMutation()


    const handleTab = (e: React.KeyboardEvent<HTMLDivElement>) => {
        // const getCursorPosition = () => {
        //     const selection = window.getSelection();
        //     if (selection && selection.rangeCount > 0) {
        //         const range = selection.getRangeAt(0);
        //         const clonedRange = range.cloneRange();
        //         clonedRange.selectNodeContents(writeRef.current!);
        //         clonedRange.setEnd(range.startContainer, range.startOffset);
        //         return clonedRange.toString().length;
        //     }
        //     return -1;
        // };
        // if (e.key === 'Tab') {
        //     e.preventDefault()

        //     const cursorPosition = getCursorPosition();
        //     const text = writeRef.current!.innerText
        //     const newText = text.slice(0, cursorPosition) + '\u00A0\u00A0\u00A0\u00A0' + text.slice(cursorPosition)
        //     writeRef.current!.innerText = newText

        //     const selection = window.getSelection();
        //     const range = document.createRange();
        //     range.setStart(writeRef.current!, cursorPosition + 1);
        //     range.collapse(true);

        //     if (selection) {
        //         selection.removeAllRanges();
        //         selection.addRange(range);
        //     }
        // }

        // if (e.key === 'Backspace') {
        //     const cursorPosition = getCursorPosition();
        //     const text = writeRef.current!.innerText
        //     const split = text.split('')
        //     if (split[cursorPosition] === '\u00A0') {
        //         e.preventDefault()
        //         const newText = text.slice(0, cursorPosition - 4) + text.slice(cursorPosition)
        //         writeRef.current!.innerText = newText
        //     }
        // }
    }

    const createJournal = async () => {
        if (text === '' || title === '') return
        setCreating(true)
        await createRouter.mutateAsync({ journalTitle: title, journalText: text })
        setCreating(false)
        router.push('/dashboard', { query: { journal: title } })
    }

    return (
        <div className={styles.wholeContainer}>
            {creating ? <LoaderCircle w={60} h={60} /> :
                <div className={styles.container}>
                    <button onClick={() => router.push('/dashboard')}>Go to dashboard</button>
                    <input onChange={(e) => setTitle(e.target.value)} className={styles.title}></input>
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
                            {/* {!focus ? <div>Write your journal here...</div> : null} */}
                        </div>
                    </div>

                    <div className={styles.submitWrapper}>
                        <button
                            onClick={createJournal}
                            className={styles.submitButton}
                        >
                            Create Journal
                        </button>
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
