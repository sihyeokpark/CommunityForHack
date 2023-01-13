// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

import { getDb } from '../tools/db'

type Data = {
    message: string
    error: string
    success: boolean
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    if (req.method === 'POST') {
        const db = await getDb('./pages/database/user.sqlite')
        const body = req.body
        // const body = JSON.parse(req.body)
        if (!body.username || !body.password) {
            res.status(400).json({ message: '', error: 'username or password is none', success: false })
            return
        }
        const id = await db.get(`SELECT count(id) as count FROM user`)
        db.run(`INSERT INTO user VALUES (${id.count+1}, "${body.username}", "${body.password}");`)
        res.status(200).json({ message: `Hello ${body.username}. Welecome to my site`, error: '', success: true })
    } else {
        res.status(404).json({ message: '', error: 'not exist url', success: false })
    }
}
