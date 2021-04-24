import {Loader} from 'semantic-ui-react'
import { GlobalState } from '../../context/globalState'
import styles from './style/loader.module.css'


export default function loader ({title}) {

    const {UI} = GlobalState()

    return(
        <div className= {styles.loader} style= {{ color: UI.color, backgroundColor: UI.bgColor }}>
            <Loader 
                active 
                indeterminate
                size= 'small' 
                inverted= {UI.dark ? true : false}
                content= {title}
            />
        </div>
    )
}