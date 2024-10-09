import { BsMusicNoteBeamed } from 'react-icons/bs';
import { HeartIcon } from '../../HeartIcon/HeartIcon';

import styles from '../src/styles/styles.module.scss';
import style from '../src/styles/mobile.module.scss';

import { useRecoilState } from 'recoil';
import { modalState } from '@/app/states';


const DisplayTrack = ({ currentTrack, audioRef, setDuration, progressBarRef, nextTrack, idDate }: any) => {
    
    const onLoadedMetadata = () => {
        const seconds = audioRef.current.duration;
        setDuration(seconds);
        progressBarRef.current.max = seconds;
    }

    const [modal, setModalState] = useRecoilState(modalState);

    return (
        <div>
            <audio  
                src={idDate.file || currentTrack.filePath || ''}
                ref={audioRef} 
                onLoadedMetadata={onLoadedMetadata}
                onEnded={nextTrack}
            />
            <div className={modal === true ? styles.audioInfo : style.mobileAudioInfo}>
                <div className={modal === true ? styles.audioImage : style.mobileAudioImage}>
                    {
                        idDate.album?.coverImage ? 
                        // eslint-disable-next-line @next/next/no-img-element
                        (<img src={idDate.album?.coverImage || currentTrack.thumbnail} alt="Track Thumbnail" />) : 
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
                        <p className={styles.title}>{idDate.trackTitle ?  idDate.trackTitle : 'Unknown Title'}</p>
                        <p className={styles.author}>{idDate.authorName ?  idDate.authorName : currentTrack.authorName}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DisplayTrack;