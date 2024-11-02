"use client";
import { useState } from "react";
import ReusableButton from "../ReusableButton/ReusableButton";
import styles from "./NewsComponent.module.scss";

type Props = {
  title: string;
  count?: number | string;
  image?: string;
  musicId?: number;
  onlyTitle?: boolean; 
  playlistBackground?: string;
};

export const NewsComponent = (props: Props) => {
  const [musicId, setMusicId] = useState<number | null>(null);
  let backgroundImage = `url(/images/${props.image}.png)`;
  if(props.playlistBackground){    
    backgroundImage = `url(${props.playlistBackground})`
  }
  const handleClick = () => {
    setMusicId(props.musicId ?? null);
    console.log(musicId);
  };

  return (
    <div
      className={`${styles.container} ${props.onlyTitle ? styles.onlyTitle : ""}`}
      style={{ backgroundImage }}
    >
      <div className={styles.componentHeader}>
        <h1 className={styles.h1Style}>{props.title}</h1>

        {!props.onlyTitle && (
          <>
            <p className={styles.playCount}>{props.count ?? "0"} Plays</p>
          </>
        )}
      </div>
    </div>
  );
};
