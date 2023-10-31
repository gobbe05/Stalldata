import { useState } from "react"

function AddTreatment() {
    const [name, setName] = useState<string>("")

    function AddNewSection() {
        fetch("/api/addtreatment", {
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
            <form className="m-2">
                <div className="form-floating">
                    <input className="form-control" id="treatmentName" onChange={(event) => {
                        setName(event.target.value)
                    }}/>
                    <label htmlFor="treatmentName">Treatment Name</label>
                </div>
                <button className="btn btn-success my-2 w-100" onClick={AddNewSection} type="button">Add</button>
            </form>
        </>
    )
}

export default AddTreatment