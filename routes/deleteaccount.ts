import express from 'express'
import { User } from '../models'

async function deleteaccount(req: express.Request, res: express.Response) {
    try {
        const {uid, username} = req.body
        const deleteduser = await User.findOneAndDelete({_id: uid, username: username})
        if(!deleteduser) return res.status(404).json({message: "User not found"})
        return res.status(200).json({message: `Deleted user ${deleteduser.username}`})
    } catch (error) {
        return res.status(500).json({message: "There was an error deleting the file", err: error})
    }
}

export default deleteaccount