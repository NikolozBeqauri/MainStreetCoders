
import { Header } from '@/app/components/Header/Header';
import styles from './page.module.scss'
import { NewsComponent } from '@/app/components/NewsComponent/NewsComponent';
import { Search } from '@/app/components/Search/Search';
import { BurgerMenu } from '@/app/components/BurgerMenu/BurgerMenu';
import { ReusableTable } from '@/app/components/ReusableTable/ReusableTable';

const TopHitPage = () => {

    return (
        <div className={styles.contentOfHit}>
            <div className={styles.headerMover}>
                <BurgerMenu/>
                <Header imgName='rightArrow'/>
            </div>
            <NewsComponent title='Top Hit  Of the week' count={'999'} image='chartBackground' />
            <div className={styles.contentOfSongs}>
                <Search />
                <ReusableTable />
            </div>
        </div>
    )
}

export default TopHitPage;