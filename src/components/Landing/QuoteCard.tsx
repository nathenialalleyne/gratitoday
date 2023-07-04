import React from 'react'

type Props = {
    children: React.ReactNode
}

export default function QuoteCard({ children }: Props) {
    return (
        <div className={styles.cardBackground}>{children}</div>
    )
}

const styles = {
    cardBackground: 'bg-white rounded-xl shadow-xl p-4 w-72 h-72 overflow-hidden no-scrollbar'
}