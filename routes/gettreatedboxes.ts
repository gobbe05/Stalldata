import { BoxTreatment } from "../models"
import express from 'express'

async function gettreatedboxes(req: express.Request, res: express.Response) {
    const docs = await BoxTreatment.find({})
    res.status(200).json({boxtreatments: docs})
}

export default gettreatedboxes