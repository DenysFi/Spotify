import { SearchInput } from "@/components/search-input/search-input";
import Box from "@/components/ui/box/box";
import { Button } from "@/components/ui/button";
import { useState, createContext, useContext } from "react";

import { Scrollbar } from "@/components/ui/scrollbar";
import {
  SidebarItemHided,
  SidebarMinMaxWithToggleButton,
  SidebarToggleButton,
} from "@/components/ui/sidebar/sidebar";
import { ArrowRight, Library } from "lucide-react";
import RecentlyListened from "./cards";

// Создаем контекст для передачи строки поиска в компонент RecentlyListened
type SearchContextType = {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
};

export const SearchContext = createContext<SearchContextType>({
  searchTerm: "",
  setSearchTerm: () => {}
});

// Хук для использования контекста поиска
export const useSearch = () => useContext(SearchContext);

function MediaLibrary() {
  // Состояние для поисковой строки
  const [searchTerm, setSearchTerm] = useState("");
  
  // Обработчик изменения поля поиска
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  
  return (
    <Box
      className="relative flex h-full select-none flex-col"
      aria-label="Медиатека"
    >
      <div className="flex items-center justify-between px-4 py-2">
        <SidebarToggleButton>
          <Button size={"lg"} variant={"text"} iconLeft={<Library />}>
            <SidebarItemHided>Моя медиатека</SidebarItemHided>
          </Button>
        </SidebarToggleButton>
        <SidebarItemHided>
          <SidebarMinMaxWithToggleButton>
            <Button
              size={"icon"}
              variant={"iconTransparent"}
              hover={"iconSecondaryHover"}
            >
              <ArrowRight />
            </Button>
          </SidebarMinMaxWithToggleButton>
        </SidebarItemHided>
      </div>
      <Scrollbar>
        <div className="pt-[1px]">
          <div className="px-2">
            <SidebarItemHided>
              <div className="mb-2 flex justify-between px-2 transition-all">
                <SearchInput
                  inputSize={"sm"}
                  placeholder="Поиск треков и выпусков"
                  expandable
                  className="w-[11.75rem]"
                  aria-label="Поиск треков и выпусков"
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
              </div>
            </SidebarItemHided>
          </div>
          <SearchContext.Provider value={{ searchTerm, setSearchTerm }}>
            {/* Недавние */}
            <RecentlyListened />
            
          </SearchContext.Provider>
        </div>
      </Scrollbar>
    </Box>
  );
}

export default MediaLibrary;
