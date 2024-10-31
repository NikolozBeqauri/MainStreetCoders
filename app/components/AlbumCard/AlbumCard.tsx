import styles from "./AlbumCard.module.scss";
import { HeartIcon } from "../HeartIcon/HeartIcon";
import { ReusableIcon } from "../ReusableIcon/ReusableIcon";
import { useRecoilState } from "recoil";
import { globalClickerState, musicIdForPlaylistState } from "@/app/states";
import { useEffect } from "react";

type Props = {
  title?: string;
  author: string;
  img: string;
  onClick?: () => void;
  id?: number | null;
  desableIcons?: boolean;
};

export const AlbumCard = (props: Props) => {
  const [musicIdForPlaylist, setMusicIdForPlaylist] = useRecoilState(musicIdForPlaylistState)
  useEffect(()=>{
    console.log(musicIdForPlaylist,'Id for album is set'); 
  },[musicIdForPlaylist])
  const stylesClass = [styles.cardIconsBackground];
  if (!props.title) stylesClass.push(styles.cardIconsCircleBackground);

  const cardImageStyle = [styles.defaultCardStyles];
  if (!props.title) cardImageStyle.push(styles.cardImage);

  return (
    <div className={styles.cardWrapper} onClick={props.onClick}>
      <div className={styles.cardImageWrapper}>
        <img
          className={cardImageStyle.join(" ").trim()}
          src={props.img}
          alt="musician image"
          tabIndex={0}
        />
        <div className={styles.iconsWholeWrapper}>
          {!props.desableIcons && (
            <div onClick={(e) => e.stopPropagation()}  className={styles.cardIconsWrapper}>
            <HeartIcon background />
            <div onClick={()=>{
              setMusicIdForPlaylist(props.id)
            }}>
              <ReusableIcon imgName={"threeDots"} background />
            </div>
          </div>
          )}
          
          <div className={stylesClass.join(" ").trim()}></div>
        </div>
      </div>

      <div className={styles.cardTitles}>
        {props.title ? <span>{props.author}</span> : <h3>{props.author}</h3>}
        {props.title ? <h3>{props.title}</h3> : null}
      </div>
    </div>
  );
};
