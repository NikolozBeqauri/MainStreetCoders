"use client";
import { Table } from "antd";
import styles from "./ArtistTable.module.scss";
import { render } from "sass";
import { text } from "stream/consumers";
import Image from "next/image";
import { useWindowSize } from "react-use";
import { useRecoilState } from "recoil";
import { albumCoverState, globalAlbumDataState, mudicIDState, musicState, newsImageState, oneArrayMusicState } from "@/app/states";
import { useEffect } from "react";
import axios from "axios";
const ArtistTable = () => {
  const [musicArray, setMusicArray] = useRecoilState(musicState);
  const [globalalbum, setGlobalAlbum] = useRecoilState(globalAlbumDataState);
  const [musicID, setMusicId] = useRecoilState(mudicIDState)

  const [musicArrayTwo, setMusicArrayTwo] = useRecoilState<any>(oneArrayMusicState);

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };


  const { width, height } = useWindowSize();
  const isMobile = width > 767;

  const columns = [
    {
      title: isMobile ? "#" : "",
      dataIndex: "id",
      key: "id",
      width: "1%",
      render: (text: any, item: any,index : number) => (
        <div className={styles.cellId}>{index + 1}</div>
      ),
    },

    {
      title: isMobile ? "Song Name" : "",
      dataIndex: "title",
      key: "title",
      width: "30%",
      render: (text: any, item: any) => (
        <div className={styles.cellSongname}>
          <Image className={styles.img} src={item.albumCover} width={48} height={48} alt={text} />
          <div className={styles.fontGap}>
            <div className={styles.songTitle}>{item.name}</div>
            <div className={styles.songArtist}>{item.artistName}</div>
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
            <div className={styles.cellAlbumName}>{item.albumName}</div>
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
            <div className={styles.cellTimeName}>{formatDuration(item.duration)}</div>
          ),
        }
      : {
          width: "0.5%",
          render: () => <div></div>,
        },
    {
      title: "",
      key: "like",
      width: "10%",
    },
  ];

  return (
    <div className={styles.wrapper}>
      <Table
        className={styles.container}
        dataSource={musicArray}
        columns={columns}
        pagination={false}
        onRow={(record: any) => ({
          onClick: () => {
            setMusicArrayTwo(musicArray);
            setMusicId(record.id);
          },
        })}
        rowClassName={styles.row111111}
      />
    </div>
  );
};

export default ArtistTable;
