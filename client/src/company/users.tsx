import { useEffect, useState } from "react"

function Users() {
    const [users, setUsers] = useState([])
    
    useEffect(() => {
        fetch("/api/getcompanyusers")
        .then((response) => response.json())
        .then((data) => setUsers(data.users))
    }, [])

    return (
        <>
            {
                users.map((user: {_id: string, username: string, email: string, accepted: boolean}) => <User user={user}/>)
            }
        </>
    )
}

function User({user}: {user: {_id: string, username: string, email: string, accepted: boolean}}) {
    async function AcceptUser(id: string) {
        await fetch("/api/acceptuser", {
            method: "POST",
            body: JSON.stringify({
                id: id
            }),
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        })
    }
    
    return (
        <div>
            <p>{user.email}</p>
            <p>{user.username}</p>
            {user.accepted == false && <button className="btn btn-success" onClick={() => {AcceptUser(user._id)}}>Accept</button>}
        </div>
    )
}

export default Users