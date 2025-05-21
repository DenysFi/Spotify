import { Button } from "@/components/ui/button";
import { List } from "lucide-react";
import { SubscribeButton } from "@/features/subscriptions/components/SubscribeButton";
import { useParams } from "react-router-dom";

function PlaylistControl({ onSave, itemType = 'album' }: { onSave?: () => void; itemType?: 'album' | 'playlist' | 'artist' }) {
  const params = useParams();
  // Получаем ID из URL параметров (albumId, playlistId или artistId)
  const itemId = params.albumId || params.playlistId || params.artistId;
  return (
    <div className="relative z-10 flex items-center justify-between gap-2 p-[var(--content-spacing)]">
      <SubscribeButton 
        itemId={itemId as string}
        itemType={itemType}
        size="icon"
        className="h-12 w-12 bg-green-color"
        onClick={onSave}
      />

      <Button variant={"text"} iconRight={<List width={16} height={16} />}>
        Список
      </Button>
    </div>
  );
}

export default PlaylistControl;
