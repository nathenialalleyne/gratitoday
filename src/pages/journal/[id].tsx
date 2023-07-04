import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import { api } from "~/utils/api";
import Link from 'next/link';

type Props = {}

export default function Journal({ }: Props) {
    const router = useRouter()
    const { data, refetch } = api.journalRouter.getSpecificEntry.useQuery({ id: router.query.id as string }, { enabled: false })


    useEffect(() => {
        refetch()
    }, [])

    return (
        <div>
            <div>title: {data?.title}</div>
            <div>content: {data?.content}</div>
            <button>
                <Link href={'/dashboard'}>
                    go to dashboard
                </Link>
            </button>
            <button
                onClick={() => {
                    router.push({ pathname: `/edit/${router.query.id}` })
                }}
            >
                edit post
            </button>
        </div>
    )
}