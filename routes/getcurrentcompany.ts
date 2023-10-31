import express from 'express'
import jwt from 'jsonwebtoken'
import { Company, User } from '../models'

function getcurrentcompany(req: express.Request, res: express.Response) {
    const token = req.cookies.token 
    try {
        jwt.verify(token, "secret", async (err: any, decoded: any) => {
            if(err) return res.status(401).json({message: "There was an error authenticating", err: err})
            if(!decoded) return res.status(401).json({message: "Token is empty"})
            const user = await User.findOne({_id: decoded.userid})
            if(!user) return res.status(401).json({message: "User was not found"})
            const company = await Company.findOne({code: user.company})
            return res.status(200).json({company: company})
        })
    } catch(err) {
        return res.status(500).json({message: err})
    }
}

export default getcurrentcompany