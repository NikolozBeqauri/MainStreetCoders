import { ReactNode } from "react"
import { SideBar } from "../SideBar/SideBar"
import { HeartIcon } from "../HeartIcon/HeartIcon"
import styles from './Wrapper.module.scss'
export default (props: {children: ReactNode}) => {
    
    return(
        <div >
            <div className={styles.wrapper}>
                <SideBar/>
                {props.children} 
            </div>
        </div>
    )
}