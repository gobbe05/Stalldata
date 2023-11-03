import express from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { Company, User } from '../models'

async function signup(req: express.Request, res: express.Response) {
    const {email, username, firstName, lastName, password, confirmpassword, companycode} = req.body
    const usernameExists = await User.findOne({username: username})
    const emailExists = await User.findOne({email: email})

    if(usernameExists) return res.status(409).json({message: "Username already exists"})
    if(emailExists) return res.status(409).json({message: "Email already exists"})
    if(password != confirmpassword) return res.status(400).json({message: "Passwords don't match"})
    if(!await Company.findOne({code: companycode})) return res.status(400).json({message: "Company not found"})
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)
    const user = new User({
        email: email,
        username: username,
        firstName: firstName,
        lastName: lastName,
        password: hash,
        accepted: false,
        company: companycode
    })
    const saveduser = await user.save()
    const token = jwt.sign({username: saveduser.id}, "secret")
    res.cookie("token", token)
    res.status(200).json({message: "success"})
}

export default signup