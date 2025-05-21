import { cn } from "@/utils/cn";
import { cva, type VariantProps } from "class-variance-authority";
import { useState, useEffect, type HtmlHTMLAttributes } from "react";
import Empty from "@/assets/empty.png";
export const cardImageVariants = cva(
  "rounded-sm relative overflow-hidden w-full h-full",
  {
    variants: {
      variant: {
        artist: "rounded-full",
        playlist: "",
        album: "",
      },
      size: {
        sm: "max-w-12 max-h-12",
        md: "max-w-44 max-h-44",
        lg: "max-w-56 max-h-56 ",
        xl: "max-w-[21rem] max-h-[21rem]",
      },
    },
    defaultVariants: { size: "sm" },
  },
);

export type CardImageProps = VariantProps<typeof cardImageVariants> &
  HtmlHTMLAttributes<HTMLDivElement> & {
    imgSrc: string;
  };

function CardСover({
  className,
  variant,
  imgSrc,
  size,
  ...props
}: CardImageProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  // Сбрасываем состояние загрузки при изменении src
  useEffect(() => {
    if (imgSrc) {
      setImageLoaded(false);
      setIsLoading(true);
    }
  }, [imgSrc]);
  
  // Обработчики событий изображения
  const handleImageLoad = () => {
    setImageLoaded(true);
    setIsLoading(false);
  };
  
  const handleImageError = () => {
    setIsLoading(false);
  };
  
  return (
    <div
      className={cn(cardImageVariants({ variant, size, className }))}
      {...props}
    >
      {/* Скелетон, который показывается только во время загрузки */}
      {isLoading && (
        <div className="absolute inset-0 overflow-hidden">
          <div className="h-full w-full bg-[var(--background-elevated-base)] animate-pulse rounded-sm" 
               style={variant === 'artist' ? { borderRadius: '50%' } : {}} />
        </div>
      )}
      
      <img
        className={cn("aspect-square h-full w-full object-cover", {
          "opacity-0": isLoading,
          "opacity-100 transition-opacity duration-200": imageLoaded
        })}
        aria-hidden="true"
        draggable="false"
        src={imgSrc || Empty}
        onLoad={handleImageLoad}
        onError={handleImageError}
      />
    </div>
  );
}
export default CardСover;
