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

// export const recordState = atom({
//     key: "record",
//     default: [],
// });

// export const currentRecordState = atom({
//     key: "currentRecord",
//     default: null,
// });
