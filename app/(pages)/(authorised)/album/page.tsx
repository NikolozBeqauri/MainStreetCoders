"use client"; // Add this line to mark the component as a Client Component
import styles from './page.module.scss';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRecoilState } from 'recoil';
import { albumidState } from '@/app/states';
import { Header } from '@/app/components/Header/Header';
import Card from '@/app/components/Card/Card';
import Cookies from "js-cookie";


const Album = () => {
    const [albumId, setAlbumId] = useRecoilState(albumidState);
    const [reusableID, setReusableId] = useState()
    const router = useRouter();
    const param = useParams();


    const handleCardClick = (id: number) => {
        router.push(`/album/${id}`);
    };

    const [artists, setArtists] = useState([]);
    const token = Cookies.get('token');

    useEffect(() => {
        axios.get(`https://project-spotify-1.onrender.com/album`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
            .then((r) => {
                setArtists(r.data);
                console.log(r.data, 'here is data of album');
            })
            .catch((error) => {
            });
    }, []);

    return (
        <div className={styles.container}>
            <Header />
            <div className={styles.container2}>
                <br />
                <br />
                <h2 className={styles.h2}>Trending Now</h2>
                <div className={styles.wrapper}>
                    {
                        artists.map((item: any) => (
                            <div
                                key={item.id} // Assign the unique key here
                                onClick={() => {
                                    setReusableId(item.id)
                                    setAlbumId(item.id);
                                    handleCardClick(item.id);
                                }}
                            >
                                <Card
                                    image={item.coverImage}
                                    title={item.title}
                                    imageStyle={'round'}
                                />
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    );
};

export default Album;
