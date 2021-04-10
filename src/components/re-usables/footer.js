import styles from './style/footer.module.css'
import {memo} from 'react'
import { GlobalState } from '../../context/globalState'
import {Button} from 'semantic-ui-react'

const TableFooter =  memo(({content}) => {

    const {UI} = GlobalState()
    
    return (

        <div  className= {styles.footer} style= {{ borderTop: UI.border, backgroundColor: UI.bgColor }}>
                <Button
                    content= {content.content}
                    color= 'teal'
                    icon= {content.icon}
                    floated= 'right'
                    basic= {UI.dark ? true : false}
                    onClick= {content.onClick}
                />
            </div>
    )
})

export default TableFooter