'use client';
import Image from "next/image";
import { useState, useEffect } from "react";
import styles from "./ReusableIcon.module.scss";
import { AddPlaylist } from "../AddPlaylist/AddPlaylist";
import { createPortal } from "react-dom";
import { useRecoilState } from "recoil";
import { threeDotClickedState } from "@/app/states";

type Props = {
  imgName: string;
  background?: boolean;
  active?: boolean;
  isHovered?: boolean;
  width?: any;
  height?: any;
  onFocus?: () => void;
};

export const ReusableIcon = (props: Props) => {
  const imageName = props.active ? `${props.imgName}Active` : props.imgName;
  const stylesClasses = [styles.generalStyles];
  const [isFocused, setIsFocused] = useState(false);
  const [threeDotClicked, setThreeDotClicked] = useRecoilState(threeDotClickedState);

  const handleFocus = () => {
    setIsFocused(true);
    if (props.onFocus) props.onFocus();
  };

  
  if (props.background) stylesClasses.push(styles.whiteBackground);
  if (props.active || isFocused || props.isHovered) stylesClasses.push(styles.active);
  useEffect(() => {
    if(isThreeDots){
      if (threeDotClicked) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = ''; 
      }
  
      return () => {
        document.body.style.overflow = ''; 
      };
    }
  }, [threeDotClicked]);


  const isThreeDots = props.imgName === 'threeDots' ? true : false;
  const isWhiteThreeDots = props.imgName === 'whiteThreeDots' ? true : false;

  const handleClick = () => {
    setThreeDotClicked(!threeDotClicked);
  };

  return (
    <div className={styles.wholeWrapper}>
      <div className={styles.iconWrapper}>
        {threeDotClicked && isThreeDots && createPortal(
          <div className={styles.backgroundOfPopup} onClick={() => setThreeDotClicked(false)}>
            <div className={isThreeDots ? styles.AddPlaylist : styles.AddWhitePlaylist} onClick={(e) => e.stopPropagation()}>
              <AddPlaylist />
            </div>
          </div>,
          document.body
        )}

        <Image
          className={stylesClasses.join(" ").trim()}
          src={`/icons/${imageName}.svg`}
          alt="icon"
          width={props.width ? props.width : 32}
          height={props.height ? props.height : 32}
          onFocus={handleFocus}
          onClick={handleClick}
          tabIndex={0}
        />
      </div>
    </div>
  );
};
