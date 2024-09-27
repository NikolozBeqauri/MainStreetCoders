"use client";

import Styles from "./page.module.scss";
import playListsData from "./playListsData/playListsData";
import { SquareCard } from "@/app/components/SquareCard/SquareCard";
import { Search } from "@/app/components/Search/Search";
import ReusableButton from "@/app/components/ReusableButton/ReusableButton";
import { Header } from "@/app/components/Header/Header";
import { useViewport } from "react-viewport-hooks";
import { ReusableIcon } from "@/app/components/ReusableIcon/ReusableIcon";
import { useState } from "react";
import { NewsComponent } from "@/app/components/NewsComponent/NewsComponent";
import { ReusableTable } from "@/app/components/ReusableTable/ReusableTable";

const PlayListPage = () => {
    const { vw } = useViewport();
    const [playlistContentActive, setPlaylistContentActive] = useState(true);
    const [selectedPlaylist, setSelectedPlaylist] = useState<any>(null); 

    const handleCardClick = (playList: any) => {
        setSelectedPlaylist(playList);
        setPlaylistContentActive(false);
    };
    
    return (
        <div className={Styles.container}>
            {playlistContentActive  ? (
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
                        <Search />
                        {vw < 1024 ? (
                            <ReusableButton title={"+"} />
                        ) : (
                            <ReusableButton title={"+ New Playlist"} />
                        )}
                    </div>

                    <div className={Styles.containerWrapper}>
                        {playListsData.map((playList, index) => (
                            <SquareCard
                                key={index}
                                title={playList.name}
                                img={playList.img}
                                onClick={() => handleCardClick(playList)}
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
        </div>
    );
};

export default PlayListPage;
