import { Profileicon } from "./Profileicon/Profileicon"
import { Search } from "./Search/Search"
import styles from './Header.module.scss'

export const Header = () => {
    return(
        <div className={styles.header_wrapper}>
            <Search />
            <Profileicon src="/images/user-profile.png"/>
        </div>
    )
}