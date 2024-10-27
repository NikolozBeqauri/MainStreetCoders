import { MobileNavbar } from "@/app/components/MobileNavbar/MobileNavbar"
import { SideBar } from "@/app/components/SideBar/SideBar"
import styles from "./layout.module.scss"
import IndexPage from "@/app/components/MusicPlayer/IndexPage";

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
                <IndexPage/>
                <MobileNavbar/>
            </footer>
        </>
    )
}

export default authorised;