"use client"

import { useEffect, useState } from "react";
import Styles from "./page.module.scss";
import playListsData from "./playListsData/playListsData";
import { SquareCard } from "@/app/components/SquareCard/SquareCard";
import { Search } from "@/app/components/Search/Search";
import ReusableButton from "@/app/components/ReusableButton/ReusableButton";
import { Header } from "@/app/components/Header/Header";
import { BurgerMenu } from "@/app/components/BurgerMenu/BurgerMenu";
import { useViewport } from "react-viewport-hooks";

const PlayListPage = () => {


    const {vw} = useViewport(); 



    return (

        <div className={Styles.container}>
            <div className={Styles.defaultPage}>
                <div>
                    {vw < 1024 ? <Header imgName={"rightArrow"}/> : <Header burger={true}/>}
                    
                </div>
                <h1 className={Styles.header}>My Playlists</h1>
                <div className={Styles.searchLayout}>
                    <Search />
                    <ReusableButton title={"+ New Playlist"} />
                </div>

                <div className={Styles.containerWrapper}>
                    {
                        playListsData.map((playList, index) => (
                            <SquareCard key={index} title={playList.name} img={playList.img} />
                        ))
                    }
                </div>
            </div>

            {/* <div className={Styles.childrenContainer}>
                <Header imgName={"rightArrow"} />
                <NewsComponent title={playlistName} count={""} />
                <Search />
                <ReusableTable />
            </div> */}

        </div>

    )
}

export default PlayListPage;