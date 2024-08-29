import AudioPlayer from "../../components/AudioPlayer/AudioPlayer";
import { Header } from "../../components/Header/Header"
import ReusableButton from "../../components/ReusableButton/ReusableButton";
import { Search } from "../../components/Search/Search";
import { SideBar } from "../../components/SideBar/SideBar"
import { UserPlaylist } from "../../components/UserPlaylist/UserPlaylist";
import Styles from "./page.module.scss";

const PlayListPage = () => {
    return(
        
            <div className={Styles.container}>
            <div className={Styles.childrenContainer}>
                <Header imgName={"icon"}/>
                <h1 className={Styles.header}>My Playlists</h1>
                <div className={Styles.searchLayout}>
                    <Search />
                    <ReusableButton title={"New Playlist"} />
                </div>
                <UserPlaylist image={"ad"} count={12} />
            </div>
            
        </div>
        
    )
}

export default PlayListPage;