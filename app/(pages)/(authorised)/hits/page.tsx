'use client';

import styles from './page.module.scss';
import { useEffect, useState } from 'react';
import axios from 'axios';
import HitsTable from '@/app/components/Table/HitsTable/HitsTable';
import News from '@/app/components/News/News';
import Cookies from 'js-cookie';
import { Header } from "@/app/components/Header/Header";
import { NewsComponent } from '@/app/components/NewsComponent/NewsComponent';


const Hits = () => {
    const token = Cookies.get('token');

    const [topHit, setTopHIt] = useState<any>()
    console.log(topHit,'sz');
    
    useEffect(() => {
        axios
            .get(`https://project-spotify-1.onrender.com/music/topHits`, {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              })
            .then(async (r) => {
                setTopHIt(r.data[0])
                console.log(r.data, ' dmlg ml ');
                
            });
    }, [token]);

    

    return (
        <div className={styles.wrapper}>
            <Header />
            <NewsComponent
                onlyTitle
                title={"Top Hit Of The Week"}
                image={"chartBackground"}
                 />
            <HitsTable />
        </div>
    )
}

Hits.displayName = 'Hits'

export default Hits;