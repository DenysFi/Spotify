function Step({
  maxStep,
  currentStep,
}: {
  maxStep: number;
  currentStep: number;
}) {
  return (
    <p className="text-[#a7a7a7] text-sm  mb-[2px]">
      Шаг {currentStep + 1} из {maxStep}
    </p>
  );
}

Step.displayName = "Step";

export default Step;
