import { useContext, useEffect, useState } from "react"
import { AlertContext } from "../layout"

function Companies() {
    const [companies, setCompanies] = useState<Array<any>>([])

    async function GetCompanies() {
        const response = await fetch("/api/getcompanies", {
            method: "GET",
            credentials: "include"
        })
        const data = await response.json()
        setCompanies(data.companies)
    }
    useEffect(() => {
        GetCompanies()
    }, [])
    return (
        <>
            <div className="overflow-x-scroll">
                <table className="table table-borderless table-striped">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th className="text-nowrap" scope="col">Name</th>
                            <th className="text-nowrap" scope="col">Code</th>
                            <th scope="col"></th>
                            <th scope="col"></th>
                            <th scope="col"></th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {companies.map((item: {_id: string, name: string, code: string}, index: number) => <TableItem id={item._id} name={item.name} code={item.code} index={index} GetCompanies={GetCompanies}/>)}
                    </tbody>
                </table>
            </div>
        </>
    )
}

function TableItem({id, name, code, index, GetCompanies}: {id: string, name: string, code: string, index: number, GetCompanies: () => void}) {
    const [editCompany, setEditCompany] = useState<boolean>(false)
    const [nameInput, setNameInput] = useState<string>(name)
    const [codeInput, setCodeInput] = useState<string>(code)
    const AddAlert = useContext(AlertContext)
    async function DeleteCompany(id: string) {
        const response = await fetch("/api/deletecompany", {
            method: "DELETE",
            body: JSON.stringify({
                companyid: id
            }),
            headers: {
                "Content-Type" : 'application/json'
            },
            credentials: "include"
        })
        if(response.status == 200){
            setEditCompany
            GetCompanies()
        }
    }

    async function UpdateUser() {
        const response = await fetch("/api/updatecompany", {
            method: "PATCH",
            body: JSON.stringify({
                companyid: id,
                name: nameInput,
                prevcode: code,
                code: codeInput
            }),
            headers: {
                "Content-Type" : 'application/json'
            },
            credentials: "include"
        })
        if(response.status == 200) {
            setEditCompany(false)
            GetCompanies()
            AddAlert("success", "Successfully updated company")
        }
    }

    if(editCompany) {
        return (
            <tr>
                <td className="text-nowrap">{index}</td>
                <td className="text-nowrap"><input onChange={(event) => {setNameInput(event.target.value)}} defaultValue={name}/></td>
                <td className="text-nowrap"><input onChange={(event) => {setCodeInput(event.target.value)}} defaultValue={code}/></td>
                <td className="text-nowrap"><button onClick={UpdateUser} className="btn btn-success">Submit</button></td>
                <td className="text-nowrap"><button onClick={() => {setEditCompany(prev => !prev)}} className="btn btn-warning">Edit</button></td>
                <td className="text-nowrap"><button onClick={() => {DeleteCompany(id)}} className="btn btn-danger">Delete</button></td>
            </tr>
        )
    } else {
        return (
            <tr>
                <td className="text-nowrap">{index}</td>
                <td className="text-nowrap">{name}</td>
                <td className="text-nowrap">{code}</td>
                <td></td>
                <td className="text-nowrap"><button onClick={() => {setEditCompany(prev => !prev)}} className="btn btn-warning">Edit</button></td>
                <td className="text-nowrap"><button onClick={() => {DeleteCompany(id)}} className="btn btn-danger">Delete</button></td>
            </tr>
        )
    }
}

export default Companies