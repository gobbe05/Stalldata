import { useState, createContext, useContext } from "react"

const GlobalContext = createContext<[any, any]>([null, null])

export const GlobalState = (props: any) => {
    // Declare global the GlobalState
    const [globalState, setGlobalState] = useState({alerts: [{type: "error", message: "Alert"}, {type: "error", message: "Alert"}], farm: null, section: null, box: null, behandling: {page: ""}, loggedin: false, companycode: undefined})

    // create a function that'll make it easy to update one state property at a time
    const updateGlobalState = (key: any, newValue: any) => {
        setGlobalState((oldState: any) => {
          if (oldState[key] !== newValue) {
            const newState = { ...oldState }
            newState[key] = newValue
            return newState
          } else {
            return oldState
          }
        })
      }

    return (
        <GlobalContext.Provider value={[globalState, updateGlobalState]}>{props.children}</GlobalContext.Provider>
    )
}

// custom hook for retrieving the provided state
export const useGlobalState = () => useContext(GlobalContext)