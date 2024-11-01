import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image'
import style from './fullscreen.module.scss';
import { useRecoilState } from 'recoil';
import { musicState, playerDisplayState } from '@/app/states';

const Fullscreen = () => {
    const [music, setMusic] = useRecoilState<any>(musicState)
    const [playerDisplay, setPlayerDisplay] = useRecoilState<any>(playerDisplayState)

    const titleRef = useRef<HTMLSpanElement>(null);
    const [isScrolling, setIsScrolling] = useState(false);

    useEffect(() => {
        const checkScrollNeeded = () => {
            const titleText = playerDisplay.trackTitle || 'Unknown Title';
            setIsScrolling(titleText.length > 40);
        };

        checkScrollNeeded();
        window.addEventListener('resize', checkScrollNeeded);

        return () => {
            window.removeEventListener('resize', checkScrollNeeded);
        };
    }, [playerDisplay.trackTitle]);


    return (
        <div className={style.container}>
            <img src={playerDisplay?.album?.coverImage || '/defaultAlbumArt.jpg'} alt="Album Art" width={80} height={80} className={style.img} />
            <div className={style.like}>
                <div className={style.text}>
                    <div className={style.flexing}>
                        <span ref={titleRef} className={`${style.title} ${isScrolling ? style.scrolling : ''}`}>{playerDisplay?.trackTitle || 'Unknown Title'}</span>
                        <span className={style.artist}>{playerDisplay?.author?.fullName || 'Unknown Artist'}</span>
                        <div className={style.likebtn}>
                        </div></div>
                </div>

            </div>

        </div>
    );
};

export default Fullscreen;
