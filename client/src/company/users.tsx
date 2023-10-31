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
        <table className="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">First Name</th>
                        <th scope="col">Last Name</th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                {users.map((user: {_id: string, username: string, email: string, accepted: boolean}) => <User user={user}/>)}
                </tbody>
            </table>
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
        <tr>
            
            <td>{user.email}</td>
            <td>{user.username}</td>
            <td>{user.accepted == false && <button className="btn btn-success" onClick={() => {AcceptUser(user._id)}}>Accept</button>}</td>
        </tr>
    )
}

export default Users