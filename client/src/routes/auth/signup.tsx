import { useEffect, useState } from "react"
import { useNavigate } from "react-router"
import { useGlobalState } from "../../GlobalState"

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
            <form>
            <div>
                    <p>Email</p>
                    <input onChange={(event) => setEmail(event.target.value)} name="email" />
                </div>
                <div>
                    <p>Username</p>
                    <input onChange={(event) => setUsername(event.target.value)} name="username" />
                </div>
                <div>
                    <p>Password</p>
                    <input onChange={(event) => setPassword(event.target.value)} name="password" />
                </div>
                <div>
                    <p>Confirm Password</p>
                    <input onChange={(event) => setPasswordConfirm(event.target.value)} name="passwordconfirm" />
                </div>
                <button onClick={FetchSignup} type="button">Sign Up</button>
            </form>
        </>
    )
}

export default Signup