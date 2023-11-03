import mongoose from "mongoose"

const UserSchema = new mongoose.Schema({
    email: String,
    username: String,
    firstName: String,
    lastName: String,
    password: String,
    accepted: Boolean,
    company: String,
    role: String  
})
export const User = mongoose.model("User", UserSchema)

const FarmSchema = new mongoose.Schema({
    name: String,
    company: String
})
export const Farm = mongoose.model("Farm", FarmSchema)

const SectionSchema = new mongoose.Schema({
    name: String,
    farm: String,
    farmid: String
})
export const Section = mongoose.model("Section", SectionSchema)

const BoxSchema = new mongoose.Schema({
    name: String,
    section: String,
    sectionid: String
})
export const Box = mongoose.model("Box", BoxSchema)

const TreatmentSchema = new mongoose.Schema({
    name: String
})
export const Treatment = mongoose.model("Treatment", TreatmentSchema)

const BoxTreatmentSchema = new mongoose.Schema({
    name: String,
    box: String,
    boxid: String,
    companyname: String,
    addedAt: Date,
    treatedBy: String,
    treatedByName: String,
})

export const BoxTreatment = mongoose.model("BoxTreatment", BoxTreatmentSchema)

const CompanySchema = new mongoose.Schema({
    name: String,
    code: String
})

export const Company = mongoose.model("Company", CompanySchema)