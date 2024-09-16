"use client"
import ReusableButton from "../ReusableButton/ReusableButton"
import Styles from"./EditPlaylist.module.scss"
import { AddLine } from "../AddPlaylist/AddLIne/AddLine";

type Props = {
    title: string;
    button?: boolean;
    imageName?: string;
}

const EditPlaylist = (props: Props) => {
    return(
        <div className={Styles.containerWrapper}>
            <div className={Styles.container}>
                <div className={Styles.titleBox}>
                    <div className={Styles.title}>
                        <img src={`/icons/${props.imageName}.svg`} alt="arrow" width={24} height={24} />
                        <p>{props.title}</p>
                    </div>
                </div>
                <div className={Styles.playlistBox}>
                    <AddLine title="Add to playlists" />
                    <div className={Styles.checkboxes}>
                        <div className={Styles.checkbox}>
                            <input type="checkbox" />
                            <p>playlist</p>
                        </div>
                    </div>                          
                </div>
                {props.button && <ReusableButton title={"Save"} />}
            </div>
        </div>
    )
}

export default EditPlaylist