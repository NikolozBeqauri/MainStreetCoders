import { ReactNode } from "react";
import styles from "./Button.module.scss"

type Props = {
    value: ReactNode;
    icon?: boolean;
    mode: "neutral" | "disabled";
    className?: string;

}

export default function Button(props: Props) {
    const mode = props.mode == "neutral" ? styles.neutral : styles.disabled;
    const icon = props.icon && styles.icon;

    return(
        <button className={`${icon} ${mode} ${styles.container} ${props.className}`}>
            {props.value}
        </button>
    )
}