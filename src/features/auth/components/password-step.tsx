import { Form } from "@/components/ui/form/form";
import FormButton from "@/components/ui/form/from-button";
import PasswordInput from "@/components/ui/form/password-input";
import PasswordRequirements from "@/components/ui/form/password-requirements";
import { useFormNextStep } from "@/components/ui/form/useFormNextStep.hook";
import getFormData from "@/components/ui/stepper/services/getFormData";
import setFormData from "@/components/ui/stepper/services/setFormData";
import { registerInputSchema } from "@/lib/auth";

const passwordSchema = registerInputSchema.pick({ password: true });

const PasswordStep = () => {
  const { handleNextStep } = useFormNextStep();
  const { password } = getFormData();

  return (
    <Form
      onSubmit={handleNextStep}
      schema={passwordSchema}
      className="mobile:max-w-[25em] w-full mobile:px-10  mt-8 mx-auto pb-5"
      options={{ defaultValues: { password }, mode: "onChange" }}
    >
      {({ formState, register, watch }) => {
        setFormData({ ...getFormData(), ...watch() });

        const inputValue = watch("password");

        return (
          <>
            <PasswordInput
              errors={formState.errors["password"]}
              registration={register("password")}
              showError={false}
            />
            <PasswordRequirements
              isInputEmpty={!inputValue}
              error={formState.errors["password"]}
            />
            <FormButton> Далее </FormButton>
          </>
        );
      }}
    </Form>
  );
};

export default PasswordStep;
