import { Button, type ButtonProps } from "../button";

function FormButton({ children, isLoading }: ButtonProps) {
  return (
    <Button
      size="lg"
      variant="pillFilled"
      className="w-full mt-6 bg-green-color justify-center hover:bg-green-color hover:opacity-95"
      type="submit"
      aria-label="Следующий шаг"
      isLoading={isLoading}
    >
      {children}
    </Button>
  );
}

FormButton.displayName = "FormButton";

export default FormButton;
