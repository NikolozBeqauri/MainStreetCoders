import styles from '../src/styles/styles.module.scss'

const ProgressBar = ({ progressBarRef, audioRef, timeProgress, duration }: any) => {
    const handleProgressChange = () => {
        audioRef.current.currentTime = progressBarRef.current.value;
    };

    return (
        <div className={styles.progress}>
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