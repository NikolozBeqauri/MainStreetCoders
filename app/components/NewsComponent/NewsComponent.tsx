<<<<<<< Updated upstream
"use client"
import { useEffect, useState } from "react";
=======
"use client";
import { useState } from "react";
>>>>>>> Stashed changes
import ReusableButton from "../ReusableButton/ReusableButton";
import styles from "./NewsComponent.module.scss";
import axios from "axios";
import Cookies from 'js-cookie';


type Props = {
<<<<<<< Updated upstream
    title: string,
    count?: string;
    image?: string;
}

export const NewsComponent = (props: Props) => {

    
    let backgroundImage = `url(${props.image})`;

    return( 
        <div className={styles.container}  style={{ 
            backgroundImage
         }}>
            <div className={styles.componentHeader}>
                <h1 className={styles.h1Style}>{props.title}</h1>
                <p className={styles.playCount}>{props.count} Plays</p>
                <div className={styles.buttonElement}>
                    <ReusableButton title={"Listen Now"} icon={"playIcon"}/>
                </div>
            </div>
            
        </div>
    )
}
=======
  title: string;
  count?: number | string;
  image?: string;
  musicId?: number;
  onlyTitle?: boolean;
};

export const NewsComponent = (props: Props) => {
  const [musicId, setMusicId] = useState<number | null>(null);
  let backgroundImage = `url(/images/${props.image}.png)`;

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
            <div className={styles.buttonElement} onClick={handleClick}>
              <ReusableButton title={"Listen Now"} icon={"playIcon"} />
            </div>
          </>
        )}
      </div>
    </div>
  );
};
>>>>>>> Stashed changes
