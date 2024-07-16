import Image from 'next/image';
import styles from "./ThreeDots.module.scss"

type Props = {
    background?: boolean;
}

export const ThreeDots = (props: Props) => {

    const stylesClasses = [styles.generalStyles];
    if (props.background) stylesClasses.push(styles.whiteBackground);

    return (
        <Image
            className={stylesClasses.join(" ").trim()}

            src="/icons/threeDots.svg"
            alt="three dots icon"
            width={32}
            height={32}
        />
    )
}