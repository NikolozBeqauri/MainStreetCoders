import { Header } from "@/app/components/Header/Header";
import { NewsComponent } from "@/app/components/NewsComponent/NewsComponent";
import { ReusableTable } from "@/app/components/ReusableTable/Reusable";
import { Search } from "@/app/components/Search/Search";
import styles from "./page.module.scss"
import { BurgerMenu } from "@/app/components/BurgerMenu/BurgerMenu";
const AlbumPage = () => {
    return (
        <div style={{
            width: "100%"
        }}>
            <div className={styles.album1}>
                <Header />
                <NewsComponent title={"Seek For Marktoop"} count={"Released 07/12/2023"} />
            </div>
            <div className={styles.album2}>
            <ReusableTable />
            </div>
            <BurgerMenu/>
        </div>
    )
}

export default AlbumPage;