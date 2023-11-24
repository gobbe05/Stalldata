import { useEffect, useState } from "react"

function AddFarm() {
    const [name, setName] = useState<string>("")
    const [description, setDescription] = useState<string>("")

    function AddNewFarm() {
        fetch("/api/addfarm", {
            method: "POST",
            body: JSON.stringify({name: name}),
            headers: {
                "Content-Type": "application/json",
              },
            credentials: "include"
        })
    }

    return (
        <>
        
            <form className="m-2 mt-4">
               <div className="form-floating my-2">
                <input id="floatingInput" className="form-control" onChange={(event) => {
                     setName(event.target.value)
                }}/>
                <label htmlFor="floatingInput">Treatment Name</label>
               </div>
               <div className="form-floating my-2">
                <textarea id="floatingInput" className="form-control" onChange={(event) => {
                     setDescription(event.target.value)
                }}/>
                <label htmlFor="floatingInput">Treatment Description</label>
               </div>
                <button className="btn btn-success w-100" onClick={AddNewFarm} type="button">Add</button>
            </form>
        
        </>
    )
}

export default AddFarm