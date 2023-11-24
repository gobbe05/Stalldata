import { useEffect } from "react"
import { Outlet, useNavigate } from "react-router"
import { Link } from "react-router-dom"

function Admin() {
    const navigate = useNavigate()

    useEffect(() => {
        fetch("/api/getauth", {
            method: "GET",
            credentials: "include"
        })
        .then((response) => response.json())
        .then((data) => {if(data.role != "admin" ) navigate("/")})
    }, [])
    return (
        <>
            <div className="d-flex m-2">
                <div className="col">
                    <div className="row m-1">
                        <Link className="btn bg-dark-subtle p-3" to="createcompany">Create Company</Link>
                    </div>
                    <div className="row m-1">
                        <Link className="btn bg-dark-subtle p-3" to="createcompanyadmin">Create Company Admin</Link>
                    </div>
                    <div className="row m-1">
                        <Link className="btn bg-dark-subtle p-3" to="createadmin">Create Admin</Link>
                    </div>
                </div>
                <div className="col">
                    <div className="row m-1">
                        <Link className="btn bg-dark-subtle w-100 p-3" to="companies">Companies</Link>
                    </div>
                    <div className="row m-1">
                        <Link className="btn bg-dark-subtle w-100 p-3" to="users">Users</Link>
                    </div>
                </div>
            </div>
            <div className="m-2">
            <Outlet />
            </div>
        </>
    )
}

export default Admin