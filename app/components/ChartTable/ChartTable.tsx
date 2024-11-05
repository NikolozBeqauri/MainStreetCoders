"use client";
import { Table } from "antd";
import styles from "./ChartTable.module.scss";
import { render } from "sass";
import { text } from "stream/consumers";
import Image from "next/image";
import { useWindowSize } from "react-use";
import { useRecoilState } from "recoil";
import { globalAlbumDataState, mudicIDState, musicIdForPlaylistState, musicState, oneArrayMusicState } from "@/app/states";
import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { ReusableIcon } from "../ReusableIcon/ReusableIcon";


const ChartTable = () => {
    const [musicArray, setMusicArray] = useRecoilState(musicState);
    const [globalalbum, setGlobalAlbum] = useRecoilState(globalAlbumDataState);
    const [musicID, setMusicId] = useRecoilState(mudicIDState)
    const [musicArrayTwo, setMusicArrayTwo] = useRecoilState<any>(oneArrayMusicState)
    const token = Cookies.get('token')


    const [albumData, setAlbumData] = useState()
    const [musicData, setMusicData] = useState<any>()
    const [musicCover, setMusicCover] = useState<any>()
    const [, setMusicIdForPlaylist] = useRecoilState(musicIdForPlaylistState);

    const handleThreeDotIconClick = (record: { id: number }) => {
        console.log(record.id, "music id here");
        setMusicIdForPlaylist(record.id);
    };

    useEffect(() => {
        axios.get(`https://project-spotify-83tj.onrender.com/music/topweek`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then((r) => {
                setMusicCover(r.data)
                console.log(r.data, ' here chart data');
                
            });
    }, []);

    const { width, height } = useWindowSize();
    const isMobile = width > 767;

    //

    const columns = [
        {
            title: isMobile ? "#" : "",
            dataIndex: "id",
            key: "id",
            width: "1%",
            render: (text: any, item: any, index: any) => (
                <div className={styles.cellId}>{index + 1}</div>
            ),
        },

        {
            title: isMobile ? "Song Name" : "",
            dataIndex: "musicCover",
            key: "title",
            width: "30%",
            render: (text: any, item: any, record: any) => (
                <div className={styles.cellSongname}>
                    <Image className={styles.img} src={item.trackImage} width={48} height={48} alt={text} />
                    <div className={styles.fontGap}>
                        <div className={styles.songTitle}>{item.trackTitle}</div>
                        <div className={styles.songArtist}>{item.author?.fullName}</div>
                    </div>
                </div>
            ),
        },
        width > 725
            ? {
                title: "Album",
                dataIndex: "album",
                key: "album",
                width: "25%",
                render: (text: any, item: any) => (
                    <div className={styles.cellAlbumName}>{item.album?.title}</div>
                ),
            }
            : {
                width: "0.5%",
                render: () => <div></div>,
            },
        isMobile
            ? {
                title: "Time",
                dataIndex: "time",
                key: "time",
                width: "15%",
                render: (text: any, item: any) => (
                    <div className={styles.cellTimeName}>{item.duration}</div>
                    // there is duration 
                ),
            }
            : {
                width: "0.5%",
                render: () => <div></div>,
            },
            {
                title: 'actions',
                key: 'actions',
                width: '10%',
                render: (_: any, record: any) => (
                    <div onClick={(e) => e.stopPropagation()}>
                        <div className={styles.iconWrapper} onClick={() => handleThreeDotIconClick(record)}>
                            <ReusableIcon imgName="threeDots" />
                        </div>
                    </div>
                ),
            },
    ];

    return (
        <div className={styles.wrapper}>
            <Table
                className={styles.container}
                dataSource={musicCover}
                columns={columns}
                onRow={(record: any) => ({
                    onClick: () => {
                        setMusicId(record.id);
                        setMusicArrayTwo(musicCover)
                    },
                })}
                pagination={false}
                rowClassName={styles.row111111}
            />
        </div>
    );
};

export default ChartTable;
