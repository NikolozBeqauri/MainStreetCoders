"use client";

import React from "react";
import { Table } from "antd";
import styles from "./PlaylistTable.module.scss";
import { HeartIcon } from "../HeartIcon/HeartIcon";
import { ReusableIcon } from "../ReusableIcon/ReusableIcon";

type Props = {
  records: any[]; 
  heartActive?: boolean;
  pageName?: string;
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString(); 
};

export const PlaylistTable = (props: Props) => {

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
      render: (record: any) => (
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
      render: (record: any) => (
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
      render: (record: any) => (
        <div className={styles.time}>
          {record.duration || 'Unknown Duration'}
        </div>
      ),
    },
    {
      title: "Created At",
      key: "createAt",
      render: (record: any) => (
        <div className={styles.createdAt}>
          {record.createAt ? formatDate(record.createAt) : 'Unknown Date'}
        </div>
      ),
    },
    {
      key: "actions",
      render: () => (
        <div className={styles.icon}>
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
      />
    </div>
  );
};
