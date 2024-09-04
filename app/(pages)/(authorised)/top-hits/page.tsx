
import { Header } from '@/app/components/Header/Header';
import styles from './page.module.scss'
import { NewsComponent } from '@/app/components/NewsComponent/NewsComponent';
import { Search } from '@/app/components/Search/Search';
import { ReusableTable } from '@/app/components/ReusableTable/Reusable';

const TopHitPage = () => {

    return (
        <div className={styles.contentOfHit}>
            <div className={styles.headerMover}>
                <Header imgName='rightArrow'/>
            </div>
            <NewsComponent title='Top Hit  Of the week' count={'999'} />
            <div className={styles.contentOfSongs}>
                <Search />
                <ReusableTable />
            </div>
        </div>
    )
}

export default TopHitPage;