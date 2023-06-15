import React from 'react'

type Props = {
    w?: number,
    h?: number,
    color?: string
}

export default function GoogleIcon({ w, h, color }: Props) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width={w} height={h} >
            <path fill={color} d="M16.003,14.063v4.203h5.989c-0.783,2.547-2.911,4.369-5.989,4.369c-3.665,0-6.637-2.971-6.637-6.635s2.971-6.635,6.637-6.635c1.648,0,3.152,0.604,4.313,1.598l3.096-3.095C21.456,6.086,18.856,5,16.003,5C9.926,5,5,9.925,5,16s4.926,11,11.003,11c9.236,0,11.274-8.635,10.369-12.922L16.003,14.063z" />
        </svg>
    )

}