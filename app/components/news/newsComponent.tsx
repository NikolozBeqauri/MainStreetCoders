import { ReactNode } from "react";
import styles from "./NewsComponent.module.css";
import Button from "../Button/Button";

type Props = {
    title: string,
    count: number | string,
    className?: string,
}

export default function NewsComponent (props: Props): ReactNode {
    return(
        <div className={`${props.className} ${styles.container}`}>
            <h1>{props.title}</h1>
            <p>{props.count}</p>
            <Button value="button" icon={true} mode="neutral" className={styles.fontSize}/>
        </div>
    )
    
}