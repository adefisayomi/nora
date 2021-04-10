import styles from './style/empty.module.css'
import {Icon} from 'semantic-ui-react'
import { memo } from 'react'


const Empty = memo(({content}) => {

    return(
        <div className= {styles.empty}>
            <Icon
                name= {content.icon}
                color= 'teal'
                circular
                style= {{ fontSize: '40px' }}
            />
            <p>{content.text}</p>
        </div>
    )
})

export default Empty