import { useRecoilState } from 'recoil';
import styles from '../src/styles/styles.module.scss';
import style from '../src/styles/mobile.module.scss';
import { modalState } from '@/app/states';

const ProgressBar = ({ progressBarRef, audioRef, timeProgress, duration }: any) => {


    const handleProgressChange = () => {
        audioRef.current.currentTime = progressBarRef.current.value;
    };

    const [modal, setModalState] = useRecoilState(modalState);

    return (
        <div className={modal === true ? styles.progress : style.mobileProgress}>
            <span className={styles.time}>{formatTime(timeProgress)}</span>
            <input 
                type="range" 
                ref={progressBarRef}
                defaultValue="0"
                onChange={handleProgressChange}
            />
            <span className={styles.time}>{formatTime(duration)}</span>
        </div>
    )
}


const formatTime = (time: any) => {
    if (time && !isNaN(time)) {
      const minutes = Math.floor(time / 60);
      const formatMinutes =
        minutes < 10 ? `0${minutes}` : `${minutes}`;
      const seconds = Math.floor(time % 60);
      const formatSeconds =
        seconds < 10 ? `0${seconds}` : `${seconds}`;
      return `${formatMinutes}:${formatSeconds}`;
    }
    return '00:00';
  };

export default ProgressBar;