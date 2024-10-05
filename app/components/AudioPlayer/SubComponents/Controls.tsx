import { useState, useEffect, useRef, useCallback } from "react";

import styles from "../src/styles/styles.module.scss";
import style from "../src/styles/mobile.module.scss";

// icons
import {
  IoPlaySkipBackOutline,
  IoPlaySkipForwardOutline,
  IoPlayCircleOutline,
  IoPauseCircleOutline,
  IoShuffle,
  IoRepeat,
  IoVolumeOffOutline,
  IoVolumeLowOutline,
  IoVolumeHighOutline,
} from "react-icons/io5";
import { useRecoilState } from "recoil";
import { modalState } from "@/app/states";

const Controls = ({
  audioRef,
  progressBarRef,
  duration,
  setTimeProgress,
  tracks,
  trackIndex,
  setTrackIndex,
  setCurrentTrack,
}: any) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isShuffle, setIsShuffle] = useState(false);
  const [isRepeat, setIsRepeat] = useState(false);

  const playAnimationRef = useRef<number | null>(null);

  const repeat = useCallback(() => {
    const currentTime = audioRef.current.currentTime;
    setTimeProgress(currentTime);
    progressBarRef.current.value = currentTime;
    progressBarRef.current.style.setProperty(
      "--range-progress",
      `${(progressBarRef.current.value / duration) * 100}%`
    );

    playAnimationRef.current = requestAnimationFrame(repeat);
  }, [audioRef, duration, progressBarRef, setTimeProgress]);


  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play(); 
      playAnimationRef.current = requestAnimationFrame(repeat); 
    } else {
      audioRef.current.pause(); 
      if (playAnimationRef.current !== null) {
        cancelAnimationFrame(playAnimationRef.current); 
      }
    }

    return () => {
      if (playAnimationRef.current !== null) {
        cancelAnimationFrame(playAnimationRef.current); 
      }
    };
  }, [audioRef, isPlaying, repeat]);

  const togglePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
    
  };

  const shuffleIt = () => {
    setIsShuffle(!isShuffle);
  };

  const previousTrack = () => {
    let prevIndex;
    if (trackIndex > 0) {
      prevIndex = trackIndex - 1;
    } else {
      prevIndex = tracks.length - 1;
    }
    setTrackIndex(prevIndex);
    const prevTrack = tracks[prevIndex];

    setCurrentTrack(prevTrack);

    if (audioRef.current) {
      audioRef.current.src = prevTrack.filePath;
      audioRef.current.play();
    }
  };  

  const nextTrack = () => {
    let nextIndex;
    if (trackIndex < tracks.length - 1) {
      nextIndex = trackIndex + 1;
    } else {
      nextIndex = 0;
    }
    setTrackIndex(nextIndex);
    const nextTrack = tracks[nextIndex];

    setCurrentTrack(nextTrack);

    if (audioRef.current) {
      audioRef.current.src = nextTrack.filePath;
      audioRef.current.play();
    }
  };

  const repeatIt = () => {
    setIsRepeat(!isRepeat);
  };

  const [volume, setVolume] = useState(60);
  const [muteVolume, setMuteVolume] = useState(false);

  useEffect(() => {
    if (audioRef) {
      audioRef.current.volume = volume / 100;
      audioRef.current.muted = muteVolume;
    }
  }, [volume, audioRef, muteVolume]);

  const [modal, setModalState] = useRecoilState(modalState);

  return (
    <div
      className={
        modal === true ? styles.controlsWrapper : style.mobileControlsWrapper
      }
    >
      <div className={styles.controls}>
        <button
          className={modal === true ? styles.butto : style.mobileButto}
          onClick={shuffleIt}
          style={{ color: isShuffle ? "#ef4eff" : "#fff" }}
        >
          <IoShuffle />
        </button>
        <button
          className={modal === true ? styles.butto : style.mobileButto}
          onClick={previousTrack}
        >
          <IoPlaySkipBackOutline />
        </button>
        <button
          onClick={togglePlayPause}
          className={
            modal === true
              ? styles.controlsPlayPause
              : style.mobileControlsPlayPause
          }
        >
          {isPlaying ? <IoPauseCircleOutline /> : <IoPlayCircleOutline />}
        </button>
        <button
          className={modal === true ? styles.butto : style.mobileButto}
          onClick={nextTrack}
        >
          <IoPlaySkipForwardOutline />
        </button>
        <button
          className={modal === true ? styles.butto : style.mobileButto}
          onClick={repeatIt}
          style={{ color: isRepeat ? "#ef4eff" : "#fff" }}
        >
          <IoRepeat />
        </button>
      </div>
      <div className={styles.volume}>
        <button
          className={modal === true ? styles.butto : style.mobileButto}
          onClick={() => setMuteVolume((prev) => !prev)}
        >
          {muteVolume || volume < 1 ? (
            <IoVolumeOffOutline />
          ) : volume < 50 ? (
            <IoVolumeLowOutline />
          ) : (
            <IoVolumeHighOutline />
          )}
        </button>
        <input
          type="range"
          min={0}
          max={100}
          value={volume}
          onChange={(e: any) => setVolume(e.target.value)}
          style={{
            background: `linear-gradient(to right, #FFFFFF ${volume}%, #2E3133 ${volume}%)`,
          }}
        />
      </div>
    </div>
  );
};

export default Controls;
