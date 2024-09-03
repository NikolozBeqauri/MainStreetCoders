import { Header } from "@/app/components/Header/Header";
import styles from "./page.module.scss"
import { artistPageData } from "./artistPageData/artistPageData";
import { AlbumCard } from "@/app/components/AlbumCard/AlbumCard";
const ArtistPage = () => {
    return (
        <div className={styles.artistPageWrapper}>
            <Header />
            <div className={styles.artistCardsWrapper}>
                <h2>Trending Now</h2>
                <div className={styles.artistCards}>
                    {artistPageData.map((album, index) => (
                        <AlbumCard
                            key={index}
                            author={album.author}
                            img={album.img}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default ArtistPage;