'use client'
import { AlbumCard } from "@/app/components/AlbumCard/AlbumCard";
import { BurgerMenu } from "@/app/components/BurgerMenu/BurgerMenu";
import { MusicCard } from "@/app/components/MusicCard/MusicCard";
import { NewsComponent } from "@/app/components/NewsComponent/NewsComponent";
import styles from "./page.module.scss";
import { Header } from "@/app/components/Header/Header";
import axios from "axios";
import { albumidState, albumIdState, albumIDState, albumOnState, clickFetchState, dataState, formusicFetchState, globalClickerState, mudicIDState, musicIdForPlaylistState, musicOnState, oneArrayMusicState, playlistOnState, selectedMusicToAddInAlbumState } from "@/app/states";
import Cookies from 'js-cookie';
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { useRouter } from "next/navigation";
import { useViewport } from "react-viewport-hooks";

interface MusicItem {
  id: number;
  trackTitle: string;
  authorName: string;
  authorId: any;
  trackImage: string;
  duration: string;
  filePath: string;
  listenerCount: number;
  listeners: any[];
  createAt: string;
  deleteAt: string | null;
  updateAt: string;
  albumId: number;
}

interface PopularAlbum {
  authorId: number;
  count: number;
  title: string;
  coverImage: string;
  createAt: string;
  deleteAt: string | null;
  id: any;
  musics: MusicItem[];
  author: { fullName: string };
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

export default function Home() {
  const token = Cookies.get("token");
  const [topWeekMusics, setTopWeekMusics] = useState<MusicItem[]>([]);
  const [topHits, setTopHits] = useState<MusicItem[]>([]);
  const [topHitOfWeek, setTopHitOfWeek] = useState<topHitOfWeek | undefined>(undefined);
  const [popularArtists, setPopularArtists] = useState<PopularArtist[]>([]);
  const [popularAlbums, setPopularAlbums] = useState<PopularAlbum[]>([]);
  const [globalClicker, setGlobalClickerState] = useRecoilState(globalClickerState);
  const [, setSelectedMusicToAddInAlbum] = useRecoilState(selectedMusicToAddInAlbumState);
  const router = useRouter();
  const { vw } = useViewport();
  const [albumOn, setAlbumOnState] = useRecoilState(albumOnState);
  const [, setData] = useRecoilState(dataState);
  const [musicOn, setMusicOnState] = useRecoilState(musicOnState);
  const [playlistOn, setPlaylistOnState] = useRecoilState(playlistOnState);



  const [clickFetch, setClickFetch] = useRecoilState(clickFetchState);
  const [viewArtist, setViewArtist] = useRecoilState(formusicFetchState)
  const [albumIDData, setAlbumIDData] = useRecoilState(albumIdState)
  const [, setAlbumId] = useRecoilState(albumidState);
  const [musicID, setMusicId] = useRecoilState(mudicIDState)
  const [musicIdForPlaylist, setMusicIdForPlaylist] = useRecoilState(musicIdForPlaylistState)
  const [musicArrayTwo, setMusicArrayTwo] = useRecoilState<any>(oneArrayMusicState);
  
  useEffect(() => {
    axios
      .get(`https://project-spotify-83tj.onrender.com/music/topweek`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setTopWeekMusics(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [token]);

  useEffect(() => {
    axios
      .get("https://project-spotify-83tj.onrender.com/music/topHits", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
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

    axios
      .get("https://project-spotify-83tj.onrender.com/author/topArtists", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setPopularArtists(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get("https://project-spotify-83tj.onrender.com/album/top-albums", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setPopularAlbums(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [token]);

  const getMusicId = async (albumId: number) => {
    try {
      const response = await axios.get(`https://project-spotify-83tj.onrender.com/album/${albumId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const albumData = response.data;
      setGlobalClickerState(albumData.musics[0].id);

    } catch (error) {
      console.error("Error fetching and playing the track:", error);
    }
  };

  const handleRowClickTopHits = async (trackId: number) => {
    try {
      const response = await axios.get(`https://project-spotify-83tj.onrender.com/music/${trackId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const selectedTrack = response.data;
      setGlobalClickerState(selectedTrack.id);
      setSelectedMusicToAddInAlbum(selectedTrack.id);
      console.log(selectedTrack, "Selected Track for Playing");
    } catch (error) {
      console.error("Error fetching and playing the track:", error);
    }
  };

  const handleArtistClick = (artist: any) => {
    console.log("Selected Artist ID: ", artist.authorId);
    axios.get(`https://project-spotify-83tj.onrender.com/author/${artist.authorId}`, {
      headers: {
        "Content-Type": "multipart/form-data",
        "Authorization": `Bearer ${token}`
      }
    })
      .then(r => {
        setData(r.data)
        router.push('/artist')
      })
      .catch((err) => {
        console.log(err);
      })
  };

  function setGlobalMusic(id: number) {
    throw new Error("Function not implemented.");
  }

  return (
    <main className={styles.wholeWrapper}>
      <section className={styles.container}>
        <section className={styles.headerWrapper}>
          <BurgerMenu />
          <Header />
        </section>

        <section className={styles.newsComponentWrapper}>
          <NewsComponent
            musicId={topHitOfWeek?.id}
            title="Top Hit Of the week"
            count={topHitOfWeek?.count ?? "795,900"}
            image="newsimage"
            onlyTitle
          />
        </section>

        <section className={styles.generalCardWrapper}>
          <div className={styles.secondaryTitleDiv}>
            <h2 onClick={() => router.push("/hits")}>Top Hits</h2>
            <span onClick={() => router.push("/hits")}>See all</span>
          </div>
          <div className={styles.generalCardItem}>
            {topHits.slice(0, 4).map((album, index) => (
              <AlbumCard
                key={index}
                id={album.id}
                author={album.authorName}
                title={album.trackTitle}
                img={album.trackImage}
                
                onClick={() => {
                  setMusicId(album.id);
                  setMusicArrayTwo(topHits);
                  setGlobalClickerState(album.id);
                }}
              />
            ))}
          </div>
        </section>


        <section className={styles.musicCardWrapper}>
          <div className={styles.secondaryTitleDiv}>
            <h2 onClick={() => router.push("/musicsofweek")}>Top Musics Of Week</h2>
            <span onClick={() => router.push("/musicsofweek")}>See all</span>
          </div>
          <div className={styles.musicCards}>
            {topWeekMusics.slice(0, 6).map((musicCard) => (
              <MusicCard
                key={musicCard.id}
                trackImage={musicCard.trackImage}
                trackTitle={musicCard.trackTitle}
                authorName={musicCard.authorName}
                duration={musicCard.duration}
                id={musicCard.id}
                onClick={() => {
                  setMusicId(musicCard.id);
                  setMusicArrayTwo(topWeekMusics);
                }}
              />
            ))}
          </div>
        </section>

        <section className={styles.generalCardWrapper}>
          <div className={styles.secondaryTitleDiv}>
            <h2 onClick={() => router.push("/artist")}>Popular Artists</h2>
            <span onClick={() => router.push("/artist")}>See all</span>
          </div>
          <div className={styles.generalCardItem}>
            {popularArtists.slice(0, vw < 900 ? 4 : 5).map((artist, index) => (
              <AlbumCard
                key={index}
                id={globalClicker}
                author={artist.authorFullName}
                img={artist.authorImage}
                onClick={() => handleArtistClick(artist)}
                desableIcons
              />
            ))}
          </div>
        </section>

        <section className={styles.generalCardWrapper}>
          <div className={styles.secondaryTitleDiv}>
            <h2 onClick={() => router.push("/album")}>Popular Albums</h2>
            <span onClick={() => router.push("/album")}>See all</span>
          </div>
          <div className={styles.generalCardItem}>
            {popularAlbums.slice(0, 4).map((album, index) => (
              <AlbumCard
                key={index}
                author={album.author.fullName}
                title={album.title}
                img={album.coverImage}
                onClick={() => { getMusicId(album.id); 
                  setAlbumId(album.id); 
                  router.push(`/album/${album.id}`);
                }}
                desableIcons
              />
            ))}
          </div>
        </section>
      </section>
    </main>
  );
}
