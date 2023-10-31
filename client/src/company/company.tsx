import { Link, Outlet } from "react-router-dom"

function Admin() {
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