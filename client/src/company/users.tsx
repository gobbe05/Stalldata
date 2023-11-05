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
        <div className="overflow-x-scroll m-2">
            <table className="table table-borderless table-striped">
                <thead>
                    <tr>
                        <th className="text-nowrap" scope="col">Email</th>
                        <th className="text-nowrap" scope="col">Username</th>
                        <th className="text-nowrap" scope="col">First Name</th>
                        <th className="text-nowrap" scope="col">Last Name</th>
                        <th scope="col"></th>
                        <th scope="col"></th>
                        <th scope="col"></th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                {users && users.map((user: {_id: string, username: string, firstName: string, lastName: string, email: string, accepted: boolean}) => <User user={user}/>)}
                </tbody>
            </table>
        </div>
        
        </>
    )
}

function User({user}: {user: {_id: string, username: string, firstName: string, lastName: string, email: string, accepted: boolean}}) {
    const [editUser, setEditUser] = useState<boolean>(false)
    const [emailInput, setEmailInput] = useState<string>("")
    const [usernameInput, setUsernameInput] = useState<string>(user.username)
    const [firstNameInput, setFirstNameInput] = useState<string>(user.firstName)
    const [lastNameInput, setLastNameInput] = useState<string>(user.lastName)

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

    async function EditUser() {
        await fetch("/api/companyupdateuser", {
            method: "PATCH",
            body: JSON.stringify({
                userid: user._id,
                email: emailInput,
                username: usernameInput,
                firstName: firstNameInput,
                lastName: lastNameInput
            }),
            headers: {
                "Content-Type" : 'application/json'
            },
            credentials: "include"
        })
    }

    async function DeleteUser() {
        await fetch("/api/deleteaccount", {
            method: "DELETE",
            body: JSON.stringify({
                uid: user._id,
                username: user.username
            }),
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include"
        })
    }
    
    if(editUser) {
            return (
                <tr>
                    <td className="text-nowrap"><input onChange={(event) => setEmailInput(event.target.value)} defaultValue={user.email}/></td>
                    <td className="text-nowrap"><input onChange={(event) => setUsernameInput(event.target.value)} defaultValue={user.username}/></td>
                    <td className="text-nowrap"><input onChange={(event) => setFirstNameInput(event.target.value)} defaultValue={user.firstName}/></td>
                    <td className="text-nowrap"><input onChange={(event) => setLastNameInput(event.target.value)} defaultValue={user.lastName}/></td>
                    <td className="text-nowrap">{user.accepted == false && <button className="btn btn-success" onClick={() => {AcceptUser(user._id)}}>Accept</button>}</td>
                    <td className="text-nowrap"><button onClick={EditUser} className="btn btn-success">Submit</button></td>
                    <td className="text-nowrap"><button onClick={() => {setEditUser(prev => !prev)}} className="btn btn-warning">Edit</button></td>
                    <td className="text-nowrap"><button onClick={DeleteUser} className="btn btn-danger">Delete</button></td>
                </tr>
            )
    } else {
        return (
            <tr>
                <td className="text-nowrap">{user.email}</td>
                <td className="text-nowrap">{user.username}</td>
                <td className="text-nowrap">{user.firstName}</td>
                <td className="text-nowrap">{user.lastName}</td>
                <td className="text-nowrap">{user.accepted == false && <button className="btn btn-success" onClick={() => {AcceptUser(user._id)}}>Accept</button>}</td>
                <td></td>
                <td className="text-nowrap"><button onClick={() => {setEditUser(prev => !prev)}} className="btn btn-warning">Edit</button></td>
                <td className="text-nowrap"><button onClick={DeleteUser} className="btn btn-danger">Delete</button></td>
            </tr>
        )
    }
}

export default Users