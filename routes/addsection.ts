import express from 'express'
import { Section } from '../models'

async function addsection(req: express.Request, res: express.Response) {
    try {
        /** Add farm */
        const {name, farmid} = req.body
        if(name == "") return res.status(400).json({error: "Name can't be empty"})
        const section = new Section({
            name: name,
            farm: farmid
        })
        await section.save()
        res.status(200).json({message: "success"})
    }
    catch(err) {
        res.status(500).json({error: "There was an error when inserting the farm to the database"})
    }
}

export default addsection