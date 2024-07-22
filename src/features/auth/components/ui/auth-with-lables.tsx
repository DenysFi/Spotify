import type { ILabel } from "@/constants/labels.constant";
import AuthWith from "./auth-with";
import { cn } from "@/utils/cn";

interface AuthWithLabelsProps {
  labels: ILabel[];
  className?: string;
  type: "login" | "register";
}

function AuthWithLabels({ labels, className, type }: AuthWithLabelsProps) {
  return (
    <div className={cn("grid gap-3", className)}>
      {labels.map((label, index) => (
        <AuthWith
          key={index}
          action={label.action}
          type={type}
          iconSrc={label.iconSrc}
          label={label.label}
        />
      ))}
    </div>
  );
}

export default AuthWithLabels;
