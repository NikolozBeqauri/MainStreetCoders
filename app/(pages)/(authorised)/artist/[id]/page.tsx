"use client"; // Mark the component as a Client Component
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation'; // For Next.js 13 (App Router)
import News from "@/app/components/News/News";
import TabbedNav from "@/app/components/TabbedNav/TabbedNav";
import styles from "./page.module.scss";
import axios from 'axios';
import { useRecoilState } from 'recoil';
import { albumidState, formusicFetchState } from '@/app/states';
import { Header } from '@/app/components/Header/Header';
import Cookies from 'js-cookie';

const Artist = () => {
    const router = useRouter();
    const { id } = useParams();

    const [albumId, setAlbumId] = useRecoilState(albumidState);
    const [viewArtist, setViewArtist] = useRecoilState(formusicFetchState)

    const [artistPhoto, setArtistPhoto] = useState('');
    const [artistName, setArtistName] = useState('');
    const token = Cookies.get('token');

    useEffect(() => {
        axios.get(`https://project-spotify-1.onrender.com/author/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
            .then((response) => {
                const artistData = response.data;
                setArtistPhoto(artistData?.image || '');
                setArtistName(artistData.fullName);                
            })
            .catch((error) => {
                console.log('Error here');
            });

    }, [id]);

    return (
        <div className={styles.container}>
            <Header />
            <News title={artistName} image={`${artistPhoto}`} />
            <TabbedNav biographyText={""} />
        </div>
    );
};

export default Artist;