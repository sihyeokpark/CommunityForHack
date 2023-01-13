// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

import { getDb } from '../tools/db'

type Data = {
    content: string
    error: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    if (req.method === 'POST') {
        const db = await getDb('./pages/database/user.sqlite')
        if (!req.query.username || !req.query.password) {
            res.status(400).json({ content: '', error: 'username or password is none' })
            return
        }
        const id = await db.get(`SELECT count(id) as count FROM user`)
        db.run(`INSERT INTO user VALUES (${id.count+1}, "${req.query.username}", "${req.query.password}")`)
        res.status(200).json({ content: `Hello ${req.query.username}. Welecome to my site`, error: '' })
    } else {
        res.status(404).json({ content: '', error: 'not exist url' })
    }
}
