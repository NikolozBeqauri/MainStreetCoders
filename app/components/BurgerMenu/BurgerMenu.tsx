import styles from './BurgerMenu.module.scss'
import Image from 'next/image';

export const BurgerMenu = () => {
    return(
        <div className={styles.burgerMenuWrapper}>
            <Image
            src={'/icons/burgerMenu.svg'}
            alt="burger menu icon"
            width={44}
            height={44}
        />
        </div>
    )
}