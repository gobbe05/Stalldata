import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

function Behandling() {
  const [treatedboxes, setTreatedboxes] = useState([])
  useEffect(() => {
    fetch("/api/getprevioustreatments")
    .then((response) => response.json())
    .then((data) => data.treatments && setTreatedboxes(data.treatments))
  }, [])
      
    return (
        <>
          <div className="m-3">
            <div className="d-flex my-2">
              <Link className="btn btn-success rounded w-100 my-2 py-3" to="choosefarm">Start treatment</Link>
            </div>
              <div className="overflow-x-scroll rounded m-3">
                <table className="table table-borderless table-striped caption-top ">
                    <caption className="fs-5">Your previous treatments</caption>
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
              </div>
            </div>
        </>
    )
}

export default Behandling