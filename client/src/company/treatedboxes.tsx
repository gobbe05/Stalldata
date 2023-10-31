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
            <div className="overflow-x-scroll m-4">
                <table className="table table-borderless table-striped text-white">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
                            <th scope="col">Box</th>
                            <th scope="col">Created At</th>
                        </tr>
                    </thead>
                    <tbody>
                        {treatedboxes.map((item: {_id: string, name: string, box: string, addedAt: string}, index: number) => 
                        <tr>
                            <td className="text-nowrap" scope="row">{index}</td>
                            <td className="text-nowrap">{item.name}</td>
                            <td className="text-nowrap">{item.box}</td>
                            <td className="text-nowrap">{item.addedAt}</td>
                        </tr>)}
                    </tbody>
                </table>
                <a href="/api/getcsv" target="_blank" rel="noopener noreferrer">Get CSV</a>
            </div>
            
        </>
    )
}

export default TreatedBoxes