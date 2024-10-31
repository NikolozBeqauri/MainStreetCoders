"use client";

import styles from './page.module.scss';
import { useParams, useRouter } from 'next/navigation';
import Card from '@/app/components/Card/Card';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRecoilState } from 'recoil';
import { albumidState } from '@/app/states';
import { Header } from '@/app/components/Header/Header';
import Cookies from 'js-cookie';

const ArtistsList = () => {
    const [albumId, setAlbumId] = useRecoilState(albumidState);
    const [reusableID, setReusableId] = useState()
    const router = useRouter();
    const param = useParams(); 


    useEffect(() => {
        router.push(`/artist`);
    }, []);



    const handleCardClick = (id: number) => {
        router.push(`/artist/${id}`);
    };

    const [artists, setArtists] = useState([]);
    const token = Cookies.get('token');

    useEffect(() => {
        axios.get(`https://project-spotify-1.onrender.com/author`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
            .then((r) => {
                setArtists(r.data);
            })
            .catch((error) => {
            });
    }, []);

    return (
        <div className={styles.container}>
            <Header />
            <div className={styles.container2}>
                <h2 className={styles.h2}></h2>
                <div className={styles.wrapper}>
                    {
                        artists.map((item: any) => (
                            <div
                                key={item.id}
                                onClick={() => {
                                    setReusableId(item.id)
                                    setAlbumId(item.id);
                                    handleCardClick(item.id);
                                }} 
                            >
                                <Card
                                    image={item.image}
                                    title={item.fullName}
                                    imageStyle={'round'}
                                />
                            </div>
                        ))
                    }
                </div>
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
};

export default ArtistsList;
