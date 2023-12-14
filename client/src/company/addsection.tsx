import { useEffect, useState } from "react"

function AddSection() {
    const [name, setName] = useState<string>("")
    const [farmid, setFarmid] = useState("")
    const [farms, setFarms] = useState<Array<any> | undefined>()

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
            if(!data.farms) return
            setFarms(data.farms)
            setFarmid(data.farms[0]._id)
        })
    }, [])

    if(!farms) return <h1>No farms found!</h1>
    else return (
        <>
        
            <form className="m-2 mt-4">
                <div className="form-floating my-2">
                    <select id="selectFarm" onChange={(event) => {setFarmid(event.target.value)}} className="form-select">
                        {farms.map((farm: {name: string, _id: string}) => 
                            <option value={farm._id}>
                                {farm.name}
                            </option>
                        )}
                    </select>
                    <label htmlFor="selectFarm">Select Farm</label>
                </div>
                <div className="form-floating my-2">
                    <input id="sectionName" className="form-control" onChange={(event) => {
                        setName(event.target.value)
                    }}/>
                    <label htmlFor="sectionName">Section Name</label>
                </div>
                <button className="btn btn-success w-100" onClick={AddNewSection} type="button">Add</button>
                
            </form>
        
        </>
    )
}

export default AddSection