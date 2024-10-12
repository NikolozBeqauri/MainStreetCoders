"use client";

import React, { useEffect, useState } from "react";
import { Table } from "antd";
import styles from "./ReusubleTable.module.scss";
import { HeartIcon } from "../HeartIcon/HeartIcon";
import { ReusableIcon } from "../ReusableIcon/ReusableIcon";
import axios from "axios";
import Loading from "../Loading/Loading";
import Cookies from 'js-cookie';

type Props = {
  heartActive?: boolean;
  pageName: string; 
  id?: string; 
};

export const ReusableTable = (props: Props) => {
  const [records, setRecords] = useState<any[]>([]); 
  const [loading, setLoading] = useState(true); 
  const token = Cookies.get("token"); 

  
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
<<<<<<< Updated upstream
        console.log("General Data:", data);
=======
>>>>>>> Stashed changes
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, [token, props.pageName]);

  
  useEffect(() => {
    if (props.pageName === "albums" && props.id) {
      axios
        .get(`https://project-spotify-1.onrender.com/albums/${props.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          const albumData = response.data;
          setRecords([albumData]); 
          setLoading(false);
          console.log("Album Data:", albumData);
        })
        .catch((error) => {
          console.error("Error fetching album data:", error);
          setLoading(false);
        });
    }
  }, [token, props.pageName, props.id]);

  if (loading) {
    return <Loading width="" />;
  }

  const columns = [
    {
      title: "#",
      key: "index",
      render: (_: any, __: any, index: number) => (
        <div className={styles.key}>{index + 1}</div>
      ),
    },
    {
      title: "Song Name",
      key: "songName",
      render: (record: any) => {
        const randomTrack =
          record.musics && record.musics.length
            ? record.musics[Math.floor(Math.random() * record.musics.length)]
            : null;

        return (
          <div className={styles.infoWrapper}>
            <img
              src={
                record.coverImage || record.album?.coverImage || undefined
              }
              alt="Album Cover"
              width={48}
              height={48}
            />
            <div className={styles.wrapper}>
              <div className={styles.songName}>
                {randomTrack
                  ? randomTrack.trackTitle
                  : record.trackTitle || "Unknown Track"}
              </div>
              <div className={styles.author}>
                {record.authorName}
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
      title: "Time",
      key: "time",
      render: (record: any) => {
        const randomTrack =
          record.musics && record.musics.length
            ? record.musics[Math.floor(Math.random() * record.musics.length)]
            : null;

        return (
          <div className={styles.time}>
            {randomTrack ? randomTrack.duration : record.duration || "Unknown Duration"}
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
      <Table columns={columns} dataSource={records} rowKey="id" />
    </div>
  );
};
