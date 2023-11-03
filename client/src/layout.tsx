import { Outlet } from "react-router"
import Header from "./header"
import {  createContext, useEffect, useState } from "react"
import { useGlobalState } from "./GlobalState"

export const AlertContext = createContext<any>(null)

function Layout() {
    const [globalState, updateGlobalState] = useGlobalState()
    function AddAlert(type: string, message: string) {
        setAlerts((prev: any) => {
            return [...prev, {type: type, message: message}]
        })
        setTimeout(() => {
            setAlerts((prev:any) => prev.slice(1))
        }, 3000)
    }
    const [alerts, setAlerts] = useState<Array<any>>([])

    useEffect(() => {
        fetch("/api/getauth")
        .then((response) => response.json())
        .then((data) => {
            if(data.auth == true) updateGlobalState("loggedin", true)
            if(data.role) updateGlobalState("role", data.role)
        })
    }, [])
    useEffect(() => {
        fetch("/api/getcurrentcompany", {
            method: "GET",
            credentials: "include"
        })
        .then((response) => response.json())
        .then((data) => {
            if(data.company) updateGlobalState("companyname", data.company.name)
            else updateGlobalState("companyname", "")
        }
            )
    }, [globalState.loggedin])

    return (
        <>
            <div className="bg-body min-vh-100 d-flex flex-column text-white" data-bs-theme="dark">
                <AlertContext.Provider value={AddAlert}>
                    <div>
                        <Header />
                    </div>
                    <Outlet />
                    <div className="fixed-bottom">
                        <Alerter alerts={alerts}/>
                    </div>
                </AlertContext.Provider>
            </div>
        </>
    )
}

function Alerter({alerts}: {alerts: Array<any>}) {
    return (
        <>
            {alerts.map((item) =>
                <div className={`alert alert-${item.type}`} role="alert">
                {item.message}
                </div>
            )}
        </>
    )
}

export default Layout