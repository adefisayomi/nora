import styles from '../styles/404.module.css'

export default function custom404 ({content= 'Something must have Gone wrong'}) {

    return (
        <div className= {styles.custom_404}>
            <h4>Yeah! i know, it does'nt look like it</h4>
            <h5>But! its a </h5>
            <h1>404 <span>page</span> </h1>
            <p> {content}</p>
        </div>
    )
}