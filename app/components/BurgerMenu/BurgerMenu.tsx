'use client'
import { useRecoilState } from 'recoil';
import styles from './BurgerMenu.module.scss'
import Image from 'next/image';
import { activeSidebarState } from '@/app/states';

export const BurgerMenu = () => {
    const [activeSidebar, setactiveSidebar] = useRecoilState(activeSidebarState);
    return(
        <div className={styles.burgerMenuWrapper}
            onClick={() => {
                setactiveSidebar(!activeSidebar);
            }}
        >
            <Image
            src={'/icons/burgerMenu.svg'}
            alt="burger menu icon"
            width={44}
            height={44}
        />
        </div>
    )
}