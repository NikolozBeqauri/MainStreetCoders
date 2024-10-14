import { AddLine } from "../AddPlaylist/AddLIne/AddLine";
import styles from "./SearchSuggestions.module.scss"

type Props = {
    suggestions: any;
}

export const SearchSuggestions = (props: Props) => {
    return(
        <div  className={styles.suggestions}>
            {props.suggestions != null && props.suggestions.slice(0, 20).map((title: any) => (
                <AddLine title={title.trackTitle} image={"addPlaylistIcon"} />
            ))}
            
        </div>
    )
}