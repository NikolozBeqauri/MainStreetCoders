import Image from "next/image";
import styles from "./ArtistPiography.module.scss"
type Props = {
    image: string;
    title: string;
    paragraph: string;
}

export const ArtistBiography = (props:Props) => {
    return (
        <div className={styles.cardWrapper}>
            <Image
                src={`/images/${props.image}.png`}
                alt="artist image"
                width={360}
                height={325}
            />
            <div className={styles.texts}>
                <h2>{props.title}</h2>
                <p>{props.paragraph}</p>
            </div>
        </div>
    )
}