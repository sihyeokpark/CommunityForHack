import React, { useState, useCallback } from 'react'
import Head from 'next/head'
import { Inter } from '@next/font/google'
import styles from '../styles/Home.module.css'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const onUsernameChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value)
    }, [])

    const onPasswordChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value)
    }, [])

    return (
        <>
        <Head>
            <title>Create Next App</title>
            <meta name="description" content="Generated by create next app" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className={styles.main}>
            <div className={styles.description}>
                <p>
                    <code className={styles.code}>happy hacking!!</code>
                </p>
                <div>
                    <a
                    href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
                    target="_blank"
                    rel="noopener noreferrer"
                    >
                    By EXON
                    </a>
                </div>
            </div>
        </main>

        <div className={styles.center}>
            <h1 className={styles.welcome}>
                Sign Up
            </h1>
            <form>
                <input className={inter.className} type='text' placeholder='username' id='username' value={username} onChange={onUsernameChange}></input>
                <input className={inter.className} type='text' placeholder='password' id='password' value={password} onChange={onPasswordChange}></input>
                <button type='submit' className={inter.className}>Sign Up</button>
            </form>
        </div>
        </>
    )
}
