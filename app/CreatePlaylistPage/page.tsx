"use client"

import AudioPlayer from "../components/AudioPlayer/AudioPlayer";
import { Header } from "../components/Header/Header"
import ReusableButton from "../components/ReusableButton/ReusableButton";
import { Search } from "../components/Search/Search";
import { SideBar } from "../components/SideBar/SideBar"
import Styles from "./page.module.scss";

export default function CreatePlaylistPage () {

    return(
        <div className={Styles.container}>
        <SideBar />
            <div className={Styles.childrenContainer}>
                <Header />
                <h1 className={Styles.header}>My Playlists</h1>
                <div className={Styles.searchLayout}>
                    <Search />
                    <ReusableButton title={"New Playlist"} />
                </div>
            </div>
            
        </div>
    )
}