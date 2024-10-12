import { Header } from "@/app/components/Header/Header";
import { NewsComponent } from "@/app/components/NewsComponent/NewsComponent";
import { Search } from "@/app/components/Search/Search";
import styles from './page.module.scss'
import { BurgerMenu } from "@/app/components/BurgerMenu/BurgerMenu";
import { ReusableTable } from "@/app/components/ReusableTable/ReusableTable";
const TopCharactersPage = () => {
    
    return (
        <div className={styles.content}>
            <div className={styles.headerMover}>
                <BurgerMenu/>
                <Header imgName='rightArrow'/>
            </div>
            <NewsComponent title='Top Musics  Of the week' onlyTitle image='chartBackground' />
            <div className={styles.contentOfSongs}>
                <Search />
                <ReusableTable pageName="musics/topHits"/>
            </div>
        </div>
    )
}

export default TopCharactersPage;