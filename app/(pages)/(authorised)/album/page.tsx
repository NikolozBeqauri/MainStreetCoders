"use client"

import { Header } from "@/app/components/Header/Header";
import { NewsComponent } from "@/app/components/NewsComponent/NewsComponent";
import styles from "./page.module.scss";
import { BurgerMenu } from "@/app/components/BurgerMenu/BurgerMenu";
import { ReusableTable } from "@/app/components/ReusableTable/ReusableTable";
import { albumIDState, currentAlbumStete } from "@/app/states";
import { useRecoilState } from "recoil";
import { usePathname, useSearchParams } from 'next/navigation';
import { Suspense, useEffect } from "react";
import { AlbumTable } from "@/app/components/AlbumTable/AlbumTable";

const AlbumPage = () => {
  const searchParams = useSearchParams()
  const id = searchParams.get('albumId')
  const idFromAlbumPage = searchParams.get('idFromAlbumPage')
  const [albumId, setAlbumId] = useRecoilState(albumIDState);
  const pathname = usePathname();
  const [currentAlbum, ] = useRecoilState(currentAlbumStete);

  useEffect(() => {    
    if (pathname !== '/album') {      
      setAlbumId(null);
    }
  }, [pathname, setAlbumId]);

  return (
    <div className={styles.album}>
      <div className={styles.album2}>
        <div className={styles.album1}>
          <BurgerMenu />
          <Header />
        </div>
        <div>
          <NewsComponent
            onlyTitle
            title={idFromAlbumPage ? `${currentAlbum}` : "All Albums"}
            count={"Released 07/12/2023"}
            image={"artistDemoImage"}
          />
          <div className={styles.table}>
            {id ?
              <ReusableTable albumMusics pageName={`album/${id}`} />
              :
              (idFromAlbumPage ? 
                <ReusableTable albumMusics pageName={`album/${idFromAlbumPage}`} />
                :
                <AlbumTable pageName="album" />
              )
            }
          </div>
        </div>
      </div>
    </div>
  );
};

const Page = () => <Suspense><AlbumPage /></Suspense>;

export default Page;