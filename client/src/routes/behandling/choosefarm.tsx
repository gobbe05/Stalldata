import { useContext, useEffect, useState } from "react"
import Item from "./item"
import { useGlobalState } from "../../GlobalState"
import { Link } from "react-router-dom"
import { AlertContext } from "../../layout"

function ChooseFarm() {
    const [farms, setFarms] = useState([])
    const [globalState, updateGlobalState] = useGlobalState()

    function Farm(name: string, id: string) {
        updateGlobalState("farm", {name: name, id: id})
        updateGlobalState("section", null)
        updateGlobalState("box", null)
    }

    useEffect(() => {
        updateGlobalState("behandling", {page: "farm"})

        fetch("/api/getfarms")
        .then((response) => response.json())
        .then((data) => {data.farms && setFarms(data.farms)})
    }, [])
    return (
        <>
        <div className="d-flex flex-wrap gap-2 m-4">
            {farms.map((item: any) => 
            <div className={`w-100`} onClick={() => {Farm(item.name, item._id)}}>
                <Item name={item.name} selected={globalState.farm}/>
            </div>)}
            {globalState.farm ? <Link to="/behandling/choosesection" className="btn btn-success w-100">Next</Link> : <DisabledButton type="danger" message="Please choose a farm before continuing" />}
        </div>
        </>
    )
}

export function DisabledButton({type, message} : {type: string, message: string}) {
    const AddAlert = useContext(AlertContext)
    function Warning(type: string, message: string) {
        AddAlert(type, message)   
    }

    return (
        <div className="w-100" onClick={() => {Warning(type, message)}}>
            <button className="btn btn-secondary w-100" disabled>Next</button>
        </div>
        
    )
}

export default ChooseFarm