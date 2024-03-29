import React, { useState } from 'react'
import classNames from 'classnames'
import { black, white } from 'tailwindcss/colors'
import AppleIcon from '~/components/icons/AppleIcon'
import TwitterIcon from '~/components/icons/TwitterIcon'
import MetaIcon from '~/components/icons/MetaIcon'
import GoogleIcon from '~/components/icons/GoogleIcon'
import { signIn } from 'next-auth/react'
import { redirect } from 'next/dist/server/api-utils'
import LoaderCircle from '~/components/icons/LoaderCircle'



export default function LoginContainer() {
    const [email, setEmail] = useState<String>('')
    const [password, setPassword] = useState<String>('')
    const [submitting, setSubmitting] = useState<Boolean>(false)
    const [error, setError] = useState<String>()

    const handleButtonSignIn = async (provider: string) => {
        setSubmitting(true)
        try {
            await (signIn(provider, { redirect: false, callbackUrl: 'http://localhost:3000/profile' }))
        } catch (error) {
            console.error(error)
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <div className={styles.container}>
            <h1 className={styles.header}>Sign in</h1>
            {error && <h2 className={styles.error}>{error}</h2>}
            <div>
                <form method="post" action="/api/auth/callback/credentials">
                    <label className={styles.label}>Email</label>
                    <input placeholder="johndoe@email.com" type="email" onChange={(e) => {
                        setEmail(e.target.value)
                    }} className={styles.input}></input>

                    <label className={styles.label}>Password</label>
                    <input placeholder="********" type="password" onChange={(e) => {
                        setPassword(e.target.value)
                    }} minLength={8} className={styles.input}></input>

                    {submitting ?
                        <div className={styles.loaderCircle}>
                            <LoaderCircle w={30} h={30} color={white} />
                        </div>
                        :
                        <button className={classNames('bg-dark_blue text-white', styles.button)} onClick={async (e) => {
                            e.preventDefault()
                            setSubmitting(true)
                            try {
                                await signIn('credentials', {
                                    email: 'email',
                                    password: 'password',
                                    callbackUrl: 'http://localhost:3000/profile',
                                    redirect: false
                                })
                            } catch (err: any) {
                                setError(err?.message)
                            } finally {
                                setSubmitting(false)
                            }
                        }} type='submit' >Sign In</button>}
                </form>
                <div className={styles.divider}></div>
                <ul>
                    <button onClick={() => handleButtonSignIn('google')} className={classNames("bg-google_red", styles.button)}>
                        <GoogleIcon w={30} h={30} color={white} />
                    </button>

                    <button onClick={() => handleButtonSignIn('facebook')} className={classNames("bg-facebook_blue", styles.button)}>
                        <MetaIcon w={30} h={30} color={white} />
                    </button>

                    <button onClick={() => handleButtonSignIn('twitter')} className={classNames("bg-twitter_blue", styles.button)}>
                        <TwitterIcon w={30} h={30} color={white} />
                    </button>

                    <button onClick={() => handleButtonSignIn('apple')} className={classNames("bg-white", styles.button)}>
                        <AppleIcon w={30} h={30} color={black} />
                    </button>

                </ul>
            </div>
        </div>
    )
}

const styles = {
    container: 'w-fit h-fit bg-white/[.1] p-4 rounded-lg flex justify-center items-center flex-col',
    header: 'text-3xl font-bold text-center text-slate-200 mb-4',
    divider: 'bg-gray-300 h-px w-full mb-4',
    label: 'text-slate-200 font-bold mb-2 font-normal',
    button: 'rounded-lg p-4 w-full text-center text-dark_blue font-bold mb-4 flex justify-center items-center hover:brightness-90',
    appleButton: 'bg-white',
    input: 'bg-white rounded-lg p-4 w-full text-dark_blue font-bold mb-4 font-normal',
    loaderCircle: 'flex justify-center items-center mb-4',
    error: 'text-white font-bold mb-4 bg-red-500 rounded-lg p-4 w-fit text-center'
}

