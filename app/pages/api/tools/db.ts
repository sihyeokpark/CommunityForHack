import { open } from 'sqlite'
import sqlite3 from 'sqlite3'

export async function getDb(dbname: string) {
    return await open({
        filename: dbname,
        driver: sqlite3.Database
    })
}