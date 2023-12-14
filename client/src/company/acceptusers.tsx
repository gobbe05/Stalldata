import { useEffect, useState } from "react"

function AcceptUsers() {
    const [users, setUsers] = useState([])
    useEffect(() => {
        fetch("/api/getunacceptedusers")
        .then((response) => response.json())
        .then((data) => setUsers(data.users))
    }, [])
    if(!users) return <></>
    else return (
        <>
            <div>
                {users.map((user: {username: string, email: string}) => 
                <div className="text-white">
                    <p>Username : {user.username}</p>
                    <p>Email : {user.email}</p>
                    <button className="btn btn-success">Accept</button>
                </div>)}
            </div>
        </>
    )
}

export default AcceptUsers