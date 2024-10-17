import { useRecoilState } from "recoil";
import { AddLine } from "../AddPlaylist/AddLIne/AddLine";
import styles from "./SearchSuggestions.module.scss"
import { trackIdState } from "@/app/states";

type Props = {
    musicSuggestions: any;
    authorSuggestion: any;
    albumSuggestion: any;

}


export const SearchSuggestions = (props: Props) => {
    const [trackId, setTrackId] = useRecoilState(trackIdState);
    return(
        <div  className={styles.suggestions}>
            {props.musicSuggestions != null && props.musicSuggestions.slice(0, 20).map((title: any) => (
                <>
                <AddLine title={title.trackTitle} onClick={(e: any) => setTrackId(title.id)}/>
                </>
                
            ))}
            {props.authorSuggestion != null && props.authorSuggestion.slice(0, 20).map((title: any) => (
                <>
                <AddLine title={title.fullName} />
                </>

            ))}
            
        </div>
    )
}