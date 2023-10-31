import { useEffect, useState } from "react"

function TreatedBoxes() {
    const [treatedboxes, setTreatedboxes] = useState([])

    useEffect(() => {
        fetch("/api/gettreatedboxes")
        .then((response) => response.json())
        .then((data) => {setTreatedboxes(data.boxtreatments)})
    }, [])
    return (
        <>
            <table className="table text-white">
                <thead>
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Box</th>
                        <th scope="col">Created At</th>
                    </tr>
                </thead>
                <tbody>
                    {treatedboxes.map((item: {_id: string, name: string, box: string, addedAt: string}) => 
                    <tr>
                        <td scope="row">{item.name}</td>
                        <td>{item.box}</td>
                        <td>{item.addedAt}</td>
                    </tr>)}
                </tbody>
            </table>
            
        </>
    )
}

export default TreatedBoxes