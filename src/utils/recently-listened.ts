import type { TCardVariantsEnum } from "./get-text-by-type";
import { saveToRecentlyListenedApi, clearRecentlyListenedApi } from "./recently-listened-api";

// Центральное хранилище для ссылки на обновление контекста
// Это нужно для компонентов, которые не имеют доступа к контексту напрямую
let globalRefreshFunction:
  | ((id: string, type: TCardVariantsEnum) => Promise<void>)
  | null = null;

// Функция для установки ссылки на обновление контекста
export function setRecentlyListenedRefresh(
  refreshFn: (id: string, type: TCardVariantsEnum) => Promise<void>,
) {
  globalRefreshFunction = refreshFn;
}

type GetRecentlyListenedReturn = {
  [key in TCardVariantsEnum]: string[];
};

/**
 * Saves an item to the recently listened collection
 * Uses API endpoint to store on the backend and updates the context
 */
export async function saveToRecentlyListened(item: {
  id: string;
  type: TCardVariantsEnum;
}) {
  // Если есть глобальная функция обновления контекста - используем её
  if (globalRefreshFunction) {
    await globalRefreshFunction(item.id, item.type);
    return;
  }

  // Иначе используем прямой вызов API
  await saveToRecentlyListenedApi(item);
}

/**
 * Gets the recently listened items
 * Fetches from API
 */
export function getRecentlyListened(): GetRecentlyListenedReturn {
  // Возвращаем пустой объект, который будет заменен данными из API через контекст
  return {} as GetRecentlyListenedReturn;
}

/**
 * Clears all recently listened items from API
 */
export async function clearRecentlyListened(itemType?: TCardVariantsEnum) {
  // Только очистка на API
  await clearRecentlyListenedApi(itemType);
}
