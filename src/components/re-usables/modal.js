import { Icon, Loader, Modal } from "semantic-ui-react";
import {useRouter} from 'next/router'
import { useState } from "react";
import styles from './style/modal.module.css'
import {GlobalState} from '../../context/globalState'



export default function modal ({openState, onClose, children, maxWidth, content, loading}) {

    const router = useRouter()
    const {UI} = GlobalState()
    const [open, setOpen] = useState(true)
    const goBack = () => router.back()
    const close = () => {
        goBack()
        setOpen(false)
    }

    
    return (
        <div className= {styles.modal} style= {{ maxWidth: maxWidth ? maxWidth : '620px' }}>
        <Modal
            className= {styles.modal}
            open= {openState || open}
            style= {{backgroundColor: UI.bgColor, color:UI.color, maxWidth: maxWidth ? maxWidth : '620px' }}
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
                    onClick= {onClose || close}
                />
            </header>
            {loading && 
                <div className= {styles.modal_loader} style= {{ color: UI.color, backgroundColor: UI.bgColor }}>
                    <Loader active size= 'medium'>
                        <p className= {styles.modal_content}>{content}</p>
                    </Loader>
                </div>}
            {children}
        </Modal>
        </div>
    )
}