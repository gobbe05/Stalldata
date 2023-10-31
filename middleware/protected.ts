import jwt from 'jsonwebtoken'
import express from 'express'
import { User } from '../models'

function Protected(req: express.Request, res: express.Response, next: express.NextFunction) {
    jwt.verify(req.cookies.token, "secret", async (err: any, decoded: any) => {
        if(err) return res.status(401).json({message: "not logged in"})
        const user = await User.findOne({_id: decoded.username})
        if(user?.accepted == false) return res.status(401).json({message: "User was not accepted"})  
        next()
    })
}

export default Protected