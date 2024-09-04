import { useState } from "react";
import { HeartIcon } from "../HeartIcon/HeartIcon";
import { ReusableIcon } from "../ReusableIcon/ReusableIcon";
import Styles from "./UserPlaylist.module.scss";

type Props = {
    image: string;
    name?: string;
}

export const UserPlaylist = (props: Props) => {

    return(
        <div className={`${Styles.container}`}>
            <div className={Styles.image}>
                <img src={`/images/${props.image}.png`} alt="Playlist icon" width={234} height={251}/>
                <div className={`${Styles.icons} ${Styles.opacity}`} >
                    <HeartIcon background/>
                    <ReusableIcon imgName={'threeDots'} background/>
                </div>
            </div>
            <p className={Styles.paragraph}>{props.name}</p>
        </div>
    )
}