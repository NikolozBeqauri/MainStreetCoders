import { UserProfileIcon } from "../../UserProfileIcon/UserPrifileIcon";
import styles from './HeaderOfHitPage.module.scss'

import {
    IoChevronBack
} from 'react-icons/io5';


export const HeaderOfHitPage = () => {

    return (
        <div className={styles.hitHeader}>
            <button className={styles.hitHeaderBtn}>
                <IoChevronBack className={styles.chevronBack} />
            </button>
            <UserProfileIcon src="userImage.png"/>
        </div>
    )
}