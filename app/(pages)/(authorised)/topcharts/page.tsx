import { Header } from "@/app/components/Header/Header";
import { NewsComponent } from "@/app/components/NewsComponent/NewsComponent";
import { ReusableTable } from "@/app/components/ReusableTable/Reusable";
import { Search } from "@/app/components/Search/Search";
import styles from './page.module.scss'
const TopCharactersPage = () => {
    return (
        <div className={styles.content}>
            <div className={styles.headerMover}>
                <Header imgName='rightArrow'/>
            </div>
            <NewsComponent title='Top Charts  Of the week' count={'999'} image='chartBackground' />
            <div className={styles.contentOfSongs}>
                <Search />
                <ReusableTable />
            </div>
        </div>
    )
}

export default TopCharactersPage;