import Image from "next/image";
import { Search } from "../Search/Search";
import { UserProfileIcon } from "../UserProfileIcon/UserPrifileIcon";
import styles from "./Header.module.scss";
import { BurgerMenu } from "../BurgerMenu/BurgerMenu";

type Props = {
  imgName?: string;
  burger?: boolean;
  imgWidth?: number;
  imgHeight?: number;
  isPlaylistPage?: boolean;
  setPlaylistContentActive?: Function;
};
export const Header = (props: Props) => {
  if (props.burger) {
    return (
      <div className={styles.headerWrapper}>
        <BurgerMenu />
        <UserProfileIcon />
      </div>
    )
  } else {
    return (
      <div className={styles.headerWrapper}>
        {props.imgName ? (
          <div onClick={()=>{props?.setPlaylistContentActive ? props?.setPlaylistContentActive(true) : ''}}>
            <Image
              style={{'cursor': 'pointer'}}
              src={`/icons/${props.imgName}.svg`}
              alt="icon"
              width={props.imgWidth ? props.imgWidth : 24}
              height={props.imgHeight ? props.imgHeight : 24}
            />
          </div>
        ) : (
          <Search />
        )}
        <UserProfileIcon />
      </div>
    );

  }

};
