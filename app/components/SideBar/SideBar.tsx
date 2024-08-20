'use client'
import Image from 'next/image';
import styles from './SideBar.module.scss';
import { useState } from 'react';
import { ReusableIcon } from '../ReusableIcon/ReusableIcon';
import { GeneralLinks } from './SideBarLinks/GeneralLinks'
import { useRouter } from 'next/navigation';
import { Discoverlinks } from './SideBarLinks/Discover';
import { Colectionlinks } from './SideBarLinks/ColectionLinks';


export const SideBar = () => {
    const [active, setActive] = useState<string | null>(null);
    const router = useRouter()

    return (
        <aside className={styles.sideBarWrapper}>
            <div className={styles.mainLogo}
                onClick={() => router.push('/')}>
                <Image
                    src={`/images/mainLogo.png`}
                    alt="main logo"
                    width={98}
                    height={83}
                    tabIndex={0}
                />
            </div>
            <nav className={styles.sideBarNav}>
                <div className={styles.generalLinks}>
                    {GeneralLinks.map(link => (
                        <div
                            className={styles.navBarlink}
                            key={link.label}
                            onClick={() => {
                                setActive(link.label)
                                router.push(`${link.href}`)
                            }}
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
                        </div>
                    ))}
                    <h2>Collection</h2>
                    {Colectionlinks.map(link => (
                        <div
                            className={styles.navBarlink}
                            key={link.label}
                            onClick={() => {
                                setActive(link.label)
                                router.push(`${link.href}`)
                            }}
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
                        </div>
                    ))}
                    <h2>Discover</h2>
                    {Discoverlinks.map(link => (
                        <div
                            className={styles.navBarlink}
                            key={link.label}
                            onClick={() => {
                                setActive(link.label)
                                router.push(`${link.href}`)
                            }}
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
                        </div>
                    ))}
                </div>
            </nav>
        </aside >
    );
};
