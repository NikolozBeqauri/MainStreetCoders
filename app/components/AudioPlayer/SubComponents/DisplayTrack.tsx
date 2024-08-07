import { BsMusicNoteBeamed } from 'react-icons/bs';
import { HeartIcon } from '../../HeartIcon/HeartIcon';


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
            <div className='audio-info'>
                <div className='audio-image'>
                    {
                        currentTrack.thumbnail ? 
                        (<img src={currentTrack.thumbnail} alt="Avatar" />) : 
                        (<div className="icon-wrapper">
                            <span className="audio-icon">
                              <BsMusicNoteBeamed />
                            </span>
                        </div>)
                    }
                </div>
                <div className='audio-title'>
                    <HeartIcon height={24} width={24} padding={0}/>
                    <div>
                        <p className='title'>{currentTrack.title}</p>
                        <p className='author'>{currentTrack.author}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DisplayTrack;