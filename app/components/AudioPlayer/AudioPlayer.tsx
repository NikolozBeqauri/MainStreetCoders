"use client";
import DisplayTrack from "./SubComponents/DisplayTrack";
import Controls from "./SubComponents/Controls";
import ProgressBar from "./SubComponents/ProgressBar";

import { useRef, useState } from "react";
import { tracks } from "./src/data/tracks";

import styles from "./src/styles/styles.module.scss";
import style from "./src/styles/mobile.module.scss";

import "./src/styles/customizeProgressBar.scss";
import { useRecoilState } from "recoil";
import { modalState } from "@/app/states";
import { ReusableIcon } from "../ReusableIcon/ReusableIcon";
import Different from "../MobileAudioPlayer/Different";
import { set } from "react-hook-form";
import { useViewport } from "react-viewport-hooks";


const AudioPlayer = () => {
  const [trackIndex, setTrackIndex] = useState(0);
  const [currentTrack, setCurrentTrack] = useState(tracks[trackIndex]);

  const audioRef = useRef();
  const progressBarRef = useRef();

  const [timeProgress, setTimeProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  
  const [modal, setModalState] = useRecoilState(modalState);

  const { vw } = useViewport(); 

  if(JSON.stringify(vw) > '490px') {
    setModalState(true)
  }
  
  return (
    <>
    <Different />
    <div className={styles.audioPlayer}>
      <div className={modal === true ? styles.inner : style.innerMobile}>
      {!modal && (
        <div className={style.mobileHeader}>
          <div className={style.mobileVersionLayout}>
            <img className={style.downArr} src="/icons/downArrow.svg" onClick={() => setModalState(true)}/>
            <ReusableIcon imgName="whiteThreeDots" width={32} />
          </div>
        </div>
      )}
        <DisplayTrack
          {...{ currentTrack, audioRef, setDuration, progressBarRef }}
        />

        <div className={modal === true ? styles.audioProgressBar : style.mobileAudioProgressBar}>
          <Controls
            {...{
              audioRef,
              progressBarRef,
              setTimeProgress,
              duration,
              tracks,
              trackIndex,
              setTrackIndex,
              setCurrentTrack,
            }}
          />

          <ProgressBar
            {...{ progressBarRef, audioRef, timeProgress, duration }}
          />
        </div>
      </div>
    </div>
    </>
  );
};

export default AudioPlayer;
