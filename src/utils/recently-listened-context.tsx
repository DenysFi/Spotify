import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";
import type { ReactNode } from "react";
import {
  getRecentlyListenedFromApi,
  saveToRecentlyListenedApi,
  clearRecentlyListenedApi,
} from "./recently-listened-api";
import { setRecentlyListenedRefresh } from "./recently-listened";
import type { TCardVariantsEnum } from "./get-text-by-type";

// Тип для состояния недавно прослушанных элементов
type RecentlyListenedState = {
  [key in TCardVariantsEnum]?: string[];
};

// Тип для контекста
interface RecentlyListenedContextType {
  recentlyListened: RecentlyListenedState;
  addToRecentlyListened: (id: string, type: TCardVariantsEnum) => Promise<void>;
  clearRecentlyListened: (type?: TCardVariantsEnum) => Promise<void>;
  refreshRecentlyListened: () => Promise<void>;
  isLoading: boolean;
}

// Создаем контекст
const RecentlyListenedContext = createContext<
  RecentlyListenedContextType | undefined
>(undefined);

// Провайдер для контекста
export const RecentlyListenedProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [recentlyListened, setRecentlyListened] =
    useState<RecentlyListenedState>({});
  const [isLoading, setIsLoading] = useState(false);

  // Функция для обновления данных из API
  const refreshRecentlyListened = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await getRecentlyListenedFromApi();
      setRecentlyListened(data);
    } catch (error) {
      console.error("Failed to refresh recently listened items:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Функция добавления элемента в список недавно прослушанных
  const addToRecentlyListened = useCallback(
    async (id: string, type: TCardVariantsEnum) => {
      try {
        // Сохраняем в API
        await saveToRecentlyListenedApi({ id, type });

        // Обновляем локальное состояние для мгновенного отображения
        setRecentlyListened((prev) => {
          const currentList = prev[type] || [];
          // Проверяем, нет ли уже такого элемента
          if (!currentList.includes(id)) {
            return {
              ...prev,
              [type]: [...currentList, id],
            };
          }
          return prev;
        });

        // После сохранения обновляем данные с сервера
      } catch (error) {
        console.error("Failed to add item to recently listened:", error);
      }
    },
    [],
  );

  // Функция очистки списка недавно прослушанных
  const clearRecentlyListened = useCallback(
    async (type?: TCardVariantsEnum) => {
      try {
        await clearRecentlyListenedApi(type);

        // Обновляем локальное состояние
        if (type) {
          setRecentlyListened((prev) => {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { [type]: removed, ...rest } = prev;
            return rest;
          });
        } else {
          setRecentlyListened({});
        }
      } catch (error) {
        console.error("Failed to clear recently listened items:", error);
      }
    },
    [],
  );

  // Загружаем данные из API при первоначальной загрузке
  useEffect(() => {
    // Загружаем данные из API
    refreshRecentlyListened();

    // Регистрируем глобальную функцию обновления
    setRecentlyListenedRefresh(addToRecentlyListened);

    // Очищаем регистрацию при размонтировании
    return () => setRecentlyListenedRefresh(() => Promise.resolve());
  }, [refreshRecentlyListened, addToRecentlyListened]);

  return (
    <RecentlyListenedContext.Provider
      value={{
        recentlyListened,
        addToRecentlyListened,
        clearRecentlyListened,
        refreshRecentlyListened,
        isLoading,
      }}
    >
      {children}
    </RecentlyListenedContext.Provider>
  );
};

// Хук для использования контекста
export const useRecentlyListened = () => {
  const context = useContext(RecentlyListenedContext);
  if (context === undefined) {
    throw new Error(
      "useRecentlyListened must be used within a RecentlyListenedProvider",
    );
  }
  return context;
};
