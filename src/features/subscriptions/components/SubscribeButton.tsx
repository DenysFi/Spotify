import React from "react";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { useSubscription, useSubscriptionStatus } from "../api/useSubscription";

type ItemType = "artist" | "album" | "playlist";

interface SubscribeButtonProps {
  itemId: string;
  itemType: ItemType;
  variant?: "default" | "pillFilled" | "text" | "icon" | "iconTransparent";
  size?: "sm" | "lg" | "icon";
  hover?: "pulse" | "iconPrimaryHover" | "iconSecondaryHover";
  className?: string;
  onClick?: () => void;
}

export function SubscribeButton({
  itemId,
  itemType,
  variant = "icon",
  size = "sm",
  hover = "iconPrimaryHover",
  className = "",
  onClick,
}: SubscribeButtonProps) {
  // Get current subscription status
  const { data: subscriptionData, isLoading: isStatusLoading } =
    useSubscriptionStatus({
      itemId,
      itemType,
    });

  console.log(
    `Subscription status for ${itemType} ${itemId}:`,
    subscriptionData,
  );

  // Toggle subscription mutation
  const { mutate: toggleSubscription, isPending: isToggling } =
    useSubscription();

  // Check if user is subscribed
  const isSubscribed = subscriptionData?.isSubscribed;

  // Get button style based on subscription status
  const buttonVariant = variant;
  const buttonClassName = isSubscribed
    ? "bg-pink-500 hover:bg-pink-600 text-white " + className
    : className;

  // Handle subscription toggle
  const handleToggleSubscription = () => {
    console.log(
      `Toggling subscription for ${itemType} ${itemId}. Current status:`,
      subscriptionData?.isSubscribed,
    );

    toggleSubscription(
      { itemId, itemType },
      {
        onSuccess: (data) => {
          console.log(
            `Subscription toggled successfully. New status:`,
            data.isSubscribed,
          );
        },
        onError: (error) => {
          console.error(`Error toggling subscription:`, error);
        },
      },
    );

    // Если есть дополнительный обработчик клика, вызываем его
    if (onClick) onClick();
  };

  // Loading state
  const isLoading = isStatusLoading || isToggling;

  return (
    <Button
      variant={buttonVariant}
      className={buttonClassName}
      size={size}
      hover={hover}
      disabled={isLoading}
      onClick={handleToggleSubscription}
      title={
        isSubscribed
          ? `Отписаться от ${getItemTypeName(itemType)}`
          : `Подписаться на ${getItemTypeName(itemType)}`
      }
    >
      <Heart
        size={24}
        className="h-5 w-5"
        color={isSubscribed ? "white" : "black"}
        fill={isSubscribed ? "white" : "black"}
      />
    </Button>
  );
}

// Helper function to get human-readable item type name in accusative case
function getItemTypeName(itemType: ItemType): string {
  switch (itemType) {
    case "artist":
      return "исполнителя";
    case "album":
      return "альбом";
    case "playlist":
      return "плейлист";
    default:
      return itemType;
  }
}
