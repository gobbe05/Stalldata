import express from 'express'
import { Company } from '../models'

async function deletecompany(req: express.Request, res: express.Response) {
    try {
        const {companyid} = req.body
        const deletedcompany = await Company.findOneAndDelete({_id: companyid})
        if(!deletedcompany) return res.status(404).json({message: "Company not found"})
        return res.status(200).json({message: "Deleted company"})
    } catch (error) {
        return res.status(500).json({message: "There was an error deleting the file", err: error})
    }
}

export default deletecompany