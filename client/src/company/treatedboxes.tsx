import { useEffect, useState } from "react"

function TreatedBoxes() {
    const [treatedboxes, setTreatedboxes] = useState([])

    useEffect(() => {
        fetch("/api/gettreatedboxes")
        .then((response) => response.json())
        .then((data) => {setTreatedboxes(data.boxtreatments)})
    }, [])

    async function DeleteBoxTreatment(boxid: string) {
        await fetch("/api/deleteboxtreatment", {
            method: "DELETE",
            body: JSON.stringify({
                treatedboxId: boxid
            }),
            headers: {
                "Content-Type" : "application/json"
            },
            credentials: "include"
        })
    }
    return (
        <>
            <div className="overflow-x-scroll m-4">
                <table className="table table-borderless table-striped text-white">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
                            <th scope="col">Box</th>
                            <th scope="col">Created At</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {treatedboxes.map((item: {_id: string, name: string, box: string, addedAt: string}, index: number) => 
                        <tr>
                            <td className="text-nowrap" scope="row">{index}</td>
                            <td className="text-nowrap">{item.name}</td>
                            <td className="text-nowrap">{item.box}</td>
                            <td className="text-nowrap">{item.addedAt}</td>
                            <td className="text-nowrap"><button onClick={() => {console.log(item)
                                DeleteBoxTreatment(item._id)}} className="btn btn-danger">Delete</button></td>
                        </tr>)}
                    </tbody>
                </table>
                <a href="/api/getcsv" target="_blank" rel="noopener noreferrer">Get CSV</a>
            </div>
            
        </>
    )
}

export default TreatedBoxes