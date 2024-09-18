'use client'
import { useRouter } from "next/navigation";
import { AddLine } from "./AddLIne/AddLine"
import styles from "./AddPlaylist.module.scss";



export const AddPlaylist = () => {
    const router = useRouter()


    return (
        <div>
            <div className={`${styles.container} ${styles.background}`} >
                <AddLine title="Add to playlists" image={"addPlaylistIcon"} />
                <AddLine onClick={() => { router.push('/album') }} title="View Album" image={"viewAlbumIcon"} />
                <AddLine onClick={() => { router.push('/artist') }} title="viewArtist" image={"viewArtistIcon"} />
            </div>
        </div>
    )
}