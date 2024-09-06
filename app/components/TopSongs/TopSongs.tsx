'use client'
import { useState } from 'react';
import { NewsComponent } from "../NewsComponent/NewsComponent";
import { ReusableTable } from "../ReusableTable/Reusable";
import styles from "./TopSongs.module.scss";
import artistNav from '@/app/enums/artistNav';
import { ArtistBiography } from '../ArtistPiography/ArtistPiography';

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
                <ArtistBiography image={'billieEilish'} title={'barkala'} paragraph={`Peggy Gou (born July 3, 1991) is a South Korean DJ and producer based in Berlin. Originally from Incheon, South Korea, she began taking piano lessons at the age of 8 and moved to London during her teenage years to study English. After a brief return to South Korea, Gou returned to England to study at the London College of Fashion. During this time, she also honed her skills in music production, a hobby she had started in her younger years. Upon moving to Berlin, Gou made her official debut in 2016 with the EPs Art of War and Art of War II, both released by the independent label Rekids, releasing a third EP titled Seek for Maktoop the same year. As her reputation grew, she landed gigs at some of the world's most iconic venues, becoming the first Korean DJ to perform at the legendary Berlin nightclub Berghain. She has also shared the stage with renowned artists such as DJ Koze, Moodymann, The Blessed Madonna, and secured spots at festivals like Coachella, Glastonbury, and Primavera Sound. In 2018, Peggy Gou released the EP Once via Ninja Tune Records, followed by the DJ mix album DJ-Kicks: Peggy Gou (2019), released by !K7 Records. In addition to receiving rave reviews, the album marked her first appearance on the Billboard chart, peaking at number 9. Heavily inspired by 90s dance music, the single "I Go" was released in 2021 and reached number 39 on the Hot Dance/Electronic Songs chart. Her debut album I Hear You was released in July, 2024 through XL Recordings.`}/>
            </div>
        </div>
    );
};
