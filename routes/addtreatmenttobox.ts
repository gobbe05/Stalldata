import express from 'express'
import jwt from 'jsonwebtoken'
import { BoxTreatment } from '../models'

async function addtreatmenttobox(req: express.Request, res: express.Response) {
    try {
        let userid = ""
        const {name, message, box, boxid, addedAt} = req.body
        const username = res.locals.user
        const company = res.locals.company
        jwt.verify(req.cookies.token, "secret", (err: any, decoded: any) => {
            if(err) return res.status(401).json({auth: false})
            userid = decoded.userid
        })
        const boxtreatment = new BoxTreatment({
            name: name,
            message: message,
            box: box,
            boxid: boxid,
            companyname: company.name,
            addedAt: addedAt,
            treatedBy: userid,
            treatedByName: username
        })
        await boxtreatment.save()
        res.status(200).json({message: "Treatment to box added"})
    }catch(err) {
        res.status(500).json({error: "There was an error when inserting the treatment to the box"})
    }
}

export default addtreatmenttobox