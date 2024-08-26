import { Header } from '../../components/Header/Header'
import { NewsComponent } from '../../components/NewsComponent/NewsComponent'
import { ReusableTable } from '../../components/ReusableTable/Reusable'
import { Search } from '../../components/Search/Search'
import styles from './page.module.scss'

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