import Image from 'next/image';
import styles from './Search.module.scss'

export const Search = () => {
    return (
        <form className={styles.form}>
            <input type="text" placeholder="Artists, tracks, albums" />
            <Image 
                src="/icons/search-icon.svg"
                alt="search icon"
                width={24}
                height={24}
            />           
        </form>
    )
}
