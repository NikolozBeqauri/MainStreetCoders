'use client';

import styles from './page.module.scss';
import { useEffect, useState } from 'react';
import axios from 'axios';
import HitsTable from '@/app/components/Table/HitsTable/HitsTable';
import ReusableHeader from '@/app/components/ReusableHeader/ReusableHeader';
import News from '@/app/components/News/News';
import Cookies from 'js-cookie';


const Hits = () => {
    const token = Cookies.get('token');

    const [topHit, setTopHIt] = useState<any>()
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
    <News title={'Top Hit Of The Week'} image={topHit?.coverImage} plays={topHit?.listenerCount} />



    return (
        <div className={styles.container}>
            <ReusableHeader />
            <News title={'Top Hit Of The Week'} image={topHit?.albumCover} plays={topHit?.listenerCount} />
            {/* <Input /> */}
            <HitsTable />
        </div>
    )
}

Hits.displayName = 'Hits'

export default Hits;