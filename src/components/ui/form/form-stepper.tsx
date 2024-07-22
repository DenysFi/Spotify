import Stepper from "../stepper/stepper";
import { useLocation } from "react-router-dom";

type TTab = {
  title: string;
  component: JSX.Element;
};

interface FormStepperProps {
  tabs: TTab[];
}

function FormStepper({ tabs }: FormStepperProps) {
  const labels = tabs.map((tab) => tab.title);
  const { state } = useLocation();

  const activeStep = state.step ?? 0;
  const activeStepTab = tabs[activeStep];

  return (
    <>
      <Stepper activeStep={activeStep} labels={labels}>
        {activeStepTab && activeStepTab.component}
      </Stepper>
    </>
  );
}

FormStepper.displayName = "FormStepper";
export default FormStepper;
