import Card from "../Card/Card";
import Tables from "../Table/Table";
import styles from "./TabbedNav.module.scss";
import { use, useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";
import { useRecoilState } from "recoil";
import {
    albumCoverState,
  albumidState,
  artistNameState,
  clickFetchState,
  globalAlbumDataState,
  musicState,
  newsImageState,
} from "@/app/states";
import ArtistTable from "../Table/ArtistTable/ArtistTable";
import { useParams } from "next/navigation";
import Cookies from 'js-cookie';

type Props = {
  biographyText: string;
};

const TabbedNav = (props: Props) => {
  const [activeTab, setActiveTab] = useState("topSongs");
  const [albumId, setAlbumId] = useRecoilState(albumidState);
  const [biography, setBiography] = useState();
  const [image, setImage] = useState();
  const [albumData, setAlbumData] = useState<any[]>([]);
  const [music, setMusic] = useState<any[]>([]);
  const [auhtorId, setAuthorId] = useState<any[]>([]);
  
  const [artistPhoto, setArtistPhoto] = useRecoilState(newsImageState);

  const [musicArray, setMusicArray] = useRecoilState(musicState);
  const [globalalbum, setGlobalAlbum] = useRecoilState(globalAlbumDataState);
  const [artistName, setArtistName] = useRecoilState(artistNameState);
  const [clickFetch, setClickFetch] = useRecoilState(clickFetchState)
  const param = useParams(); 


    const [albumCover, setAlbumcover] = useRecoilState<any>(albumCoverState);

  const onTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  const [albums, setAlbums] = useState([]);
  const token = Cookies.get('token');
  
  useEffect(() => {
      axios
        .get(`https://project-spotify-1.onrender.com/author/${param.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((r: any) => {
          setBiography(r.data.biography);
          setImage(r.data.image);
          setArtistPhoto(r.data.image);
          setArtistName(r.data.fullName);
          // console.log(r.data, 'log here');
          
        })
        .catch((error) => {
          console.log('Error');
          
        });
        
        axios
        .get(`https://project-spotify-1.onrender.com/author/find-all-album-of-author/${param.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((resp: any) => {
        setAlbumData(resp.data.albums);
          const albumNames = resp.data.albums.map((album: any) => album.title);
          setGlobalAlbum(albumNames);
          // console.log(albumNames, 'author');
          setAuthorId(resp.data.albums[0].id)
        })
        .catch((error) => {
          console.log('Error');
        });
        
  }, [param.id, token]);

  useEffect(() => {
    if (!auhtorId) return;  // Only run if auhtorId is available
  
    axios
      .get(`https://project-spotify-1.onrender.com/album/${auhtorId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((r: any) => {

        const allMusics = r.data.musics || [];
        setMusicArray(allMusics);
        console.log(allMusics, 'here is allMusics');
        
      })
      .catch((error) => {
        console.error("Error fetching top songs:", error);
      });
  }, [auhtorId, token]);
  

  return (
    <div className={styles.tabbedNav}>
      <div className={styles.tabs}>
        <button
          className={`${styles.tab} ${activeTab === "topSongs" ? styles.active : ""}`}
          onClick={() => onTabClick("topSongs")}
        >
          <span className={styles.fonts}>Top Songs</span>
        </button>

        <button
          className={`${styles.tab} ${activeTab === "albums" ? styles.active : ""}`}
          onClick={() => onTabClick("albums")}
        >
          <span className={styles.fonts}>Albums</span>
        </button>

        <button
          className={`${styles.tab} ${activeTab === "biography" ? styles.active : ""}`}
          onClick={() => onTabClick("biography")}
        >
          <span className={styles.fonts}>Biography</span>
        </button>
      </div>

      <div className={styles.tabContent}>
        {activeTab === "topSongs" && <ArtistTable />}

        {activeTab === "albums" && (
          <div className={styles.cards}>
            {albumData?.map((resp: any, i) => (
              <Card
                key={i}
                image={resp.coverImage}
                title={resp.title}
                imageStyle={"normal"}
              />
            ))}
          </div>
        )}
        {activeTab === "biography" && (
          <div className={styles.bio}>
            <img
              src={`${image}`}
              alt="image"
              width={250}
              height={230}
              className={styles.image}
            />
            <div className={styles.bioRightside}>
              <h2></h2>
              <p className={styles.text}>{biography}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TabbedNav;
