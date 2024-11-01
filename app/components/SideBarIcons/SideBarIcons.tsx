'use client';
import Image from "next/image";
import { useState } from "react";
import styles from "./SideBarIcons.module.scss";


type Props = {
  imgName: string;
  background?: boolean;
  active?: boolean;
  isHovered?: boolean;
  width?: any;
  height?: any;
  onFocus?: () => void;
};

export const SideBarIcons = (props: Props) => {
  const imageName = props.active ? `${props.imgName}Active` : props.imgName;
  const stylesClasses = [styles.generalStyles];
  const [isFocused, setIsFocused] = useState(false);
  const handleFocus = () => {
    setIsFocused(true);
    if (props.onFocus) props.onFocus();
  };

  
  if (props.background) stylesClasses.push(styles.whiteBackground);
  if (props.active || isFocused || props.isHovered) stylesClasses.push(styles.active);
 


  return (
    <div className={styles.wholeWrapper}>
      <div className={styles.iconWrapper}>
       

        <Image
          className={stylesClasses.join(" ").trim()}
          src={`/icons/${imageName}.svg`}
          alt="icon"
          width={props.width ? props.width : 32}
          height={props.height ? props.height : 32}
          onFocus={handleFocus}
          tabIndex={0}
        />
      </div>
    </div>
  );
};
