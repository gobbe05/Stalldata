import { useEffect, useState } from "react"
import { useGlobalState } from "../GlobalState"

function AddBox() {
    const [name, setName] = useState<string>("")
    const [farms, setFarms] = useState([])
    const [sections, setSections] = useState<undefined | Array<any>>(undefined)
    const [section, setSection] = useState<undefined | string>()
    const [globalState, setGlobalState] = useGlobalState()

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
        
            <form>
                <select onChange={(event) => {GetSections(event.target.value)}}>
                    <option>Select Farm</option>
                    {farms.map((farm: {name: string, _id: string}) => 
                    <option value={farm._id}>
                        {farm.name}
                    </option>)}
                </select>

                {sections && 
                <select onChange={(event) => {setSection(event.target.value)}}>
                    {sections.map((section) => 
                    <option value={section._id}>
                        {section.name}
                    </option>)}
                </select>}

                <input onChange={(event) => {
                    setName(event.target.value)
                }}/>
                <button onClick={AddNewBox} type="button">Add</button>
            </form>
        
        </>
    )
}

export default AddBox