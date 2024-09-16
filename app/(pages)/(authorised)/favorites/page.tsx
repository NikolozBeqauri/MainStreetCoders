"use client"
import { Header } from "@/app/components/Header/Header";
import { ReusableTable } from "@/app/components/ReusableTable/Reusable"
import styles from "./page.module.scss"
import { Search } from "@/app/components/Search/Search";
import { useViewport } from "react-viewport-hooks";

const FavoritesPage = () => {
    const { vw } = useViewport();

    return (

        <div className={styles.favorites}>
            <div className={styles.favorites2}>
                <div className={styles.favorites1}>
                    {vw < 1024 && vw > 600 ? (
                        <Header burger={true} />
                    ) : (
                        <Header imgName={"rightArrow"} imgHeight={35} imgWidth={35} />
                    )}
                    <div>
                        <Search />
                    </div>
                </div>
                <div>
                    <div className={styles.table}>
                        <ReusableTable heartActive/>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default FavoritesPage;