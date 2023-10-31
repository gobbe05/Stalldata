import express from 'express'
import { Treatment, User } from '../models'

async function addtreatment(req: express.Request, res: express.Response) {
    try {
        const {name} = req.body

        const treatmentExist = await User.findOne({name: name})
        if(treatmentExist) res.send(409).json({message: "Treatment already exists"})
        const treatment = new Treatment({
            name: name,
            treater: req
        })
        await treatment.save()
        res.status(200).json({message: "Treatment was added"})
    } catch(err) {
        res.status(500).json({message: "There was an error adding treatment", err: err})
    }
}

export default addtreatment