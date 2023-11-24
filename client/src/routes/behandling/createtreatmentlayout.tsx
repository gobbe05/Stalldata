import { Outlet, useNavigate } from "react-router"
import { Link } from "react-router-dom"
import { useGlobalState } from "../../GlobalState"
import { useContext, useEffect } from "react"
import { AlertContext } from "../../layout"

function CreateTreatmentLayout() {
    const [globalState] = useGlobalState()
    const navigate = useNavigate()

    useEffect(() => {
        fetch("/api/getauth", {
          method: "GET"
        })
        .then((data) => data.json())
        .then((data) => {if(data.auth != true) navigate("/login")})
      }, [])
    return (
        <>        
        <div className="m-4">
            <div className="d-flex btn-group" role="group">

                <Link className={`btn py-4 flex-grow-1 text-white text-center
                ${globalState.farm && "btn-success"}
                ${globalState.behandling.page == "farm" && "btn-secondary"}
             `} 
                to="/behandling">Farm</Link>
                {globalState.farm ? 
                <Link className={`btn py-4 flex-grow-1 text-white text-center
                ${globalState.section && " btn-success"}
                ${globalState.behandling.page == "section" && "btn-secondary"}`} to="choosesection">Section</Link> : <DisabledLink warning="Please choose a farm before trying to choose a section!" link="Section" />}
                {globalState.section ? 
                <Link className={`btn py-4 flex-grow-1 text-white text-center
                ${globalState.box && "btn-success"}
                ${globalState.behandling.page == "box" && "btn-secondary"}`}  
                to="choosebox">Box</Link> : <DisabledLink warning="Please choose a section before trying to choose a box!" link="Box" />}
            </div>

            
        </div>
        <Outlet />
        </>
    )
}

function DisabledLink({link, warning}: {link: string, warning: string}) {
    const AddAlert = useContext(AlertContext)
    function Warning() {
        AddAlert("danger", warning)
    }
    return (
        <>
            <div className="btn d-flex align-items-center justify-content-center flex-grow-1" onClick={Warning}><p className="m-0">{link}</p></div>
            
        </>
    )
}

export default CreateTreatmentLayout