'use client'
import Image from 'next/image';
import styles from './SideBar.module.scss';
import Link from 'next/link';
import { useState } from 'react';
import { ReusableIcon } from '../ReusableIcon/ReusableIcon';

export const SideBar = () => {
    const [active, setActive] = useState<string | null>(null);

    const links = [
        { href: '#', label: 'Home', imageName: 'menuHome' },
        { href: '#', label: 'Recommendations', imageName: 'menuRecomendation' },
        { href: '#', label: 'Top Hits', imageName: 'menuTopHits' },
        { href: '#', label: 'Top Charts', imageName: 'menuTopCharts' },
        { href: '#', label: 'Playlists', imageName: 'menuPlaylists' },
        { href: '#', label: 'Favorites', imageName: 'menuFavorites' },
        { href: '#', label: 'Artist', imageName: 'menuArtist' },
        { href: '#', label: 'Album', imageName: 'menuAlbum' }
    ];

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
                    {links.map(link => (
                        <Link
                            href={link.href}
                            key={link.label}
                            onClick={() => setActive(link.label)}
                            onFocus={() => setActive(link.label)}
                            onBlur={() => setActive(null)}
                            id={active === link.label ? styles.active : ""}
                        >
                            <ReusableIcon
                                imgName={link.imageName}
                                active={active === link.label}
                                onFocus={() => setActive(link.label)}
                            />
                            <span>{link.label}</span>
                        </Link>
                    ))}
                </div>
            </nav>
        </aside>
    );
};
