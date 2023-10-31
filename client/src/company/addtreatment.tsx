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
            <form>
                <input onChange={(event) => {
                    setName(event.target.value)
                }}/>
                <button onClick={AddNewSection} type="button">Add</button>
            </form>
        </>
    )
}

export default AddTreatment