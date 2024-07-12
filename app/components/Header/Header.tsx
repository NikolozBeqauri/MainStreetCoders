import { Search } from "../Search/Search"
import { UserProfileIcon } from "../UserProfileIcon/UserPrifileIcon"
import style from "./Header.module.scss"

export const Header = () => {
    return(
        <div className={style.headerWrapper}>
            <Search/>
            <UserProfileIcon src="userImage"/>
        </div>
    )
}