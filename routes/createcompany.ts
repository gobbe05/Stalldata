import { Company } from "../models"
import express from 'express'

async function createcompany (req: express.Request, res: express.Response) {
    try {
        const {name, code} = req.body
        const checkName = await Company.findOne({name: name})
        const checkCode = await Company.findOne({code: code})
        if(checkCode || checkName) return res.status(409).json({message: "Code or name already exists"})
        const company = new Company({
            name: name,
            code: code
        })
        await company.save()
        return res.status(200).json({message: "Company added"})
    } catch(err) {
        res.send(500).json({message: "There was an error", err: err})
    }

}

export default createcompany