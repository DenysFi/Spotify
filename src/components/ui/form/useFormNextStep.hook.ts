import { useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export type TUseFormNextStepState = {
  state: {
    step: number;
    maxStep: number;
    authWithService?: boolean;
  } | null;
};

type TUseFormNextStep = () => Promise<void> | undefined;

export function useFormNextStep(callback?: TUseFormNextStep) {
  const navigate = useNavigate();
  const { state }: TUseFormNextStepState = useLocation();

  const handleNextStep = useCallback(() => {
    if (callback) {
      callback();
      return;
    }

    const newStep = state === null ? 0 : state.step + 1;

    navigate(".", {
      state: { ...state, step: newStep },
    });
  }, [navigate, state, callback]);

  return { handleNextStep };
}
