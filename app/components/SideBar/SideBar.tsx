import Image from 'next/image';
import styles from './SideBar.module.scss'
import Link from 'next/link';

export const SideBar = () => {
    return (
        <aside className={styles.sideBarWrapper}>
            <Link href='#'>
                <Image
                    src={`/images/mainLogo.png`}
                    alt="main logo"
                    width={98}
                    height={83}
                    tabIndex={0}
                />
            </Link>
            <nav className={styles.sideBarNav}>
                <div className={styles.generalLinks}>
                    <Link href='#'>
                        <Image
                            src={`/icons/menuHome.svg`}
                            alt="main logo"
                            width={20}
                            height={20}
                        />
                        <span>Home</span>
                    </Link>

                    <Link href='#'>
                        <Image
                            src={`/icons/menuRecomendation.svg`}
                            alt="main logo"
                            width={24}
                            height={24}
                        />
                        <span>Recommendations</span>
                    </Link>

                    <Link href='#'>
                        <Image
                            src={`/icons/menuTopHits.svg`}
                            alt="main logo"
                            width={24}
                            height={24}
                        />
                        <span>Top Hits</span>
                    </Link>

                    <Link href='#'>
                        <Image
                            src={`/icons/menuTopCharts.svg`}
                            alt="main logo"
                            width={24}
                            height={24}
                        />
                        <span>Top Charts</span>
                    </Link>
                </div>
                <div>
                    <h2>Collection</h2>
                    <Link href='#'>
                        <Image
                            src={`/icons/menuPlaylists.svg`}
                            alt="main logo"
                            width={24}
                            height={24}
                        />
                        <span>Playlists</span>
                    </Link>

                    <Link href='#'>
                        <Image
                            src={`/icons/menuFavorites.svg`}
                            alt="main logo"
                            width={24}
                            height={24}
                        />
                        <span>Favorites</span>
                    </Link>
                </div>
                <div>
                    <h2>Discover</h2>
                    <Link href='#'>
                        <Image
                            src={`/icons/menuArtist.svg`}
                            alt="main logo"
                            width={24}
                            height={24}
                        />
                        <span>Artist</span>
                    </Link>

                    <Link href='#'>
                        <Image
                            src={`/icons/menuAlbum.svg`}
                            alt="main logo"
                            width={24}
                            height={24}
                        />
                        <span>Album</span>
                    </Link>
                </div>
            </nav>
        </aside>
    )
}