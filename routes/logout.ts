import express from 'express'

function logout(req: express.Request, res: express.Response) {
    res.clearCookie('token');
    res.send(200)
}

export default logout