'use client'
import { useState } from 'react';
import { NewsComponent } from "../NewsComponent/NewsComponent";
import { ReusableTable } from "../ReusableTable/Reusable";
import styles from "./TopSongs.module.scss";

type Props = {
    image: string;
    title: string;
    count: string;
};

export const TopSongs = (props: Props) => {
    const [activeButton, setActiveButton] = useState('top-songs');
    console.log(activeButton);
    
    return (
        <div>
            <NewsComponent 
                title={props.title} 
                count={props.count} 
                image={props.image} 
            />
            <div>
                <div className={styles.navigationWrapper}>
                    <button
                        id={activeButton === 'top-songs' ? styles.activeButton : ''}
                        onClick={() => setActiveButton('top-songs')}
                    >
                        Top Songs
                    </button>
                    <button
                        id={activeButton === 'album' ? styles.activeButton : ''}
                        onClick={() => setActiveButton('album')}
                    >
                        Album
                    </button>
                    <button
                        id={activeButton === 'biography' ? styles.activeButton : ''}
                        onClick={() => setActiveButton('biography')}
                    >
                        Biography
                    </button>
                </div>
                <ReusableTable />
            </div>
        </div>
    );
};
