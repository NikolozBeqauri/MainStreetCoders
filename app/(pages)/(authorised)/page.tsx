'use client'

import { AlbumCard } from "@/app/components/AlbumCard/AlbumCard";
import { albumsData } from "@/app/components/AlbumCard/albumData/albumData";
import { popularAlbums } from "@/app/components/AlbumCard/popularAlbums/popularAlbums";
import { popularArtists } from "@/app/components/AlbumCard/popularArtistsData/popularArtistsData";
import { BurgerMenu } from "@/app/components/BurgerMenu/BurgerMenu";
import { MusicCard } from "@/app/components/MusicCard/MusicCard";
import { NewsComponent } from "@/app/components/NewsComponent/NewsComponent";
import styles from "./page.module.scss"
import { Header } from "@/app/components/Header/Header";
import { useEffect, useState } from "react";
import Cookies from 'js-cookie';
import axios from "axios";
import { useRecoilState } from "recoil";
import { globalClickerState } from "@/app/states";
import Loading from "@/app/components/Loading/Loading";

interface MusicItem {
  id: number;
  trackTitle: string;
  authorName: string;
  authorId: number;
  trackImage: string;
  duration: string;
}

export default function Home() {
  const token = Cookies.get("token");
  const [topWeekMusics, setTopWeekMusics] = useState<MusicItem[]>([])
  const [topHits, setTopHits] = useState<MusicItem[]>([])

  const [topWeekMusicsId, setTopWeekMusicsId] = useState<number | null>(null);
  const [topHitsId, setTopHitsId] = useState<number | null>(null);

  const [globalClicker, setGlobalClickerState] = useRecoilState(globalClickerState);


  useEffect(() => {
    axios.get(`https://project-spotify-1.onrender.com/musics/topweek`, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
      .then((res) => {
        setTopWeekMusics(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    axios.get(`https://project-spotify-1.onrender.com/musics/tophits`, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
      .then((res) => {
        setTopHits(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [token]);

  const handleRowClickTopHits = async (trackId: number) => {
    try {
      const response = await axios.get(`https://project-spotify-1.onrender.com/musics/${trackId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });

      const selectedTrack = response.data;
      setGlobalClickerState(selectedTrack.id);

      setTopHitsId(selectedTrack.id);

      console.log(selectedTrack, 'Selected Track for Playing');
    } catch (error) {
      console.error("Error fetching and playing the track:", error);
    }
  };
    

  return (
    <main className={styles.wholeWrapper} >
      <section className={styles.container}>
        <section className={styles.headerWrapper}>
          <BurgerMenu />
          <Header />
        </section>

        <section className={styles.newsComponentWrapper}>
          <NewsComponent title={"Top Hit Of the week"} count={"795,900"} image="newsimage" />
        </section>

        <section className={styles.generalCardWrapper}>
          <div className={styles.secondaryTitleDiv}>
            <h2>Top Hits</h2>
            <span>See all</span>
          </div>
          <div className={styles.generalCardItem}>
            {topHits.slice(0, 4).map((album, index) => (
              <AlbumCard
                key={index}
                id={globalClicker}
                author={album.authorName}
                title={album.trackTitle}
                img={album.trackImage}
                onClick={() => handleRowClickTopHits(album.id)}
              />
            ))}

          </div>
        </section>

        <section className={styles.musicCardWrapper}>
          <div className={styles.secondaryTitleDiv}>
            <h2>Top Musics Of Week</h2>
            <span>See all</span>
          </div>
          <div className={styles.musicCards}>
            {topWeekMusics.slice(0, 6).map((musicCard) => (
              <MusicCard
                key={musicCard.id}
                trackImage={musicCard.trackImage}
                trackTitle={musicCard.trackTitle}
                authorName={musicCard.authorName}
                duration={musicCard.duration}
                onClick={() => handleRowClickTopHits(musicCard.id)}
              />
            ))}
          </div>
        </section>


        <section className={styles.generalCardWrapper}>
          <div className={styles.secondaryTitleDiv}>
            <h2>Popular Artists</h2>
            <span>See all</span>
          </div>
          <div className={styles.generalCardItem}>
            {popularArtists.map((album, index) => (
              <AlbumCard
                key={index}
                id={globalClicker}
                author={album.author}
                img={album.img}
              />
            ))}
          </div>
        </section>

        <section className={styles.generalCardWrapper}>
          <div className={styles.secondaryTitleDiv}>
            <h2>Popular Albums</h2>
            <span>See all</span>
          </div>
          <div className={styles.generalCardItem}>
            {popularAlbums.map((album, index) => (
              <AlbumCard
                key={index}
                author={album.author}
                title={album.title}
                img={album.img}
              />
            ))}
          </div>
        </section>
      </section>
    </main>
  );
}

