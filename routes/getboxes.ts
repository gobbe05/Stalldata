import express from 'express'
import { Box } from "../models"

async function getboxes(req: express.Request, res: express.Response) {
    const {section} = req.body
    const docs = await Box.find({section: section})
    res.status(200).json({boxes: docs})
}

export default getboxes