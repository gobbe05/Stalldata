import express from 'express'
import jwt from 'jsonwebtoken'
import { Company, User } from '../models'


function GetCompany(req: express.Request, res: express.Response, next: express.NextFunction) {
    const token = req.cookies.token 
    jwt.verify(token, "secret", async (err: any, decoded: any) => {
        if(err) return res.status(401).json({message: "There was an error authenticating", err: err})
        if(!decoded) return res.status(401).json({message: "Token is empty"})
        const user = await User.findOne({_id: decoded.username})
        if(!user) return res.status(401).json({message: "User was not found"})
        const company = await Company.findOne({code: user.company})
        res.locals.company = company
        next()
    })
}

export default GetCompany