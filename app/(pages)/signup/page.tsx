
'use client'

import { useViewport } from 'react-viewport-hooks';
import styles from './page.module.scss';
import Image from "next/image";
import { useState } from 'react';
import { SignUp } from '@/app/components/SignUp/SignUp';


const SignPage = () => {
    const { vw, } = useViewport();

    const [isStarted, setIsStarted] = useState<boolean>(false);


    if (isStarted) {
        return (
            <div className={styles.startedComponentWrapper}>
                <h2>Sign UP</h2>
                <SignUp />
            </div>
        )
    } else {
        return (
            <div className={styles.signUpWrapper}>
                <Image
                    src={'/images/mainLogo.png'}
                    alt="icon"
                    width={88}
                    height={73}
                />
                <div className={styles.content}>
                    <div className={styles.titles}>
                        <h2 className={styles.where}>WHERE <span className={styles.harmony}>HARMONY</span></h2>
                        <h2 className={styles.meets}>MEETS <span className={styles.melody}>MELODY</span></h2>
                        <p>The Future Of Music Streaming</p>
                    </div>
                    {vw <= 1024 ? <button className={styles.getStarted} onClick={() => { setIsStarted(true) }}>GET STARTED</button> : <SignUp />}
                </div>
            </div>
        );
    }

}

export default SignPage;
