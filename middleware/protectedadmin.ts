import express from 'express'
import jwt from 'jsonwebtoken'
import { User } from '../models'

function ProtectedAdmin(req: express.Request, res: express.Response, next: express.NextFunction) {
    jwt.verify(req.cookies.token, "secret", async (err: any, decoded: any) => {
        if(err) return res.status(401).json({message: "not logged in"})
        const user = await User.findOne({_id: decoded.userid})
        if(!user) return res.status(400).json({message: "User not found"})
        if(user.accepted == false) return res.status(401).json({message: "User was not accepted"})
        if(user.role != "admin") return res.status(401).json({message: "You don't have access to this page"})
        next()
    })
}

export default ProtectedAdmin