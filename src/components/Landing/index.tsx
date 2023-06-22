import React, { useEffect } from 'react'
import TypewriterComponent from 'typewriter-effect'
import { api } from '~/utils/api'
import LoaderCircle from '../icons/LoaderCircle'
import QuoteCard from './QuoteCard'


export default function LandingPage() {
    const { data, refetch } = api.openaiRouter.getTodaysQuote.useQuery(undefined, { enabled: false })

    useEffect(() => {
        refetch()
    }, [])

    return (
        <div className={styles.background}>
            <h1 className={styles.typewriter}>
                <TypewriterComponent options={{
                    loop: true,
                    autoStart: true
                }}
                    onInit={(typewriter) => {
                        typewriter.typeString('Reflect').start()
                            .pauseFor(1000)
                            .deleteAll()
                            .typeString('Grow')
                            .pauseFor(1000)
                            .deleteAll()
                            .typeString('Thrive')
                            .pauseFor(1000)
                            .deleteAll()
                    }} />
            </h1>
            {data ? <QuoteCard > {data?.quote}</QuoteCard> : <div className={styles.loadingCircle}>
                <LoaderCircle color='white' w={60} h={60} />
            </div>}
        </div>
    )
}

const styles = {
    background: 'bg-black h-screen w-screen flex justify-center items-center flex-col *',
    typewriter: 'text-white text-9xl font-bold',
    todaysQuote: 'text-white text-2xl font-bold',
    loadingCircle: 'flex justify-center items-center'
}
