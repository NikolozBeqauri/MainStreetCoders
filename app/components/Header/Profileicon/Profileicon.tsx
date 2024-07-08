import Image from 'next/image';
import styles from './Profileicon.module.scss'

type Props = {
    src: string;
}
export const Profileicon = ({src}:Props) => {
    return (
        <div className={styles.profile_icon}>
            <Image 
                src={src}
                alt="Profile Icon"
                width={56}
                height={56}
            />  
        </div>
    )
}
