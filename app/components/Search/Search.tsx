'use client';
import Image from 'next/image';
import styles from "./Search.module.scss";
import axios from 'axios';
import Cookies from 'js-cookie';
import { useState, useEffect, useRef } from 'react';
import { SearchSuggestions } from '../searchSuggestions/SearchSugestions';
import { activeSearchState } from '@/app/states';
import { useRecoilState } from 'recoil';

type Props = {
    placeHolder?: string;
}

export const Search = (props: Props) => {
    const token = Cookies.get("token");
    const [suggestions, setSuggestions] = useState<any>(null);
    const [authorSuggestion, setAuthorSuggestion] = useState<any>(null);
    const [album, setAlbum] = useState<any>(null);
    const [value, setValue] = useState<string>('');
    const [activeSearch] = useRecoilState(activeSearchState);
    const [isFocused, setIsFocused] = useState<boolean>(false); 
    const inputRef = useRef<HTMLInputElement>(null); 
    const focusTimeoutRef = useRef<NodeJS.Timeout | null>(null); 

    const placeHolder = props.placeHolder ? props.placeHolder : "Artists, tracks, albums";

    useEffect(() => {
        if (activeSearch && inputRef.current) {
            inputRef.current.focus(); 
        }
    }, [activeSearch]); 

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;
        setValue(inputValue);  

        if (inputValue.trim()) {
            axios.get(`https://project-spotify-83tj.onrender.com/search?searchfield=${inputValue}`, {
                headers: {
                  Authorization: `Bearer ${token}`,
                }
            })
            .then((r) => {
                console.log(r);
                setSuggestions(r.data.music);     
                setAuthorSuggestion(r.data.author);                
                setAlbum(r.data.albums);
            })
            .catch((err) => {
                console.log(err);
            });
        } else {
            setSuggestions(null);
            setAuthorSuggestion(null);
            setAlbum(null);
        }
    };

    const handleFocus = () => {
        setIsFocused(true);
    };

    const handleBlur = () => {
        if (focusTimeoutRef.current) {
            clearTimeout(focusTimeoutRef.current); 
        }
        focusTimeoutRef.current = setTimeout(() => {
            setIsFocused(false);
        }, 2000); 
    };

    useEffect(() => {
        return () => {
            if (focusTimeoutRef.current) {
                clearTimeout(focusTimeoutRef.current);
            }
        };
    }, []);

    return (
        <>
            <div className={styles.searchform}>
                <input 
                    type="text" 
                    placeholder={placeHolder} 
                    value={value}  
                    onChange={handleInputChange} 
                    ref={inputRef}
                    onFocus={handleFocus} 
                    onBlur={handleBlur} 
                />
                <Image 
                    className={styles.searchImage}
                    src="/icons/search.svg"
                    alt="search icon"
                    width={24}
                    height={24}
                />
            </div>
            {isFocused && value && value.length !== 0 && ( 
                <SearchSuggestions 
                    musicSuggestions={suggestions} 
                    authorSuggestion={authorSuggestion} 
                    albumSuggestion={album} 
                />
            )}
        </>
    );
};
