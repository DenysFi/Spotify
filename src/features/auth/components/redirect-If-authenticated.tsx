import { type FC, type ReactElement } from "react";
import { useAuth } from "../context/useAuth";
import { Navigate, useLocation } from "react-router-dom";
import type { TUseFormNextStepState } from "@/components/ui/form/useFormNextStep.hook";

const RedirectIfAuthenticated: FC<{ children: ReactElement }> = ({
  children,
}) => {
  const { state }: TUseFormNextStepState = useLocation();
  const { currentUser } = useAuth();

  if (state?.authWithService) return children;

  return !currentUser ? children : <Navigate to={"/app"} />;
};

export default RedirectIfAuthenticated;
