import axios from 'axios'
import { memo, useEffect, useState } from 'react'
import { Button } from 'semantic-ui-react'
import useSWR, { mutate } from 'swr'
import { GlobalState } from '../../context/globalState'
import styles from './style/followButton.module.css'

export default function FollowButton ({id}) {

    const {user} = GlobalState()
    const {data: followers} = useSWR(() => user ? `/followers` : null )
    const [following, setFollowing] = useState(false)
    const [requesting, setRequesting] = useState(false)
    // 
    useEffect(() => {
        const determineFollwing = () => {
            if(followers) {
                const following = followers.filter(follower => follower._id === user._id)[0]
                if(following) setFollowing(true)
                else setFollowing(false)
            }
        }
        determineFollwing()
    }, [id, user, ])

    const handleFollowRequest = async () => {
        setRequesting(true)
        if(id && user && user._id !== id) {
            if(following ) { //unfollow
               mutate(`/followers/${id}`, followers.filter(follower => follower._id !== user._id), false)
               await axios.post(`/followers/${id}`)
               mutate(`/followers/${id}`)
            }
            else {          //follow
                mutate(`/followers/${id}`, [...followers, { _id: user._id }], false)
               await axios.post(`/followers/${id}`)
               mutate(`/followers/${id}`)
            }
        }
        setRequesting(false)
    }
    return (
        <Button
            color= 'facebook'
            size= 'small'
            content= {following && !requesting ? 'following' : requesting ? 'Requesting...' : 'follow'}
            onClick= {handleFollowRequest}
        />
    )
}