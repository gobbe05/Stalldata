import express from 'express'
import { Treatment } from '../models'

async function gettreatments(req: express.Request, res: express.Response) {
    const docs = await Treatment.find({})
    res.status(200).json({treatments: docs})
}

export default gettreatments