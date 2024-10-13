'use client'

import { AlbumCard } from "@/app/components/AlbumCard/AlbumCard";
import { popularAlbums } from "@/app/components/AlbumCard/popularAlbums/popularAlbums";
import { BurgerMenu } from "@/app/components/BurgerMenu/BurgerMenu";
import { MusicCard } from "@/app/components/MusicCard/MusicCard";
import { NewsComponent } from "@/app/components/NewsComponent/NewsComponent";
import styles from "./page.module.scss"
import { Header } from "@/app/components/Header/Header";
<<<<<<< HEAD
import { useEffect, useState } from "react";
=======
import { Key, useEffect, useState } from "react";
import axios from "axios";
<<<<<<< Updated upstream
>>>>>>> fix/home-page
import Cookies from 'js-cookie';
import axios from "axios";
import { useRecoilState } from "recoil";
import { globalClickerState } from "@/app/states";

<<<<<<< HEAD
=======
=======
import { useRecoilState } from "recoil";
import { globalClickerState } from "@/app/states";
import { useRouter } from 'next/navigation';

>>>>>>> fix/home-page
interface MusicItem {
  id: number;
  trackTitle: string;
  authorName: string;
  authorId: number;
  trackImage: string;
  duration: string;
}
<<<<<<< HEAD
=======
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

>>>>>>> fix/home-page

interface topHitOfWeek {
  id: number;
  count: number;
}
<<<<<<< Updated upstream
<<<<<<< HEAD
=======
interface PopularArtist {
  authorFullName: string;
  authorId: number;
  authorImage: string;
  musicId: number;
  totalListener: string;
}
>>>>>>> Stashed changes
>>>>>>> fix/home-page
=======
interface PopularArtist {
  authorFullName: string; 
  authorId: number;       
  authorImage: string;    
  musicId: number;        
  totalListener: string;  
}


interface MusicItem {
  authorId: number;
  duration: string;
  filePath: string;
  id: number;
  listenerCount: number;
  trackImage: string;
  trackTitle: string;
  updateAt: string;
}

interface PopularAlbum {
  author: {fullName: string};
  authorId: number;
  count: number;
  coverImage: string;
  id: number;
  musics: MusicItem[];
  title: string;
}

>>>>>>> Stashed changes

export default function Home() {
  const token = Cookies.get("token");
  const [topWeekMusics, setTopWeekMusics] = useState<MusicItem[]>([])
  const [topHits, setTopHits] = useState<MusicItem[]>([])
  const [topWeekMusicsId, setTopWeekMusicsId] = useState<number | null>(null);
  const [topHitsId, setTopHitsId] = useState<number | null>(null);
  const [topArtists, setTopArtists] = useState<PopularArtist[]>([]);
  const [topAlbums, setTopAlbums] = useState<PopularAlbum[]>([]);

<<<<<<< HEAD
  const [globalClicker, setGlobalClickerState] = useRecoilState(globalClickerState);
  const [topHitOfWeek, setTopHitOfWeek] = useState<topHitOfWeek | undefined>(undefined)
<<<<<<< Updated upstream
=======
<<<<<<< Updated upstream
>>>>>>> fix/home-page
  
=======
  const [globalClicker, setGlobalClickerState] = useRecoilState(globalClickerState);
  const [topHitOfWeek, setTopHitOfWeek] = useState<topHitOfWeek | undefined>(undefined)
  const [popularArtists, setPopularArtists] = useState<PopularArtist[]>([]);
  const [popularAlbums, setPopularAlbums] = useState<PopularAlbum[]>([]);
  console.log(popularAlbums,'asdasdasd');
  const router = useRouter();

>>>>>>> Stashed changes
=======

>>>>>>> Stashed changes
  useEffect(() => {
    axios.get(`https://project-spotify-1.onrender.com/musics/topweek`, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
      .then((res) => {
        setTopWeekMusics(res.data);
      })
<<<<<<< HEAD
      .catch((err) => {
        console.log(err);
      });
=======
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
>>>>>>> fix/home-page

    axios.get(`https://project-spotify-1.onrender.com/musics/tophits`, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
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

    axios.get(`https://project-spotify-1.onrender.com/authors/topArtists`, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
      .then((res) => {
        setTopArtists(res.data)
        
      })
      .catch((err) => {
        console.log(err);
      });

      axios.get(`https://project-spotify-1.onrender.com/albums/top-Albums`, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      })
        .then((res) => {
          console.log(res.data);
          
          setTopAlbums(res.data);                    
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
<<<<<<< Updated upstream
<<<<<<< HEAD
          <NewsComponent  musicId={topHitOfWeek?.id} title={"Top Hit Of the week"} count={topHitOfWeek?.count ?? '795,900'} image="newsimage" />
=======
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
>>>>>>> fix/home-page
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
<<<<<<< HEAD
            <h2>Top Musics Of Week</h2>
=======
<<<<<<< Updated upstream
            <h2>Top Charts</h2>
>>>>>>> fix/home-page
            <span>See all</span>
=======
            <h2>Top Musics Of Week</h2>
            <span onClick={()=>router.push('/musicsofweek')}>See all</span>
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
<<<<<<< HEAD
            {popularArtists.map((album, index) => (
              <AlbumCard
                key={index}
                id={globalClicker}
                author={album.author}
                img={album.img}
=======
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
>>>>>>> fix/home-page
=======
            {topArtists.slice(0, 5).map((album, index) => (
              <AlbumCard
                key={index}
                id={globalClicker}
                author={album.authorFullName}
                img={album.authorImage}
>>>>>>> Stashed changes
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
<<<<<<< HEAD
            {popularAlbums.map((album, index) => (
=======
<<<<<<< Updated upstream
            {fiveAlbum.map((album: any, index: any) => (
>>>>>>> fix/home-page
=======
            {topAlbums.slice(0, 5).map((album, index) => (
>>>>>>> Stashed changes
              <AlbumCard
                key={index}
                author={album.author.fullName}
                title={album.title}
<<<<<<< Updated upstream
<<<<<<< HEAD
                img={album.img}
=======
=======
            {popularAlbums.slice(0, 4).map((album, index) => (
              <AlbumCard
                key={index}
                author={album.title}
                title={album.musics[0].authorName}
>>>>>>> Stashed changes
                img={album.coverImage}
>>>>>>> fix/home-page
=======
                img={album.coverImage}
>>>>>>> Stashed changes
              />
            ))}
          </div>
        </section>
      </section>
    </main>
  );
}

