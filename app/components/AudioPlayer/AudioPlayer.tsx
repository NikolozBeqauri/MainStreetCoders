"use client";
import DisplayTrack from "./SubComponents/DisplayTrack";
import Controls from "./SubComponents/Controls";
import ProgressBar from "./SubComponents/ProgressBar";
import { useEffect, useRef, useState } from "react";
import "./src/styles/customizeProgressBar.scss";
import { useRecoilState } from "recoil";
import { globalClickerState, modalState } from "@/app/states";
import { ReusableIcon } from "../ReusableIcon/ReusableIcon";
import Different from "../MobileAudioPlayer/Different";
import { useViewport } from "react-viewport-hooks";

import styles from "./src/styles/styles.module.scss";
import style from "./src/styles/mobile.module.scss";
import Loading from "../Loading/Loading";
import Cookies from 'js-cookie';
import axios from "axios";

type Track = {
  id: number;
  title: string;
  author: string;
  duration: string;
};

const AudioPlayer = () => {
  const [trackIndex, setTrackIndex] = useState(0);
  const [tracks, setTracks] = useState<Track[]>([]);
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null); 
  const audioRef = useRef<HTMLAudioElement>(null);
  const progressBarRef = useRef<HTMLInputElement>(null);
  const [timeProgress, setTimeProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [modal, setModalState] = useRecoilState(modalState);
  const [idDate, setIdDate] = useState([]);
  const [globalClicker, setGlobalClickerState] = useRecoilState(globalClickerState);

  const { vw } = useViewport();
  const token = Cookies.get("token");

  if (JSON.stringify(vw) > "490px") {
    setModalState(true);
  }

  useEffect(() => {
    const fetchTracks = async () => {
      try {
        const response = await fetch(
          "https://project-spotify-1.onrender.com/musics",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data: Track[] = await response.json();
        setTracks(data);
        setCurrentTrack(data[0]);
        setGlobalClickerState(data[0].id);
        
      } catch (error) {
        console.error("Error fetching tracks:", error);
      }
    };
    
    fetchTracks();
  }, [setGlobalClickerState, token]);
  
  useEffect(() => {
    if (currentTrack) {
      setGlobalClickerState(currentTrack.id);
    }
  }, [currentTrack, setGlobalClickerState]);
  
  useEffect(() => {
    const fetchTrackData = async () => {
      if (globalClicker) {
        try {

          if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
          }
  
          const response = await axios.get(
            `https://project-spotify-1.onrender.com/musics/${globalClicker}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
  
          const idDataBase = response.data;
          setIdDate(idDataBase);

          if (audioRef.current) {
            audioRef.current.src = response.data.filePath || '';
            audioRef.current.load(); 
            audioRef.current.play(); 
          }
  
          setTimeProgress(0);
          setDuration(0);
  
          console.log(idDataBase, 'data here');
               
        } catch (error) {
          console.error("Error fetching album data:", error);
        }
      }
    };
  
    fetchTrackData();
  }, [globalClicker, token]);
  
  if (!currentTrack) {
    return <Loading width="100%" background="#1D1D1D" />;
  }

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
