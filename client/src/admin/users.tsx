import { useEffect, useState } from "react"

function Users() {
    const [users, setUsers] = useState<Array<any>>([])
    useEffect(() => {
        fetch("/api/getusers", {
            method: "GET",
            credentials: "include"
        })
        .then((response) => response.json())
        .then((data) => setUsers(data.users))
    }, [])
    return (
        <>
            <div className="overflow-x-scroll">
                <table className="table table-borderless table-striped">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th className="text-nowrap" scope="col">Username</th>
                            <th className="text-nowrap" scope="col">First Name</th>
                            <th className="text-nowrap" scope="col">Last Name</th>
                            <th scope="col"></th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {users && users.map((item: {_id: string, username: string, firstName: string, lastName: string}, index: number) => <TableItem id={item._id} username={item.username} firstName={item.firstName} lastName={item.lastName} index={index}/>)}
                    </tbody>
                </table>
            </div>
        </>
    )
}

function TableItem({id, username, firstName, lastName, index}: {id: string, username: string, firstName: string, lastName: string, index: number}) {
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

    return (
        <tr>
            <td className="text-nowrap">{index}</td>
            <td className="text-nowrap">{username}</td>
            <td className="text-nowrap">{firstName}</td>
            <td className="text-nowrap">{lastName}</td>
            <td className="text-nowrap"><button onClick={() => {DeleteUser(id)}} className="btn btn-danger">Delete</button></td>
        </tr>
    )
}

export default Users