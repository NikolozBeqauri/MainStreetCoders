'use client'
import { useState } from 'react';
import styles from './AddPlaylistChackBox.module.scss';
import { ReusableIcon } from '../../ReusableIcon/ReusableIcon';
import popUpNav from '@/app/enums/popUpNav';

type Props = {
    onClickBtn?: () => void;
    setActiveComponent: Function;
}


export const AddPlaylistChackBox = (props:Props) => {


    const [playlists, setPlaylists] = useState([
        { id: 1, name: 'Playlist 1', selected: false },
        { id: 2, name: 'Playlist 2', selected: false },
        { id: 3, name: 'Playlist 3', selected: false },
    ]);

    const handleCheckboxChange = (id: number) => {
        setPlaylists((prev) =>
            prev.map((playlist) => ({
                ...playlist,
                selected: playlist.id === id ? !playlist.selected : false,
            }))
        );
    };

    return (
        <div className={styles.wholeWrapper}>
            <div className={styles.titleWrapper}>
            <div onClick={() => props.setActiveComponent(popUpNav.addPlaylist)}><ReusableIcon imgName={"rightArrow"} /></div>
            <h2>Add To Playlist</h2>
            </div>

            <button onClick={props.onClickBtn} className={styles.newPlaylist}>+ New playlist</button>

            <div className={styles.chackBoxWrapper}>
                {playlists.map((playlist) => (
                    <label key={playlist.id} className={styles.playlistLabel}>
                        <input
                            type="checkbox"
                            checked={playlist.selected}
                            onChange={() => handleCheckboxChange(playlist.id)}
                        />
                        {playlist.name}
                    </label>
                ))}

            </div>

        </div>
    )
}   