import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { signIn } from 'next-auth/react';
import LoginContainer from './LoginContainer';
import { api } from '~/utils/api';
import { QuoteIcon } from '~/components/icons';
import LoaderCircle from '~/components/icons/LoaderCircle';
import { white } from 'tailwindcss/colors';

type Props = {}

export default function Signin() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <div className={styles.background} >
            <LoginContainer />
        </div>
    );
}

const styles = {
    background: 'bg-gradient-to-br from-gray-800 to-slate-500 via-stone-700 to-cyan-200 background-animate w-screen h-screen flex items-center justify-center overflow-hidden p-4',
    quoteContainer: 'flex justify-center items-center relative w-full h-full',
    quote: 'text-4xl font-bold text-center text-white mb-4 absolute h-30 w-3/5 top-45 left-50',
    quoteIcon: 'opacity-70 ',
    bottomQuoteIcon: 'opacity-70 rotate-180'
}
