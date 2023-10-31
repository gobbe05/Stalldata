import jwt from 'jsonwebtoken'
import express from 'express'

function getauth(req: express.Request, res: express.Response) {
    jwt.verify(req.cookies.token, "secret", (err: any, decoded: any) => {
        if(err) return res.status(401).json({auth: false})
        res.json({auth: true})
    })
}

export default getauth