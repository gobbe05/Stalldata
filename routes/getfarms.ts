import express from 'express'
import { Farm } from '../models'

async function getfarms(req: express.Request, res: express.Response) {
    const docs = await Farm.find({company: res.locals.company._id})
    res.status(200).json({farms: docs})
}

export default getfarms