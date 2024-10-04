import { BsMusicNoteBeamed } from 'react-icons/bs';
import { HeartIcon } from '../../HeartIcon/HeartIcon';

import styles from '../src/styles/styles.module.scss';
import style from '../src/styles/mobile.module.scss';

import { useRecoilState } from 'recoil';
import { modalState } from '@/app/states';


const DisplayTrack = ({ currentTrack, audioRef, setDuration, progressBarRef, nextTrack }: any) => {
    
    const onLoadedMetadata = () => {
        const seconds = audioRef.current.duration;
        setDuration(seconds);
        progressBarRef.current.max = seconds;
    }

    const [modal, setModalState] = useRecoilState(modalState);

    return (
        <div>
            <audio  
                src={currentTrack.filePath}
                ref={audioRef} 
                onLoadedMetadata={onLoadedMetadata}
                onEnded={nextTrack}
            />
            <div className={modal === true ? styles.audioInfo : style.mobileAudioInfo}>
                <div className={modal === true ? styles.audioImage : style.mobileAudioImage}>
                    {
                        currentTrack.thumbnail ? 
                        (<img src={currentTrack.thumbnail || '/placeholder-image.jpg'} alt="Track Thumbnail" />) : 
                        (<div className={modal === true ? styles.iconWrapper : style.mobileIconWrapper}>
                            <span className={styles.audioIcon}>
                              <BsMusicNoteBeamed />
                            </span>
                        </div>)
                    }
                </div>
                <div className={modal === true ? styles.audioTitle : style.mobileAudioTitle}>
                    <HeartIcon height={26} width={26} padding={0}/>
                    <div>
                        <p className={styles.title}>{currentTrack.title || 'Unknown Title'}</p>
                        <p className={styles.author}>{currentTrack.authorName || 'Unknown Artist'}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DisplayTrack;