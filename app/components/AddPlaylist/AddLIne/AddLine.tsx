import styles from "./AddLine.module.scss"
type Props = {
    image?: string;
    onClick?: any;
    title: string;
}

export const AddLine = (props: Props) => {
    return(
        <div className={styles.container} onClick={props.onClick}>
            {props.image && <img src={`/icons/${props.image}.svg`} />}
            <p className={styles.fontProps}>{props.title}</p>
        </div>
    )
}