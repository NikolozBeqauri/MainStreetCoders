import { useState } from 'react';
import styles from './Different.module.scss'
import { useRecoilState } from 'recoil';
import { modalState } from '@/app/states';

const Different = () => {

    const [mobileState, setMobileState] = useState(false);
    const [modal, setModalState] = useRecoilState(modalState);
    

    const toggleChange = () => {
        setModalState(!modal);
        setMobileState(!mobileState);
      };

    return (
        <div className={modal === true ? styles.mobileVersion : styles.mobileVersionDisable} onClick={toggleChange}></div>
    )
}

export default Different