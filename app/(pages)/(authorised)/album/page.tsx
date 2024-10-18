"use client";

import { Header } from "@/app/components/Header/Header";
import { NewsComponent } from "@/app/components/NewsComponent/NewsComponent";
import styles from "./page.module.scss";
import { BurgerMenu } from "@/app/components/BurgerMenu/BurgerMenu";
import { ReusableTable } from "@/app/components/ReusableTable/ReusableTable";
import { albumIDState } from "@/app/states";
import { useRecoilState } from "recoil";
import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect } from "react";

const AlbumPage = () => {
  const searchParams = useSearchParams()
  const id  = searchParams.get('albumId')
 console.log(id,'searchiddddddddd')
  const [albumId, setAlbumId] = useRecoilState(albumIDState); 
  const pathname = usePathname(); 
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
            title={"All Albums"}
            count={"Released 07/12/2023"}
            image={"artistDemoImage"}
          />
          <div className={styles.table}>
            {id ? 
              <ReusableTable albumMusics pageName={`album/${id}`} />
              :
              <ReusableTable  pageName="album" />
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlbumPage;
