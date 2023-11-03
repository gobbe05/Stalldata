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
            <div className="d-flex flex-column gap-2 m-2">
                <Link className="btn bg-dark-subtle w-100" to="companies">Companies</Link>
                <Link className="btn bg-dark-subtle w-100" to="createcompany">Create Company</Link>
            </div>
            <div className="m-2">
            <Outlet />
            </div>
        </>
    )
}

export default Admin