import { useEffect, useRef } from "react";
import { BsMusicNoteBeamed } from "react-icons/bs";
import { HeartIcon } from "../../HeartIcon/HeartIcon";
import styles from "../src/styles/styles.module.scss";
import style from "../src/styles/mobile.module.scss";
import { useRecoilState } from "recoil";
import { albumOnState, modalState, musicOnState, playlistDataState, playlistOnState, repeatOnState } from "@/app/states";
import { handleClientScriptLoad } from "next/script";

const DisplayTrack = ({ currentTrack, audioRef, setDuration, progressBarRef, idDate, playlistTracks, tracks }: any) => {
    const titleRef = useRef<HTMLParagraphElement | null>(null);
    const titleWrapperRef = useRef<HTMLDivElement | null>(null);

    const [albumOn, setAlbumOnState] = useRecoilState(albumOnState);
    const [playlistOn, setPlaylistOnState] = useRecoilState(playlistOnState);
    const [musicOn, setMusicOnState] = useRecoilState(musicOnState);
    const [playlistData, setPlaylistDataState] = useRecoilState(playlistDataState)
    const [repeatOn, setRepeatOnState] = useRecoilState(repeatOnState);

    
    useEffect(() => {
        checkTitleOverflow();
    }, [idDate, currentTrack]);
    
    const onLoadedMetadata = () => {
        if (audioRef.current) {
            const seconds = audioRef.current.duration;
            setDuration(seconds);
            if (progressBarRef.current) {
                progressBarRef.current.max = seconds;
            }
        }
    };
    
    const [modal, setModalState] = useRecoilState(modalState);
    
    const checkTitleOverflow = () => {
        const titleElement = titleRef.current;
        const titleWrapper = titleWrapperRef.current;
        
        if (titleElement && titleWrapper) {
            if (titleElement.scrollWidth > titleWrapper.clientWidth) {
                titleElement.classList.add(styles.scrolling);
            } else {
                titleElement.classList.remove(styles.scrolling);
            }
        }
    };
    
    return (
        <div>
            <audio
                src={idDate?.filePath || currentTrack?.filePath || ''}
                ref={audioRef}
                onLoadedMetadata={onLoadedMetadata}
                onEnded={() => setRepeatOnState(!repeatOn)}
                />
            <div className={modal ? styles.audioInfo : style.mobileAudioInfo}>
                <div className={modal ? styles.audioImage : style.mobileAudioImage}>
                    {
                        (idDate?.album?.coverImage || currentTrack?.filePath) ? (
                            <img src={albumOn === true ? (currentTrack?.trackImage || idDate?.coverImage || tracks.coverImage) : playlistOn === true ? (currentTrack?.trackImage || playlistTracks?.image) : musicOn === true ? (idDate?.trackImage || idDate?.album?.coverImage || "/images/default-album-cover.png") : ''} alt="" />
                        ) : (
                            <div className={modal ? styles.iconWrapper : style.mobileIconWrapper}>
                                <span className={styles.audioIcon}>
                                    <BsMusicNoteBeamed />
                                </span>
                            </div>
                        )
                    }
                </div>
                <div className={modal ? styles.audioTitle : style.mobileAudioTitle}>
                    <HeartIcon height={26} width={26} padding={0} />
                    <div className={styles.titleWrapper} ref={titleWrapperRef}>
                        <p className={styles.title} ref={titleRef} id="title">
                            {albumOn === true ? (idDate?.trackTitle || currentTrack?.trackTitle) : playlistOn === true ? currentTrack?.trackTitle : musicOn === true ? idDate?.trackTitle || 'Unknown Title' : ''}
                        </p>
                        <p className={styles.author}>
                            {albumOn === true ? idDate?.author?.fullName : playlistOn === true ? currentTrack?.authorFullName || 'Unknown Author' : musicOn === true ? idDate?.author?.fullName || 'Unknown Author' : ''}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DisplayTrack;
