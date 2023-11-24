import { useEffect, useState } from "react"
import { useNavigate } from "react-router"
import { Link } from "react-router-dom"
import { useGlobalState } from "../../GlobalState"

function Login() {
    const [username ,setUsername] = useState<string>("")
    const [password ,setPassword] = useState<string>("")
    const [globalState, updateGlobalState] = useGlobalState()
    const navigate = useNavigate()

    async function FetchLogin() {
        const response = await fetch("/api/login", {
            method: "POST",
            body: JSON.stringify({
                username: username,
                password: password
            }),
            headers: {
                "Content-Type": "application/json",
              },
            credentials: "include"
        })
        const data = await response.json()
        if(data.message == "success") {
            updateGlobalState("loggedin", true)
            navigate("/")
        }
    }
    function Form(event: any) {
        event.preventDefault()
        FetchLogin()
    }

    return (
        <>
            <form className="my-auto mx-4" onSubmit={Form}>
                <div className="form-floating my-2">
                    <input className="form-control" id="email" name="username" onChange={(event) => setUsername(event.target.value)} />
                    <label className="form-label" htmlFor="email">Username</label>
                </div>
                <div className="form-floating my-2">
                    <input className="form-control" id="password" type="password" name="password" onChange={(event) => setPassword(event.target.value)}  />
                    <label className="form-label" htmlFor="password">Password</label>
                </div>
                <button type="button" className="btn btn-success w-100" onClick={FetchLogin}>Login</button>
                <p className="mt-2">Don't have an account? <Link to="/auth/signup">Sign up</Link></p>
            </form>
        </>
    )
}

export default Login