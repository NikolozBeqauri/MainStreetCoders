'use client'
import { Header } from "@/app/components/Header/Header";
import styles from "./page.module.scss";
import { AlbumCard } from "@/app/components/AlbumCard/AlbumCard";
import { TopSongs } from "@/app/components/TopSongs/TopSongs";
import { Key, SetStateAction, useEffect, useState } from "react";
import { BurgerMenu } from "@/app/components/BurgerMenu/BurgerMenu";
import axios from "axios";
import Cookies from 'js-cookie';

type Album = {
    author: string;
    img: string;
};

const ArtistPage = () => {
    const [data, setData] = useState<Album | null>(null);
    const [dataBase, setDataBase] = useState<any>([]);
    const token = Cookies.get("token")
    useEffect(() => {axios.get("https://project-spotify-1.onrender.com/author", {
        headers: {
            "Content-Type": "multipart/form-data",
            "Authorization": `Bearer ${token}`
        }})
    .then(r => {
        setDataBase(r.data)
    })}, [token])
    

    return (
        <div className={styles.artistPageWrapper}>
            <div className={styles.headerWrapper}>
                <BurgerMenu/>
                <Header />
            </div>
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
                        {dataBase.map((album: SetStateAction<Album | any>, index: Key | null | undefined) => (
                            <AlbumCard
                                key={index}
                                author={album.fullName}
                                img={album.image}
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
