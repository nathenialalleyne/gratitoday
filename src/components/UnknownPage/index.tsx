import React from 'react'
import Link from 'next/link'

export default function UnknownPage() {
    return (
        <div className={styles.container}>
            <div className={styles.textContainer}>
                <h1 className={styles.mainText}>404</h1>
                <h2 className={styles.secondaryText}>Page not found</h2>
            </div>
            <Link href={'/'}><button className={styles.button}>Return Home</button></Link>
        </div>
    )
}

const styles = {
    container: 'w-scree h-screen flex flex-col justify-center items-center bg-black gap-2',
    mainText: 'text-9xl text-white font-bold',
    secondaryText: 'text-4xl text-white font-bold',
    textContainer: 'flex flex-col justify-center items-center',
    button: 'bg-white text-black p-4 font-bold rounded-full hover:bg-gray-300'
}