'use client';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import styles from './AddPlaylistChackBox.module.scss';
import { ReusableIcon } from '../../ReusableIcon/ReusableIcon';
import popUpNav from '@/app/enums/popUpNav';
import axios from "axios";
import Cookies from 'js-cookie';
import ReusableButton from '../../ReusableButton/ReusableButton';
import { selectedMusicToAddInAlbumState, selectedPlaylistIDToAddTrackState, threeDotClickedState } from '@/app/states';
import { useRecoilState } from 'recoil';

type Props = {
    onClickBtn?: () => void;
    setActiveComponent: Function;
};

interface Playlist {
    id: number;
    image: string;
    name: string;
}

interface FormData {
    selectedPlaylist: string;
}

export const AddPlaylistChackBox = (props: Props) => {
    const { register, handleSubmit, setValue, watch } = useForm<FormData>();
    const [playlistData, setPlaylistData] = useState<Playlist[]>([]);
    const [selectedPlaylistIDToAddTrack, setSelectedPlaylistIDToAddTrack] = useRecoilState(selectedPlaylistIDToAddTrackState);
    const [selectedMusicToAddInAlbum,] = useRecoilState(selectedMusicToAddInAlbumState);
    const [, setThreeDotClicked] = useRecoilState(threeDotClickedState);

    const token = Cookies.get("token");

    const selectedPlaylist = watch("selectedPlaylist");

    useEffect(() => {
        axios.get('https://project-spotify-1.onrender.com/playlist', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then((res) => {
                const filteredData: Playlist[] = res.data.map((item: any) => ({
                    id: item.id,
                    image: item.image,
                    name: item.name
                }));
                setPlaylistData(filteredData);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [token]);

    const handleCheckboxChange = (id: number) => {
        setValue("selectedPlaylist", selectedPlaylist === id.toString() ? "" : id.toString());
    };

    const onSubmit = (data: FormData) => {
        setSelectedPlaylistIDToAddTrack(Number(data.selectedPlaylist[0]));
        const selectedPlaylist = Number(data.selectedPlaylist[0])
        console.log('Selected Playlist ID:', selectedPlaylistIDToAddTrack);

        axios.patch(`https://project-spotify-1.onrender.com/playlist/${selectedPlaylist}/music/${selectedMusicToAddInAlbum}`, null,{
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        })
        .then((res) => {
            console.log(res);
            setThreeDotClicked(false);
        })
        .catch((err) => {
            console.error("Error adding music to playlist:", err);
        });
    };
    
    return (
        <div className={styles.wholeWrapper}>
            <div className={styles.titleWrapper}>
                <div onClick={() => props.setActiveComponent(popUpNav.addPlaylist)}>
                    <ReusableIcon imgName={"rightArrow"} />
                </div>
                <h2>Add To Playlist</h2>
            </div>

            <button onClick={props.onClickBtn} className={styles.newPlaylist}>+ New playlist</button>

            <form onSubmit={handleSubmit(onSubmit)}>
                <div className={styles.chackBoxWrapper}>
                    {playlistData.map((playlist) => (
                        <label key={playlist.id} className={styles.playlistLabel}>
                            <input
                                type="checkbox"
                                value={playlist.id}
                                {...register("selectedPlaylist")}
                                checked={selectedPlaylist === playlist.id.toString()}
                                onChange={() => handleCheckboxChange(playlist.id)}
                            />
                            {playlist.name}
                        </label>
                    ))}
                </div>

                {selectedPlaylist && (
                    <div className={styles.saveButtonWrapper}>
                        <ReusableButton title={'Save'} />
                    </div>
                )}
            </form>
        </div>
    );
};

export default AddPlaylistChackBox;
