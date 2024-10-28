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
import { NewsComponent } from '@/app/components/NewsComponent/NewsComponent';


   
const Charts = () => {
    const token = Cookies.get('token');
    return(
        <div className={styles.wrapper}>
            <ReusableHeader />
            <NewsComponent
                onlyTitle
                title={"Top Hit Of The Week"}
                image={"chartBackground"}
            />
            <ChartTable />

        </div>
    )
}

export default Charts;