import express from 'express'
import { User } from "../models"

async function acceptuser(req: express.Request, res: express.Response) {
    const {id} = req.body
    await User.findOneAndUpdate({_id: id}, {accepted: true})
    return res.status(200).json({message: "User accepted"})
}

export default acceptuser