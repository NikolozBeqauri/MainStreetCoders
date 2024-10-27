'use client';
import ReusableHeader from '@/app/components/ReusableHeader/ReusableHeader';
import styles from './page.module.scss';
import News from '@/app/components/News/News';
import Input from '@/app/components/Input/Input';
import Tables from '@/app/components/Table/Table';
import { useEffect, useState } from 'react';
import axios from 'axios';
import ChartTable from '@/app/components/ChartTable/ChartTable';
import Cookies from 'js-cookie';


   
const Charts = () => {


    const [topHit, setTopHIt] = useState<any>()

    const token = Cookies.get('token');

    useEffect(() => {
        axios
            .get(`https://project-spotify-1.onrender.com/music/topweek`, {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              })
            .then(async (r) => {
                setTopHIt(r.data[0])
            });
    }, []);

    return(
        <div className={styles.container}>
            <ReusableHeader />
            <News title={'Top Chart Of The Week'} image={topHit?.albumCover} plays={topHit?.listenerCount} />
            <ChartTable />

        </div>
    )
}

export default Charts;