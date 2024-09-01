"use client"

import { useState } from "react";
import { Header } from "../../../components/Header/Header"
import ReusableButton from "../../../components/ReusableButton/ReusableButton";
import { Search } from "../../../components/Search/Search";
import { UserPlaylist } from "../../../components/UserPlaylist/UserPlaylist";
import Styles from "./page.module.scss";
import Playlist from "./playlistArr/playlist";
import { NewsComponent } from "@/app/components/NewsComponent/NewsComponent";
import { ReusableTable } from "@/app/components/ReusableTable/Reusable";

const PlayListPage = () => {

    const [playlistState, setPlaylistState] = useState<boolean>(true);
    const [playlistName, setPlaylistname] = useState<string>('')

    const onClick = (e: any) => {
        setPlaylistState(e.target.value)
        setPlaylistname(e.target.getElementsByTagName("p")[0].innerText)
        console.log(e.target)
    }
    

    return (

        <div className={Styles.container}>
            {playlistState ? (
                <div className={Styles.childrenContainer}>
                    <Header imgName={"rightArrow"} />
                    <h1 className={Styles.header}>My Playlists</h1>
                    <div className={Styles.searchLayout}>
                        <Search />
                        <ReusableButton title={"New Playlist"} />
                    </div>
                    <div className={Styles.containerWrapper}>
                        {Playlist.map((item) => (
                            <div onClick={onClick}>
                                <UserPlaylist image={item.image} count={item.count} />
                            </div>
                            
                        ))
                        }
                    </div>
                </div>) :
                (<div className={Styles.childrenContainer}>
                    <Header imgName={"rightArrow"} />
                    <NewsComponent title={playlistName} count={""} />
                    <Search />
                    <ReusableTable />
                </div>)
            }
        </div>

    )
}

export default PlayListPage;