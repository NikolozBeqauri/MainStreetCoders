import { useRecoilState } from "recoil";
import { AddLine } from "../AddPlaylist/AddLIne/AddLine";
import styles from "./SearchSuggestions.module.scss"
import { globalClickerState, trackIdState } from "@/app/states";

type Props = {
    musicSuggestions: any;
    authorSuggestion: any;
    albumSuggestion: any;

}

export const SearchSuggestions = (props: Props) => {
    const [globalClicker, setGlobalClickerState] = useRecoilState(globalClickerState);
    
    return(
        <div  className={styles.suggestions}>
            {props.musicSuggestions != null && props.musicSuggestions.slice(0, 20).map((title: any) => (
                <>
                <AddLine title={title.trackTitle} onClick={(e: any) => setGlobalClickerState(title.id)}/>
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