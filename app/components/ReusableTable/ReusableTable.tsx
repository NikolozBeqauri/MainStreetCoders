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
import { globalClickerState } from "@/app/states";

type Props = {
  heartActive?: boolean;
  pageName?: string;
  setAudioPlayerData?: (trackData: any) => void;
};

export const ReusableTable = (props: Props) => {
  const [records, setRecords] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const token = Cookies.get("token");
  const [globalClicker, setGlobalClickerState] = useRecoilState(globalClickerState);

  useEffect(() => {
    axios
      .get(`https://project-spotify-1.onrender.com/${props.pageName}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const data = response.data;
        setRecords(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, [token, props.pageName]);
  
  if (loading) {
    return <Loading width="" />;
  }

  const handleRowClick = async (record: { id: number }) => {
    try {
      const response = await axios.get(`https://project-spotify-1.onrender.com/albums/${record.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const albumData = response.data;
      if (albumData && albumData.musics && albumData.musics.length > 0) {
        const firstTrack = albumData.musics[0];
        setGlobalClickerState(firstTrack.id);

        if (props.setAudioPlayerData) {
          props.setAudioPlayerData({
            authorName: firstTrack.authorName,
            duration: firstTrack.duration,
            filePath: firstTrack.filePath,
            trackImage: firstTrack.trackImage,
            trackTitle: firstTrack.trackTitle,
          });
        }
      }
    } catch (error) {
      console.error("Error fetching album details:", error);
    }
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
      render: (record: any) => {
        const albumCover = record.coverImage || record.album?.coverImage;
        return (
          <img
            src={albumCover || "/default-album-cover.png"}
            alt="Album Cover"
            width={48}
            height={48}
          />
        );
      },
    },
    {
      title: "Song Name",
      key: "songName",
      render: (record: any) => {
        const firstMusic = record.musics && record.musics.length > 0 ? record.musics[0] : null;
        return (
          <div className={styles.infoWrapper}>
            <div className={styles.wrapper}>
              <div className={styles.songName}>
                {firstMusic ? firstMusic.trackTitle : "Unknown Track"}
              </div>
              <div className={styles.author}>
                {firstMusic ? firstMusic.authorName : "Unknown Author"}
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
      render: (record: any) => {
        const firstMusic = record.musics && record.musics.length > 0 ? record.musics[0] : null;
        return (
          <div className={styles.time}>
            {firstMusic ? firstMusic.duration : "Unknown Duration"}
          </div>
        );
      },
    },
    {
      key: "actions",
      render: () => (
        <div className={styles.icon}>
          <HeartIcon active={props.heartActive} />
          <ReusableIcon imgName={"whiteThreeDots"} />
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
        onRow={(record) => {
          return {
            onClick: () => handleRowClick(record),
          };
        }}
      />
    </div>
  );
};
