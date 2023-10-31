import { Outlet } from "react-router"
import { Link } from "react-router-dom"

function Admin() {
    return (
        <>
            <Link to="createcompany">Create Company</Link>
            <Outlet />
        </>
    )
}

export default Admin