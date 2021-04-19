import {useRouter} from 'next/router'

export default function Redirect ({path, back}) {

    const router = useRouter()

    return (
       <div>{back ? router.back() : router.push(`/${path}`)}</div> 
    )
}