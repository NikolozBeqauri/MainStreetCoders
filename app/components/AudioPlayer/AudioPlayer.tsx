"use client";

import DisplayTrack from "./SubComponents/DisplayTrack";
import Controls from "./SubComponents/Controls";
import ProgressBar from "./SubComponents/ProgressBar";
import { useEffect, useRef, useState } from "react";
import "./src/styles/customizeProgressBar.scss";
import { useRecoilState } from "recoil";
import { globalClickerState, modalState, albumOnState, selectedPlaylistTrackState, playlistIdState, playlistOnState, musicOnState, playlistDataState } from "@/app/states";
import { ReusableIcon } from "../ReusableIcon/ReusableIcon";
import Different from "../MobileAudioPlayer/Different";
import { useViewport } from "react-viewport-hooks";
import styles from "./src/styles/styles.module.scss";
import style from "./src/styles/mobile.module.scss";
import Cookies from "js-cookie";
import axios from "axios";

const AudioPlayer = () => {
  const [trackIndex, setTrackIndex] = useState(0);
  const [tracks, setTracks] = useState<any[]>([]);
  const [currentTrack, setCurrentTrack] = useState<any | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const progressBarRef = useRef<HTMLInputElement | null>(null);
  const [timeProgress, setTimeProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [modal, setModalState] = useRecoilState(modalState);
  const [idDate, setIdDate] = useState<any>(null);
  
  const [globalClicker, setGlobalClickerState] = useRecoilState(globalClickerState);
  const [albumOn, setAlbumOnState] = useRecoilState(albumOnState);
  const [playlistOn, setPlaylistOnState] = useRecoilState(playlistOnState);
  const [musicOn, setMusicOnState] = useRecoilState(musicOnState);
  const [playlistId, setPlaylistIdState] = useRecoilState(playlistIdState);
  
  const [playlistTracks, setPlaylistTracks] = useState<any[]>([]);
  const [playlistCurrentTracks, setPlaylistCurrentTracks] = useState<any[]>([]);
  const [playlistData, setPlaylistDataState] = useRecoilState(playlistDataState)



  const token = Cookies.get("token");


  useEffect(() => {
    console.log(playlistId);
    
    if(playlistId && playlistOn) {
      axios.get(`https://project-spotify-1.onrender.com/playlist/${playlistId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      })
        .then((res) => {
          const data = res.data  
          setPlaylistTracks(data)
          setTracks(data.music);
          setCurrentTrack(data.music[0]);
          setPlaylistCurrentTracks(playlistData)
          console.log(data, ' playlist data');
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [playlistId, playlistOn, playlistData, token]);

  useEffect(() => {
    const fetchTrackData = async () => {
      if (globalClicker) {
        try {
          if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
          }
          let response;
          if (albumOn) {
            response = await axios.get(
              `https://project-spotify-1.onrender.com/album/${globalClicker}`,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
            const firstTrack = response.data.musics[0];
            setIdDate(response.data);
            setTracks(response.data.musics)
            setCurrentTrack(firstTrack);
            console.log(response.data, 'album data');
            
            if (audioRef.current) {
              audioRef.current.src = firstTrack.filePath;
            }
          } else if(musicOn) {
            response = await axios.get(
              `https://project-spotify-1.onrender.com/music/${globalClicker}`,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
            setIdDate(response.data);
            console.log(response.data, 'tophit data');
            
            if (audioRef.current) {
              audioRef.current.src = response.data.filePath;
            }
          }

          if (audioRef.current) {
            audioRef.current.load();
            await audioRef.current.pause();
          }
        } catch (error) {
          console.error("Error fetching track data:", error);
        }
      }
    };

    fetchTrackData();
  }, [globalClicker, token, albumOn, musicOn]);


  return (
    <>
      <Different />
      <div className={styles.audioPlayer}>
        <div className={modal === true ? styles.inner : style.innerMobile}>
          {!modal && (
            <div className={style.mobileHeader}>
              <div className={style.mobileVersionLayout}>
                <img
                  className={style.downArr}
                  src="/icons/downArrow.svg"
                  onClick={() => setModalState(true)}
                />
                <ReusableIcon imgName="whiteThreeDots" width={32} />
              </div>
            </div>
          )}
          <DisplayTrack
            currentTrack={currentTrack}
            audioRef={audioRef}
            setDuration={setDuration}
            progressBarRef={progressBarRef}
            idDate={idDate}
            playlistTracks={playlistTracks}
            tracks={tracks}
            playlistCurrentTracks={playlistCurrentTracks}
            
          />
          <div
            className={
              modal === true
                ? styles.audioProgressBar
                : style.mobileAudioProgressBar
            }
          >
            <Controls
              audioRef={audioRef}
              progressBarRef={progressBarRef}
              duration={duration}
              setTimeProgress={setTimeProgress}
              currentTrack={currentTrack}
              setCurrentTrack={setCurrentTrack}
              trackIndex={trackIndex}
              setTrackIndex={setTrackIndex}
              tracks={tracks}
              setAlbumOnState={setAlbumOnState}
            />
            <ProgressBar
              progressBarRef={progressBarRef}
              audioRef={audioRef}
              timeProgress={timeProgress}
              duration={duration}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default AudioPlayer;
