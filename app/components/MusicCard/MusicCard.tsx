import { musicIdForPlaylistState } from "@/app/states";
import { HeartIcon } from "../HeartIcon/HeartIcon";
import { ReusableIcon } from "../ReusableIcon/ReusableIcon";
import styles from "./MusicCard.module.scss"
import Image from 'next/image';
import { useRecoilState } from "recoil";

type Props = {
    trackImage: string;
    trackTitle: string;
    authorName: string;
    duration: string;
    onClick?: () => void;
    id?: number | null;
}

export const MusicCard = (props: Props) => {
    const [, setMusicIdForPlaylist] = useRecoilState(musicIdForPlaylistState)

    return (
        <div className={styles.cardWrapper} onClick={props.onClick}>
            <div className={styles.cardinfo}>
                <Image
                    className={styles.cardImg}
                    src={`${props.trackImage}`}
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
                <div onClick={(e) => e.stopPropagation()} >
                    <HeartIcon />
                    <div onClick={() => {
                        setMusicIdForPlaylist(props.id)
                    }}>
                        <ReusableIcon imgName={"threeDots"} />
                    </div>
                </div>
            </div>
        </div>
    )
}