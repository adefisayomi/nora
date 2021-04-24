import styles from './style/drop_down.module.css'
import {Icon, Transition} from 'semantic-ui-react'
import { useState } from 'react'
import { GlobalState } from '../../context/globalState'


export default function DropDown ({width, list, children, animation= {overlay: 'fade', menu: 'scale'} }) {

    const {UI} = GlobalState()
    const [visible, setVisible] = useState(false)
    const toggleVisibility = () => setVisible(!visible)
    const closeVisibility = () => setVisible(false)
    

    return (
        <div className= {styles.drop_down}>
           <span className= {styles.drop_down_children} onClick= {toggleVisibility}>
            {children}
           </span>
           <Transition visible={visible} animation= {animation.menu} duration={400}>
               <div className= {styles.drop_down_list} style= {{ backgroundColor: UI.bgColor, color:UI.color, minWidth: width }}>
                   {list}
               </div>
           </Transition>
           <Transition visible={visible} animation= {animation.overlay} duration={400}>
            <div className= {styles.drop_down_overlay} onClick= {closeVisibility}>
                {/*  */}
            </div>
           </Transition>
        </div>
    )
}