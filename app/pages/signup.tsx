import React, { useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import { Inter } from '@next/font/google'
import styles from '../styles/Home.module.css'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
    const router = useRouter()
    const [inputs, setInputs] = useState({
        username: '',
        password: ''
    })

    const { username, password } = inputs

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, id } = e.target
        setInputs({
            ...inputs,
            [id]: value
        })
    }

    const onClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
        const res = await fetch('/api/signup', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(inputs)
        })
        const json = await res.json()
        if (json.success) {
            router.replace('/hello')
            alert('Signup Success!')
        } else {
            alert('Signup Failed!')
        }
    }

    return (
        <>
        <Head>
            <title>Sign up</title>
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
                    href="https://exon.kr"
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
            <p className={inter.className}>INSERT INTO user VALUES (id, "{username}", "{password}")</p>
            <form>
                <input className={inter.className} placeholder='username' onChange={onChange} id='username' value={username}></input>
                <input className={inter.className} placeholder='password' onChange={onChange} id='password' value={password}></input>
                <button className={inter.className} onClick={onClick}>Sign Up</button>
            </form>
        </div>
        </>
    )
}
