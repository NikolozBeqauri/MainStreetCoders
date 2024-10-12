"use client"
import { AlbumCard } from "@/app/components/AlbumCard/AlbumCard";
import { albumsData } from "@/app/components/AlbumCard/albumData/albumData";
import { popularAlbums } from "@/app/components/AlbumCard/popularAlbums/popularAlbums";
import { BurgerMenu } from "@/app/components/BurgerMenu/BurgerMenu";
import { MusicCard } from "@/app/components/MusicCard/MusicCard";
import { musicCardsData } from "@/app/components/MusicCard/musicCardData/musicCardData";
import { NewsComponent } from "@/app/components/NewsComponent/NewsComponent";
import styles from "./page.module.scss"
import { Header } from "@/app/components/Header/Header";
import { Key, useEffect, useState } from "react";
import axios from "axios";
<<<<<<< Updated upstream
import Cookies from 'js-cookie';
import { useViewport } from "react-viewport-hooks";

=======
import { useRecoilState } from "recoil";
import { globalClickerState } from "@/app/states";
import { useRouter } from 'next/navigation';

interface MusicItem {
  id: number;
  trackTitle: string;
  authorName: string;
  authorId: number;
  trackImage: string;
  duration: string;
}
interface MusicItem {
  authorId: number;
  authorName: string;
  createAt: string;
  deleteAt: string | null;
  duration: string;
  filePath: string;
  id: number;
  listenerCount: number;
  listeners: any[]; 
  trackImage: string;
  trackTitle: string;
  updateAt: string;
}

interface PopularAlbum {
  authorId: number;
  count: number;
  title:string;
  coverImage: string;
  createAt: string;
  deleteAt: string | null;
  id: number;
  musics: MusicItem[];
}


interface topHitOfWeek {
  id: number;
  count: number;
}
interface PopularArtist {
  authorFullName: string;
  authorId: number;
  authorImage: string;
  musicId: number;
  totalListener: string;
}
>>>>>>> Stashed changes

