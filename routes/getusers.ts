import express from 'express'
import { User } from '../models'

async function getusers(req: express.Request, res: express.Response){
    try {
        const docs = await User.find({})
        return res.status(200).json({users: docs})
    } catch(err) {
        return res.status(500).json({message: "There was an error handling the request"})
    }
}

export default getusers