import type { NextApiRequest, NextApiResponse } from 'next'

import { getDb } from '../tools/db'

type Data = {
    message: string
    error: string
    success: boolean
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    if (req.method === 'GET') {
        const db = await getDb('./pages/database/user.sqlite')
        const body = req.body
        console.log(body)
        if (!body.username || !body.password) {
            res.status(400).json({ message: '', error: 'username or password is none', success: false })
            return
        }
        try {
            db.get(`SELECT * FROM user WHERE username="${body.username}";`, (err: Error, row: {password: string}) => {
                console.log(err, row)
                if (err) {
                    res.status(400).json({ message: '', error: 'error', success: false })
                    return
                }
                if (row.password === body.password) {
                    res.status(200).json({ message: `Hello ${body.username}. Welecome to my site`, error: '', success: true })
                    return
                }
                res.status(400).json({ message: 'username or password is wrong', error: '', success: false })
            })
        } catch(error) {
            res.status(400).json({ message: '', error: 'error', success: false })
            return
        }
        res.status(200).json({ message: `Hello ${body.username}. Welecome to my site`, error: '', success: true })
    } else {
        res.status(404).json({ message: '', error: `This api doesn\'t support ${req.method} request.`, success: false })
    }
}
