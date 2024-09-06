import { AlbumCard } from "@/app/components/AlbumCard/AlbumCard";
import styles from "./page.module.scss"
import { toprecomentadtiondata } from "@/app/components/AlbumCard/toprecomentadtiondata/TopReommendationsData";
const RecommendaionPage  = () => {
    return (
        <section className={styles.generalCardWrapper}>
        <div className={styles.secondaryTitleDiv}>
          <h2>Top Hits</h2>
          <span>See all</span>
        </div>
        <div className={styles.generalCardItem}>
          {toprecomentadtiondata.map((album, index) => (
            <AlbumCard
              key={index}
              author={album.author}
              title={album.title}
              img={album.img}
            />
          ))}
        </div>
      </section>
    )
}

export default RecommendaionPage;