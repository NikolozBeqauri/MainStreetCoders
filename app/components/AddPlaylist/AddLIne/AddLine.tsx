import styles from "./AddLine.module.scss"
type Props = {
    image?: string;
    onClick?: any;
    title: string;
    useForSearch?: boolean;
}

export const AddLine = (props: Props) => {
    const stylesClasses = [];

    if(!props.useForSearch){
        stylesClasses.push(styles.container)
    }

    if(props.useForSearch) {
        stylesClasses.push(styles.containerForSearch)
    } 
    

    return(
        <div className={stylesClasses.join(" ").trim()} onClick={props.onClick}>
            {props.image && <img src={`/icons/${props.image}.svg`} />}
            <p className={styles.fontProps}>{props.title}</p>
        </div>
    )
}