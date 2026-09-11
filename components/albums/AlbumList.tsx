import { AlbumRow } from "./AlbumRow";
import type { Album } from "@/types/album";

export function AlbumList({ albums }: { albums: Album[] }) {
  return (
    <div className="border-t border-border">
      {albums.map((album, i) => (
        <AlbumRow key={album.id} album={album} number={i + 1} />
      ))}
    </div>
  );
}
