import { Icon, Modal } from "semantic-ui-react";
import {useRouter} from 'next/router'
import { memo, useState } from "react";
import styles from './style/modal.module.css'
import {GlobalState} from '../../context/globalState'



const modal =  memo(({openState, onClose, children, width, content, loading}) => {

    const router = useRouter()
    const {UI} = GlobalState()
    const [open, setOpen] = useState(true)
    const goBack = () => router.back()
    const close = () => {
        goBack()
        setOpen(false)
    }

    
    return (
        <div className= {styles.modal} style= {{ maxWidth: width && width }}>
        <Modal
            className= {styles.modal}
            open= {openState || open}
            style= {{backgroundColor: UI.bgColor, color:UI.color, maxWidth: width && width }}
            onClose= {onClose || goBack}
        >
            <header className= {styles.modal_header}>
                <Icon 
                    fitted
                    name= 'cancel'
                    size= 'large'
                    link
                    onClick= {onClose || close}
                />
            </header>
            {children}
        </Modal>
        </div>
    )
})

export default modal