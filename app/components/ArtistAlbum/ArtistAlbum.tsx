import artistAlbumData from "./artistAlbumData/artistAlbumData"
import styles from "./ArtistAlbum.module.scss"
import { SquareCard } from "../SquareCard/SquareCard"
export const ArtistAlbum = () => {
    return (
        <div className={styles.artistAlbumWrapper}>
            {artistAlbumData.map((album, index) => (
                <SquareCard  key={index} title={album.title} img={album.image}/>
             ))}
        </div>
    )
}