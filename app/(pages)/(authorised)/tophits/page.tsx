"use client";

import { Header } from "@/app/components/Header/Header";
import styles from "./page.module.scss";
import { NewsComponent } from "@/app/components/NewsComponent/NewsComponent";
import { BurgerMenu } from "@/app/components/BurgerMenu/BurgerMenu";
import { ReusableTable } from "@/app/components/ReusableTable/ReusableTable";

const TopHitPage = () => {
  return (
    <div className={styles.contentOfHit}>
      <div className={styles.headerMover}>
        <BurgerMenu />
        <Header imgName="rightArrow" />
      </div>
      <NewsComponent
        onlyTitle 
        title="Top Hit Of All Month"
        count={"999"}
        image="chartBackground"
      />
      <div className={styles.contentOfSongs}>
        <ReusableTable pageName="music/topHits" isTopHitPage={true} />
      </div>
    </div>
  );
};

export default TopHitPage;
