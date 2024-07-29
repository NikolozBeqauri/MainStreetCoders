import { Search } from "../Search/Search"
import { UserProfileIcon } from "../UserProfileIcon/UserPrifileIcon"
import styles from "./Header.module.scss"

export const Header = () => {
    return(
        <div className={styles.headerWrapper}>
            <Search/>
            <UserProfileIcon src="userImage.png"/>
        </div>
    )
}