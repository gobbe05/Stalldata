import express from 'express'
import { Company } from '../models'

async function getcompanies(req: express.Request, res: express.Response) {
    try {
        const companies = await Company.find({})
        return res.status(200).json({companies: companies})
    } catch (error) {
        return res.status(500).json({message: "There was an error getting the companies"})
    }
}

export default getcompanies