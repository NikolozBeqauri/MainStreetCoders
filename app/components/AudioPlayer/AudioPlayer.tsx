"use client";
import DisplayTrack from "./SubComponents/DisplayTrack";
import Controls from "./SubComponents/Controls";
import ProgressBar from "./SubComponents/ProgressBar";
import { useEffect, useRef, useState } from "react";
import "./src/styles/customizeProgressBar.scss";
import { useRecoilState } from "recoil";
import { modalState } from "@/app/states";
import { ReusableIcon } from "../ReusableIcon/ReusableIcon";
import Different from "../MobileAudioPlayer/Different";
import { useViewport } from "react-viewport-hooks";

import styles from "./src/styles/styles.module.scss";
import style from "./src/styles/mobile.module.scss";

const AudioPlayer = () => {
  const [trackIndex, setTrackIndex] = useState(0);
  const [tracks, setTracks] = useState([]);
  const [currentTrack, setCurrentTrack] = useState(null);
  const audioRef = useRef(null);
  const progressBarRef = useRef(null);
  const [timeProgress, setTimeProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [modal, setModalState] = useRecoilState(modalState);

  const { vw } = useViewport();

  if (JSON.stringify(vw) > "490px") {
    setModalState(true);
  }

  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEwLCJ1c2VyRW1haWwiOiJ0b3JuaWtlc3VhcmlzaHZpbGlAZ21haWwuY29tIiwicm9sZSI6InVzZXIiLCJpYXQiOjE3Mjc1MzIxOTEsImV4cCI6MTcyODEzNjk5MX0.LvQ68AHiDAoDbNMIH0iUd04orMM5a8gfPqWgEi5zbvA";

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
        const data = await response.json();
        setTracks(data);
        setCurrentTrack(data[0]);
        console.log(data);
        
      } catch (error) {
        console.error("Error fetching tracks:", error);
      }
    };

    fetchTracks();
  }, [token]);

  const nextTrack = () => {
    if (trackIndex < tracks.length - 1) {
      setTrackIndex(trackIndex + 1);
      setCurrentTrack(tracks[trackIndex + 1]);
    } else {
      setTrackIndex(0); // Loop back to the first track
      setCurrentTrack(tracks[0]);
    }
  };

  if (!currentTrack) {
      return <div className={styles.loading}><p>Loading...</p></div>;
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
