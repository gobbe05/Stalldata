import { useEffect } from "react"
import { Link, Outlet, useNavigate } from "react-router-dom"

function Admin() {
    const navigate = useNavigate()
    useEffect(() => {
        fetch("/api/getauth", {
            method: "GET",
            credentials: "include"
        })
        .then((response) => response.json())
        .then((data) => {if(data.role != "admin" && data.role != "companyadmin") navigate("/")})
    })
    return (
        <>
            
            <div className="navbar sticky-bottom d-flex flex-wrap text-center bg-body p-1">
                <div className="col">
                    <div className="row m-1">
                        <Link className="btn bg-dark-subtle p-3" to={"/company/addfarm"}>Add farm</Link>
                    </div>
                    <div className="row m-1">
                        <Link className="btn bg-dark-subtle p-3" to={"/company/addsection"}>Add section</Link>
                    </div>
                    <div className="row m-1">
                        <Link className="btn bg-dark-subtle p-3" to={"/company/addbox"}>Add Box</Link>
                    </div>
                    
                </div>
                <div className="col">
                    <div className="row m-1">
                        <Link className="btn bg-dark-subtle p-3" to={"/company/"}>Treatments</Link>
                    </div>
                    <div className="row m-1">
                        <Link className="btn bg-dark-subtle p-3" to={"/company/addtreatment"}>Add Treatment</Link>
                    </div>
                    <div className="row m-1">
                        <Link className="btn bg-dark-subtle p-3" to={"/company/users"}>Users</Link>
                    </div>
                </div>
            </div>
            <div>
                <Outlet />
            </div>
        </>
    )
}

export default Admin