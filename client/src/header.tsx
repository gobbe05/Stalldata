import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useGlobalState } from "./GlobalState"

function Header() {
    const [globalState, updateGlobalState] = useGlobalState()
    const navigate = useNavigate()

    function Logout() {
        fetch("/api/logout", {
            method: "POST",
            credentials: "include"
        })
        .then((response) => {
            if(response.status == 200) {
                updateGlobalState("loggedin", false)
                navigate("/auth/login")
            }
        })
    }

    useEffect(() => {
        fetch("/api/getauth")
        .then((response) => response.json())
        .then((data) => {
            if(data.auth == true) updateGlobalState("loggedin", true)
        })
    }, [])
    return (
        <>
        <nav className="navbar bg-dark-subtle">
            <div className="container-fluid">
                <a className="navbar-brand m-2" href="#"><h1>Stalldata</h1></a>
                <button className="bg-transparent border-0" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
                  <span className="navbar-toggler-icon"></span>
                </button>
                <div className="offcanvas offcanvas-end" tabIndex={-1} id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
                    <div className="offcanvas-header">
                        <h1 className="offcanvas-title" id="offcanvasNavbarLabel">Stalldata</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                    </div>
                    <div className="offcanvas-body">
                        <ul className="navbar-nav justify-content-center p-4 fs-1">
                                {!globalState.loggedin && 
                                <>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/auth/login">Login</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/auth/signup">Sign Up</Link>
                                    </li>
                                </>}
                                
                                
                                {globalState.loggedin && 
                                <>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/">Home</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/behandling">Behandling</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/company">Company</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/admin">Admin</Link>
                                    </li>
                                    <button className="btn btn-danger mt-4 fs-2 p-2" onClick={Logout}>Logout</button>
                                </>}
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
        
        </>
    )
}

export default Header