import * as Progress from "@radix-ui/react-progress";

function StepperProgress({
  maxStep,
  currentStep,
}: {
  maxStep: number;
  currentStep: number;
}) {
  const progressValue = ((currentStep + 1) / maxStep) * 100;

  return (
    <Progress.Root
      className="relative h-[2px] w-full overflow-hidden bg-mainGray transition-all"
      value={currentStep}
    >
      <Progress.Indicator
        className="w-full h-full bg-green-color transition-all"
        style={{ transform: `translateX(-${100 - progressValue}%)` }}
      />
    </Progress.Root>
  );
}
StepperProgress.displayName = "StepperProgress";
export default StepperProgress;
