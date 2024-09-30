import CardСover from "@/components/ui/card-cover/card-cover";
import { useSidebar } from "@/components/ui/sidebar/context/useSidebar.hook";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip/tooltip";
import { cn } from "@/utils/cn";
import { getTextByType } from "@/utils/get-text-by-type";
import { useCallback, type HtmlHTMLAttributes } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import type { CardType } from "../types";

type CardProps = HtmlHTMLAttributes<HTMLLIElement> & {
  cardData: CardType;
  size?: "md" | "lg" | "sm";
};
function Card({ cardData, size, ...props }: CardProps) {
  const { expanded } = useSidebar();

  const navigate = useNavigate();

  const handleClick = useCallback(() => {
    navigate(`./${cardData.type}/${cardData.id}`);
  }, [navigate, cardData]);

  const location = useLocation();
  const isActive = new RegExp(
    `^(?=.*${cardData.type})(?=.*${cardData.id}).*$`,
  ).test(location.pathname);

  return (
    <li
      role="listitem"
      tabIndex={1}
      onClick={handleClick}
      className={cn(
        "flex w-full cursor-pointer items-center gap-3 rounded-md py-2 transition-colors hover:bg-iconPrimaryHover",
        {
          "p-2": expanded,
          "justify-center": !expanded,
          "bg-iconPrimaryHover": isActive,
        },
      )}
      {...props}
    >
      <Tooltip>
        <TooltipTrigger className="shrink-0">
          <CardСover
            variant={cardData.type}
            size={size}
            imgSrc={cardData.img}
            aria-label="cover"
            role="link"
          />
        </TooltipTrigger>
        <TooltipContent
          sideOffset={17}
          side="right"
          className={cn({ invisible: expanded })}
        >
          <div>
            <h3
              className={cn("text-base font-extrabold text-white", {
                "text-green-color": isActive,
              })}
            >
              {cardData.title}
            </h3>
            <p className="text-sm font-bold text-textButton">
              {getTextByType(cardData)}
            </p>
          </div>
        </TooltipContent>
      </Tooltip>

      {expanded && (
        <div className="flex flex-col items-start">
          <div className={cn({ "text-green-color": isActive })}>
            <h5 className={"text-ellipsis-custom pb-1 font-bold"}>
              <span>{cardData.title}</span>
            </h5>
          </div>
          <p className="text-ellipsis-custom text-sm font-semibold text-textButton">
            {getTextByType(cardData)}
          </p>
        </div>
      )}
    </li>
  );
}

export default Card;
