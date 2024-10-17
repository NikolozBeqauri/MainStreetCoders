'use client'

import Image from 'next/image';
import styles from "./Search.module.scss";
import axios from 'axios';
import Cookies from 'js-cookie';
import { useState } from 'react';
import { SearchSuggestions } from '../searchSuggestions/SearchSugestions';
type Props = {
    placeHolder?: string;
}
export const Search = (props: Props) => {
    const token = Cookies.get("token");
    const [suggestions, setSuggestions] = useState<any>(null);
    const [value, setValue] = useState<any>(null);
    const [trackId, setTrackId] = useState<any>(null);
    
    
    const placeHolder = props.placeHolder ? props.placeHolder : "Artists, tracks, albums";
    const searchEngine = (e: any) => {
        setValue(e.target.value);

        axios.get(`https://project-spotify-1.onrender.com/search?searchfield=${value}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            }
          })
          .then((r) => {
            console.log(r.data.music);
            setSuggestions(r.data.music);
            setSuggestions(r.data.albums);
            setSuggestions(r.data.Artists);
            setTrackId(r.data)
          })
    };

    return (
        <>
            <div 
            className={styles.searchform}
            onChange={searchEngine}>
                <input type="text" placeholder={placeHolder} />
                <Image 
                    className={styles.searchImage}
                    src="/icons/search.svg"
                    alt="search icon"
                    width={24}
                    height={24}
                />
            </div>
            {value && value.length != 0 && <SearchSuggestions suggestions={suggestions} />}
        </>
    )
}