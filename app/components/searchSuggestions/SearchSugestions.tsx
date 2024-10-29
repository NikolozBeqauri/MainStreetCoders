import { useRecoilState } from "recoil";
import { AddLine } from "../AddPlaylist/AddLIne/AddLine";
import styles from "./SearchSuggestions.module.scss";
import { currentAlbumStete, globalClickerState, mudicIDState, trackIdState } from "@/app/states";
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
  const [, setCurrentAlbum] = useRecoilState(currentAlbumStete);
  const [, setMusicId] = useRecoilState(mudicIDState)

  const router = useRouter();

  return (
    <div className={styles.suggestions}>
      {props.musicSuggestions != null &&
        props.musicSuggestions.slice(0, 20).map((title: any) => (
          <AddLine
            key={title.id}
            image={"addPlaylistIcon"}
            title={title.trackTitle}
            onClick={() => {
              setMusicId(title.id);
            }}
            useForSearch
          />
        ))}
      {props.authorSuggestion != null &&
        props.authorSuggestion.slice(0, 20).map((author: any) => (
          <AddLine
            key={author.id}
            image={`viewArtistIcon`}
            title={author.fullName}
            onClick={(e: any) => {
              setData(author);
              router.push("/artist");
            }}
            useForSearch
          />
        ))}

      {props.albumSuggestion != null &&
        props.albumSuggestion.slice(0, 10).map((album: any) => (
          <AddLine
            key={album.id}
            image={`viewAlbumIcon`}
            title={album.title}
            onClick={(e: any) => {
              setCurrentAlbum(album.title)
              router.push(`/album?idFromAlbumPage=${album.id}`);
            }}
            useForSearch
          />
        ))}
    </div>
  );
};
