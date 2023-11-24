import bcrypt from 'bcrypt'
import express from 'express'
import jwt from 'jsonwebtoken'
import { User } from '../models'

async function login(req: express.Request, res: express.Response) {
    try {
        const {username, password} = req.body
        const dbUser = await User.findOne({username: username})
        if(!dbUser) return res.status(401).json({message: "User not found"})

        const hashedpassword = dbUser.password
        hashedpassword && bcrypt.compare(password, hashedpassword, (err, success) => {
            if(err) return res.status(401).json({error: err})
            if(!success) return res.status(401).json({message: "Invalid Password"})
            const token = jwt.sign({userid: dbUser._id, username: dbUser.username}, "secret")
            res.cookie("token", token)
            res.status(200).json({message: "success"})
        })
    } catch (error) {
        return res.status(401).json({message: "There was an error authenticating user"})
    }
    
}
export default login