'use client'
import { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from './MobileNavbar.module.scss';
import { menuItems } from './MobileNavbarLinks/MobileNavbarLinks';
import { useRecoilState } from 'recoil';
import { activeSearchState, modalState } from '@/app/states';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';

export const MobileNavbar = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [, setModalState] = useRecoilState(modalState);
    const [, setActiveSearch] = useRecoilState(activeSearchState);
    const router = useRouter();
    const pathname = usePathname(); 

    useEffect(() => {
        if (pathname !== '/') {
            setActiveSearch(false);
        }
        if (pathname !== '/' && pathname !== '/playlists') {
            setActiveIndex(5)
        }

    }, [pathname]);

    const handleClick = (index: number, item: any) => {
        router.push(item.route);
        setActiveIndex(index);
        setModalState(true);
        if (item.label === 'Search') {
            setActiveSearch(true);
        } else {
            setActiveSearch(false);
        }
    };

    return (
        <nav className={styles.container}>
            <ul className={styles.listsContainer}>
                {menuItems.map((item, index) => (
                    <li key={item.id} onClick={() => handleClick(index, item)}>
                        <Image
                            src={activeIndex === index ? item.activeIcon : (item.icon || '/path/to/default/icon.png')}
                            alt={`${item.label} icon`}
                            width={20}
                            height={20}
                        />
                        <span
                            className={styles.title}
                            style={{ color: activeIndex === index ? '#fff' : '#818385' }}
                        >
                            {item.label}
                        </span>
                    </li>
                ))}
            </ul>
        </nav>
    );
};
