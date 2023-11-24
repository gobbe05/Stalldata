import express from 'express'
import { User } from '../models'

async function adminupdateuser(req: express.Request, res: express.Response) {
    try {
        const {userid, email, username, firstName, lastName} = req.body
        /* Validation */
        const updatedUser = await User.findOneAndUpdate({_id: userid}, {email: email, username: username, firstName: firstName, lastName: lastName})
        res.status(200).json({message: "User was updated", user: updatedUser})
    } catch (error) {
        res.status(500).json({message: "User could not be updated"})
    }
}

export default adminupdateuser