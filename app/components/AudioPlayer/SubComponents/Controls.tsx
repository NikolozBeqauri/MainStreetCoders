import { useState, useEffect, useRef, useCallback } from 'react';

import styles from '../src/styles/styles.module.scss'
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
    IoVolumeHighOutline
} from 'react-icons/io5';

const Controls = ({ audioRef, progressBarRef, duration, setTimeProgress, tracks, trackIndex, setTrackIndex, setCurrentTrack, }: any) => {
    const [isPlaying, setIsPlaying] = useState(false);
    
    const togglePlayPause = () => {
        setIsPlaying((e) => !e) 
    }
    
    const playAnimationRef = useRef<number | null>(null);
    
    const repeat = useCallback(() => {
        const currentTime = audioRef.current.currentTime;
        setTimeProgress(currentTime);
        progressBarRef.current.value = currentTime;
        progressBarRef.current.style.setProperty(
          '--range-progress',
          `${(progressBarRef.current.value / duration) * 100}%`
        );
    
        playAnimationRef.current = requestAnimationFrame(repeat);
      }, [audioRef, duration, progressBarRef, setTimeProgress]);
        
        useEffect(() => {
            if(isPlaying) {
            audioRef.current.play();
        } else {
            audioRef.current.pause();
        }
        playAnimationRef.current = requestAnimationFrame(repeat);
    }, [isPlaying, audioRef, repeat]);

    const shuffleIt = () => {
        let randomNum = Math.floor(Math.random() * (tracks.length - 1));
        setTrackIndex(randomNum);
        setCurrentTrack(tracks[randomNum])
    };

    const previousTrack = () => {
        if (trackIndex === 0) {
            audioRef.current.pause()
            audioRef.current.value === '00:00'
            let lastTrackIndex = tracks.length - 1;
            setTrackIndex(lastTrackIndex);
            setCurrentTrack(tracks[lastTrackIndex]);
        } else {
            setTrackIndex((prev: any) => prev - 1);
            setCurrentTrack(tracks[trackIndex - 1]);
        }
    };

    const nextTrack = () => {
        if (trackIndex >= tracks.length - 1) {
            setTrackIndex(0);
            setCurrentTrack(tracks[0]);
        } else {
            setTrackIndex((prev : any) => prev + 1);
            setCurrentTrack(tracks[trackIndex + 1]);
        }
    };

    const repeatIt = () => {
        
    };

    // volume control
    const [volume, setVolume] = useState(60);
    const [muteVolume, setMuteVolume] = useState(false);

    useEffect(() => {
        if (audioRef) {
          audioRef.current.volume = volume / 100;
          audioRef.current.muted = muteVolume;
        }
      }, [volume, audioRef, muteVolume]);
    

    return (
        <div className={styles.controlsWrapper}>
            <div className={styles.controls}>
                <button className={styles.butto} onClick={shuffleIt}>
                    <IoShuffle />
                </button>
                <button className={styles.butto} onClick={previousTrack}>
                    <IoPlaySkipBackOutline />
                </button>
                <button onClick={togglePlayPause} className={styles.controlsPlayPause}>
                    {isPlaying ? <IoPauseCircleOutline /> : <IoPlayCircleOutline />}
                </button>
                <button className={styles.butto} onClick={nextTrack}>
                    <IoPlaySkipForwardOutline />
                </button>
                <button className={styles.butto} onClick={repeatIt}>
                    <IoRepeat />
                </button>
            </div>
            <div className={styles.volume}>
            <button className={styles.butto} onClick={() => setMuteVolume((prev) => !prev)}>
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
                    onChange={(e:any) => setVolume(e.target.value)}
                    style={{
                        background: `linear-gradient(to right, #FFFFFF ${volume}%, #2E3133 ${volume}%)`,
                    }}
                />
            </div>
        </div>
    )
}

export default Controls;