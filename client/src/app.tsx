import { useEffect } from "react"
import { Outlet } from "react-router"
import { useGlobalState } from "./GlobalState"

function App() {
    const [globalState, updateGlobalState] = useGlobalState()

    useEffect(() => {
        fetch("/api/getauth")
        .then((response) => response.json())
        .then((data) => {
            if(data.auth == true) updateGlobalState("loggedin", true)
        })
    }, [])
    return (
        <>
            <Outlet />
        </>
    )
}

export default App