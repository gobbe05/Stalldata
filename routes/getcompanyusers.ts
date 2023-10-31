import express from 'express'
import { User } from '../models'

async function getcompanyusers(req: express.Request, res: express.Response) {
    try {
        console.log(res.locals.company)
        const company = res.locals.company.code
        const docs = await User.find({company: company})
        return res.status(200).json({users: docs})
    } catch(err) {
        return res.status(500).json({message: "There was an error handling the request"})
    }
}

export default getcompanyusers