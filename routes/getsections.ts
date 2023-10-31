import express from 'express'
import { Section } from '../models'

async function getsections(req: express.Request, res: express.Response) {
    const {farm} = req.body
    console.log(req.body)
    const docs = await Section.find({farm: farm})
    res.status(200).json({sections: docs})
}

export default getsections