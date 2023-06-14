import React from 'react';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { signIn } from 'next-auth/react';

type Props = {}

export default function Signin() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const result = await signIn('credentials', {
            redirect: false,
            email,
            password,
        });

        if (!result?.error) {
            router.push('/dashboard'); // Redirect to the dashboard on successful signin
        }
    };

    return (
        <div>
            <h1>Signin Page</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Sign in</button>
            </form>
        </div>
    );
}

const styles = {
    background: {

    }
}
