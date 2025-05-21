import { Button } from "@/components/ui/button";
import { useAuth } from "@/features/auth/context/useAuth";
import { Bell, GamepadIcon, House } from "lucide-react";

import {
  Dropdown,
  DropdownContent,
  DropdownItem,
  DropdownTrigger,
} from "@/components/ui/dropdown/dropdown";
import Logo from "@/components/ui/logo/logo";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip/tooltip";
import NavLink from "@/features/nav-bar/components/nav-link";
import { useNavigate } from "react-router-dom";
import HeaderSearchInput from "./header-search-input";

function LayoutHeader() {
  const user = useAuth();
  const navigate = useNavigate();
  return (
    <header className="relative flex h-full items-center justify-between [grid-area:header]">
      <Logo className="ml-3" />
      <div className="left-0 right-0 flex h-full items-center gap-2 min-[1600px]:absolute min-[1600px]:justify-center">
        <div className="flex w-[50%] min-w-[21rem] max-w-[34rem] gap-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <NavLink
                to="/app"
                end
                size="icon"
                hover="pulse"
                className="bg-[var(--background-elevated-base)] p-6"
                aria-label="Домашняя страница"
                variant="icon"
                icon={<House />}
              />
            </TooltipTrigger>
            <TooltipContent side="bottom" sideOffset={7}>
              <span>Домашняя страница</span>
            </TooltipContent>
          </Tooltip>
          <HeaderSearchInput />
        </div>
      </div>
      <div className="relative z-10 flex items-center gap-2">
        <Button size="icon" variant="icon" hover="pulse">
          <Bell className="h-4 w-4" />
        </Button>
        <Button
          size="sm"
          variant="pillFilled"
          className=""
          iconLeft={<GamepadIcon className="h-4 w-4" />}
          hover="pulse"
          onClick={() => navigate("./tetris")}
          aria-label="Играть в Tetris"
        >
          Играть в Tetris
        </Button>
        <Dropdown modal={false}>
          <Tooltip>
            <TooltipTrigger asChild>
              <DropdownTrigger asChild>
                <Button
                  variant="icon"
                  hover="pulse"
                  className="flex h-12 w-12 items-center justify-center bg-[var(--background-elevated-base)] p-0"
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-green-400 text-black">
                    {user.currentUser?.displayName?.charAt(0)}
                  </span>
                </Button>
              </DropdownTrigger>
            </TooltipTrigger>
            <TooltipContent sideOffset={10}>
              <span>{user.currentUser?.displayName}</span>
            </TooltipContent>
          </Tooltip>
          <DropdownContent
            className="z-50 mr-2"
            sideOffset={5}
            alignOffset={50}
          >
            <DropdownItem
              onClick={() => {
                fetch("/logout", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: "",
                })
                  .then((data) => {
                    if (data.ok) {
                      user.setCurrentUser(null);
                    }
                  })
                  .catch((error) => {
                    console.error(error);
                  });
              }}
            >
              Выйти
            </DropdownItem>
          </DropdownContent>
        </Dropdown>
      </div>
    </header>
  );
}

export default LayoutHeader;
