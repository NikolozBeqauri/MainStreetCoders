"use client";

import Styles from "./page.module.scss";
import { SquareCard } from "@/app/components/SquareCard/SquareCard";
import { Search } from "@/app/components/Search/Search";
import ReusableButton from "@/app/components/ReusableButton/ReusableButton";
import { Header } from "@/app/components/Header/Header";
import { useViewport } from "react-viewport-hooks";
import { useEffect, useState } from "react";
import { NewsComponent } from "@/app/components/NewsComponent/NewsComponent";
import { ReusableTable } from "@/app/components/ReusableTable/ReusableTable";
import axios from "axios";
import Cookies from 'js-cookie';
import { ReusableIcon } from "@/app/components/ReusableIcon/ReusableIcon";
import UploadFile from "@/app/components/AddPlaylist/UploadFile/UploadFile";

const PlayListPage = () => {
    const { vw } = useViewport();
    const [playlistContentActive, setPlaylistContentActive] = useState(true);
    const [selectedPlaylist, setSelectedPlaylist] = useState<any>(null);
    const [data, setData] = useState<any>([]);
    const [showUploadFile, setShowUploadFile] = useState(false); 
    const token = Cookies.get("token");

    const fetchPlaylists = () => {
        axios.get(`https://project-spotify-1.onrender.com/playlist`, {
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
    };

    useEffect(() => {
        fetchPlaylists();
    }, [token]);

    const handleCardClick = (playList: any) => {
        setSelectedPlaylist(playList);
        setPlaylistContentActive(false);
    };

    return (
        <div className={Styles.container}>
            {playlistContentActive ? (
                <div className={Styles.defaultPage}>
                    <div>
                        {vw < 1024 && vw > 600 ? (
                            <Header burger={true} />
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
                                <ReusableButton title={"+"}  /> 
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
                    <Header imgName={"rightArrow"} />
                    {selectedPlaylist && (
                        <NewsComponent
                            title={selectedPlaylist.name}
                            image={selectedPlaylist.img}
                            count={"300,000"}
                        />
                    )}
                    <Search />
                    <ReusableTable />
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
