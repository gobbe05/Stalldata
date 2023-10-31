import { useEffect, useState } from "react"

function AddSection() {
    const [name, setName] = useState<string>("")
    const [farmid, setFarmid] = useState("")
    const [farms, setFarms] = useState([])

    function AddNewSection() {
        fetch("/api/addsection", {
            method: "POST",
            body: JSON.stringify({name: name, farmid: farmid}),
            headers: {
                "Content-Type": "application/json",
              },
            credentials: "include"
        })
    }

    useEffect(() => {
        fetch("/api/getfarms")
        .then((response) => response.json())
        .then((data) => {
            setFarms(data.farms)
            setFarmid(data.farms[0]._id)
        })
    }, [])

    return (
        <>
        
            <form>
                <select onChange={(event) => {setFarmid(event.target.value)}} className="form-select">
                    {farms.map((farm: {name: string, _id: string}) => 
                        <option value={farm._id}>
                            {farm.name}
                        </option>
                    )}
                </select>
                <input onChange={(event) => {
                    setName(event.target.value)
                }}/>
                <button onClick={AddNewSection} type="button">Add</button>
            </form>
        
        </>
    )
}

export default AddSection