import express from 'express'
import { Box } from '../models'

async function addbox(req: express.Request, res: express.Response) {
    try {
        /** Add farm */
        const {name, section} = req.body
        if(name == "") return res.status(400).json({error: "Name can't be empty"})
        const box = new Box({
            name: name,
            section: section
        })
        await box.save()
        res.status(200).json({message: "success"})
    }
    catch(err) {
        res.status(500).json({error: "There was an error when inserting the farm to the database"})
    }
}

export default addbox