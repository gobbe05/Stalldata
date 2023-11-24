import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import Protected from './middleware/protected'
import { acceptuserroute, addboxroute, addfarmroute, addsectionroute, addtreatmentroute, addtreatmenttoboxroute, checkcompanycoderoute, createcompanyroute, getauthroute, getboxesroute, getcompanyusersroute, getcurrentcompanyroute, getfarmsroute, getprevioustreatmentsroute, getsectionsroute, gettreatedboxesroute, gettreatmentsroute, getunacceptedusersroute, loginroute, logoutroute, signuproute } from './routes/routes'
import GetCompany from './middleware/company'
import { Parser } from 'json2csv'
import { BoxTreatment } from './models'
import GetUser from './middleware/username'
const dotenv = require('dotenv');
dotenv.config();
mongoose.connect(process.env.DBSTRING)
const app = express()

/* Middleware */
app.use(cookieParser())
app.use(express.json())
app.use(cors({
    credentials: true
}))
app.use(express.static("dist"))

/* GET */
/* Get Authentication State */  app.get("/api/getauth", getauthroute)
/* Get Unaccepted Users */      app.get("/api/getunacceptedusers", Protected, getunacceptedusersroute)
/* Get Treated Boxes */         app.get("/api/gettreatedboxes", Protected, gettreatedboxesroute)
/* Get Previous Treatments */   app.get("/api/getprevioustreatments", Protected, getprevioustreatmentsroute)
/* Get Treatments */            app.get("/api/gettreatments", Protected, gettreatmentsroute)
/* Get Current Company */       app.get("/api/getcurrentcompany", Protected, getcurrentcompanyroute)
/* Get Farms By Company */      app.get("/api/getfarms", Protected, GetCompany, getfarmsroute)
/* Get Users By Company*/       app.get("/api/getcompanyusers", Protected, GetCompany, getcompanyusersroute)

/* POST */
/* Get Sections */              app.post("/api/getsections", Protected, getsectionsroute)
/* Get Boxes */                 app.post("/api/getboxes", Protected, getboxesroute)
/* Create new treatment */      app.post("/api/addtreatment", Protected, addtreatmentroute)
/* Create new farm*/            app.post("/api/addfarm", Protected, GetCompany, addfarmroute)
/* Create new section */        app.post("/api/addsection", Protected, addsectionroute)
/* Create box */                app.post("/api/addbox", Protected, addboxroute)
/* Add a new treatment to box*/ app.post("/api/addtreatmenttobox", Protected, GetCompany, GetUser, addtreatmenttoboxroute)
/* Create new company */        app.post("/api/createcompany", Protected, createcompanyroute)
/* Validate if company code is 
    Correct*/                   app.post("/api/checkcompanycode", checkcompanycoderoute)
/* Auth */
/* Accept User */               app.post("/api/acceptuser", Protected, acceptuserroute)
/* Login */                     app.post("/api/login", loginroute)
/* Signup */                    app.post("/api/signup", signuproute)
/* Logout */                    app.post("/api/logout", logoutroute)

app.get("/api/getcsv", async (req: express.Request, res: express.Response) => {
    const fields: Array<{label: string, value: string}> = [{
        label: "Name",
        value: "name"
    }, {
        label: "Box",
        value: "box"
    }, {
        label: "AddedAt",
        value: "addedAt"
    }]
    const docs = await BoxTreatment.find({})
    const json2csv = new Parser({fields: fields})

    try {
        const csv = json2csv.parse(docs)
        res.attachment('data.csv')
        res.status(200).send(csv)
    } catch (error: any) {
        console.log('error:', error.message)
        res.status(500).send(error.message)
    }
    
    
})
app.get("*", (req, res) => {
    res.sendFile(__dirname + "/dist/index.html")
})

app.listen(3000)
console.log("Listening on port 3000")