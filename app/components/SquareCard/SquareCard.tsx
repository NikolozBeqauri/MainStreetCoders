import { ReusableIcon } from "../ReusableIcon/ReusableIcon";
import styles from "./SquareCard.module.scss";

type Props = {
    title: string;
    img: string;
    onClick?: () => void;
    onDelete?: () => void; 
};

export const SquareCard = (props: Props) => {
    const stylesClass = [styles.cardIconsBackground];
    const cardImageStyle = [styles.defaultCardStyles];

    const handleIconClick = (event: React.MouseEvent) => {
        event.stopPropagation();
    };

    return (
        <div className={styles.cardWrapper} onClick={props.onClick}>
            <div className={styles.cardImageWrapper}>
                <img
                    className={cardImageStyle.join(" ").trim()}
                    src={`/images/${props.img}.png`}
                    alt="playlist image"
                    tabIndex={0}
                />
                <div className={stylesClass.join(" ").trim()}>
                    <div className={styles.cardIconsWrapper}>
                        <div onClick={handleIconClick}>
                            <ReusableIcon imgName={"edit"} background />
                        </div>
                        <div onClick={(event) => { handleIconClick(event); props.onDelete?.(); }}>
                            <ReusableIcon imgName={"delete"} background />
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.cardTitles}>
                <h3>{props.title}</h3>
            </div>
        </div>
    );
};
