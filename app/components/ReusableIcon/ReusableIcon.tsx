'use client';
import Image from "next/image";
import { useState, useEffect } from "react";
import styles from "./ReusableIcon.module.scss";
import { AddPlaylist } from "../AddPlaylist/AddPlaylist";
import { createPortal } from "react-dom";

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

  const [isFocused, setIsFocused] = useState(false);
  const [threeDotClicked, setThreeDotClicked] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
    if (props.onFocus) props.onFocus();
  };

  useEffect(() => {
    if (threeDotClicked) {
      document.body.style.overflow = 'hidden'; // Disable scroll
    } else {
      document.body.style.overflow = ''; // Enable scroll
    }

    // Cleanup: ensure scrolling is re-enabled when component unmounts or when threeDotClicked is false
    return () => {
      document.body.style.overflow = ''; // Reset scroll on cleanup
    };
  }, [threeDotClicked]);

  const stylesClasses = [styles.generalStyles];
  if (props.background) stylesClasses.push(styles.whiteBackground);
  if (props.active || isFocused || props.isHovered) stylesClasses.push(styles.active);

  const isThreeDots = props.imgName === 'threeDots' ? true : false;
  const isWhiteThreeDots = props.imgName === 'whiteThreeDots' ? true : false;

  const handleClick = () => {
    setThreeDotClicked(!threeDotClicked);
  };

  return (
    <div className={styles.wholeWrapper}>
      <div className={styles.iconWrapper}>
        {threeDotClicked && createPortal(
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
