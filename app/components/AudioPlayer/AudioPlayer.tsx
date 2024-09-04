'use client'
import DisplayTrack from "./SubComponents/DisplayTrack";
import Controls from "./SubComponents/Controls";
import ProgressBar from "./SubComponents/ProgressBar";

import { useRef, useState } from "react";
import { tracks } from "./src/data/tracks";

import styles from './src/styles/styles.module.scss';
import './src/styles/customizeProgressBar.scss';

const AudioPlayer = () => {

    const [trackIndex, setTrackIndex] = useState(0);
    const [currentTrack, setCurrentTrack] = useState(tracks[trackIndex]);

    const audioRef = useRef()
    const progressBarRef = useRef()

    const [timeProgress, setTimeProgress] = useState(0);
    const [duration, setDuration] = useState(0)

    return (
        <div className={styles.audioPlayer}>
            <div className={styles.inner}>
                <DisplayTrack {...{ currentTrack, audioRef, setDuration, progressBarRef }} />

                <div className={styles.audioProgressBar}>
                    <Controls {...{ audioRef, progressBarRef, setTimeProgress, duration, tracks, trackIndex, setTrackIndex, setCurrentTrack }} />
                        
                    <ProgressBar {...{ progressBarRef, audioRef, timeProgress, duration }} />
                </div>

            </div>
        </div>
    )
}

export default AudioPlayer;
