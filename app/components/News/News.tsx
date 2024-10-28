import styles from "./News.module.scss";
import { useRecoilState } from "recoil";
import { mudicIDState, topHitState } from "@/app/states";
import { useEffect, useState } from "react";
import axios from "axios";
import Button from "../Button/Button";
import Cookies from "js-cookie";


interface Props {
  title: string;
  image: string;
  plays?: string;
}

const News = (props: Props) => {


  const [musicID, setMusicId] = useRecoilState<any>(mudicIDState)
  const [forMusic, setForMusic] = useState()
  const token = Cookies.get("token");

  useEffect(() => {
    axios
      .get(
        `https://project-spotify-1.onrender.com/music/topHits`, {
          headers: {
              Authorization: `Bearer ${token}`,
          },
      })
      .then(async (r) => {
        // setSearchItems(r.data.authors);
        // setTopHIt(r.data[0])
        // setTopHitMusic(r.data[0])
        // setMusicId(r.data[0].id)
        // setTopHitMusic(r.data[0].id)
        setForMusic(r.data[0]?.id)
        console.log(r.data[0], ' data all news');
        
      });
  }, []);

  const backImage: object = {
    backgroundImage: `url(${props.image})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "left",
  };

  return (
    <div className={styles.container} style={backImage}>
        <div className={styles.container_news}>
          <div className={styles.container_title}>
            <div className={styles.font_style_news}>{props.title}</div>
            <div className={styles.font_style_plays}> Plays {props.plays} </div>
          </div>
          <div className={styles.mainButton}>
            <Button
              title={"Listen Now"}
              mode={"reusable button"}
              padding="12px 24px 12px 20px"
              borderRadius="8px"
              gap="4px"
              width="153px"
              fontSize="16px"
              fontWeight="500"
              imageSrc="clip.svg"
              imageWidth={20}
              imageHeight={20}
            onClick={() => setMusicId(forMusic)}
            />
          </div>
          <div className={styles.mobileButton}>
            <Button
              title={"Listen Now"}
              mode={"reusable button"}
              padding="8px 12px 8px 8px"
              borderRadius="4px"
              gap="4px"
              width="114px"
              fontSize="14px"
              fontWeight="500"
              imageSrc="clip.svg"
              imageWidth={16}
              imageHeight={16}
            onClick={() => setMusicId(forMusic)}
            />
          </div>
        </div>
      </div>
  );
};

export default News;
