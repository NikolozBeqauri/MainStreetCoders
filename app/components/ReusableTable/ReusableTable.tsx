"use client";

import React, { useEffect, useState } from "react";
import { Table } from "antd";
import styles from "./ReusubleTable.module.scss";
import { HeartIcon } from "../HeartIcon/HeartIcon";
import { ReusableIcon } from "../ReusableIcon/ReusableIcon";
import axios from "axios";
import Loading from "../Loading/Loading";
import Cookies from "js-cookie";
import { useRecoilState } from "recoil";
import { globalClickerState, albumOnState, isPlayingState } from "@/app/states";

type Props = {
  heartActive?: boolean;
  pageName?: string;
  isTopHitPage?: boolean;
  albumMusics?:boolean;
};

export const ReusableTable = (props: Props) => {
  const [records, setRecords] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const token = Cookies.get("token");
  const [globalClicker, setGlobalClickerState] = useRecoilState(globalClickerState);
  const [albumOn, setAlbumOnState] = useRecoilState(albumOnState);
  const [isPlaying, setIsPlayingState] = useRecoilState(isPlayingState);
  useEffect(() => {
    
    const fetchRecords = async () => {
      try {
        const response = await axios.get(`https://project-spotify-1.onrender.com/${props.pageName}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        console.log(response.data, 'hereeeeesszz');
        if(props.albumMusics){
          setRecords(response.data.musics);
        }else{
          setRecords(response.data);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };    

    fetchRecords();
  }, [token, props.pageName]);

  if (loading) {
    return <Loading width="" />;
  }

  const handleRowClick = async (record: { id: number }) => {
    setGlobalClickerState(record.id);
    setAlbumOnState(props.pageName === "album");
    setIsPlayingState(true)
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
      title: "Song Name",
      key: "songName",
      render: (record: any) => {
        const firstMusic = record.musics && record.musics.length > 0 ? record.musics[0] : null;
        const trackTitle = firstMusic ? firstMusic.trackTitle : record.trackTitle || 'Unknown Track';
        console.log(record,'tatiana');
        
        return (
          <div className={styles.infoWrapper}>
            <div className={styles.wrapper}>
              <div className={styles.titleWrapper}>
                <div id={`authorTitle-${record.id}`} className={styles.authorTitle}>
                  {trackTitle}
                </div>
              </div>
              <div className={styles.author}>
                {firstMusic ? firstMusic.author?.fullName : record.author?.fullName || record.authorFullName || `Unknow Artist`}
              </div>
            </div>
          </div>
        );
      },
    },
    {
      title: "Album",
      key: "album",
      render: (record: any) => (
        <div className={styles.albumName}>
          {record.title || record.album?.title || "Unknown Album"}
        </div>
      ),
    },
    {
      title: "Duration",
      key: "duration",
      render: (record: any) => (
        <div className={styles.time}>
          {record.duration || record.musics[0]?.duration || 'Unknown Duration'}
        </div>
      ),
    },
    {
      key: "actions",
      render: () => (
        <div className={styles.icon}>
          <HeartIcon active={props.heartActive} />
          <ReusableIcon imgName={"threeDots"} />
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
          onClick: () => handleRowClick(record),
        })}
      />
    </div>
  );
};
