
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
    const [authorSuggestion, setAuthorSuggestion] = useState<any>(null);
    const [album, setAlbum] = useState<any>(null);
    const [value, setValue] = useState<any>(null);
    
    const placeHolder = props.placeHolder ? props.placeHolder : "Artists, tracks, albums";
    const searchEngine = (e: any) => {
        setValue(e.target.value);

        axios.get(`https://project-spotify-1.onrender.com/search?searchfield=${value}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            }
          })
          .then((r) => {
            setSuggestions(r.data.music);
            setAuthorSuggestion(r.data.author);
            setAlbum(r.data.albums);
            
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
            {value && value.length != 0 && <SearchSuggestions musicSuggestions={suggestions} authorSuggestion={authorSuggestion} albumSuggestion={album} />}
        </>
    )
}