import { useState } from "react"
import { useGlobalState } from "../../GlobalState"
import { useNavigate } from "react-router"
import { Link } from "react-router-dom"

function ChooseCompany() {
    const [code, setCode] = useState("")
    const [globalState, updateGlobalState] = useGlobalState()
    const navigate = useNavigate()

    async function checkCode(code: string) {
        const respone = await fetch("/api/checkcompanycode/", {
            method: "POST",
            body: JSON.stringify({code: code})
        })
        if(respone.status == 200) {
            updateGlobalState("companycode", code)
            navigate("/auth/signup")
        }
    }

    return (
        <>
            <form className="my-auto mx-4">
                <p className="mb-4">Enter your company's private signup code</p>
                <div className="form-floating my-2">
                    <input className="form-control" id="companycode" onChange={(event) => {setCode(event.target.value)}} />
                    <label htmlFor="companycode">Company Code</label>
                </div>
                <button className="btn btn-success w-100" type="button" onClick={() => {checkCode(code)}}>Submit</button>
                <p className="mt-2">Already have an account? <Link to="/auth/login">Login</Link></p>
            </form>
        </>
    )
}

export default ChooseCompany