import artistAlbumData from "./artistAlbumData/artistAlbumData"
import styles from "./ArtistAlbum.module.scss"
import { SquareCard } from "../SquareCard/SquareCard"
import { Key } from "react";

type Props = {
    albumsOfArtist: any;
}

export const ArtistAlbum = (props:Props) => {
    const s = props.albumsOfArtist
    return (
        <div className={styles.artistAlbumWrapper}>
            {props.albumsOfArtist.map((album: { id: Key | null | undefined; title: string; image: string; }) => (
                <SquareCard  key={album.id} title={album.title} img={album.image}/>
             ))}
        </div>
    )
}