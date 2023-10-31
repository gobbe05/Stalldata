import express from 'express'
import { Company } from '../models'

async function checkcompanycode(req: express.Request, res: express.Response) {
    const {code} = req.body

    const company = Company.findOne({code: code})
    if(!company) res.status(404).json({message: "Company not found"})
    res.status(200).json({message: "company found"})
}

export default checkcompanycode