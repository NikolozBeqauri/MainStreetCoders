import { BurgerMenu } from "@/app/components/BurgerMenu/BurgerMenu";
import { Header } from "@/app/components/Header/Header";
import { NewsComponent } from "@/app/components/NewsComponent/NewsComponent"
import { ReusableTable } from "@/app/components/ReusableTable/Reusable"
import styles from "./page.module.scss"
import { ReusableIcon } from "@/app/components/ReusableIcon/ReusableIcon";
import { Search } from "@/app/components/Search/Search";
const FavoritesPage = () => {
    return (
        <div className={styles.favorites}>
            <div className={styles.favorites2}>
                <div className={styles.favorites1}>
                    <BurgerMenu />
                    <Header imgName="favoritesicon" />
                    <div>
                        <Search />
                    </div>
                </div>
                <div>
                    <div className={styles.table}>
                        <ReusableTable />
                    </div>
                </div>
            </div>
        </div>
    )
}
export default FavoritesPage;