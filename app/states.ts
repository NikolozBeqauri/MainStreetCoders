import { atom } from "recoil";

export const activeSidebarState = atom({
    key: "activeSidebar",
    default: false,
});

export const signInState = atom({
    key: "signIn",
    default: false,
});

export const signUpState = atom({
    key: "signUp",
    default: false,
});

export const modalState = atom({
    key: "modal",
    default: true,
});

export const globalClickerState = atom<number | null>({
    key: "globalClicker",
    default: null,
  });
  
// export const currentRecordState = atom({
//     key: "currentRecord",
//     default: null,
// });


export const selectedPlaylistIDToAddTrackState = atom<number | null>({
    key: 'selectedPlaylistIDToAddTrackState', 
    default: undefined, 
});

export const selectedMusicToAddInAlbumState = atom<number | undefined>({
    key: 'selectedMusicToAddInAlbumState', 
    default: undefined,
});