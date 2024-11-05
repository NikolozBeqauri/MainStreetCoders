"use client";

import React, { useEffect, useState } from "react";
import { Table } from "antd";
import styles from "./AlbumTable.module.scss";
import axios from "axios";
import Loading from "../Loading/Loading";
import Cookies from "js-cookie";
import { useRecoilState } from "recoil";
import { globalClickerState, albumOnState, isPlayingState, musicOnState, playlistOnState, randomWordsState, currentAlbumStete } from "@/app/states";
import { useRouter } from "next/navigation";

type Props = {
  heartActive?: boolean;
  pageName?: string;
  isTopHitPage?: boolean;
  albumMusics?:boolean;
  include?: string;
};

export const AlbumTable = (props: Props) => {
  const [records, setRecords] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const token = Cookies.get("token");
  const [globalClicker, setGlobalClickerState] = useRecoilState(globalClickerState);
  const [albumOn, setAlbumOnState] = useRecoilState(albumOnState);
  const [isPlaying, setIsPlayingState] = useRecoilState(isPlayingState);
  const [musicOn, setMusicOnState] = useRecoilState(musicOnState);
  const [playlistOn, setPlaylistOnState] = useRecoilState(playlistOnState);
  const [randomWords, setRandomWordsState] = useRecoilState(randomWordsState);
  const [albumFullName, setAlbumFullName] = useState<string >('')
  const [, setCurrentAlbum] = useRecoilState(currentAlbumStete);
  const router = useRouter();

  useEffect(() => {
    
    const fetchRecords = async () => {
      try {
        const response = await axios.get(`https://project-spotify-83tj.onrender.com/${props.pageName}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        if(props.albumMusics){
          setRecords(response.data.musics);          
          setAlbumFullName(response.data.title);
        }else{      
          setRecords(response.data);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };    
    setRandomWordsState(`${props.pageName}`)
    fetchRecords();
  }, [token, props.pageName, props.albumMusics]);
  
  if (loading) {
    return <Loading width="" />;
  }

  const handleRowClick = async (record: { id: number }) => {
    setGlobalClickerState(record.id);
    setAlbumOnState(props.pageName === "album");
    setIsPlayingState(true)
    setMusicOnState((props.pageName === "music/topHits") || (props.pageName === "music/topweek") || props.include === "author/find-all-music-of-author/")
    setPlaylistOnState(false)
  };

  const columns = [
    {
      title: "#",
      key: "index",
      render: (_: any, __: any, index: number) => (
        <div className={styles.key}>{index + 1}</div>
      ),
    },
    {
      title: "Album Cover",
      key: "albumCover",
      render: (record: any) => (
        <img
          src={record.coverImage || record.album?.coverImage || record?.trackImage || "/default-album-cover.png"}
          alt=""
          width={48}
          height={48}
        />
      ),
    },
    {
      title: "Album",
      key: "Album",
      render: (record: any) => {
        const albumTitle = record.title || record.album?.title || albumFullName || "Unknown Album";

        return (
          <div className={styles.infoWrapper}>
            <div className={styles.wrapper}>
              <div className={styles.titleWrapper}>
                <div id={`authorTitle-${record.id}`} className={styles.authorTitle}>
                  {albumTitle}
                </div>
              </div>
            </div>
          </div>
        );
      },
    },
  
    {
      title: "Number of Track",
      key: "Number of Track",
      render: (record: any) => (
        <div className={styles.albumName}>
          {record.count ||  "Unknown counter"}
        </div>
      ),
    },
    {
      title: "releaseDate",
      key: "releaseDate",
      render: (record: any) => (
        <div className={styles.time}>
          {record.releaseDate || (record?.musics?.[0]?.durareleaseDatetion ?? 'Unknown releaseDate')}
        </div>
      ),
    },
   
  ];

  return (
    <div className={styles.wrapper}>
      <Table
        columns={columns}
        dataSource={records}
        rowKey="id"
        onRow={(record) => ({
          onMouseEnter: () => {
            const titleElement = document.getElementById(`authorTitle-${record.id}`);
            if (titleElement) {
              titleElement.classList.add(styles.scrolling);
            }
          },
          onMouseLeave: () => {
            const titleElement = document.getElementById(`authorTitle-${record.id}`);
            if (titleElement) {
              titleElement.classList.remove(styles.scrolling);
            }
          },
          onClick: () => {
            router.push(`/album?idFromAlbumPage=${record.id}`)
            setCurrentAlbum(record.title);
          },
        })}
      />
    </div>
  );
};
