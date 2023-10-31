import { useEffect } from "react"
import { Link, Outlet } from "react-router-dom"
import {useState} from 'react'

function Admin() {
    const [companyName, setCompanyName] = useState<string>("")

    useEffect(() => {
        fetch("/api/getcurrentcompany", {
            method: "GET",
            credentials: "include"
        })
        .then((response) => response.json())
        .then((data) => {setCompanyName(data.company.name)})
    }, [])
    return (
        <>
            
            <div className="d-flex flex-wrap text-center m-1">
                <div className="col">
                    <div className="row m-1">
                        <Link className="btn bg-dark-subtle p-3" to={"/company/addfarm"}>Add farm</Link>
                    </div>
                    <div className="row m-1">
                        <Link className="btn bg-dark-subtle p-3" to={"/company/addsection"}>Add section</Link>
                    </div>
                    <div className="row m-1">
                        <Link className="btn bg-dark-subtle p-3" to={"/company/addtreatment"}>Add Treatment</Link>
                    </div>
                    
                    
                </div>
                <div className="col">
                    <div className="row m-1">
                        <Link className="btn bg-dark-subtle p-3" to={"/company/treatedboxes"}>Treatments</Link>
                    </div>
                    <div className="row m-1">
                        <Link className="btn bg-dark-subtle p-3" to={"/company/addbox"}>Add Box</Link>
                    </div>
                    <div className="row m-1">
                        <Link className="btn bg-dark-subtle p-3" to={"/company/users"}>Users</Link>
                    </div>
                </div>
                
                
                
                
                
                
            </div>
            <div>
                <p>{companyName}</p>
            </div>
            <div>
                <Outlet />
            </div>
        </>
    )
}

export default Admin