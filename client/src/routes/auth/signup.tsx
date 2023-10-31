import { useEffect, useState } from "react"
import { useNavigate } from "react-router"
import { useGlobalState } from "../../GlobalState"
import { Link } from "react-router-dom"

function Signup() {
    const [email, setEmail] = useState<string>("")
    const [username ,setUsername] = useState<string>("")
    const [password ,setPassword] = useState<string>("")
    const [passwordconfirm, setPasswordConfirm] = useState<string>("")
    const [globalState, updateGlobalState] = useGlobalState()
    const navigate = useNavigate()

    async function FetchSignup() {
        const response = await fetch("/api/signup", {
            method: "POST",
            body: JSON.stringify({
                email: email,
                username: username,
                password: password,
                confirmpassword: password,
                companycode: globalState.companycode
            }),
            headers: {
                "Content-Type": "application/json",
              },
            credentials: "include"
        })
        const data = await response.json()
        if(data.message == "success") navigate("/")
    }

    useEffect(() => {
        if(!globalState.companycode) navigate("/auth/company")
    }, [])

    return (
        <>
            <form className="my-auto mx-4">
                <div className="form-floating my-2">
                    <input className="form-control" id="enterEmail" onChange={(event) => setEmail(event.target.value)} name="email" />
                    <label htmlFor="enterEmail">Email</label>
                </div>
                <div className="form-floating my-2">
                    <input className="form-control" id="enterUsername" onChange={(event) => setUsername(event.target.value)} name="username" />
                    <label htmlFor="enterUsername">Username</label>
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
                <p className="mt-2">Already have an account? <Link to="/auth/login">Login</Link></p>
            </form>
        </>
    )
}

export default Signup