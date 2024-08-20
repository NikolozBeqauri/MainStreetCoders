import { AlbumCard } from "./components/AlbumCard/AlbumCard";
import { albumsData } from "./components/AlbumCard/albumData/albumData";
import { popularAlbums } from "./components/AlbumCard/popularAlbums/popularAlbums";
import { popularArtists } from "./components/AlbumCard/popularArtistsData/popularArtistsData";
import { BurgerMenu } from "./components/BurgerMenu/BurgerMenu";
import { Header } from "./components/Header/Header";
import { MusicCard } from "./components/MusicCard/MusicCard";
import { musicCardsData } from "./components/MusicCard/musicCardData/musicCardData";
import { NewsComponent } from "./components/NewsComponent/NewsComponent";
import styles from "./page.module.scss"


export default function Home() {

  
  return (
    <main className={styles.wholeWrapper} >
      <section className={styles.container}>

        <section className={styles.headerWrapper}>
          <BurgerMenu/>
          <Header />
        </section>

        <section className={styles.newsComponentWrapper}>
          <NewsComponent title={"Top Hit Of the week"} count={"795,900"} />
        </section>

        <section className={styles.generalCardWrapper}>
          <div className={styles.secondaryTitleDiv}>
            <h2>Top Hits</h2>
            <span>See all</span>
          </div>
          <div className={styles.generalCardItem}>
            {albumsData.map((album, index) => (
              <AlbumCard
                key={index}
                author={album.author}
                title={album.title}
                img={album.img}
              />
            ))}
          </div>
        </section>

        <section className={styles.musicCardWrapper}>
          <div className={styles.secondaryTitleDiv}>
            <h2>Top Charts</h2>
            <span>See all</span>
          </div>
          <div className={styles.musicCards}>
            {musicCardsData.map((musicCard, index) => (
              <MusicCard
                key={index} imgName={musicCard.img} title={musicCard.title} author={musicCard.author} timing={musicCard.timing}
              />
            ))}
          </div>
        </section>


        <section className={styles.generalCardWrapper}>
          <div className={styles.secondaryTitleDiv}>
            <h2>Popular Artists</h2>
            <span>See all</span>
          </div>
          <div className={styles.generalCardItem}>
            {popularArtists.map((album, index) => (
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
            <h2>Top Hits</h2>
            <span>See all</span>
          </div>
          <div className={styles.generalCardItem}>
            {popularAlbums.map((album, index) => (
              <AlbumCard
                key={index}
                author={album.author}
                title={album.title}
                img={album.img}
              />
            ))}
          </div>
        </section>
      </section>
    </main>
  );
}

