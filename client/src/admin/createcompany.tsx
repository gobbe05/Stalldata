import { useState } from "react"

function CreateCompany() {
    const [name, setName] = useState("")
    const [code, setCode] = useState("") 

    async function createCompany() {
        await fetch("/api/createcompany", {
            method: "POST",
            body: JSON.stringify({
                name: name,
                code: code
            }),
            headers: {
                'Content-Type' : 'application/json'
            },
            credentials: "include"
        })
    }

    return (
        <>
        <form className="m-2">
            <div className="form-floating my-2">
                <input id="companyName" className="form-control" onChange={(event) => setName(event.target.value)} />
                <label htmlFor="companyName">Company Name</label>
            </div>
            <div className="form-floating my-2">
                <input id="companyCode" className="form-control" onChange={(event) => setCode(event.target.value)} />
                <label htmlFor="companyCode">Company Code</label>
            </div>
            <button className="btn btn-success w-100" onClick={createCompany} type="button">Create Company</button>
        </form>
        </>
    )
}

export default CreateCompany