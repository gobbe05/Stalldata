import { useEffect, useState } from "react"

function Companies() {
    const [companies, setCompanies] = useState<Array<any>>([])
    useEffect(() => {
        fetch("/api/getcompanies", {
            method: "GET",
            credentials: "include"
        })
        .then((response) => response.json())
        .then((data) => setCompanies(data.companies))
    }, [])
    return (
        <>
            <table className="table table-borderless table-striped">
                <thead>
                    <tr>
                        <th>#</th>
                        <th className="text-nowrap" scope="col">Name</th>
                        <th className="text-nowrap" scope="col">Code</th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    {companies.map((item: {_id: string, name: string, code: string}, index: number) => <TableItem id={item._id} name={item.name} code={item.code} index={index}/>)}
                </tbody>
            </table>
        </>
    )
}

function TableItem({id, name, code, index}: {id: string, name: string, code: string, index: number}) {
    async function DeleteCompany(id: string) {
        await fetch("/api/deletecompany", {
            method: "DELETE",
            body: JSON.stringify({
                companyid: id
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
            <td className="text-nowrap">{name}</td>
            <td className="text-nowrap">{code}</td>
            <td className="text-nowrap"><button onClick={() => {DeleteCompany(id)}} className="btn btn-danger">Delete</button></td>
        </tr>
    )
}

export default Companies