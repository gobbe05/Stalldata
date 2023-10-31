import { useEffect, useState } from "react"
import { useGlobalState } from "../GlobalState"

function AddBox() {
    const [name, setName] = useState<string>("")
    const [farms, setFarms] = useState([])
    const [sections, setSections] = useState<undefined | Array<any>>(undefined)
    const [section, setSection] = useState<undefined | string>()

    function AddNewBox() {
        fetch("/api/addbox", {
            method: "POST",
            body: JSON.stringify({name: name, section: section}),
            headers: {
                "Content-Type": "application/json",
              },
            credentials: "include"
        })
    }

    async function GetSections(farm: string) {
        const response = await fetch("/api/getsections", {
            method: "POST",
            body: JSON.stringify({farm: farm}),
            headers: {
                "Content-Type": 'application/json'
            },
            credentials: "include"
        })
        const data = await response.json()
        setSections(data.sections)
        setSection(data.sections[0]._id)
        
    }

    useEffect(() => {
        fetch("/api/getfarms")
        .then((response) => response.json())
        .then((data) => {setFarms(data.farms)})
    },[])

    return (
        <>
        
            <form className="m-2">
                <div className="form-floating my-2">
                    <select className="form-control" id="selectFarm" onChange={(event) => {GetSections(event.target.value)}}>
                        <option>Select Farm</option>
                        {farms.map((farm: {name: string, _id: string}) => 
                        <option value={farm._id}>
                            {farm.name}
                        </option>)}
                    </select>
                    <label htmlFor="selectFarm">Select Farm</label>
                </div>

                {sections && 
                <div className="form-floating my-2">
                    <select id="selectSection" className="form-control" onChange={(event) => {setSection(event.target.value)}}>
                        {sections.map((section) => 
                        <option value={section._id}>
                            {section.name}
                        </option>)}
                    </select>
                    <label htmlFor="selectSection">Select Section</label>
                </div>}

                <div className="form-floating my-2">
                    <input className="form-control" id="boxName" onChange={(event) => {
                        setName(event.target.value)
                    }}/>
                    <label htmlFor="boxName">Box Name</label>
                </div>
                <button className="btn btn-success w-100" onClick={AddNewBox} type="button">Add</button>
            </form>
        
        </>
    )
}

export default AddBox