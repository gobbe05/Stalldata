import express from 'express'
import jwt from 'jsonwebtoken'


function GetUser(req: express.Request, res: express.Response, next: express.NextFunction) {
    const token = req.cookies.token 
    jwt.verify(token, "secret", async (err: any, decoded: any) => {
        if(err) return res.status(401).json({message: "There was an error authenticating", err: err})
        if(!decoded) return res.status(401).json({message: "Token is empty"})
        const user = decoded.username
        if(!user) return res.status(401).json({message: "User was not found"})
        res.locals.user = user
        next()
    })
}

export default GetUser