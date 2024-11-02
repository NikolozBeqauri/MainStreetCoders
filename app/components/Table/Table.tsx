'use client'
import { Table } from "antd";
import styles from './Table.module.scss';
import Image from "next/image";
import { useWindowSize } from "react-use";
import { useRecoilState } from "recoil";
import { albumMusicFromArtistState, mudicIDState, musicIdForPlaylistState, musicState } from "@/app/states";
import { ReusableIcon } from "../ReusableIcon/ReusableIcon";

const Tables = () => {
    const [musicArray, setMusicArray] = useRecoilState(musicState);
    const [albumPage, setAlbumPage] = useRecoilState(albumMusicFromArtistState);
    const [musicID, setMusicId] = useRecoilState(mudicIDState);
    const [, setMusicIdForPlaylist] = useRecoilState(musicIdForPlaylistState);

    const { width } = useWindowSize();
    const isMobile = width > 767;

    const formatDuration = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    };

    const handleThreeDotIconClick = (record: { id: number }) => {
        console.log(record.id, "music id here");
        setMusicIdForPlaylist(record.id);
    };

    const columns = [
        {
            title: '#',
            dataIndex: 'id',
            key: 'id',
            width: '5%',
            render: (_: any, __: any, index: number) => (
                <div className={styles.cellId}>{index + 1}</div>
            ),
        },
        {
            title: 'Song Name',
            dataIndex: 'title',
            key: 'title',
            width: '30%',
            render: (text: string, item: any) => (
                <div className={styles.cellSongname}>
                    <Image className={styles.img} src={item.trackImage} width={48} height={48} alt={text} />
                    <div className={styles.fontGap}>
                        <div className={styles.songTitle}>{item.trackTitle}</div>
                    </div>
                </div>
            ),
        },
        {
            title: 'Author',
            dataIndex: 'author',
            key: 'author',
            width: '20%',
            render: (_: any, item: any) => (
                <div className={styles.fontGap}>
                    <div className={styles.songArtist}>{item.authorFullName}</div>
                </div>
            ),
        },
        {
            title: 'Time',
            dataIndex: 'time',
            key: 'time',
            width: '10%',
            render: (_: any, item: any) => (
                <div className={styles.cellTimeName}>{item.duration || formatDuration(item.duration)}</div>
            ),
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
                dataSource={albumPage}
                columns={columns}
                pagination={false}
                rowKey="id"
                onRow={(record: any) => ({
                    onClick: () => {
                        setMusicId(record.id);
                    },
                })}
                rowClassName={styles.row}
            />
        </div>
    );
};

export default Tables;
