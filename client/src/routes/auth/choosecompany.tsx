import { useContext, useState } from "react"
import { useGlobalState } from "../../GlobalState"
import { useNavigate } from "react-router"
import { Link } from "react-router-dom"
import { AlertContext } from "../../layout"

function ChooseCompany() {
    const [code, setCode] = useState("")
    const [globalState, updateGlobalState] = useGlobalState()
    const navigate = useNavigate()
    const AddAlert = useContext(AlertContext)

    async function checkCode(code: string) {
        const respone = await fetch("/api/checkcompanycode/", {
            method: "POST",
            body: JSON.stringify({code: code}),
            headers: {
                "Content-Type" : "application/json"
            },
            credentials: "include"
        })
        if(respone.status == 200) {
            updateGlobalState("companycode", code)
            navigate("/auth/signup")
        } else {
            AddAlert("danger", "The company does not exist")
        }
    }
    function Form(event: any, code: string) {
        event.preventDefault()
        checkCode(code)
    }

    return (
        <>
            <form className="my-auto mx-4" onSubmit={(event: any) => Form(event, code)}>
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