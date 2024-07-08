import { ReactNode } from "react";
import styles from "./newsComponent.module.css";

type Props = {
    title: string,
    count: number | string,
    className?: string,
}

export default function NewsComponent (props: Props): ReactNode {
    return(
        <div className={`${props.className}` || `${styles.background}`}>
            <h1>{props.title}</h1>
            <p>{props.count}</p>
        </div>
    )
    
}