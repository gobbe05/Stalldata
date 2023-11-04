import express from 'express'
import { Company, User } from '../models'
import bcrypt from 'bcrypt'

async function createcompanyadmin(req: express.Request, res: express.Response) {
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
        accepted: true,
        company: companycode,
        role: "companyadmin"
    })
    await user.save()
    res.status(200).json({message: "success"})
}

export default createcompanyadmin