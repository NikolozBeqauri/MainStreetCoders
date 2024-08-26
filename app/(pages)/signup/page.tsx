import { SignUp } from "@/app/components/SighnUp/SignUp";
import styles from './page.module.scss'
import Image from "next/image";

export const SighnUpPage = () => {
    return (
        <div className={styles.signUpWrapper}>
            <Image
                src={'/images/mainLogo.png'}
                alt="icon"
                width={98}
                height={83}
            />
            <div className={styles.content}>
                <div className={styles.titles}>
                    <h2 className={styles.where}>WHERE <span className={styles.harmony}>HARMONY</span></h2>
                    <h2 className={styles.meets}>MEETS <span className={styles.melody}>MELODY</span></h2>
                    <p>The Future Of Music Streaming</p>
                </div>
                <SignUp/>
            </div>
        </div>
    )
}

export default SighnUpPage;