import { BsMusicNoteBeamed } from 'react-icons/bs';
import { HeartIcon } from '../../HeartIcon/HeartIcon';

import styles from '../src/styles/styles.module.scss'


const DisplayTrack = ({ currentTrack, audioRef, setDuration, progressBarRef, nextTrack }: any) => {
    
    const onLoadedMetadata = () => {
        const seconds = audioRef.current.duration;
        setDuration(seconds);
        progressBarRef.current.max = seconds;
    }

    return (
        <div>
            <audio  
                src={currentTrack.src}
                ref={audioRef} 
                onLoadedMetadata={onLoadedMetadata}
                onEnded={nextTrack}
            />
            <div className={styles.audioInfo}>
                <div className={styles.audioImage}>
                    {
                        currentTrack.thumbnail ? 
                        (<img src={currentTrack.thumbnail} alt="Avatar" />) : 
                        (<div className={styles.iconWrapper}>
                            <span className={styles.audioIcon}>
                              <BsMusicNoteBeamed />
                            </span>
                        </div>)
                    }
                </div>
                <div className={styles.audioTitle}>
                    <HeartIcon height={24} width={24} padding={0}/>
                    <div>
                        <p className={styles.title}>{currentTrack.title}</p>
                        <p className={styles.author}>{currentTrack.author}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DisplayTrack;