export default function Home() {
  const [artists, setArtists] = useState<any>([]);
  const [albums, setAlbums] = useState<any>([]);
  const [hits, setHits] = useState<any>([]);
  const [background, setBackground] = useState<any>([]);
  const [topHits, setTopHits] = useState<any>([]);
  const { vw } = useViewport();


  const token = Cookies.get("token")
  useEffect(() => {
    axios.get("https://project-spotify-1.onrender.com/authors/topArtists", {
      headers: {
        "Content-Type": "multipart/form-data",
        "Authorization": `Bearer ${token}`
      }
    })
      .then((r) => {
        setArtists(r.data)
      })
  }, [])

  useEffect(() => {
    axios.get("https://project-spotify-1.onrender.com/albums/top-albums", {
      headers: {
        "Content-Type": "multipart/form-data",
        "Authorization": `Bearer ${token}`
      }
    })
      .then((r) => {
        setAlbums(r.data)
      })
  }, [])

  

<<<<<<< Updated upstream
  
=======
  const [globalClicker, setGlobalClickerState] = useRecoilState(globalClickerState);
  const [topHitOfWeek, setTopHitOfWeek] = useState<topHitOfWeek | undefined>(undefined)
  const [popularArtists, setPopularArtists] = useState<PopularArtist[]>([]);
  const [popularAlbums, setPopularAlbums] = useState<PopularAlbum[]>([]);
  console.log(popularAlbums,'asdasdasd');
  const router = useRouter();

>>>>>>> Stashed changes
  useEffect(() => {
    axios.get("https://project-spotify-1.onrender.com/musics/topHits", {
      headers: {
        "Content-Type": "multipart/form-data",
        "Authorization": `Bearer ${token}`
      }
    })
      .then((r) => {
        setHits(r.data)
        setBackground(r.data[0].trackImage)
      })
  }, [])
  useEffect(() => {
    axios.get("https://project-spotify-1.onrender.com/musics/topHits", {
      headers: {
        "Content-Type": "multipart/form-data",
        "Authorization": `Bearer ${token}`
      }
    })
<<<<<<< Updated upstream
      .then((r) => {
        setTopHits(r.data)        
      })
  }, [])
=======
      .then((res) => {
        setTopHits(res.data);
        if (res.data.length > 0) {
          setTopHitOfWeek(res.data[0]);
        }
      })
      .catch((err) => {
        console.log(err);
      });

    axios.get("https://project-spotify-1.onrender.com/authors/topArtists", {
      headers: {
        "Content-Type": "multipart/form-data",
        "Authorization": `Bearer ${token}`
      }
    })
      .then((r) => {
        setPopularArtists(r.data)
      })
      .catch((err) => {
        console.log(err);
      })

    axios.get("https://project-spotify-1.onrender.com/albums/top-albums", {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
      .then((r) => {
        setPopularAlbums(r.data)
      })
      .catch((err) => {
        console.log(err);
      })
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
>>>>>>> Stashed changes

  let fiveArtist = [];
  let fiveAlbum = [];
  let fiveHits = [];
  if(vw >= 1040){
    for (let i = 0; i < 6; i++) {
      if (artists[i]) {
          fiveArtist.push(artists[i]);
          
      }
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
  return (
    <main className={styles.wholeWrapper} >
      <section className={styles.container}>
        <section className={styles.headerWrapper}>
          <BurgerMenu />
          <Header />
        </section>

        <section className={styles.newsComponentWrapper}>
<<<<<<< Updated upstream
          {/* <NewsComponent title={hits[0].count == undefined ? "sa" : "sd"} count={"ss"} image="newsimage"/> */}
          <NewsComponent
            title={"Top Hit Of The Week"}
            count={hits.length > 0 && hits[0].count !== undefined ? hits[0].count : "default count"}
            image={background}
          />

=======
          <NewsComponent musicId={topHitOfWeek?.id} title={"Top Hit Of the week"} count={topHitOfWeek?.count ?? '795,900'} image="newsimage" />
>>>>>>> Stashed changes
        </section>

        <section className={styles.generalCardWrapper}>
          <div className={styles.secondaryTitleDiv}>
            <h2>Top Hits</h2>
            <span>See all</span>
          </div>
          <div className={styles.generalCardItem}>
            {fiveHits.map((album: any, index: any) => (
              <AlbumCard
                key={index}
                author={album.authorName}
                title={album.trackTitle}
                img={album.trackIamge}
              />
            ))}
          </div>
        </section>

        <section className={styles.musicCardWrapper}>
          <div className={styles.secondaryTitleDiv}>
<<<<<<< Updated upstream
            <h2>Top Charts</h2>
            <span>See all</span>
=======
            <h2>Top Musics Of Week</h2>
            <span onClick={()=>router.push('/musicsofweek')}>See all</span>
>>>>>>> Stashed changes
          </div>
          <div className={styles.musicCards}>
            {musicCardsData.map((musicCard, index) => (
              <MusicCard
                key={index} imgName={musicCard.img} title={musicCard.title} author={musicCard.author} timing={musicCard.timing}
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
<<<<<<< Updated upstream
            {/* {artists.map((playlist: any, index: any) => {
               <AlbumCard
               key={index}
               author={playlist.album.authorFullName}
               img={playlist.album.authorImage}
             />
            })} */}
            {fiveArtist.map((album: any, index: any) => (
              <AlbumCard
                key={index}
=======
            {popularArtists.slice(0, 5).map((album, index) => (
              <AlbumCard
                key={index}
                id={globalClicker}
>>>>>>> Stashed changes
                author={album.authorFullName}
                img={album.authorImage}
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
<<<<<<< Updated upstream
            {fiveAlbum.map((album: any, index: any) => (
              <AlbumCard
                key={index}
                author={album.author}
                title={album.title}
=======
            {popularAlbums.slice(0, 4).map((album, index) => (
              <AlbumCard
                key={index}
                author={album.title}
                title={album.musics[0].authorName}
>>>>>>> Stashed changes
                img={album.coverImage}
              />
            ))}
          </div>
        </section>
      </section>
    </main>
  );
}

