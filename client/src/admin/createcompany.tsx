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
        <form>
            <div>
                <input onChange={(event) => setName(event.target.value)} />
                <label>Company Name</label>
            </div>
            <div>
                <input onChange={(event) => setCode(event.target.value)} />
                <label>Company Code</label>
            </div>
            <button onClick={createCompany} type="button">Create Company</button>
        </form>
        </>
    )
}

export default CreateCompany