import { useContext, createContext, useState, useCallback, useReducer} from "react";
import useSWR from "swr";
import {themeObject, themeReducer} from './reducers/theme'
import {signInWithToken, logOut} from './reducers/user'


const StateContext = createContext()
// 
const GlobalStateProvider =  ({children}) => {

    // theme
    const [theme, dispatchTheme] = useReducer(themeReducer, themeObject)
    const UI = theme.isDark ? theme.dark : theme.light
    const toggleUI = useCallback(() => dispatchTheme({type: 'TOGGLE_UI'}))
    //
    // 
    const [alert, setAlert] = useState({message: '', type: ''})
    const setGlobalAlert = useCallback(({message, type}) => {
        setAlert({message: message, type: type})
    }, [alert])
    // 
    // 
    const {data: user} = useSWR('/user')
    const {data: business} = useSWR('/business')
    const {data: products} = useSWR('/products')
    console.log(products)
    // 
    // 
    // 
    return(
        <StateContext.Provider value= {{UI, toggleUI, setGlobalAlert, alert, signInWithToken, logOut, user, business, products}}>
            {children}
        </StateContext.Provider>
    )
}

export default GlobalStateProvider
export const GlobalState = () => useContext(StateContext)