"use client";

import React, { useEffect, useState } from "react";
import { Table, notification } from "antd";
import styles from "./PlaylistTable.module.scss";
import { ReusableIcon } from "../ReusableIcon/ReusableIcon";
import axios from "axios";
import Cookies from 'js-cookie';
import { useRecoilState } from "recoil";
import { globalClickerState, musicOnState, playlistDataState, playlistIdState, playlistOnState, selectedPlaylistTrackState, threeDotClickedState } from "@/app/states";


interface MusicTrack {
  authorId: number;
  createAt: string; 
  deleteAt: string | null;  
  duration: string;  
  filePath: string;  
  id: number; 
  listenerCount: number; 
  trackImage: string;  
  trackTitle: string;  
  updateAt: string;  
}

type Props = {
  records: MusicTrack[]; 
  heartActive?: boolean;
  pageName?: string;
  selectedPlaylistId?: number;
  refetchPlaylists: () => void;
  refetchSelectedPlaylist: () => void;
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString(); 
};

export const PlaylistTable = (props: Props) => {
  const [selectedMusicIdToDelete, setSelectedMusicIdToDelete] = useState<number | null>(null);
  const token = Cookies.get("token");
  const [, setThreeDotClicked] = useRecoilState(threeDotClickedState);

  const [globalClicker, setGlobalClickerState] = useRecoilState(globalClickerState);
  const [playlistOn, setPlaylistOnState] = useRecoilState(playlistOnState);
  const [musicOn, setMusicOnState] = useRecoilState(musicOnState);
  const [playlistData, setPlaylistDataState] = useRecoilState(playlistDataState)


  const handleTrashClick = (id: number) => {
    setSelectedMusicIdToDelete(id);
  };

  useEffect(() => {
    if (selectedMusicIdToDelete) {
      axios
        .delete(`https://project-spotify-1.onrender.com/playlist/${props.selectedPlaylistId}/music/${selectedMusicIdToDelete}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        })
        .then((res) => {
          console.log(res);
          notification.success({
            message: 'Music Deleted',
            description: 'The music has been successfully deleted from the playlist.',
            placement: 'top',
          });
          props.refetchSelectedPlaylist(); 
          setThreeDotClicked(false)
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [selectedMusicIdToDelete, props.selectedPlaylistId, token, props]);
  

  const columns = [
    {
      title: "#",
      key: "index",
      render: (_: any, __: any, index: number) => (
        <div className={styles.key}>{index + 1}</div>
      ),
    },
    {
      title: "Track Image",
      key: "trackImage",
      render: (record: MusicTrack) => (
        <img
          src={record.trackImage || "/default-album-cover.png"}
          alt="Track"
          width={48}
          height={48}
        />
      ),
    },
    {
      title: "Song Name",
      key: "songName",
      render: (record: MusicTrack) => (
        <div className={styles.infoWrapper}>
          <div className={styles.wrapper}>
            <div className={styles.titleWrapper}>
              <div id={`authorTitle-${record.id}`} className={styles.authorTitle}>
                {record.trackTitle || 'Unknown Track'}
              </div>
            </div>
            <div className={styles.author}>
              {record.authorId || 'Unknown Author'}
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Duration",
      key: "duration",
      render: (record: MusicTrack) => (
        <div className={styles.time}>
          {record.duration || 'Unknown Duration'}
        </div>
      ),
    },
    {
      title: "Created At",
      key: "createAt",
      render: (record: MusicTrack) => (
        <div className={styles.createdAt}>
          {record.createAt ? formatDate(record.createAt) : 'Unknown Date'}
        </div>
      ),
    },
    {
      key: "actions",
      render: (record: MusicTrack) => (
        <div className={styles.icon} onClick={() => handleTrashClick(record.id)}>
          <ReusableIcon imgName={"trash"} />
        </div>
      ),
    },
  ];

  return (
    <div className={styles.wrapper}>
      <Table
        columns={columns}
        dataSource={props.records}
        rowKey="id"
        onRow={(record) => {
          return {
            onClick: () => {
              console.log(`Music Track ID: ${record.id}`);
              setGlobalClickerState(record.id);
              setPlaylistOnState(true);
              setMusicOnState(false);
              setPlaylistDataState({
                title: record.trackTitle,
                img: record.trackImage,
                duration: record.duration,
                path: record.filePath,
              })
            },
          };
        }}
      />
    </div>
  );
};