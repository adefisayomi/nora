import {Popup} from 'semantic-ui-react'
import { GlobalState } from '../../context/globalState'

export default function PopUp ({trigger, position= 'bottom center', children}) {

    const {UI} = GlobalState()

    return (
            <Popup trigger={ trigger} flowing basic hoverable position= {position}
                    style= {{ backgroundColor: UI.bgColor, padding: '10px', border: 'none' }}
                     >
                {children}
            </Popup>
    )
}