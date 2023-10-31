import { useEffect, useState } from "react"
import { useNavigate } from "react-router"
import { Link } from "react-router-dom"

function Data() {
    const [data, setData] = useState<string>("")
    const navigate = useNavigate()

    async function Logout() {
        const response = await fetch("/api/logout", {
          method: "POST",
          credentials: "include"
      })
      navigate("/login")
      }

    useEffect(() => {
        fetch("/api/getdata", {
          method: "GET"
        })
        .then((data) => data.json())
        .then((data) => setData(data.message))
      }, [])
    return (
        <>
            {data}
            {data == "Logged in" && <button onClick={Logout}>Logout</button>}
            {data != "Logged in" && <><Link to="/login">Login</Link><Link to="/signup">Signup</Link></>}
        </>
    )
}

export default Data