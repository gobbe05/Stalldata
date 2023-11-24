import { useContext, useEffect, useState } from "react"
import { AlertContext } from "../layout"

function Users() {
    const [users, setUsers] = useState<Array<any>>([])

    async function GetUsers() {
        const response = await fetch("/api/getusers", {
            method: "GET",
            credentials: "include"
        })
        const data = await response.json()
        setUsers(data.users)
    }

    useEffect(() => {
        GetUsers()
    }, [])
    return (
        <>
            <div className="overflow-x-scroll">
                <table className="table table-borderless table-striped">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th className="text-nowrap" scope="col">Email</th>
                            <th className="text-nowrap" scope="col">Username</th>
                            <th className="text-nowrap" scope="col">First Name</th>
                            <th className="text-nowrap" scope="col">Last Name</th>
                            <th scope="col"></th>
                            <th scope="col"></th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {users && users.map((item: {_id: string, email: string, username: string, firstName: string, lastName: string}, index: number) => <TableItem id={item._id} email={item.email} username={item.username} firstName={item.firstName} lastName={item.lastName} index={index} GetUsers={GetUsers}/>)}
                    </tbody>
                </table>
            </div>
        </>
    )
}

function TableItem({id, email, username, firstName, lastName, index, GetUsers}: {id: string, email: string, username: string, firstName: string, lastName: string, index: number, GetUsers: () => void}) {
    const [editUser, setEditUser] = useState<boolean>(false)
    const [emailInput, setEmailInput] = useState<string>(email)
    const [usernameInput, setUsernameInput] = useState<string>(username)
    const[firstNameInput, setFirstNameInput] = useState<string>(firstName)
    const[lastNameInput, setLastNameInput] = useState<string>(lastName)

    const AddAlert = useContext(AlertContext)
 
    async function DeleteUser(id: string) {
        await fetch("/api/deleteuser", {
            method: "DELETE",
            body: JSON.stringify({
                userid: id
            }),
            headers: {
                "Content-Type" : 'application/json'
            },
            credentials: "include"
        })
    }

    async function UpdateUser() {
        const response = await fetch("/api/adminupdateuser", {
            method: "PATCH",
            body: JSON.stringify({
                userid: id,
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
        if(response.status == 200) {
            setEditUser(false)
            GetUsers()
            AddAlert("success", "Successfully updated user")
        }
    }


    if(editUser) {
            return (
                <tr>
                    <td className="text-nowrap">{index}</td>
                    <td className="text-nowrap"><input onChange={(event) => {setEmailInput(event.target.value)}} defaultValue={email}/></td>
                    <td className="text-nowrap"><input onChange={(event) => {setUsernameInput(event.target.value)}} defaultValue={username}/></td>
                    <td className="text-nowrap"><input onChange={(event) => {setFirstNameInput(event.target.value)}} defaultValue={firstName}/></td>
                    <td className="text-nowrap"><input onChange={(event) => {setLastNameInput(event.target.value)}} defaultValue={lastName}/></td>
                    <td className="text-nowrap"><button onClick={UpdateUser} className="btn btn-success">Submit</button></td>
                    <td className="text-nowrap"><button onClick={() => {setEditUser(prev => !prev)}} className="btn btn-warning">Edit</button></td>
                    <td className="text-nowrap"><button onClick={() => {DeleteUser(id)}} className="btn btn-danger">Delete</button></td>
                </tr>
            )
    } else {
        return (
            <tr>
                
                <td className="text-nowrap">{index}</td>
                <td className="text-nowrap">{email}</td>
                <td className="text-nowrap">{username}</td>
                <td className="text-nowrap">{firstName}</td>
                <td className="text-nowrap">{lastName}</td>
                <td></td>
                <td className="text-nowrap"><button onClick={() => {setEditUser(prev => !prev)}} className="btn btn-warning">Edit</button></td>
                <td className="text-nowrap"><button onClick={() => {DeleteUser(id)}} className="btn btn-danger">Delete</button></td>
            </tr>
        )
    }
    
}

export default Users