import { GlobalState } from '../../context/globalState'
import styles from './style/footer.module.css'

const Footer = () => {

    const {UI} = GlobalState()

    return(
        <div className= {styles.footer} style= {{backgroundColor: UI.body, color: UI.color}}>
            <p>© 2021 Nora. All rights reserved.</p>
        </div>
    )
}

export default Footer