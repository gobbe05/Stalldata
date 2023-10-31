import { useEffect, useState } from "react"
import Item from "./item"
import { useNavigate } from "react-router"
import { useGlobalState } from "../../GlobalState"
import { Link } from "react-router-dom"
import { DisabledButton } from "./choosefarm"

function ChooseSection() {
    const [sections, setSections] = useState([])
    const [globalState, updateGlobalState] = useGlobalState()
    const navigate = useNavigate()

    function Section(name: string, id: string) {
        updateGlobalState("section", {name: name, id: id})
        updateGlobalState("box", null)
    }

    useEffect(() => {
        if(!globalState.farm) navigate("/behandling/choosefarm")
        updateGlobalState("behandling", {page: "section"})
        fetch("/api/getsections", {
            method: "POST",
            body: JSON.stringify({
                farm: globalState.farm.id
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then((response) => response.json())
        .then((data) => {data.sections && setSections(data.sections)})
    }, [])
    return (
        <>
            <div className="d-flex flex-wrap gap-2 my-4">
                {sections.map((item: any) => 
                <div className="w-100" onClick={() => {Section(item.name, item._id)}}>
                    <Item name={item.name} selected={globalState.section}/>
                </div>)}
            </div>
            {globalState.section ? <Link to="/behandling/choosebox" className="btn btn-success  w-100">Next</Link> : <DisabledButton type="danger" message="Please choose a section before continuing"/>}
        </>
    )
}

export default ChooseSection