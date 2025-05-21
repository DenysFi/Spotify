import type { TCardVariantsEnum } from "./get-text-by-type";
import axios from "axios";

type RecentlyListenedResponse = {
  [key: string]: string[];
};

/**
 * Get all recently listened items from the server
 */
export async function getRecentlyListenedFromApi(): Promise<{
  [key in TCardVariantsEnum]: string[];
}> {
  try {
    const response = await axios.get<RecentlyListenedResponse>("/api/RecentlyListened");
    return response.data as {
      [key in TCardVariantsEnum]: string[];
    };
  } catch (error) {
    console.error("Failed to fetch recently listened items:", error);
    // Return empty object on error
    return {} as {
      [key in TCardVariantsEnum]: string[];
    };
  }
}

/**
 * Save an item to recently listened on the server
 */
export async function saveToRecentlyListenedApi(item: {
  id: string;
  type: TCardVariantsEnum;
}): Promise<void> {
  try {
    await axios.post("/api/RecentlyListened", {
      itemId: item.id,
      itemType: item.type
    });
  } catch (error) {
    console.error("Failed to save recently listened item:", error);
  }
}

/**
 * Clear all recently listened items for a specific type
 */
export async function clearRecentlyListenedApi(itemType?: TCardVariantsEnum): Promise<void> {
  try {
    if (itemType) {
      await axios.delete(`/api/RecentlyListened/Clear/${itemType}`);
    } else {
      // Clear all types
      const types = ["artist", "album", "playlist"];
      await Promise.all(
        types.map(type => axios.delete(`/api/RecentlyListened/Clear/${type}`))
      );
    }
  } catch (error) {
    console.error("Failed to clear recently listened items:", error);
  }
}
