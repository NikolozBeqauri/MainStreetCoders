
import { AlbumCard } from "@/app/components/AlbumCard/AlbumCard";
import { albumsData } from "@/app/components/AlbumCard/albumData/albumData";
import { popularAlbums } from "@/app/components/AlbumCard/popularAlbums/popularAlbums";
import { popularArtists } from "@/app/components/AlbumCard/popularArtistsData/popularArtistsData";
import { BurgerMenu } from "@/app/components/BurgerMenu/BurgerMenu";
import { MusicCard } from "@/app/components/MusicCard/MusicCard";
import { musicCardsData } from "@/app/components/MusicCard/musicCardData/musicCardData";
import { NewsComponent } from "@/app/components/NewsComponent/NewsComponent";
import styles from "./page.module.scss"
import { Header } from "@/app/components/Header/Header";
import EditPlaylist from "@/app/components/EditPlaylist/EditPlaylist";


export default function Home() {

  
  return (
    <>
    <EditPlaylist title={"Add To Playlist"} button={false} imageName={"rightArrow"}/>
    <main className={styles.wholeWrapper} >
      <section className={styles.container}>

        <section className={styles.headerWrapper}>
          <BurgerMenu/>
          <Header />
        </section>

        <section className={styles.newsComponentWrapper}>
          <NewsComponent title={"Top Hit Of the week"} count={"795,900"} image="newsimage"/>
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
    </>
  );
}

