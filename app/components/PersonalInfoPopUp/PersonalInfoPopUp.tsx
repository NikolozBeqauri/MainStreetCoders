'use client'
import { useState } from 'react';
import styles from './PersonalInfoPopUp.module.scss';

export const PersonalInfoPopUp = () => {
    const [isActive, setIsActive] = useState(false)
    const handleLogOut = () => {        
        document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'; 
        window.location.reload(); 
    };

    const email = localStorage.getItem("email")

    if(!isActive) return

    return (
        <div className={styles.background} onClick={()=>setIsActive(false)}>
            <div className={styles.wrapper}>
                <h3>{email}</h3>
                <h3 onClick={()=>handleLogOut()} >Log Out</h3>
            </div>
        </div>
    );
};
