import React from 'react'
import { useRouter } from 'next/router'
import WritePage from '~/pages/write/index'

type Props = {

}

export default function Edit({ }: Props) {
    const router = useRouter()
    return (
        <WritePage editContent={router.query.content as string} editTitle={router.query.content as string} id={router.query.id as string} />
    )
}