"use client";

import { Header } from "@/app/components/Header/Header";
import { NewsComponent } from "@/app/components/NewsComponent/NewsComponent";
import styles from "./page.module.scss";
import { BurgerMenu } from "@/app/components/BurgerMenu/BurgerMenu";
import { ReusableTable } from "@/app/components/ReusableTable/ReusableTable";
import { useEffect, useState } from "react";
import axios from "axios";
import Loading from "@/app/components/Loading/Loading";
import Cookies from 'js-cookie';

const AlbumPage = () => {
  const [albumId, setAlbumId] = useState(""); 
  const [loading, setLoading] = useState(true); 
  const token = Cookies.get("token");

  useEffect(() => {
    axios
      .get("https://project-spotify-1.onrender.com/albums", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const data = response.data;
        if (data && data.length > 0) {
          setAlbumId(data[0].id); 
        } else {
          console.error("No albums found.");
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching albums:", error);
        setLoading(false);
      });
  }, [token]);

  if (loading) {
    return <Loading width="" />;
  }

  return (
    <div className={styles.album}>
      <div className={styles.album2}>
        <div className={styles.album1}>
          <BurgerMenu />
          <Header />
        </div>
        <div>
          <NewsComponent
            title={"Seek For Marktoop"}
            count={"Released 07/12/2023"}
            image={"artistDemoImage"}
          />
          <div className={styles.table}>
            <ReusableTable pageName="albums" id={albumId} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlbumPage;
