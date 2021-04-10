import { Icon, Modal } from "semantic-ui-react";
import {useRouter} from 'next/router'
import { useState } from "react";
import styles from './style/modal.module.css'
import {GlobalState} from '../../context/globalState'



export default function modal ({openState, onClose, children}) {

    const router = useRouter()
    const {UI} = GlobalState()
    const [open, setOpen] = useState(true)
    const goBack = () => router.back()
    const close = () => {
        goBack()
        setOpen(false)
    }

    
    return (
        <div className= {styles.modal}>
        <Modal
            className= {styles.modal}
            open= {openState || open}
            style= {{backgroundColor: UI.bgColor, color:UI.color }}
            onClose= {onClose || goBack}
        >
            <header
                style= {{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'flex-end',
                    padding: '10px '
                }}
            >
                <Icon 
                    name= 'cancel'
                    size= 'large'
                    link
                    onClick= {close}
                />
            </header>
            {children}
        </Modal>
        </div>
    )
}