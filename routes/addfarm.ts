import express from 'express'
import { Farm } from '../models'

async function addfarm(req: express.Request, res: express.Response) {
    try {
        /** Add farm */
        const {name} = req.body
        const company = res.locals.company
        if(name == "") return res.status(400).json({error: "Name can't be empty"})
        const farm = new Farm({
            name: name,
            company: company._id
        })
        await farm.save()
        res.status(200).json({message: "success"})
    }
    catch(err) {
        res.status(500).json({error: "There was an error when inserting the farm to the database"})
    }
}

export default addfarm