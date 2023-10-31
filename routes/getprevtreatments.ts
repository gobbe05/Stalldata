import jwt from 'jsonwebtoken'
import { BoxTreatment } from '../models'
import express from 'express'

async function getprevioustreatments(req: express.Request, res: express.Response) {
    let userid = ""
    jwt.verify(req.cookies.token, "secret", (err: any, decoded: any) => {
        if(err) return res.status(401).json({auth: false})
        userid = decoded.username
    })
    const docs = await BoxTreatment.find({treatedBy: userid})
    res.status(200).json({treatments: docs})
}

export default getprevioustreatments