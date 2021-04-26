import { memo } from 'react'
import { Button } from 'semantic-ui-react'
import styles from './style/followButton.module.css'

const FollowButton = memo(() => {

    return (
        <Button
            color= 'facebook'
            size= 'small'
            content= 'follow'
        />
    )
})

export default FollowButton