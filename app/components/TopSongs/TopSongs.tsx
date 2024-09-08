'use client'
import { useState } from 'react';
import { NewsComponent } from "../NewsComponent/NewsComponent";
import { ReusableTable } from "../ReusableTable/Reusable";
import styles from "./TopSongs.module.scss";
import artistNav from '@/app/enums/artistNav';
import { ArtistBiography } from '../ArtistPiography/ArtistPiography';
import { ArtistAlbum } from '../ArtistAlbum/ArtistAlbum';

type Props = {
    image: string;
    title: string;
    count: string;
};

export const TopSongs = (props: Props) => {
    const [activeButton, setActiveButton] = useState(artistNav.topSongs);    
    return (
        <div className={styles.wrapper}>
            <NewsComponent 
                title={props.title} 
                count={props.count} 
                image={props.image} 
            />
            <div>
                <div className={styles.navigationWrapper}>
                    <button
                        id={activeButton === 'top-songs' ? styles.activeButton : ''}
                        onClick={() => setActiveButton(artistNav.topSongs)}
                    >
                        Top Songs
                    </button>
                    <button
                        id={activeButton === 'album' ? styles.activeButton : ''}
                        onClick={() => setActiveButton(artistNav.album)}
                    >
                        Album
                    </button>
                    <button
                        id={activeButton === 'biography' ? styles.activeButton : ''}
                        onClick={() => setActiveButton(artistNav.biography)}
                    >
                        Biography
                    </button>
                </div>
                {(() => {
                    switch (activeButton) {
                        case artistNav.topSongs:
                            return <ReusableTable />;
                        case artistNav.album:
                            return <ArtistAlbum />;
                        case artistNav.biography:
                            return (
                                <ArtistBiography
                                    image={'billieEilish'}
                                    title={'barkala'}
                                    paragraph={`Peggy Gou (born July 3, 1991) is a South Korean DJ...`} 
                                />
                            );
                        default:
                            return null;
                    }
                })()}
            </div>
        </div>
    );
};
