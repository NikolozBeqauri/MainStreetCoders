'use client'
import styles from "./page.module.scss";
import { AlbumCard } from "@/app/components/AlbumCard/AlbumCard";
import { TopSongs } from "@/app/components/TopSongs/TopSongs";
import { Key, SetStateAction, useEffect, useState } from "react";
import { BurgerMenu } from "@/app/components/BurgerMenu/BurgerMenu";
import axios from "axios";
import Cookies from 'js-cookie';
import { UserProfileIcon } from "@/app/components/UserProfileIcon/UserPrifileIcon";
import Image from "next/image";
import { useRecoilState } from "recoil";
import { dataState } from "@/app/states";
import { useViewport } from 'react-viewport-hooks';

type Album = {
    totalSongsOfAuthor: string;
    fullName: string;
    image: string;
    count: number;
};

const ArtistPage = () => {
    const [data, setData] = useRecoilState(dataState);
    const [dataBase, setDataBase] = useState<any>([]);
    const { vw, } = useViewport();
    
    const token = Cookies.get("token")
    useEffect(() => {
        axios.get("https://project-spotify-83tj.onrender.com/author", {
            headers: {
                "Content-Type": "multipart/form-data",
                "Authorization": `Bearer ${token}`
            }
        })
        .then(r => {
            setDataBase(r.data)
        })
        .catch((err) => {
            console.log(err);
        })
    }, [token])


    return (
        <div className={styles.artistPageWrapper}>
            <div className={styles.headerWrapper}>
                <BurgerMenu />
                <div onClick={()=>setData(null)}>
                {(vw > 1024 || vw < 600) && (  
                    <Image
                        style={{ cursor: 'pointer' }}
                        src={`/icons/rightArrow.svg`}
                        alt="icon"
                        width={24}
                        height={24}
                    />
                )}
                </div>
                <UserProfileIcon />
            </div>
            {data ? (
                <TopSongs
                    image={data?.image}
                    title={data?.fullName}
                    count={data.totalSongsOfAuthor}
                    data={data}
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
                                desableIcons
                            />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default ArtistPage;
