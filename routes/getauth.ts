import jwt from 'jsonwebtoken'
import express from 'express'
import { User } from '../models'

function getauth(req: express.Request, res: express.Response) {
    jwt.verify(req.cookies.token, "secret", async (err: any, decoded: any) => {
        if(err) return res.status(401).json({auth: false})
        console.log(decoded)
        const user = await User.findOne({_id: decoded.userid})
        if(!user) return res.status(401).json({message: "User not found"})
        return res.status(200).json({role: user.role, auth: true})
    })
}

export default getauth