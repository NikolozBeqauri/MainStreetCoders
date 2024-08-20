import { HeartIcon } from "../HeartIcon/HeartIcon";
import { ReusableIcon } from "../ReusableIcon/ReusableIcon";
import styles from "./MusicCard.module.scss"
import Image from 'next/image';

type Props = {
    imgName: string;
    title: string;
    author: string;
    timing: string;
}

export const MusicCard = (props: Props) => {


    return (
        <div className={styles.cardWrapper}>
            <div className={styles.cardinfo}>
                <Image
                    className={styles.cardImg}
                    src={`/images/${props.imgName}.png`}
                    alt="musician image"
                    width={72}
                    height={72}
                />
                <div className={styles.cardTitles}>
                    <h3>{props.title}</h3>
                    <span>{props.author}</span>
                </div>
            </div>

            <div className={styles.cardAditionalInfo}>
                <span className={styles.timing}>{props.timing}</span>
                <div>
                    <HeartIcon/>
                    <ReusableIcon imgName={'threeDots'}/>
                </div>
            </div>
        </div>
    )
}