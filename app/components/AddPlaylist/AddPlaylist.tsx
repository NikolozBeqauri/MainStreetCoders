'use client'
import { useRouter } from "next/navigation";
import { AddLine } from "./AddLIne/AddLine";
import styles from "./AddPlaylist.module.scss";
import { useState, useEffect, useRef } from "react";
import popUpNav from "@/app/enums/popUpNav";
import UploadFile from "./UploadFile/UploadFile";
import { AddPlaylistChackBox } from "./AddPlaylistChackBox/AddPlaylistChackBox";

export const AddPlaylist = () => {
    const router = useRouter();
    const [activeComponent, setActiveComponent] = useState<null | string>(popUpNav.addPlaylist);
    const wrapperRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
                setActiveComponent(null); 
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [wrapperRef]);
    

    return (
        <div ref={wrapperRef} className={styles.wholeWrapper}>
            {activeComponent === popUpNav.addPlaylist && (
                <div className={`${styles.container} ${styles.background}`}>
                    <AddLine onClick={() => setActiveComponent(popUpNav.addChackBox)} title="Add to playlists" image={"addPlaylistIcon"} />
                    <AddLine onClick={() => { router.push('/album') }} title="View Album" image={"viewAlbumIcon"} />
                    <AddLine onClick={() => { router.push('/artist') }} title="viewArtist" image={"viewArtistIcon"} />
                </div>
            )}

            {activeComponent === popUpNav.addChackBox && (
                <div>
                    <AddPlaylistChackBox setActiveComponent={setActiveComponent} onClickBtn={() => setActiveComponent(popUpNav.uploadFile)} />
                </div>
            )}

            {activeComponent === popUpNav.uploadFile && (
                <div>
                    <UploadFile setActiveComponent={setActiveComponent} />
                </div>
            )}
        </div>
    );
};
