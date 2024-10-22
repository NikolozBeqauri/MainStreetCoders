'use client'
import { useEffect, useState } from 'react';
import { NewsComponent } from "../NewsComponent/NewsComponent";
import styles from "./TopSongs.module.scss";
import artistNav from '@/app/enums/artistNav';
import { ArtistBiography } from '../ArtistPiography/ArtistPiography';
import { ArtistAlbum } from '../ArtistAlbum/ArtistAlbum';
import { ReusableTable } from '../ReusableTable/ReusableTable';
import Cookies from 'js-cookie';
import axios from 'axios';
import { useRecoilState } from 'recoil';
import { albumOnState, globalClickerState, musicOnState, playlistOnState } from '@/app/states';


type Props = {
    image: string;
    title: string;
    count: string;
    data?: any;
};

interface album {
    id: number;
    title: string;
    coverImage: string
}

export const TopSongs = (props: Props) => {
    const token = Cookies.get("token")

    const [activeButton, setActiveButton] = useState(artistNav.topSongs); 
    const [albumsOfArtist, setAlbumsOfArtist] = useState<album[]>([]);
    const [globalClicker, setGlobalClickerState] = useRecoilState(globalClickerState);
    const [playlistOn, setPlaylistOnState] = useRecoilState(playlistOnState);
    const [musicOn, setMusicOnState] = useRecoilState(musicOnState);
    const [albumOn, setAlbumOnState] = useRecoilState(albumOnState);



    
    useEffect(()=>{
        axios.get("https://project-spotify-1.onrender.com/author/topArtists", {
            headers: {
              Authorization: `Bearer ${token}`
            }
          })
        .then((res) => {;
        })
        .catch((err) => {
          console.log(err);
        });
    },[token])

    useEffect(()=>{
            axios.get(`https://project-spotify-1.onrender.com/author/find-all-album-of-author/${props.data?.id}`, {
                headers: {
                Authorization: `Bearer ${token}`
                }
            })
            .then((res) => {
                console.log(res.data.albums, 'asdsadasdsadsadasd');
                setAlbumsOfArtist(res.data.albums)
            })
            .catch((err) => {
                console.log(err);
            });
    },[props.data?.id, token])

    useEffect(()=>{
        axios.get(`https://project-spotify-1.onrender.com/author/find-all-music-of-author/${props.data?.id}`, {
            headers: {
            Authorization: `Bearer ${token}`
            }
        })
        .then((res) => {
            console.log(res.data.musics, 'gela');
            setGlobalClickerState(res.data[0].authorId);
        })
        .catch((err) => {
            console.log(err);
        });
    },[props.data?.id, token])
    return (
        <div className={styles.wrapper}>
            <NewsComponent 
                title={props.title} 
                count={props.count} 
                playlistBackground={props.image}
                onlyTitle
            />
            <div>
                <div className={styles.navigationWrapper}>
                    <button
                        id={activeButton === 'top-songs' ? styles.activeButton : ''}
                        onClick={() => setActiveButton(artistNav.topSongs)}
                    >
                        Top Songs
                    </button>
                    <button
                        id={activeButton === 'album' ? styles.activeButton : ''}
                        onClick={() => setActiveButton(artistNav.album)}
                    >
                        Album
                    </button>
                    <button
                        id={activeButton === 'biography' ? styles.activeButton : ''}
                        onClick={() => setActiveButton(artistNav.biography)}
                    >
                        Biography
                    </button>
                </div>
                {(() => {
                    switch (activeButton) {
                        case artistNav.topSongs:
                            return <ReusableTable pageName={`author/find-all-music-of-author/${props.data?.id}`} include='author/find-all-music-of-author/' albumMusics/>;
                        case artistNav.album:
                            return <ArtistAlbum albumsOfArtist={albumsOfArtist}/>;
                        case artistNav.biography:
                            return (
                                <ArtistBiography
                                    image={props.image}
                                    title={props.title}
                                    paragraph={`${props.data?.biography}`} 
                                />
                            );
                        default:
                            return null;
                    }
                })()}
            </div>
        </div>
    );
};
