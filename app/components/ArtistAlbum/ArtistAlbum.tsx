import styles from "./ArtistAlbum.module.scss";
import { SquareCard } from "../SquareCard/SquareCard";
import { useState } from "react";
import { ReusableTable } from "../ReusableTable/ReusableTable";

type Album = {
    coverImage: string; 
    id: number;
    title: string | null; 
};

type Props = {
    albumsOfArtist: Album[]; 
};

export const ArtistAlbum = (props: Props) => {
    const [selectedAlbumId, setSelectedAlbumId] = useState<number | null>(null);

    const handleAlbumClick = (albumId: number) => {
        setSelectedAlbumId(albumId);
        console.log(`Selected Album ID: ${albumId}`);
    };

    const hasAlbums = props.albumsOfArtist.some((album) => album.title !== null);

    return (
        <div className={selectedAlbumId? styles.tableStyle : styles.artistAlbumWrapper }>
            {selectedAlbumId ? (
                <ReusableTable pageName={`album/${selectedAlbumId}`} albumMusics />   
            ) : (props.albumsOfArtist.map((album) => (
                <SquareCard
                    key={album.id}
                    title={album.title || "Unknown Album"} 
                    img={album.coverImage}
                    onClick={() => handleAlbumClick(album.id)}
                    desableIcons 
                />
            ))
            )}
        </div>
    );
};
