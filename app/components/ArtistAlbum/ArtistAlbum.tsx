import { UserPlaylist } from "../UserPlaylist/UserPlaylist"
import artistAlbumData from "./artistAlbumData/artistAlbumData"
import styles from "./ArtistAlbum.module.scss"
export const ArtistAlbum = () => {
    return (
        <div className={styles.artistAlbumWrapper}>
            {artistAlbumData.map((album, index) => (
                <UserPlaylist
                    key={index}
                    name={album.title}
                    image={album.image} 
                />
            ))}
        </div>
    )
}