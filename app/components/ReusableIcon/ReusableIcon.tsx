'use client'
import Image from "next/image";
import { useState } from "react";
import styles from "./ReusableIcon.module.scss";
import { AddPlaylist } from "../AddPlaylist/AddPlaylist";

type Props = {
    imgName: string,
    background?: boolean,
    active?: boolean,
    isHovered?: boolean,
    width?: any,
    height?: any,
    onFocus?: () => void,
}

export const ReusableIcon = (props: Props) => {
    const imageName = props.active ? `${props.imgName}Active` : props.imgName;

    const [isFocused, setIsFocused] = useState(false);
    const [threeDotClicked, setThreeDotClicked] = useState(false)

    const handleFocus = () => {
        setIsFocused(true);
        if (props.onFocus) props.onFocus();
    };

    const stylesClasses = [styles.generalStyles];
    if (props.background) stylesClasses.push(styles.whiteBackground);
    if (props.active || isFocused || props.isHovered) stylesClasses.push(styles.active);
    const isThreeDots = props.imgName === 'threeDots' ? true : false;
    const isWhiteThreeDots = props.imgName === 'whiteThreeDots' ? true : false;

    if (isThreeDots || isWhiteThreeDots) {
        return (
            <div className={styles.wholeWrapper}>
                <div className={styles.iconWrapper}>
                    {threeDotClicked &&
                        <div className={isThreeDots === true ? styles.AddPlaylist : styles.AddWhitePlaylist}>
                            <AddPlaylist />
                        </div>
                        }
                    <Image
                        className={stylesClasses.join(" ").trim()}
                        src={`/icons/${imageName}.svg`}
                        alt="icon"
                        width={props.width ? props.width : 32}
                        height={props.height ? props.height : 32}
                        onFocus={handleFocus}
                        onClick={() => setThreeDotClicked(!threeDotClicked)}
                        tabIndex={0}
                    />
                </div>
            </div>
        );
    } else {
        return (
            <Image
                className={stylesClasses.join(" ").trim()}
                src={`/icons/${imageName}.svg`}
                alt="icon"
                width={props.width ? props.width : 32}
                height={props.height ? props.height : 32}
                onFocus={handleFocus}
                tabIndex={0}
            />
        );
    }
};
