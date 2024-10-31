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

export const albumOnState = atom({
    key: "albumOn",
    default: false,
  });

export const playlistOnState = atom({
    key: "playlistOn",
    default: false,
  });

export const musicOnState = atom({
    key: "musicOn",
    default: true,
  });

export const albumIdState = atom<number | undefined>({
    key: "albumId",
    default: undefined,
  });

export const selectedPlaylistIDToAddTrackState = atom<number | null>({
    key: 'selectedPlaylistIDToAddTrackState', 
    default: undefined, 
});

export const selectedMusicToAddInAlbumState = atom<number | undefined>({
    key: 'selectedMusicToAddInAlbumState', 
    default: undefined,
});


export const isPlayingState = atom({
    key: 'isPlaying', 
    default: false,
});

export const trackIdState = atom ({
    key: 'trackId',
    default: null,
})


export const threeDotClickedState = atom({
    key: 'threeDotClickedState', 
    default: false, 
});
export const playlistIdState = atom<any>({
    key: 'playlistId', 
    default: null, 
});

export const selectedPlaylistTrackState = atom<any>({
    key: 'selectedPlaylistTrack', 
    default: null, 
});

export const playlistDataState = atom<any>({
    key: 'playlistData', 
    default: {}, 
});

type Album = {
    totalSongsOfAuthor: string;
    fullName: string;
    image: string;
    count: number; 
}

export const dataState = atom<Album | null>({
    key: 'albumData',
    default: null,    
});

export const activeSearchState = atom({
    key: 'activeSearchState',
    default: false, 
});

export const albumIDState = atom<number | null>({
    key: 'albumIDState',
    default: null,

});

export const repeatOnState = atom({
    key: 'repeatOn',
    default: false,
});

export const topHitsOnState = atom({
    key: 'topHitsOn',
    default: false,
});

export const topWeeksOnState = atom({
    key: 'topWeeksOn',
    default: false,
});

export const randomWordsState = atom({
    key: 'randomWords',
    default: '',
});

export const currentAlbumStete = atom({
    key: 'currentAlbumStete',
    default: undefined,
});

export const indexOfArrState = atom<number>({
    key: 'indexOfArr',
    default: -1,
});


export const artistIdState = atom<number>({
    key: 'artistIdState',
});


export const albumidState = atom({
    key: 'albumidState',
    default: null
})

export const newsImageState = atom({
    key: 'newsImageState',
    default: null
})



export const chartsState = atom({
    key: 'chartsState',
    default: 0
})


export const playerState = atom({
    key: 'playerState',
    default: []
})


export const currentTrackIdState = atom({
    key: 'currentTrackIdState',
    default: 0
})

export const musicState = atom({
    key: 'musicState',
    default: []
})
export const globalAlbumDataState = atom({
    key: 'globalAlbumDataState',
    default: []
})
export const artistNameState = atom({
    key: 'artistNameState',
    default: ''
})

export const clickFetchState = atom({
    key: 'clickFetchState',
    default: false
})

export const albumCoverState = atom({
    key: 'albumCoverState',
    default: []
})

export const mudicIDState = atom({
    key: 'mudicIDState',
    default: 10,
})
export const musicIdForPlaylistState = atom<any>({
    key: 'musicIdForPlaylistState',
    default: null,
})

export const playerDisplayState = atom({
    key: 'playerDisplayState',
    default: 157
})
export const albumMusicFromArtistState = atom({
    key: 'albumMusicFromArtistState',
    default: []
})

export const topHitState = atom({
    key: 'topHitState',
    default: null
})
 
export const  oneArrayMusicState = atom({
    key: 'oneArrayMusicState',
    default: []
})
export const somePlayingState = atom({
    key: 'somePlayingState',
    default : null
})

export const globalMusicState = atom({
    key: 'globalMusicState',
    default: null
})

export const globalPLaylistState = atom({
    key: 'globalPLaylistState',
    default: null
})
export const userIDState = atom({
    key: 'userIDState', 
    default: ''
})
export const formusicFetchState = atom({
    key: 'formusicFetchState',
    default: null
})
