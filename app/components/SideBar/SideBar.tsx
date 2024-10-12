'use client';
import Image from 'next/image';
import styles from './SideBar.module.scss';
import { useEffect, useState } from 'react';
import { ReusableIcon } from '../ReusableIcon/ReusableIcon';
import { GeneralLinks } from './SideBarLinks/GeneralLinks';
import { useRouter, usePathname } from 'next/navigation'; 
import { Discoverlinks } from './SideBarLinks/Discover';
import { Colectionlinks } from './SideBarLinks/ColectionLinks';
import { activeSidebarState } from '@/app/states';
import { useRecoilState } from 'recoil';

export const SideBar = () => {
  const [active, setActive] = useState<string | null>(null);
  const router = useRouter();
  const pathname = usePathname(); 
  const [activeSidebar, setactiveSidebar] = useRecoilState(activeSidebarState);

  useEffect(() => {
    const handleResize = () => {
      setactiveSidebar(window.innerWidth > 1024);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [setactiveSidebar]);

  useEffect(() => {
    const activeLink = GeneralLinks.find(link => pathname === link.href) || 
                       Colectionlinks.find(link => pathname === link.href) ||
                       Discoverlinks.find(link => pathname === link.href);
    if (activeLink) {
      setActive(activeLink.label);
    }
  }, [pathname]); 

  if (!activeSidebar) return <></>;

  const sidebarGeneralStyles = [styles.sideBarWrapper];
  return (
    <div>
      <div className={styles.toDisableMenuDiv} onClick={() => setactiveSidebar(false)}></div>
      <aside className={sidebarGeneralStyles.join(' ').trim()}>
        <div className={styles.mainLogo} onClick={() => router.push('/')}>
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
                  setActive(link.label);
                  router.push(`${link.href}`);
                }}
                id={active === link.label ? styles.active : ''}
              >
                <ReusableIcon imgName={link.imageName} active={active === link.label} />
                <span>{link.label}</span>
              </div>
            ))}
            <h2>Collection</h2>
            {Colectionlinks.map(link => (
              <div
                className={styles.navBarlink}
                key={link.label}
                onClick={() => {
                  setActive(link.label);
                  router.push(`${link.href}`);
                }}
                id={active === link.label ? styles.active : ''}
              >
                <ReusableIcon imgName={link.imageName} active={active === link.label} />
                <span>{link.label}</span>
              </div>
            ))}
            <h2>Discover</h2>
            {Discoverlinks.map(link => (
              <div
                className={styles.navBarlink}
                key={link.label}
                onClick={() => {
                  setActive(link.label);
                  router.push(`${link.href}`);
                }}
                id={active === link.label ? styles.active : ''}
              >
                <ReusableIcon imgName={link.imageName} active={active === link.label} />
                <span>{link.label}</span>
              </div>
            ))}
          </div>
        </nav>
      </aside>
    </div>
  );
};
