import { Header } from "@/app/components/Header/Header";
import { NewsComponent } from "@/app/components/NewsComponent/NewsComponent";
import { ReusableTable } from "@/app/components/ReusableTable/Reusable";
import { Search } from "@/app/components/Search/Search";
import styles from "./page.module.scss"
import { BurgerMenu } from "@/app/components/BurgerMenu/BurgerMenu";
const AlbumPage = () => {
    return (
        <div className={styles.album}>
            <div className={styles.album2}>
                <div className={styles.album1}>
                    <BurgerMenu />
                    <Header />
                </div>
                <div> 
                    <NewsComponent title={"Seek For Marktoop"} count={"Released 07/12/2023"} />
                    <div className={styles.table}>
                    <ReusableTable />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AlbumPage;