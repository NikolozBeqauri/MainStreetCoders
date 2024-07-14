import styles from "./NewsComponent.module.scss";


type Props = {
    title: string,
    count: number;
}

export const NewsComponent = (props: Props) => {
    return( 
        <div className={styles.container}>
            <div className={styles.componentHeader}>
                <h1 className={styles.h1Style}>{props.title}</h1>
                <p>{props.count} Plays</p>
                <div className={styles.buttonElement}>
                    {/* აქ დავაიმპორტებთ ბათონს */}
                </div>
            </div>
            
        </div>
    )
}