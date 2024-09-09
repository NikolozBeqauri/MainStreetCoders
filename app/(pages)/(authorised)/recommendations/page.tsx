import { AlbumCard } from '@/app/components/AlbumCard/AlbumCard';
import styles from './page.module.scss'
import { toprecomentadtiondata } from '@/app/components/AlbumCard/toprecomentadtiondata/TopReommendationsData';
import { AlbumsYouMightLove } from '@/app/components/AlbumCard/toprecomentadtiondata/AlbumsYouMightLove';
import { BecauseyoulistenedtoPeggyGou } from '@/app/components/AlbumCard/toprecomentadtiondata/BecauseyoulistenedtoPeggyGou';
import { HiddenGems } from '@/app/components/AlbumCard/toprecomentadtiondata/HiddenGems';
import { Header } from '@/app/components/Header/Header';


const RecommendaionPage = () => {
  return (
  
    <div className={styles.recomendationPage}>
      <Header/>
      <section className={styles.generalCardWrapper}>
        <div className={styles.secondaryTitleDiv}>
          <h2>Top Recommendations</h2>
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

      <section className={styles.generalCardWrapper}>
        <div className={styles.secondaryTitleDiv}>
          <h2>Albums You Might Love</h2>
          <span>See all</span>  
        </div>
        <div className={styles.generalCardItem}>
          {AlbumsYouMightLove.map((album, index) => (
            <AlbumCard
              key={index}
              author={album.author}
              title={album.title}
              img={album.img}
            />
          ))}
        </div>
      </section>
      <section className={styles.generalCardWrapper}>
        <div className={styles.secondaryTitleDiv}>
          <h2>Because you listened to Peggy Gou </h2>
          <span>See all</span>
        </div>
        <div className={styles.generalCardItem}>
          {BecauseyoulistenedtoPeggyGou.map((album, index) => (
            <AlbumCard
              key={index}
              author={album.author}
              img={album.img}
            />
          ))}
        </div>
      </section>

      <section className={styles.generalCardWrapper}>
        <div className={styles.secondaryTitleDiv}>
          <h2>Hidden Gems</h2>
          <span>See all</span>
        </div>
        <div className={styles.generalCardItem}>
          {HiddenGems.map((album, index) => (
            <AlbumCard
              key={index}
              author={album.author}
              title={album.title}
              img={album.img}
            />
          ))}
        </div>
      </section>

    </div>
  )

}


export default RecommendaionPage;