import { HeartIcon } from "../HeartIcon/HeartIcon";
import { ReusableIcon } from "../ReusableIcon/ReusableIcon";
import styles from "./MusicCard.module.scss"
import Image from 'next/image';

type Props = {
    trackImage: string;
    trackTitle: string;
    authorName: string;
    duration: string;
    onClick?: () => void;
    id?: number | null;
}

export const MusicCard = (props: Props) => {


    return (
        <div className={styles.cardWrapper} onClick={props.onClick}>
            <div className={styles.cardinfo}>
                <Image
                    className={styles.cardImg}
                    src={`/images/${props.trackImage}.png`}
                    alt="musician image"
                    width={72}
                    height={72}
                />
                <div className={styles.cardTitles}>
                    <h3>{props.trackTitle}</h3>
                    <span>{props.authorName}</span>
                </div>
            </div>

            <div className={styles.cardAditionalInfo}>
                <span className={styles.timing}>{props.duration}</span>
                <div>
                    <HeartIcon/>
                    <ReusableIcon imgName={'threeDots'}/>
                </div>
            </div>
        </div>
    )
}