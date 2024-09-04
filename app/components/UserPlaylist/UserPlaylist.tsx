import Styles from "./UserPlaylist.module.scss";

type Props = {
    image: string;
    count?: number;
}

export const UserPlaylist = (props: Props) => {
    return(
<<<<<<< Updated upstream
        <div className={Styles.container}>
            <img src={`/icons/${props.image}.svg`} alt="Playlist icon" width={234} height={251} />
            <p className={Styles.paragraph}>{`Playlist name ${props.count}`}</p>
=======
        <div className={`${Styles.container}`}>
            <div className={Styles.image}>
                <div>
                    <img src={`/images/${props.image}.png`} alt="Playlist icon" width={234} height={251}/>
                    <div className={`${Styles.icons} ${Styles.opacity}`} >
                        <HeartIcon background/>
                        <ReusableIcon imgName={'threeDots'} background/>
                    </div>
                </div>
            </div>
            <p className={Styles.paragraph}>{props.name}</p>
>>>>>>> Stashed changes
        </div>
    )
}