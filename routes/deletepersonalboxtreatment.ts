import express from 'express'
import { BoxTreatment } from '../models'

async function deletepersonalboxtreatment(req: express.Request, res: express.Response){
    try {
        const user = res.locals.user
        const {treatedboxId} = req.body
        const deletedtreatment = await BoxTreatment.findOneAndDelete({_id: treatedboxId, treatedById: user._id})
        if(!deletedtreatment) return res.status(404).json({message: "User not found"})
        return res.status(200).json({message: `Deleted user ${deletedtreatment.name}`})
    } catch(error) {
        return res.status(500).json({message: "There was an error deleting the file", err: error})
    }
}

export default deletepersonalboxtreatment