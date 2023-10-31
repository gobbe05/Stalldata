import { User } from "../models"
import express from 'express'

async function getunacceptedusers(req: express.Request, res: express.Response) {
    const docs = await User.find({accepted: false})
    res.status(200).json({users: docs})
}

export default getunacceptedusers