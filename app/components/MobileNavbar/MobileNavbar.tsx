'use client'
import { useState } from 'react';
import Image from 'next/image';
import styles from './MobileNavbar.module.scss';
import { menuItems } from './MobileNavbarLinks/MobileNavbarLinks';
import { useRouter } from "next/navigation";

export const MobileNavbar = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const router = useRouter();

    const handleClick = (index:any, path: string) => {
        setActiveIndex(index);
        router.push(path);  
    };

    return (
        <nav className={styles.container}>
            <ul className={styles.listsContainer}>
                {menuItems.map((item, index) => (
                    <li key={item.id} onClick={() => handleClick(index, item.path)}>
                        <Image
                            src={activeIndex === index ? item.activeIcon : item.icon}
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