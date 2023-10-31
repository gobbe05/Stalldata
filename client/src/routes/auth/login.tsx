import { useEffect, useState } from "react"
import { useNavigate } from "react-router"

function Login() {
    const [username ,setUsername] = useState<string>("")
    const [password ,setPassword] = useState<string>("")
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
            navigate("/")
        }
    }

    return (
        <>
            <form className="text-white">
                <div>
                    <label className="form-label" htmlFor="email">Username</label>
                    <input className="form-control" id="email" name="username" onChange={(event) => setUsername(event.target.value)} />
                </div>
                <div>
                    <label className="form-label" htmlFor="password">Password</label>
                    <input className="form-control" id="password" type="password" name="password" onChange={(event) => setPassword(event.target.value)}  />
                </div>
                <button type="button" className="btn btn-primary" onClick={FetchLogin}>Login</button>
            </form>
        </>
    )
}

export default Login