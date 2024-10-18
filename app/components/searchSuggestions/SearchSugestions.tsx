import { useRecoilState } from "recoil";
import { AddLine } from "../AddPlaylist/AddLIne/AddLine";
import styles from "./SearchSuggestions.module.scss";
import { globalClickerState, trackIdState } from "@/app/states";
import { dataState } from "@/app/states";
import { useRouter } from "next/navigation";

type Props = {
  musicSuggestions: any;
  authorSuggestion: any;
  albumSuggestion: any;
};

export const SearchSuggestions = (props: Props) => {
  const [globalClicker, setGlobalClickerState] = useRecoilState(globalClickerState);
  const [trackId, setTrackId] = useRecoilState(trackIdState);
  const [, setData] = useRecoilState(dataState);
  const router = useRouter();

  return (
    <div className={styles.suggestions}>
      {props.musicSuggestions != null &&
        props.musicSuggestions.slice(0, 20).map((title: any) => (
          <AddLine
            key={title.id}
            image={"addPlaylistIcon"}
            title={title.trackTitle}
            onClick={(e: any) => {
              setTrackId(title.id);
              setGlobalClickerState(title.id);
            }}
          />
        ))}
      {props.authorSuggestion != null &&
        props.authorSuggestion.slice(0, 20).map((author: any) => (
          <AddLine
            key={author.id}
            image={`profileIcon`}
            title={author.fullName}
            onClick={(e: any) => {
              setData(author);
              router.push("/artist");
            }}
          />
        ))}
    </div>
  );
};
