import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import style from './TrackDisplay.module.scss';
import { useRecoilState } from 'recoil';
import { playerDisplayState } from '@/app/states';

interface TrackDisplayProps {
    currentTrack: {
        title: string;
        artist: string;
        albumArt: string;
    };
    onAlbumArtClick: () => void;
}

const TrackDisplay: React.FC<TrackDisplayProps> = ({ currentTrack, onAlbumArtClick }) => {
    const [playerDisplay] = useRecoilState<any>(playerDisplayState);
    const titleRef = useRef<HTMLSpanElement>(null);
    const [isScrolling, setIsScrolling] = useState(false);

    useEffect(() => {
        const checkScrollNeeded = () => {
            const titleText = playerDisplay.trackTitle || 'Unknown Title';
            setIsScrolling(titleText.length > 19);
        };

        checkScrollNeeded();
        window.addEventListener('resize', checkScrollNeeded);

        return () => {
            window.removeEventListener('resize', checkScrollNeeded);
        };
    }, [playerDisplay.trackTitle]);

    if (!currentTrack) {
        return (
            <div className={style.container}>
                <p>No track selected</p>
            </div>
        );
    }

    return (
        <div className={style.container} onClick={onAlbumArtClick}>
            <div className={style.albumArt}>
                <Image
                    src={playerDisplay?.album?.coverImage || '/defaultIcon.png'}
                    alt="Album Art"
                    width={80}
                    height={80}
                    className={style.img}
                />
            </div>
            <div className={style.wrapper}>
                <div className={style.titleWrapper}>
                    <span
                        ref={titleRef}
                        className={`${style.authorTitle} ${isScrolling ? style.scrolling : ''}`}
                    >
                        {playerDisplay.trackTitle || 'Unknown Title'}
                    </span>
                </div>
                <span className={style.artist}>
                    {playerDisplay.author?.fullName || 'Unknown Artist'}
                </span>
            </div>
        </div>
    );
};

export default TrackDisplay;
