'use client'
import { useEffect, useState } from 'react'
import styles from './page.module.scss'
import Link from 'next/link'
import axios from 'axios'
import { useRecoilState } from 'recoil'
import { albumIdState, albumMusicFromArtistState, oneArrayMusicState } from '@/app/states'
import Cookies from "js-cookie";
import { useParams } from 'next/navigation'
import { Header } from '@/app/components/Header/Header'
import News from '@/app/components/News/News'
import Tables from '@/app/components/Table/Table'
import { NewsComponent } from '@/app/components/NewsComponent/NewsComponent'



const AlbumID = () => {
    const [albumIDData, setAlbumIDData] = useRecoilState(albumIdState)
    const [albumCover, setAlbumCover] = useState<string>()
    const [albumName, setAlbumName] = useState<string>()
    const [albumPage, setAlbumPage] = useRecoilState(albumMusicFromArtistState)
    const [musicArrayTwo, setMusicArrayTwo] = useRecoilState(oneArrayMusicState)
    const token = Cookies.get("token");
    const { id } = useParams();




    useEffect(() => {
        axios.get(`https://project-spotify-1.onrender.com/album/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((r) => {
                setAlbumPage(r.data.musics)
                setAlbumCover(r.data.coverImage)
                setAlbumName(r.data.title)
                setMusicArrayTwo(r.data.musics)
                console.log(r.data, 'asdasd');


            })
            .catch(error => {
            })
    }, [id])

    return (
        <div className={styles.wrapper}>
            <div className={styles.headerContainer}>
                <Header />
                <div className={styles.bodyContainer}>
                    <NewsComponent
                        title={albumName || 'Loading...'}
                        playlistBackground={albumCover}
                        onlyTitle
                    />
                    <Tables />
                </div>
            </div>
        </div>
    )
}

export default AlbumID
