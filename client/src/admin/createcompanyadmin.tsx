import { useContext, useState } from "react"
import { Link } from "react-router-dom"
import { AlertContext } from "../layout"
import { useGlobalState } from "../GlobalState"

function CreateCompanyAdmin() {
    const [email, setEmail] = useState<string>("")
    const [username ,setUsername] = useState<string>("")
    const [firstName, setFirstName] = useState<string>("")
    const [lastName, setLastName] = useState<string>("")
    const [password ,setPassword] = useState<string>("")
    const [passwordconfirm, setPasswordConfirm] = useState<string>("")
    const [code, setCode] = useState<string>("")

    const AddAlert = useContext(AlertContext)
    
    async function FetchSignup() {
        const response = await fetch("/api/createcompanyadmin", {
            method: "POST",
            body: JSON.stringify({
                email: email,
                username: username,
                firstName: firstName,
                lastName: lastName,
                password: password,
                confirmpassword: password,
                companycode: code
            }),
            headers: {
                "Content-Type": "application/json",
              },
            credentials: "include"
        })
        const data = await response.json()
        if(data.message == "success") AddAlert("success", "Admin user added")
    }
    function Form(event: any) {
        event.preventDefault()
        FetchSignup()
    }

    return (
        <>
        <form className="my-auto mx-4" onSubmit={Form}>
            <div className="form-floating my-5">
                    <input className="form-control" id="enterCode" onChange={(event) => setCode(event.target.value)} name="passwordconfirm" />
                    <label htmlFor="enterCode">Company Code</label>
                </div>
                <div className="form-floating my-2">
                    <input className="form-control" id="enterEmail" onChange={(event) => setEmail(event.target.value)} name="email" />
                    <label htmlFor="enterEmail">Email</label>
                </div>
                <div className="form-floating my-2">
                    <input className="form-control" id="enterUsername" onChange={(event) => setUsername(event.target.value)} name="username" />
                    <label htmlFor="enterUsername">Username</label>
                </div>
                <div className="form-floating my-2">
                    <input className="form-control" id="firstName" onChange={(event) => setFirstName(event.target.value)} name="username" />
                    <label htmlFor="firstName">First Name</label>
                </div>
                <div className="form-floating my-2">
                    <input className="form-control" id="lastName" onChange={(event) => setLastName(event.target.value)} name="username" />
                    <label htmlFor="lastName">Last Name</label>
                </div>
                <div className="form-floating my-2">
                    <input className="form-control" id="enterPassword" onChange={(event) => setPassword(event.target.value)} name="password" />
                    <label htmlFor="enterPassword">Password</label>
                </div>
                <div className="form-floating my-2">
                    <input className="form-control" id="enterConfirmPassword" onChange={(event) => setPasswordConfirm(event.target.value)} name="passwordconfirm" />
                    <label htmlFor="enterConfirmPassword">Confirm Password</label>
                </div>
                <button className="btn btn-success w-100" onClick={FetchSignup} type="button">Sign Up</button>
            </form>
        </>
    )
}

export default CreateCompanyAdmin