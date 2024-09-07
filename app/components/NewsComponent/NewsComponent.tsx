import ReusableButton from "../ReusableButton/ReusableButton";
import styles from "./NewsComponent.module.scss";


type Props = {
    title: string,
    count: string;
    image?: string;
}

export const NewsComponent = (props: Props) => {
    const backgroundImage = `url(/images/${props.image}.png)`;

    return( 
        <div className={styles.container}  style={{ backgroundImage }}>
            <div className={styles.componentHeader}>
                <h1 className={styles.h1Style}>{props.title}</h1>
                <p className={styles.playCount}>{props.count} Plays</p>
                <div className={styles.buttonElement}>
                    <ReusableButton title={"Listen Now"} icon={"playIcon"}/>
                </div>
            </div>
            
        </div>
    )
}