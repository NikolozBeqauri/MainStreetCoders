import styles from './ItemsUnion.module.scss';
import Dots from "../CardDots/Dots";
import Heart from "../CardHeart/Heart";
import { useState } from 'react';
import Playlist from '../../Playlist/Playlist';
interface Props {
    dontVisible?: boolean;
}
const ItemsUnion = (props:Props) => {
    const [isPlaylistVisible, setIsPlaylistVisible] = useState(false);

    const changeOnDotsClick = () => {
        setIsPlaylistVisible(prev => !prev); 
    };

    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
               {props.dontVisible ? "" :<Dots onClick={changeOnDotsClick} /> } 
            </div>
            <div className={isPlaylistVisible ? styles.playlistVisible : styles.playlistHidden}>
                <Playlist />
            </div>
        </div>
    );
};

export default ItemsUnion;
