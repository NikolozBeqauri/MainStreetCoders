import styles from "./AddLine.module.scss"
type Props = {
    image?: string;
    onClick?: () => void;
    title: string;
}

export const AddLine = (props: Props) => {
    return(
        <div className={styles.container} onClick={props.onClick}>
            <img src={`/icons/${props.image}.svg`} />
            <p className={styles.fontProps}>{props.title}</p>
        </div>
    )
}