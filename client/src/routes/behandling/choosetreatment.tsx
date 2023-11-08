import { useContext, useEffect, useState } from "react"
import { useGlobalState } from "../../GlobalState"
import { useNavigate } from "react-router"
import { AlertContext } from "../../layout"

function ChooseTreatment() {
    const [name, setName] = useState("")
    const [message, setMessage] = useState("")
    const [globalState, updateGlobalState] = useGlobalState()
    const [treatments, setTreatments] = useState([])
    const navigate = useNavigate()
    const AddAlert = useContext(AlertContext)
    async function AddTreatmentToBox(name: string, box: string, boxid: string) {
        
        const response = await fetch("/api/addtreatmenttobox", {
            method: "POST",
            body: JSON.stringify({name: name, message: message, box: box, boxid: boxid, addedAt: new Date}),
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include"
        })
        if(response.status == 200) {
            AddAlert("success", "Successfully added a treatment to the box")
            navigate("/")
        }
        if(response.status == 401) AddAlert("danger", "You are unathorized to access this page")
        if(response.status == 500) AddAlert("danger", "There was an error handling your request")
    }

    useEffect(() => {
        if(!globalState.farm || !globalState.section || !globalState.box) navigate("/behandling")
        fetch("/api/gettreatments")
        .then((response) => response.json())
        .then((data) => {
            setTreatments(data.treatments)
            setName(data.treatments[0].name)
        })
    }, [])

    return (
        <>
            <form className="m-4">
                <p className="text-white">{globalState.farm && globalState.farm.name}\{globalState.section && globalState.section.name}\{globalState.box && globalState.box.name}</p>
                <select onChange={(event) => {setName(event.target.value)}} className="form-select">
                    {treatments.map((treatment: {name: string}) => 
                    <option className="text-white" value={treatment.name}>
                        {treatment.name}
                    </option>)}
                </select>
                <div className="form-floating my-2">
                    <textarea onChange={(event) => setMessage(event.target.value)} className="form-control" placeholder="Leave a comment here" id="floatingTextarea"></textarea>
                    <label htmlFor="floatingTextarea" className="text-white">Message</label>
                </div>
                <button className="btn btn-success w-100 my-2" onClick={() => {AddTreatmentToBox(name, globalState.box.name, globalState.box.id)}} type="button">Add Treatment to box</button>
            </form>
        </>
    )
}

export default ChooseTreatment