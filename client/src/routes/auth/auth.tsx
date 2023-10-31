import { Outlet, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

function Auth() {
  const navigate = useNavigate()

  useEffect(() => {
    fetch("/api/getauth", {
      method: "GET"
    })
    .then((data) => data.json())
    .then((data) => {if(data.auth == true) navigate("/")})
  }, [])
  return (
    <>
      <Outlet />
    </>
  )
}

export default Auth
