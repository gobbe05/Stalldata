import express from 'express'
import { Company } from '../models'

async function checkcompanycode(req: express.Request, res: express.Response) {
    try {
        const {code} = req.body
        const company = await Company.findOne({code: code})
        if(!company) return res.status(404).json({message: "Company not found"})
        return res.status(200).json({message: "Company found"})
    } catch (error) {
        return res.status(500).json({message: "There was an error validating the company code"})
    }
}

export default checkcompanycode