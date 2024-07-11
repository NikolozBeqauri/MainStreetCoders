import Image from 'next/image';
import styles from "./Search.module.scss";
type Props = {
    placeHolder?: string;
}

export const Search = ({ placeHolder }: Props) => {
    placeHolder = placeHolder ? placeHolder : "Artists, tracks, albums"

    return (
        <div className={styles.searchform}>
            <input type="text" placeholder={placeHolder} />
            <Image
                src="/icons/search.svg"
                alt="search icon"
                width={24}
                height={24}
            />
        </div>
    )
}