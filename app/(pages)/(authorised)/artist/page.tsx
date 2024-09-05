'use client'
import { Header } from "@/app/components/Header/Header";
import styles from "./page.module.scss";
import { artistPageData } from "./artistPageData/artistPageData";
import { AlbumCard } from "@/app/components/AlbumCard/AlbumCard";
import { TopSongs } from "@/app/components/TopSongs/TopSongs";
import { useState } from "react";

type Album = {
    author: string;
    img: string;
    // Add other properties if needed
};

const ArtistPage = () => {
    const [data, setData] = useState<Album | null>(null);
    
    return (
        <div className={styles.artistPageWrapper}>
            <Header />
            {data ? (
                <TopSongs 
                    image={data.img} 
                    title={data.author}
                    count={"123"} 
                />
            ) : (
                <div className={styles.artistCardsWrapper}>
                    <h2>Trending Now</h2>
                    <div className={styles.artistCards}>
                        {artistPageData.map((album, index) => (
                            <AlbumCard
                                key={index}
                                author={album.author}
                                img={album.img}
                                onClick={() => setData(album)}
                            />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default ArtistPage;
