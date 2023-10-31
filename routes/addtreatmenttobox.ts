import express from 'express'
import jwt from 'jsonwebtoken'
import { BoxTreatment } from '../models'

async function addtreatmenttobox(req: express.Request, res: express.Response) {
    try {
        let userid = ""
        const {name, box, boxid, addedAt} = req.body
        jwt.verify(req.cookies.token, "secret", (err: any, decoded: any) => {
            if(err) return res.status(401).json({auth: false})
            userid = decoded.username
        })
        const boxtreatment = new BoxTreatment({
            name: name,
            box: box,
            boxid: boxid,
            addedAt: addedAt,
            treatedBy: userid
        })
        await boxtreatment.save()
        res.status(200).json({message: "Treatment to box added"})
    }catch(err) {
        res.status(500).json({error: "There was an error when inserting the treatment to the box"})
    }
}

export default addtreatmenttobox