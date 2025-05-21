import { Button } from "@/components/ui/button";
import Input from "@/components/ui/input/input";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip/tooltip";
import NavLink from "@/features/nav-bar/components/nav-link";
// import { useDebounce } from "@/hooks/use-debounce"
import { FolderOpenDot, Search, X } from "lucide-react";
import { useEffect, useRef, useState, type ChangeEvent } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function HeaderSearchInput() {
  const navigate = useNavigate();
  const location = useLocation();
  const [inputValue, setInputValue] = useState("");
  const ref = useRef<HTMLInputElement>(null);

  // Очищаем поле ввода, когда пользователь покидает страницу поиска
  useEffect(() => {
    if (!location.pathname.match(/\/search/)) {
      setInputValue("");
    }
  }, [location.pathname]);

  function onChange(e: ChangeEvent<HTMLInputElement>) {
    setInputValue(e.target.value);
  }

  // Обработка отправки формы по нажатию Enter
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (inputValue.trim()) {
      navigate(`./search/${inputValue.trim()}`);
    }
  }

  function onClearInput() {
    setInputValue("");
    navigate("./");
  }

  return (
    <div className="relative flex w-full items-center">
      <form
        className="group relative box-border flex w-full rounded-full bg-[var(--background-elevated-base)] py-3 pl-12 pr-16 transition-colors focus-within:bg-[var(--background-elevated-highlight)] hover:bg-[var(--background-elevated-highlight)] focus:border-white"
        onSubmit={handleSubmit}
        onClick={() => {
          if (!ref.current || location.pathname.match(/\/search/)) return;

          ref.current.focus();
        }}
      >
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="absolute left-3 top-[50%] translate-y-[-50%] cursor-pointer text-textButton group-focus-within:text-white group-hover:text-white">
              <Search />
            </div>
          </TooltipTrigger>
          <TooltipContent sideOffset={19}>
            <span>Поиск</span>
          </TooltipContent>
        </Tooltip>

        <Input
          ref={ref}
          onChange={onChange}
          value={inputValue}
          className="h-6 w-full cursor-pointer bg-transparent p-0 text-white outline-none focus:cursor-auto"
          placeholder="Что хочешь найти?"
        />
        {!inputValue ? (
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="absolute right-3 top-[50%] h-6 translate-y-[-50%] cursor-pointer border-l-[1px] border-textButton pl-3 pr-1 text-textButton">
                <NavLink
                  to={"./search"}
                  variant={"iconTransparent"}
                  className="h-full p-0"
                  type="button"
                  hover={"pulse"}
                >
                  <FolderOpenDot />
                </NavLink>
              </div>
            </TooltipTrigger>
            <TooltipContent sideOffset={19}>
              <span>Обзор</span>
            </TooltipContent>
          </Tooltip>
        ) : (
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="absolute right-3 top-[50%] flex translate-y-[-50%] cursor-pointer items-center justify-center pr-1 text-textButton">
                <Button
                  onClick={onClearInput}
                  variant={"iconTransparent"}
                  className="p-0"
                  type="button"
                >
                  <X />
                  <span className="sr-only">Clear input</span>
                </Button>
              </div>
            </TooltipTrigger>
            <TooltipContent sideOffset={17}>
              <span>Очистить строку поиска</span>
            </TooltipContent>
          </Tooltip>
        )}
      </form>
    </div>
  );
}

export default HeaderSearchInput;
