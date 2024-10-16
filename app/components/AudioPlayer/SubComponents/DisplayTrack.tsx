import { useEffect, useRef } from "react";
import { BsMusicNoteBeamed } from "react-icons/bs";
import { HeartIcon } from "../../HeartIcon/HeartIcon";
import styles from "../src/styles/styles.module.scss";
import style from "../src/styles/mobile.module.scss";
import { useRecoilState } from "recoil";
import { modalState } from "@/app/states";

const DisplayTrack = ({ currentTrack, audioRef, setDuration, progressBarRef, idDate }: any) => {
    const titleRef = useRef<HTMLParagraphElement | null>(null);
    const titleWrapperRef = useRef<HTMLDivElement | null>(null);

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
                onEnded={() => console.log("Track ended")}
            />
            <div className={modal ? styles.audioInfo : style.mobileAudioInfo}>
                <div className={modal ? styles.audioImage : style.mobileAudioImage}>
                    {
                        (idDate?.album?.coverImage || currentTrack.filePath) ? (
                            <img src={idDate?.trackImage || currentTrack.trackImage || idDate?.album?.coverImage || idDate?.coverImage || currentTrack.album?.coverImage} alt="" />
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
                            {idDate?.trackTitle || currentTrack.trackTitle || 'Unknown Title'}
                        </p>
                        <p className={styles.author}>
                            {idDate?.author?.fullName || currentTrack?.authorName || 'Unknown Author'}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DisplayTrack;
