import { useRecoilState } from 'recoil';
import { HeartIcon } from '../HeartIcon/HeartIcon';
import { ReusableIcon } from '../ReusableIcon/ReusableIcon';
import styles from './SquareCard.module.scss';
import axios from 'axios';
import Cookies from 'js-cookie';
import { threeDotClickedState } from '@/app/states';

type Props = {
    title: string;
    img: string;
    onClick?: () => void; 
    iconImage?: string;
    playListId?: string; 
    refetchPlaylists?: () => void; 
};

export const SquareCard = (props: Props) => {
    const stylesClass = [styles.cardIconsBackground]; 
    const [, setThreeDotClicked] = useRecoilState(threeDotClickedState);   
    const cardImageStyle = [styles.defaultCardStyles];
    const token = Cookies.get("token");
    const handleDelete = () => {
        
        if (props.playListId && props.iconImage === "trash") {
            axios.delete(`https://project-spotify-1.onrender.com/playlist/${props.playListId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })
            .then((res) => {
                setThreeDotClicked(false)
                console.log("Playlist deleted:", res);
                if(props.refetchPlaylists){
                    props.refetchPlaylists();
                }
            })
            .catch((err) => {
                setThreeDotClicked(false)
                console.error("Error deleting playlist:", err);
            });
        }
    };

    return (
        <div className={styles.cardWrapper} onClick={props.onClick}>
            <div className={styles.cardImageWrapper}>
                <img 
                    className={cardImageStyle.join(" ").trim()}
                    src={props.img}
                    alt={props.title}
                    tabIndex={0}
                />
                <div className={stylesClass.join(" ").trim()}>
                    <div className={styles.cardIconsWrapper} onClick={(e: React.MouseEvent) => e.stopPropagation()}>
                        <div onClick={() => handleDelete()}>
                            <ReusableIcon imgName={props.iconImage ? props.iconImage : 'threeDots'} background />
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
