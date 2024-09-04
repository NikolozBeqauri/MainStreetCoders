import AudioPlayer from "@/app/components/AudioPlayer/AudioPlayer"
import { MobileNavbar } from "@/app/components/MobileNavbar/MobileNavbar"
import { SideBar } from "@/app/components/SideBar/SideBar"
import styles from "./layout.module.scss"

export const authorised = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    return (
        <>
            <div className={styles.mainContent}>
                <SideBar />
                {children}
            </div>
            <footer className={styles.AudioPlayer}>
                <AudioPlayer />
                <MobileNavbar />
            </footer>
        </>
    )
}

export default authorised;