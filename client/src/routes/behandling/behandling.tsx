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
          <div className="mt-5 mx-4">
            <div className="d-flex">
              <Link className="btn btn-success rounded w-100 my-2 py-4 fs-2" to="choosefarm">Start treatment</Link>
            </div>
            <div className="mt-4 overflow-x-scroll">
              <table className="table table-striped fs-3">
                  <thead>
                      <tr className="fs-4">
                          <th scope="col">#</th>
                          <th scope="col">Name</th>
                          <th scope="col">Box</th>
                          <th scope="col">Created At</th>
                      </tr>
                  </thead>
                  <tbody>
                      {treatedboxes.map((item: {_id: string, name: string, box: string, addedAt: string}, index: number) => 
                      <tr className="fs-5">
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