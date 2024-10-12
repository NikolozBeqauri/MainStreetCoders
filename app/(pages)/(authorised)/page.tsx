'use client'

import { AlbumCard } from "@/app/components/AlbumCard/AlbumCard";
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

interface topHitOfWeek {
  id: number;
  count: number;
}

export default function Home() {
  const token = Cookies.get("token");
  const [topWeekMusics, setTopWeekMusics] = useState<MusicItem[]>([])
  const [topHits, setTopHits] = useState<MusicItem[]>([])
  const [topWeekMusicsId, setTopWeekMusicsId] = useState<number | null>(null);
  const [topHitsId, setTopHitsId] = useState<number | null>(null);

  const [globalClicker, setGlobalClickerState] = useRecoilState(globalClickerState);
  const [topHitOfWeek, setTopHitOfWeek] = useState<topHitOfWeek | undefined>(undefined)
  
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
<<<<<<< Updated upstream
    })
      .then((res) => {
        setTopHits(res.data);
      if (res.data.length > 0) {
          setTopHitOfWeek(res.data[0]);
        }
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

=======
  }}
  else if(vw >= 950 && vw < 1040){
    for (let i = 0; i < 5; i++) {
    
      if (artists[i]) {
          fiveArtist.push(artists[i]);
          
      }
  }
  }else if(vw >= 800 && vw < 950){
    for (let i = 0; i < 4; i++) {
    
      if (artists[i]) {
          fiveArtist.push(artists[i]);
          
      }
  }
  }else if(vw >= 700 && vw <= 799){
    for (let i = 0; i < 4; i++) {
    
      if (artists[i]) {
          fiveArtist.push(artists[i]);
          
      }
  }
  }
  else if(vw >= 500 && vw < 699){
    for (let i = 0; i < 3; i++) {
    
      if (artists[i]) {
          fiveArtist.push(artists[i]);
          
      }
  }
  }else if(vw >= 300 && vw < 499){
    for (let i = 0; i < 2; i++) {
    
      if (artists[i]) {
          fiveArtist.push(artists[i]);
          
      }
  }
  }
  if(vw >= 1040){
    for (let i = 0; i < 6; i++) {
      if (albums[i]) {
        fiveAlbum.push(albums[i]);
          
      }
  }}
  else if(vw >= 950 && vw < 1040){
    for (let i = 0; i < 5; i++) {
    
      if (albums[i]) {
        fiveAlbum.push(albums[i]);
          
      }
  }
  }else if(vw >= 800 && vw < 950){
    for (let i = 0; i < 4; i++) {
    
      if (albums[i]) {
        fiveAlbum.push(albums[i]);
          
      }
  }
  }else if(vw >= 700 && vw <= 799){
    for (let i = 0; i < 4; i++) {
    
      if (albums[i]) {
        fiveAlbum.push(albums[i]);
          
      }
  }
  }
  else if(vw >= 500 && vw < 699){
    for (let i = 0; i < 3; i++) {
    
      if (albums[i]) {
        fiveAlbum.push(albums[i]);
      }
  }
  }else if(vw >= 300 && vw < 499){
    for (let i = 0; i < 2; i++) {
    
      if (albums[i]) {
        fiveAlbum.push(albums[i]);
      }
  }
  }
  if(vw >= 1040){
    for (let i = 0; i < 6; i++) {
      if (topHits[i]) {
        fiveHits.push(topHits[i]);
          
      }
  }}
  else if(vw >= 950 && vw < 1040){
    for (let i = 0; i < 5; i++) {
    
      if (topHits[i]) {
        fiveHits.push(topHits[i]);
          
      }
  }
  }else if(vw >= 800 && vw < 950){
    for (let i = 0; i < 4; i++) {
    
      if (topHits[i]) {
        fiveHits.push(topHits[i]);
          
      }
  }
  }else if(vw >= 700 && vw <= 799){
    for (let i = 0; i < 4; i++) {
    
      if (topHits[i]) {
        fiveHits.push(topHits[i]);
          
      }
  }
  }
  else if(vw >= 500 && vw < 699){
    for (let i = 0; i < 3; i++) {
    
      if (topHits[i]) {
        fiveHits.push(topHits[i]);
          
      }
  }
  }else if(vw >= 300 && vw < 499){
    for (let i = 0; i < 2; i++) {
    
      if (topHits[i]) {
        fiveHits.push(topHits[i]);
          
      }
  }
  }
  
console.log(hits)
>>>>>>> Stashed changes
  return (
    <main className={styles.wholeWrapper} >
      <section className={styles.container}>
        <section className={styles.headerWrapper}>
          <BurgerMenu />
          <Header />
        </section>

        <section className={styles.newsComponentWrapper}>
          <NewsComponent  musicId={topHitOfWeek?.id} title={"Top Hit Of the week"} count={topHitOfWeek?.count ?? '795,900'} image="newsimage" />
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

