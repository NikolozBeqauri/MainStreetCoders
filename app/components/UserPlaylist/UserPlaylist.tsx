import { HeartIcon } from "../HeartIcon/HeartIcon";
import { ReusableIcon } from "../ReusableIcon/ReusableIcon";
import Styles from "./UserPlaylist.module.scss";

type Props = {
    image: string;
    count?: number;
}

export const UserPlaylist = (props: Props) => {
    return(
        <div className={Styles.container}>
                <img src={`/icons/${props.image}.svg`} alt="Playlist icon" width={234} height={251} />
                <div className={Styles.icons} >
                    <HeartIcon background/>
                    <ReusableIcon imgName={'threeDots'} background/>
            </div>
            <p className={Styles.paragraph}>{`${props.count}`}</p>
        </div>
    )
}