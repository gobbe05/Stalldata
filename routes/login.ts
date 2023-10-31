import bcrypt from 'bcrypt'
import express from 'express'
import jwt from 'jsonwebtoken'
import { User } from '../models'

async function login(req: express.Request, res: express.Response) {
    const {username, password} = req.body
    const dbUser = await User.findOne({username: username})
    if(!dbUser) return res.status(401).json({message: "User not found"})

    const hashedpassword = dbUser.password
    hashedpassword && bcrypt.compare(password, hashedpassword, (err, success) => {
        if(err) return res.status(500).json({error: err})
        if(!success) return res.status(401).json({message: "Invalid Password"})
        const token = jwt.sign({userid: dbUser._id, username: dbUser.username}, "secret")
        res.cookie("token", token)
        res.status(200).json({message: "success"})
    })
    
}
export default login