import { useEffect, useState } from "react"
import { useNavigate } from "react-router"
import { useGlobalState } from "../../GlobalState"
import Item from "./item"
import { Link } from "react-router-dom"
import { DisabledButton } from "./choosefarm"

function ChooseBox(){
    const [boxes, setBoxes] = useState([])
    const [globalState, updateGlobalState] = useGlobalState()
    const navigate = useNavigate()

    function Section(name: string, id: string) {
        updateGlobalState("box", {name: name, id: id})
    }

    useEffect(() => {
        if(!globalState.section) navigate("/behandling")
        updateGlobalState("behandling", {page: "box"})

        fetch("/api/getboxes", {
            method: "POST",
            body: JSON.stringify({
                section: globalState.section.id
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then((response) => response.json())
        .then((data) => {data.boxes && setBoxes(data.boxes)})
    }, [])
    return (
        <>
            <div className="d-flex flex-wrap gap-2 m-4">
                {boxes.map((item: any) => 
                <div className="w-100" onClick={() => {Section(item.name, item._id)}}>
                    <Item name={item.name} selected={globalState.box}/>
                </div>)}
                {globalState.box ? <Link to="/behandling/choosetreatment" className="btn btn-success  w-100">Next</Link> : <DisabledButton type="danger" message="Please choose a box before continuing"/>}
            </div>
        </>
    )
}

export default ChooseBox