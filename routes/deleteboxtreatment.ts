import express from 'express'
import { BoxTreatment } from '../models'

async function deleteboxtreatment(req: express.Request, res: express.Response){
    try {
        const {treatedboxId} = req.body
        console.log(treatedboxId)
        const deletedtreatment = await BoxTreatment.findOneAndDelete({_id: treatedboxId})
        if(!deletedtreatment) return res.status(404).json({message: "User not found"})
        return res.status(200).json({message: `Deleted box ${deletedtreatment._id}`})
    } catch(error) {
        return res.status(500).json({message: "There was an error deleting the file", err: error})
    }
}

export default deleteboxtreatment