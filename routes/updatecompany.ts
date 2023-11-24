import express from 'express'
import { Company, User } from '../models'

async function updatecompany(req: express.Request, res: express.Response) {
    try {
        const {companyid, name, prevcode, code} = req.body

        const updatedCompany = await Company.findOneAndUpdate({_id: companyid}, {name: name, code: code})
        if(!updatedCompany) return res.status(400).json({message: "Company not found"})
        const updateUsers = await User.updateMany({company: prevcode}, {company: code}) 
        res.status(200).json({message: "Successfully update company", company: updatedCompany})
    } catch (error) {
        res.status(500).json({message: "There was an error updating the company"})
    }
}

export default updatecompany