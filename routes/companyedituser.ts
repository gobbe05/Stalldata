import express from 'express'
import { User } from '../models'

async function companyedituser(req: express.Request, res: express.Response){
    try {
        const {userid, firstName, lastName} = req.body
        const user = await User.findOne({_id: res.locals.id})
        const company = user?.company
        
        
        const editUser = await User.findOne({_id: userid})
        if(!editUser) return res.status(404).json({message: "The user you are trying to find does not exist"})
        if(editUser.company != company) return res.status(400).json({message: "The user you are trying to edit is not apart of your company"})
        const updateUser = await User.updateOne({_id: userid}, {firstName: firstName, lastName: lastName})
        if(!updateUser) res.status(500).json({message: "There was an error updating the user"})
        return res.status(200).json({message: "Successfully edited the user"})
    } catch (error) {
        return res.status(500).json({message: "There was an error updating the user", error: error})
    }
}

export default companyedituser