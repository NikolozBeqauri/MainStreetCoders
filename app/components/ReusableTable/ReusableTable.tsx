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
  const [, setGlobalClickerState] = useRecoilState(globalClickerState);

  useEffect(() => {
    axios
      .get(`https://project-spotify-1.onrender.com/${props.pageName}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setRecords(response.data);
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
    setGlobalClickerState(record.id);
    // Fetch album details if needed...
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
          src={record.coverImage || record.album?.coverImage || "/default-album-cover.png"}
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

        return (
          <div className={styles.infoWrapper}>
            <div className={styles.wrapper}>
              <div className={styles.titleWrapper}>
                <div id={`authorTitle-${record.id}`} className={styles.authorTitle}>
                  {trackTitle}
                </div>
              </div>
              <div className={styles.author}>
                {firstMusic ? firstMusic.authorName : record.authorName || 'Unknown Author'}
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
          {record.duration || 'Unknown Duration'}
        </div>
      ),
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
