"use client";

import Styles from "./page.module.scss";
import { SquareCard } from "@/app/components/SquareCard/SquareCard";
import ReusableButton from "@/app/components/ReusableButton/ReusableButton";
import { Header } from "@/app/components/Header/Header";
import { useViewport } from "react-viewport-hooks";
import { useEffect, useState } from "react";
import { NewsComponent } from "@/app/components/NewsComponent/NewsComponent";
import axios from "axios";
import Cookies from 'js-cookie';
import { ReusableIcon } from "@/app/components/ReusableIcon/ReusableIcon";
import UploadFile from "@/app/components/AddPlaylist/UploadFile/UploadFile";
import { PlaylistTable } from "@/app/components/PlaylistTable/PlaylistTable";
import { useRecoilState } from "recoil";
import { albumOnState, mudicIDState, oneArrayMusicState, playlistIdState, playlistOnState, randomWordsState } from "@/app/states";

const PlayListPage = () => {
    const { vw } = useViewport();
    const [playlistContentActive, setPlaylistContentActive] = useState(true);
    const [selectedPlaylist, setSelectedPlaylist] = useState<any>(null);
    const [data, setData] = useState<any>([]);
    const [showUploadFile, setShowUploadFile] = useState(false);
    const token = Cookies.get("token");

    const [, setPlaylistIdState] = useRecoilState(playlistIdState);
    const [, setAlbumOnState] = useRecoilState(albumOnState);
    const [, setPlaylistOnState] = useRecoilState(playlistOnState);
    const [randomWords, ] = useRecoilState(randomWordsState);
    const [, setMusicArrayTwo] = useRecoilState<any>(oneArrayMusicState);

    axios.get(`https://project-spotify-83tj.onrender.com/playlist`, {
        headers: {
            "Content-Type": "multipart/form-data",
            "Authorization": `Bearer ${token}`,
        }
    })
    .then((r) => {
        setData(r.data);
    })
    .catch((err) => {
        console.error(err);
    });


    const fetchPlaylists = async () => {
        try {
            const response = await axios.get('https://project-spotify-83tj.onrender.com/playlist', {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "Authorization": `Bearer ${token}`,
                },
            });
            setData(response.data);
        } catch (err) {
            console.error(err);
        }
    };

    const fetchSelectedPlaylist = (playlistId: number) => {
        axios.get(`https://project-spotify-83tj.onrender.com/playlist/${playlistId}`, {
            headers: {
                "Authorization": `Bearer ${token}`,
            }
        })
        .then((r) => {
            console.log(r.data.musics, 'data playlist here');
            setData(r.data.musics)
            setSelectedPlaylist(r.data);
            setMusicArrayTwo(r.data.musics)
        })
        .catch((err) => {
            console.error(err);
        });
    };

    useEffect(() => {
        const fetchSelectedPlaylist = (playlistId: number) => {
            axios.get(`https://project-spotify-83tj.onrender.com/playlist/${playlistId}`, {
                headers: {
                    "Authorization": `Bearer ${token}`,
                }
            })
            .then((r) => {
                setSelectedPlaylist(r.data);
                console.log(r.data, ' data playlist here');
                setData(r.data.musics)
                setMusicArrayTwo(data)
            })
            .catch((err) => {
                console.error(err);
            });
        };
    },[token])

    useEffect(() => {
        fetchPlaylists();
    }, [token]);

    const handleCardClick = (playList: any) => {
        setSelectedPlaylist(playList);
        setPlaylistContentActive(false);
        setPlaylistIdState(playList.id);
        setAlbumOnState(false);
        setPlaylistOnState(true);
    };

    return (
        <div className={Styles.container}>
            {playlistContentActive ? (
                <div className={Styles.defaultPage}>
                    <div>
                        {vw < 1024 && vw > 600 ? (
                            <Header burger={true}/>
                        ) : (
                            <Header imgName={"rightArrow"} imgHeight={35} imgWidth={35} />
                        )}
                    </div>

                    <div className={Styles.mainTitleWrapper}>
                        {vw < 1024 && vw > 600 ? (
                            <ReusableIcon imgName={"rightArrow"} width={35} height={35} />
                        ) : (
                            ""
                        )}
                        <h1 className={Styles.header}>My Playlists</h1>
                    </div>

                    <div className={Styles.searchLayout}>
                        {vw < 1024 ? (
                            <div onClick={() => setShowUploadFile(true)}>
                                <ReusableButton title={"+"} />
                            </div>
                        ) : (
                            <div onClick={() => setShowUploadFile(true)}>
                                <ReusableButton title={"+ New Playlist"} />
                            </div>
                        )}
                    </div>

                    <div className={Styles.containerWrapper}>
                        {data.map((playList: any, index: any) => (
                            <SquareCard
                                key={index}
                                title={playList.name}
                                img={playList.image}
                                onClick={() => handleCardClick(playList)}
                                iconImage={"trash"}
                                playListId={playList.id}
                                refetchPlaylists={fetchPlaylists}
                            />
                        ))}
                    </div>
                </div>
            ) : (
                <div className={Styles.childrenContainer}>
                    <Header imgName={"rightArrow"} isPlaylistPage setPlaylistContentActive={setPlaylistContentActive} />
                    {selectedPlaylist && (
                        <>
                            <NewsComponent
                                onlyTitle
                                title={selectedPlaylist.name}
                                playlistBackground={selectedPlaylist?.image}
                                count={selectedPlaylist?.count}
                            />
                            <PlaylistTable
                                selectedPlaylistId={selectedPlaylist.id}
                                records={selectedPlaylist.music}
                                refetchPlaylists={fetchPlaylists}
                                refetchSelectedPlaylist={() => fetchSelectedPlaylist(selectedPlaylist.id)} 
                                someWord={randomWords}
                                data={data}
                            />
                        </>
                    )}
                </div>
            )}

            {showUploadFile && (
                <div className={Styles.modalOverlay} onClick={() => setShowUploadFile(false)}>
                    <div className={Styles.modalContent} onClick={(e) => e.stopPropagation()}>
                        <UploadFile withOutArrow={true} setActiveComponent={setShowUploadFile} refetchPlaylists={fetchPlaylists} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default PlayListPage;
