import { Icon } from "semantic-ui-react"
import { GlobalState } from "../../context/globalState"
import styles from './style/logo_tab.module.css'



const LogoTab = ({text, label, size, width}) => {

    const {UI, toggleUI} = GlobalState()

    return(
        <div
            className= {styles.logo_tab}
            style= {{color: UI.color, width: width == 'fitted' ? 'fit-content' : '100%'}}
            onClick= {toggleUI}
        >
           <h1>n</h1>
        </div>
    )
}

export default LogoTab