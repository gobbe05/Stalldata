function Item({name, selected} : {name : string, selected: any}) {
    return (
        <>
        
            <div className={`bg-body-secondary rounded d-flex justify-content-center flex-grow-1 p-3 ${selected && selected.name == name && "border"}  border-2`}>
                <p className="text-white text-center fs-3">{name}</p>
            </div>
        
        </>
    )
}

export default Item