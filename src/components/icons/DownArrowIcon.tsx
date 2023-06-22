import React from 'react'

type Props = {
    w?: number,
    h?: number,
    color?: string
}

export default function DownArrowIcon({ w, h, color }: Props) {

    return (
        <div>
            <svg version="1.1" x="0px" y="0px" width={w} height={h} viewBox="0 0 100 125" >
                <path fill={color ? color : "black"} d="M6.155,30.066l42.518,42.518c0.366,0.366,0.846,0.549,1.326,0.549s0.959-0.183,1.326-0.549l42.52-42.518  c0.732-0.732,0.732-1.919,0-2.651s-1.919-0.732-2.651,0L49.999,68.608L8.806,27.415c-0.732-0.732-1.919-0.732-2.651,0  S5.423,29.334,6.155,30.066z" />
            </svg>
        </div >
    )
}