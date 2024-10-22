"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import styles from "../src/styles/styles.module.scss";
import style from "../src/styles/mobile.module.scss";

// Icons
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
import { isPlayingState, modalState, musicOnState, playlistOnState, repeatOnState } from "@/app/states";

const Controls = ({
  audioRef,
  progressBarRef,
  duration,
  setTimeProgress,
  tracks,
  trackIndex,
  setTrackIndex,
  setCurrentTrack,
  setAlbumOnState,
}: any) => {
  const [isPlaying, setIsPlayingState] = useRecoilState(isPlayingState);
  const [isShuffle, setIsShuffle] = useState(false);
  const [isRepeat, setIsRepeat] = useState(false);
  const playAnimationRef = useRef<number | null>(null);
  const [musicOn, setMusicOnState] = useRecoilState(musicOnState);
  const [playlistOn, setPlaylistOnState] = useRecoilState(playlistOnState);
  const [repeatOn, setRepeatOnState] = useRecoilState(repeatOnState);

  useEffect(() => {
    if(isRepeat && repeatOn) {
      audioRef.current.currentTime = 0;
      audioRef.current.play()
    }

    if (tracks.length === 0) {
      console.log("Array is empty. No random number can be generated.");
    } else if (isShuffle && repeatOn) {
        const randomIndex = Math.floor(Math.random() * tracks.length);   
        setTrackIndex(randomIndex);
        setCurrentTrack(tracks[randomIndex]);
      }
  }, [audioRef, isRepeat, isShuffle, repeatOn, tracks]);

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
    setIsPlayingState(!isPlaying);
  };

  const previousTrack = () => {
    setAlbumOnState(false);
    // // setMusicOnState(true);
    // setPlaylistOnState(true);
    let prevIndex = trackIndex > 0 ? trackIndex - 1 : tracks.length - 1;

    if (tracks.length === 0) {
      console.log("Array is empty. No random number can be generated.");
    } else if (isShuffle) {
        const randomIndex = Math.floor(Math.random() * tracks.length);
        
        setTrackIndex(randomIndex);
        setCurrentTrack(tracks[randomIndex]);
    } else {
        setTrackIndex(prevIndex);
        setCurrentTrack(tracks[prevIndex]);
    }
    if (audioRef.current) {
      audioRef.current.src = tracks[prevIndex].filePath;
      audioRef.current.play();
    }

    setIsPlayingState(true);
  };

  const nextTrack = () => {
    setAlbumOnState(false);
    setMusicOnState(true);
    setPlaylistOnState(true);
    let nextIndex = trackIndex < tracks.length - 1 ? trackIndex + 1 : 0;
    if (tracks.length === 0) {
      console.log("Array is empty. No random number can be generated.");
    } else if (isShuffle) {
        const randomIndex = Math.floor(Math.random() * tracks.length);
        console.log(randomIndex, 'here randomindex');
        
        setTrackIndex(randomIndex);
        setCurrentTrack(tracks[randomIndex]);
    } else {
        setTrackIndex(nextIndex);
        setCurrentTrack(tracks[nextIndex]);
    }

    if (audioRef.current) {
      audioRef.current.src = tracks[nextIndex].filePath;
      audioRef.current.play();
    }

    setIsPlayingState(true);
  };

  const shuffleIt = () => {
    setIsShuffle(!isShuffle);
  }

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
    <div className={modal === true ? styles.controlsWrapper : style.mobileControlsWrapper}>
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
