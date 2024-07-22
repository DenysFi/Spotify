import { ChevronLeft } from "lucide-react";
import { useCallback, useEffect, useState, type ReactElement } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../button";
import Step from "./step";
import StepperProgress from "./stepper-propgress";

type StepperProps = {
  activeStep: number;
  labels: string[];
  children: ReactElement;
};

function Stepper({ activeStep, children, labels }: StepperProps) {
  const navigate = useNavigate();

  const activeStepLabel = labels[activeStep];

  const handleBackStep = useCallback(() => {
    const newStep = activeStep - 1;

    navigate(".", { state: newStep >= 0 ? { step: newStep } : null });
  }, [activeStep, navigate]);

  return (
    <div>
      <StepperProgress maxStep={labels.length} currentStep={activeStep} />
      <div className="flex mt-4 items-center">
        <Button
          onClick={handleBackStep}
          variant={"iconTransparent"}
          size={"lg"}
          iconLeft={<ChevronLeft />}
        >
          <span className="sr-only">Step back</span>
        </Button>
        <div className="ml-[1.1rem]">
          <Step maxStep={labels.length} currentStep={activeStep} />
          <span className="font-bold text-white">{activeStepLabel}</span>
        </div>
      </div>
      {children}
    </div>
  );
}
Stepper.displayName = "Stepper";
export default Stepper;
