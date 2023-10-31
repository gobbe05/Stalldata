import { useState } from "react"
import { useGlobalState } from "../../GlobalState"
import { useNavigate } from "react-router"

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
            <form className="m-auto">
                <input onChange={(event) => {setCode(event.target.value)}} />
                <button type="button" onClick={() => {checkCode(code)}}>Submit</button>
            </form>
        </>
    )
}

export default ChooseCompany